import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { InoviceContext } from '../../context/InvoiceContext';

function ReceptionistPortal() {
  const { setAuth } = useContext(AuthContext);
  const {setInvoice} = useContext(InoviceContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

    const goToInovice= (invoice) => {
      setInvoice(invoice);
      navigate('/receptionist/viewPayments');
    };


  return (
    <div className="d-flex min-vh-100 bg-light">
      <div className="bg-success text-white p-3 d-flex flex-column" style={{ width: '260px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Recepcionista</p>

        <ul className="nav flex-column gap-2 mb-auto overflow-auto">
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/createAppointment')}>
              Crear Cita
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/viewAppointments')}>
              Ver Citas
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/createPatient')}>
              Crear Paciente
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/createUser')}>
              Crear Usuario
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/deleteUser')}>
              Eliminar Usuario
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/viewMedicalHistory')}>
              Ver Historial
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/createPayment')}>
              Crear Pago
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/viewPayments')}>
              Ver Pagos
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/viewInvoices')}>
              Ver Facturas
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-success w-100 text-start text-white" onClick={() => navigate('/receptionist/managePatientAppointments')}>
              Gestionar Citas Paciente
            </button>
          </li>
        </ul>

        <div className="mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div className="flex-grow-1 p-5 overflow-auto" style={{ maxHeight: '100vh' }}>
        <Outlet  context={{onInvoiceClick: goToInovice}}/>
      </div>
    </div>
  );
}

export default ReceptionistPortal;
