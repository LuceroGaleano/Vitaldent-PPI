import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';

export default function PatientPortal() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <div className="bg-success text-white p-3" style={{ width: '250px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Paciente</p>
        
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/patient/citasDisponibles')}
            >
              Citas Disponibles
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/patient/misCitas')}
            >
              Mis Citas
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/patient/historialMedico')}
            >
              Historial Clínico
            </button>
          </li>
        </ul>

        <div className="mt-auto pt-5">
          <button className="btn btn-outline-light w-100 mb-2">Actualizar Perfil</button>
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Contenido Dinámico */}
      <div className="flex-grow-1 p-5">
        <Outlet />
      </div>
    </div>
  );
}