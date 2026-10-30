import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import {useNavigate, Outlet} from 'react-router-dom';
import { AppointmentContext } from '../../context/AppointmentContext';
import { TreatmentContext } from '../../context/TreatmentContext';

function OdontologistPortal() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const {setAppointment} = useContext(AppointmentContext);
  const {setTreatment} = useContext(TreatmentContext);

    const goToAppointment= (appointment) => {
      setAppointment(appointment);
      navigate('/odontologist/createMedicalHistory');
    };

    const goToTreatment= (treatment) => {
      setTreatment(treatment);
      navigate('/odontologist/createMedicalHistory');
    };



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
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/odontologist/appointments')}
            >
              Mis Citas
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/odontologist/createMedicalHistory')}
            >
              Crear Historial
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/odontologist/searchMedicalHistory')}
            >
              Buscar Historial
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/odontologist/createTreatment')}
            >
              Crear Tratamiento
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/odontologist/viewTreatments')}
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
        <Outlet context={{onAppointmentClick: goToAppointment, onTreatmentClick: goToTreatment}} />
      </div>
    </div>
  );
}

export default OdontologistPortal;