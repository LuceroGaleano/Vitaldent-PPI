import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';

const mapAppointments = (data) => data.map((item) => ({
  id: item.appointmentId,
  doctor: item.doctorName,
  date: `${item.date} ${item.hour}`,
  status: item.appointmentStatus,
}));

export function MyAppointments() {
  const {
    execute: reloadAppointments,
    data: appointmentData,
    loading,
    error,
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/patient/appointment`,
    method: 'GET',
    mapper: mapAppointments,
  });
  const {
    execute: cancelRequest,
    loading: cancelling,
    error: cancelError,
  } = useFetch();
  const myAppointments = appointmentData ?? [];

  const cancelAppointment = async (id) => {
    const result = await cancelRequest({
      url: `${API_URL}/patient/appointment/${id}/cancel`,
      method: 'PATCH',
    });
    if (result.success) {
      await reloadAppointments();
    }
  };
  const shownError = error || cancelError;

  return (
    <div className="mx-auto" style={{ maxWidth: '900px' }}>
      <h2 className="text-success fw-bold mb-4">Mis Citas Agendadas</h2>
      
      {shownError && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {shownError}
        </div>
      )}

      {(loading || (appointmentData === null && !error)) ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
        </div>
      ) : myAppointments.length > 0 ? (
        <div className="row g-4">
          {myAppointments.map(appointment => (
            <div className="col-md-6" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1 text-dark fw-bold">{appointment.doctor}</h5>
                      <small className="text-muted fw-semibold">📅 {appointment.date}</small>
                    </div>
                    {appointment.status === 'COMPLETED' ? (
                       <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-2">
                         Atendida
                       </span>
                    ) : (
                       <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-2">
                         Programada
                       </span>
                    )}
                  </div>
                  
                  {appointment.status !== 'COMPLETED' && (
                    <button 
                      className="btn btn-outline-danger btn-sm w-100 rounded-3 mt-3 fw-semibold py-2" 
                      onClick={() => cancelAppointment(appointment.id)}
                      disabled={cancelling}
                    >
                      {cancelling ? 'Cancelando...' : 'Cancelar Cita'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <span className="fs-1 opacity-50 mb-3 d-block">📂</span>
          <h5 className="fw-bold text-dark">No tienes citas programadas</h5>
          <p className="text-muted small">Ve a la pestaña de "Citas Disponibles" para agendar tu próxima visita.</p>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;