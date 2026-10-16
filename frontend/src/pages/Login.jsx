import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginReducer, initialState } from '../reduces/LoginReduce';

function Login() {
  const[state, dispatch] = useReducer(loginReducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({type: "LOADING", payload: true});

    try{
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: state.username,
          password: state.password
        }),
      })
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.message || data.error)
        }

        localStorage.setItem('token', data.token);
        dispatch({type: "LOADING", payload: false});

        if(data.role == "RECEPTIONIST"){
          navigate('/receptionist')
        } else if(data.role == "DOCTOR"){
           navigate('/odontologist')
        } else if(data.role == "PATIENT"){
          navigate('/patient')
        } else if(data.role == "INVENTORY_MANAGER"){
          navigate('/inventoryManager')
        } else{
          navigate('/')
        }
    } catch (err){
      dispatch({type: "ERROR", payload: err.message});
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow border-0 rounded-4 p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-body">
          {/* Encabezado */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary mb-1">Vitaldent</h2>
            <p className="text-muted small">Bienvenido al portal odontológico</p>
          </div>

          {state.error && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              {state.error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="user" className="form-label fw-semibold text-secondary small">
                Usuario / Correo
              </label>
              <input
                id="user"
                type="text"
                name = "username"
                value = {state.username}
                onChange = {handleChange}
                className="form-control form-control-lg fs-6"
                placeholder="Ingresa tu credencial"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pass" className="form-label fw-semibold text-secondary small">
                Contraseña
              </label>
              <input
                id="pass"
                type="password"
                name = "password"
                value = {state.password}
                onChange = {handleChange}
                className="form-control form-control-lg fs-6"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 fs-6 fw-semibold shadow-sm">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;