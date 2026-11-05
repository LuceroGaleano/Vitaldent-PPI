import useApiRequest from '../../customHooks/useApiRequest';

const STATUS_LABELS = {
  AVAILABLE: 'Disponible',
  SCHEDULED: 'Programada',
  CLOSED: 'Cerrada',
  COMPLETED: 'Completada',
};

const STATUS_STYLES = {
  AVAILABLE: 'bg-success text-success border-success',
  SCHEDULED: 'bg-primary text-primary border-primary',
  CLOSED: 'bg-danger text-danger border-danger',
  COMPLETED: 'bg-warning text-warning border-warning',
};

const translateStatus = (status) => STATUS_LABELS[status] ?? status;

const getStatusClasses = (status) =>
  `${STATUS_STYLES[status] ?? 'bg-secondary text-secondary border-secondary'} bg-opacity-10 border border-opacity-25`;

//El mapeo de las citas
const mapAppointments = (data) =>
  data.map((appointment) => ({
    id: appointment.appointmentId,
    patient: appointment.patientName ?? 'Sin paciente',
    doctor: appointment.doctorName,
    date: appointment.date,
    hour: appointment.hour,
    status: appointment.appointmentStatus,
  }));

function ViewAppointments() {
  const {
    execute: reloadAppointments,
    data: appointmentData,
    loading: loadingAppointments,
    error,
  } = useApiRequest({
    autoExecute: true,
    url: 'http://localhost:8080/receptionist/appointment',
    method: 'GET',
    mapper: mapAppointments,
  });
  
  const {
    execute: closeAppointmentRequest,
    loading: closing,
    error: actionError,
  } = useApiRequest();
  const appointments = appointmentData ?? [];

  //Si selecciona cancelar, ejecutamos la petición y recargamos las citas.
  const closeAppointment = async (id) => {
    const result = await closeAppointmentRequest({
        url: `http://localhost:8080/receptionist/appointment/${id}/close`,
        method: 'PATCH',
      });

    if (result.success) {
      await reloadAppointments();
    }
  };
  const shownError = error || actionError;

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold mb-0">Listado General de Citas</h2>
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
          Total: {appointments.length}
        </span>
      </div>

      {shownError && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {shownError}
        </div>
      )}

      {loadingAppointments || (appointmentData === null && !error) ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
          <p className="text-muted mt-2 small">Cargando citas...</p>
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-center text-muted py-5">No hay citas para mostrar.</p>
      ) : (
        <div className="row g-4">
          {appointments.map((appointment) => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.7rem' }}>Paciente</small>
                      <h5 className="card-title text-dark fw-bold mb-0">{appointment.patient}</h5>
                    </div>
                    <span className={`badge rounded-pill ${getStatusClasses(appointment.status)}`}>
                      {translateStatus(appointment.status)}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="card-text text-muted mb-1 small">👨‍⚕️ <strong>Doctor:</strong> {appointment.doctor}</p>
                    <p className="card-text text-muted mb-1 small">📅 <strong>Fecha:</strong> {appointment.date}</p>
                    <p className="card-text text-muted small">🕛 <strong>Hora:</strong> {appointment.hour}</p>
                  </div>

                  {appointment.status === 'AVAILABLE' && (
                    <button
                      className="btn btn-outline-danger btn-sm w-100 rounded-3 fw-semibold"
                      onClick={() => closeAppointment(appointment.id)}
                      disabled={closing}
                    >
                      {closing ? 'Cancelando...' : 'Cancelar Cita'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAppointments;