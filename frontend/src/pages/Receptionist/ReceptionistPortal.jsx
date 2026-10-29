import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CreateAppointment from './CreateAppointment';
import ViewAppointments from './ViewAppointments';
import CreatePatient from './CreatePatient';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import ViewMedicalHistory from './ViewMedicalHistory';
import CreatePayment from './CreatePayment';
import ViewPayments from './ViewPayments';
import ManagePatientAppointments from './ManagePatientAppointments';

function ReceptionistPortal() {
  const [activeView, setActiveView] = useState('crearCita');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  const navItems = [
    { id: 'crearCita', label: 'Crear Cita' },
    { id: 'verCitas', label: 'Ver Citas' },
    { id: 'crearPaciente', label: 'Crear Paciente' },
    { id: 'crearUsuario', label: 'Crear Usuario' },
    { id: 'eliminarUsuario', label: 'Eliminar Usuario' },
    { id: 'verHistorial', label: 'Ver Historial' },
    { id: 'crearPago', label: 'Crear Pago' },
    { id: 'verPagos', label: 'Ver Pagos' },
    { id: 'gestionarCitasPaciente', label: 'Gestionar Citas Paciente' }
  ];

  const views = {
    crearCita: <CreateAppointment />,
    verCitas: <ViewAppointments />,
    crearPaciente: <CreatePatient />,
    crearUsuario: <CreateUser />,
    eliminarUsuario: <DeleteUser />,
    verHistorial: <ViewMedicalHistory />,
    crearPago: <CreatePayment />,
    verPagos: <ViewPayments />,
    gestionarCitasPaciente: <ManagePatientAppointments />
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <div className="bg-success text-white p-3 d-flex flex-column" style={{ width: '260px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Recepcionista</p>

        <ul className="nav flex-column gap-2 mb-auto overflow-auto">
          {navItems.map(item => (
            <li className="nav-item" key={item.id}>
              <button
                className={`btn w-100 text-start ${activeView === item.id ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
                onClick={() => setActiveView(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div className="flex-grow-1 p-5 overflow-auto" style={{ maxHeight: '100vh' }}>
        {views[activeView]}
      </div>
    </div>
  );
}

export default ReceptionistPortal;
