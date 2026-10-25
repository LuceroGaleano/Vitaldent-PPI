import {useState, useEffect, useContext} from 'react';
import {authContext} from '../context/authContext';
import {useNavigate} from 'react-router-dom';

export default function OdontologistPortal() {
  const [activeView, setActiveView] = useState('citas');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Menú Lateral */}
      <div className="bg-success text-white p-3 d-flex flex-column" style={{ width: '260px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Odontólogo</p>
        
        <ul className="nav flex-column gap-2 mb-auto">
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'citas' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('citas')}
            >
              Mis Citas
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'crearHistorial' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('crearHistorial')}
            >
              Crear Historial
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'buscarHistorial' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('buscarHistorial')}
            >
              Buscar Historial
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'crearTratamiento' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('crearTratamiento')}
            >
              Crear Tratamiento
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'verTratamientos' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('verTratamientos')}
            >
              Ver Tratamientos
            </button>
          </li>
        </ul>

        <div className="mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-5 overflow-auto">
        {activeView === 'citas' && <MisCitasDoctor />}
        {activeView === 'crearHistorial' && <CrearHistorial />}
        {activeView === 'buscarHistorial' && <BuscarHistorial />}
        {activeView === 'crearTratamiento' && <CrearTratamiento />}
        {activeView === 'verTratamientos' && <VerTratamientos />}
      </div>
    </div>
  );
}