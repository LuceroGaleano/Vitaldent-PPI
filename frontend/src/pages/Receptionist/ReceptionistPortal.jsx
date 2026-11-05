import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { InvoiceContext } from '../../context/InvoiceContext';
import { 
  FaCalendarPlus, FaCalendarAlt, FaUserInjured, FaUserPlus, 
  FaUserTimes, FaFileMedical, FaMoneyBillWave, FaFileInvoiceDollar, 
  FaReceipt, FaTasks, FaUserEdit, FaSignOutAlt 
} from 'react-icons/fa';

function ReceptionistPortal() {
  const { setAuth } = useContext(AuthContext);
  const { setInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  const goToInvoice = (invoice) => {
    setInvoice(invoice);
    navigate('/receptionist/viewPayments');
  };

  const goToCreatePay = (invoice) => {
    setInvoice(invoice);
    navigate('/receptionist/createPayment');
  };

  // Esta función decide cómo se ve el botón dependiendo de si está seleccionado o no
  const getNavLinkClass = ({ isActive }) => 
    `btn w-100 text-start d-flex align-items-center gap-3 py-2 px-3 rounded-3 mb-1 border-0 transition-all ${
      isActive 
        ? 'bg-white text-success fw-bold shadow-sm' 
        : 'bg-transparent text-white opacity-75 hover-opacity-100'
    }`;

  return (
    <div className="d-flex min-vh-100 bg-light">
      
      {/* Menú Lateral Mejorado */}
      <div className="text-white p-4 d-flex flex-column shadow-lg" style={{ width: '280px', background: 'linear-gradient(180deg, #198754 0%, #146c43 100%)' }}>
        <div className="mb-4 text-center">
          <div className="bg-white text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ width: '50px', height: '50px' }}>
            <span className="fs-4 fw-bold">V</span>
          </div>
          <h4 className="fw-bold mb-0">Vitaldent</h4>
          <span className="badge bg-white text-success bg-opacity-25 mt-1 fw-normal">Recepción</span>
        </div>

        {/* Opciones de Navegación con NavLink e Iconos */}
        <div className="nav flex-column mb-auto overflow-auto custom-scrollbar pe-2">
          
          <small className="text-white-50 fw-bold text-uppercase mb-2 mt-2" style={{fontSize: '0.7rem'}}>Citas</small>
          <NavLink to="/receptionist/createAppointment" className={getNavLinkClass}>
            <FaCalendarPlus size={18} /> Crear Cita
          </NavLink>
          <NavLink to="/receptionist/viewAppointments" className={getNavLinkClass}>
            <FaCalendarAlt size={18} /> Ver Citas
          </NavLink>
          <NavLink to="/receptionist/managePatientAppointments" className={getNavLinkClass}>
            <FaTasks size={18} /> Gestionar Paciente
          </NavLink>

          <small className="text-white-50 fw-bold text-uppercase mb-2 mt-3" style={{fontSize: '0.7rem'}}>Usuarios</small>
          <NavLink to="/receptionist/createPatient" className={getNavLinkClass}>
            <FaUserInjured size={18} /> Crear Paciente
          </NavLink>
          <NavLink to="/receptionist/createUser" className={getNavLinkClass}>
            <FaUserPlus size={18} /> Crear Usuario
          </NavLink>
          <NavLink to="/receptionist/deleteUser" className={getNavLinkClass}>
            <FaUserTimes size={18} /> Eliminar Usuario
          </NavLink>

          <small className="text-white-50 fw-bold text-uppercase mb-2 mt-3" style={{fontSize: '0.7rem'}}>Clínica</small>
          <NavLink to="/receptionist/viewMedicalHistory" className={getNavLinkClass}>
            <FaFileMedical size={18} /> Historiales
          </NavLink>
          <NavLink to="/receptionist/createPayment" className={getNavLinkClass}>
            <FaMoneyBillWave size={18} /> Crear Pago
          </NavLink>
          <NavLink to="/receptionist/viewPayments" className={getNavLinkClass}>
            <FaFileInvoiceDollar size={18} /> Ver Pagos
          </NavLink>
          <NavLink to="/receptionist/viewInvoices" className={getNavLinkClass}>
            <FaReceipt size={18} /> Ver Facturas
          </NavLink>
        </div>

        {/* Botones de Acción Final */}
        <div className="mt-4 pt-3 border-top border-white border-opacity-25">
          <NavLink to="/receptionist/actualizarUsuario" className={getNavLinkClass}>
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

      {/* Contenedor del Outlet */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh', backgroundColor: '#f4f6f8' }}>
        <div className="container-fluid max-w-7xl">
          <Outlet context={{onInvoiceClick: goToInvoice, onCreatePayClick: goToCreatePay}}/>
        </div>
      </div>
    </div>
  );
}

export default ReceptionistPortal;