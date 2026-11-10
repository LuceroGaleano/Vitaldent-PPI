import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';

function Login() {
  const initialState = {
    username: '',
    password: ''
  };

  const { state, handleChange } = useForm(initialState);
  const { execute: login, loading, error } = useFetch();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login({
      url: `${API_URL}/auth/login`,
      method: 'POST',
      body: {
          username: state.username,
          password: state.password
      },
      token: null,
    });

    if (result.success) {
      const { data } = result;
      setAuth({
        logged: true,
        token: data.token,
        document: data.document
      });

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
    }
  }

  return (
    <div 
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" 
      style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
    >
      <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-body p-0">
          
          {/* Encabezado Mejorado */}
          <div className="text-center mb-5">
            <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: '60px', height: '60px' }}>
              <span className="fs-3 fw-bold">V</span>
            </div>
            <h2 className="fw-bolder text-dark mb-1">Vitaldent</h2>
            <p className="text-muted small mb-0">Ingresa a tu portal odontológico</p>
          </div>

          {/* Alerta de Error */}
          {error && (
            <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
              {error}
            </div>
          )}

          {/* Formulario con Etiquetas Flotantes */}
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                id="user"
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
                className="form-control form-control-lg rounded-3 border-light-subtle shadow-none bg-light"
                placeholder="Ingresa tu credencial"
                disabled={loading}
                required
              />
              <label htmlFor="user" className="text-secondary small">Usuario o Correo</label>
            </div>

            <div className="form-floating mb-4">
              <input
                id="pass"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                className="form-control form-control-lg rounded-3 border-light-subtle shadow-none bg-light"
                placeholder="Ingresa tu contraseña"
                disabled={loading}
                required
              />
              <label htmlFor="pass" className="text-secondary small">Contraseña</label>
            </div>

            {/* Botón Dinámico de Carga */}
            <button 
              type="submit" 
              className="btn btn-success btn-lg w-100 fs-6 fw-semibold shadow-sm rounded-3 py-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Validando credenciales...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;