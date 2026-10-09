import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    
    navigate('/patient');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand-title">Vitaldent</h1>
        <p className="subtitle">Bienvenido al portal</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuario / Correo</label>
            <input type="text" placeholder="Ingresa tu credencial" />
          </div>
          
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" />
          </div>
          
          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;