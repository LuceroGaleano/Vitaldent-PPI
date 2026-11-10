import { API_URL } from '../../config';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { useOutletContext } from 'react-router-dom';

const mapAppointments = (data) => data.map((appointment) => ({
  id: appointment.appointmentId,
  patient: appointment.patientName ?? 'Sin paciente',
  document: appointment.patientDocument ?? 'Sin documento',
  date: `${appointment.date} - ${appointment.hour}`,
  status: appointment.appointmentStatus,
}));

function DoctorAppointments() {
  const { onAppointmentClick } = useOutletContext();
  const { auth } = useAuth();
  const {
    data: appointmentData,
    loading,
    error,
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/doctor/appointment/doctor/${auth.document}`,
    method: 'GET',
    mapper: mapAppointments,
  });
  const appointments = appointmentData ?? [];

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold mb-0">Mi Agenda de Citas</h2>
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
          Total: {appointments.length}
        </span>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}

      {(loading || (appointmentData === null && !error)) ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
          <p className="text-muted mt-2 small">Cargando agenda...</p>
        </div>
      ) : appointments.length > 0 ? (
        <div className="row g-4">
          {appointments.map(appointment => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="text-uppercase fw-bold text-muted" style={{fontSize: '0.7rem'}}>Paciente</small>
                      <h5 className="card-title text-dark fw-bold mb-0">{appointment.patient}</h5>
                    </div>
                    {appointment.status === 'COMPLETED' ? (
                      <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 rounded-pill">Atendida</span>
                    ) : (
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill">Programada</span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <p className="card-text text-muted mb-1 small">🪪 <strong>Doc:</strong> {appointment.document}</p>
                    <p className="card-text text-muted small">📅 <strong>Fecha:</strong> {appointment.date}</p>
                  </div>

                  <div className="mt-auto">
                    {appointment.status !== 'COMPLETED' && (
                      <button 
                        className="btn btn-success btn-sm w-100 rounded-3 fw-semibold py-2 shadow-sm" 
                        onClick={() => onAppointmentClick(appointment)}
                      >
                        Iniciar Consulta (Crear Historial)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <span className="fs-1 opacity-50 mb-3 d-block">☕</span>
          <h5 className="fw-bold text-dark">Agenda Libre</h5>
          <p className="text-muted small">No tienes citas programadas en este momento.</p>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;