import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { AppointmentContext } from '../../context/AppointmentContext';
import { TreatmentContext } from '../../context/TreatmentContext';
import { 
  FaCalendarAlt, FaNotesMedical, FaSearch, 
  FaSyringe, FaListUl, FaUserEdit, FaSignOutAlt 
} from 'react-icons/fa';

function OdontologistPortal() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setAppointment } = useContext(AppointmentContext);
  const { setTreatment } = useContext(TreatmentContext);

  const goToAppointment = (appointment) => {
    setAppointment(appointment);
    navigate('/odontologist/createMedicalHistory');
  };

  const goToTreatment = (treatment) => {
    setTreatment(treatment);
    navigate('/odontologist/createMedicalHistory');
  };

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  // Función para los estilos del enlace activo
  const getNavLinkClass = ({ isActive }) => 
    `btn w-100 text-start d-flex align-items-center gap-3 py-2 px-3 rounded-3 mb-1 border-0 transition-all ${
      isActive 
        ? 'bg-white text-success fw-bold shadow-sm' 
        : 'bg-transparent text-white opacity-75 hover-opacity-100'
    }`;

  return (
    <div className="d-flex min-vh-100 bg-light">
      
      {/* Menú Lateral Premium */}
      <div className="text-white p-4 d-flex flex-column shadow-lg" style={{ width: '280px', background: 'linear-gradient(180deg, #198754 0%, #146c43 100%)' }}>
        
        {/* Encabezado del Menú */}
        <div className="mb-4 text-center">
          <div className="bg-white text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ width: '50px', height: '50px' }}>
            <span className="fs-4 fw-bold">V</span>
          </div>
          <h4 className="fw-bold mb-0">Vitaldent</h4>
          <span className="badge bg-white text-success bg-opacity-25 mt-1 fw-normal">Odontólogo</span>
        </div>
        
        {/* Opciones de Navegación */}
        <div className="nav flex-column mb-auto mt-2 overflow-auto custom-scrollbar pe-2">
          
          <small className="text-white-50 fw-bold text-uppercase mb-2" style={{fontSize: '0.7rem'}}>Agenda</small>
          <NavLink to="/odontologist/appointments" className={getNavLinkClass}>
            <FaCalendarAlt size={18} /> Mis Citas
          </NavLink>

          <small className="text-white-50 fw-bold text-uppercase mb-2 mt-3" style={{fontSize: '0.7rem'}}>Clínica</small>
          <NavLink to="/odontologist/createMedicalHistory" className={getNavLinkClass}>
            <FaNotesMedical size={18} /> Crear Historial
          </NavLink>
          <NavLink to="/odontologist/searchMedicalHistory" className={getNavLinkClass}>
            <FaSearch size={18} /> Buscar Historial
          </NavLink>

          <small className="text-white-50 fw-bold text-uppercase mb-2 mt-3" style={{fontSize: '0.7rem'}}>Tratamientos</small>
          <NavLink to="/odontologist/createTreatment" className={getNavLinkClass}>
            <FaSyringe size={18} /> Crear Tratamiento
          </NavLink>
          <NavLink to="/odontologist/viewTreatments" className={getNavLinkClass}>
            <FaListUl size={18} /> Ver Tratamientos
          </NavLink>
        </div>

        {/* Botones de Acción Final */}
        <div className="mt-4 pt-3 border-top border-white border-opacity-25">
          <NavLink to="/odontologist/actualizarUsuario" className={getNavLinkClass}>
            <FaUserEdit size={18} /> Mi Perfil
          </NavLink>
          <button 
            className="btn btn-danger w-100 mt-2 d-flex align-items-center justify-content-center gap-2 rounded-3" 
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh', backgroundColor: '#f4f6f8' }}>
        <div className="container-fluid max-w-7xl">
          <Outlet context={{ onAppointmentClick: goToAppointment, onTreatmentClick: goToTreatment }} />
        </div>
      </div>
    </div>
  );
}

export default OdontologistPortal;