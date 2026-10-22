import { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginReducer, initialState } from '../reduces/LoginReduce';
import { postFetch } from '../fetchs/PostFetch';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const[state, dispatch] = useReducer(loginReducer, initialState);
  const navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthContext);

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };

  const handleLogin = async(e) =>{
    e.preventDefault();
    dispatch({type: 'LOADING', payload: true});

    try{
      const data = await postFetch(
        'http://localhost:8080/auth/login',
        {
          username: state.username,
          password: state.password
        }
      )

      setAuth({
        logged: true,
        user: data.token
      });
      
      localStorage.setItem('auth', auth);
      dispatch({ type: 'LOADING', payload: false });
      if (data.role === 'RECEPTIONIST') {
        navigate('/receptionist');
      } else if (data.role === 'DOCTOR') {
        navigate('/odontologist');
      } else if (data.role === 'PATIENT') {
        navigate('/patient');
      } else if (data.role === 'INVENTORY_MANAGER') {
        navigate('/inventoryManager');
      } else {
        navigate('/');
      }
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow border-0 rounded-4 p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-body">
          {/* Encabezado */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-success mb-1">Vitaldent</h2>
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

            <button type="submit" className="btn btn-success btn-lg w-100 fs-6 fw-semibold shadow-sm">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;