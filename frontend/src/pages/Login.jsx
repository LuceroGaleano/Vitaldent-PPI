import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/patient');
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

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="user" className="form-label fw-semibold text-secondary small">
                Usuario / Correo
              </label>
              <input
                id="user"
                type="text"
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