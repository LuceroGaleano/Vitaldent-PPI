import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';

const mapAppointments = (data) => data.map((item) => ({
  id: item.appointmentId,
  doctor: item.doctorName,
  doctorDocument: item.doctorDocument,
  date: `${item.date} ${item.hour}`,
}));

export function AvailableAppointments() {
  const {
    execute: reloadAppointments,
    data: appointmentData,
    loading,
    error,
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/patient/appointment/available`,
    method: 'GET',
    mapper: mapAppointments,
  });
  const {
    execute: scheduleRequest,
    loading: scheduling,
    error: scheduleError,
  } = useFetch();
  const appointments = appointmentData ?? [];

  const scheduleAppointment = async (id) => {
    const result = await scheduleRequest({
      url: `${API_URL}/patient/appointment/${id}/schedule`,
      method: 'PATCH',
    });
    if (result.success) {
      await reloadAppointments();
    }
  };
  const shownError = error || scheduleError;

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold mb-0">Citas Disponibles</h2>
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
          {appointments.length} disponibles
        </span>
      </div>

      {shownError && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {shownError}
        </div>
      )}

      {(loading || (appointmentData === null && !error)) ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
          <p className="text-muted mt-2 small">Buscando horarios...</p>
        </div>
      ) : appointments.length > 0 ? (
        <div className="row g-4">
          {appointments.map(appointment => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="mb-3">
                    <small className="text-uppercase fw-bold text-muted" style={{fontSize: '0.7rem'}}>Profesional</small>
                    <h5 className="card-title text-dark fw-bold mb-2">{appointment.doctor}</h5>
                    <p className="card-text text-muted mb-0 small">📅 {appointment.date}</p>
                  </div>
                  <div className="mt-auto pt-3">
                    <button 
                      className="btn btn-success btn-sm w-100 rounded-3 fw-semibold py-2" 
                      onClick={() => scheduleAppointment(appointment.id)}
                      disabled={scheduling}
                    >
                      {scheduling ? 'Procesando...' : 'Agendar Cita'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <span className="fs-1 opacity-50 mb-3 d-block">🗓️</span>
          <h5 className="fw-bold text-dark">No hay citas disponibles</h5>
          <p className="text-muted small">Por el momento no contamos con horarios abiertos. Por favor, intenta de nuevo más tarde.</p>
        </div>
      )}
    </div>
  );
}

export default AvailableAppointments;