import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import { formatDate, formatTime } from '../../utils/date';
import { SearchFilter } from '../../components/SearchFilter';
import useSearchFilter from '../../hooks/useSearchFilter';
import SuccessModal from '../../components/SuccessModal';
import useSuccessModal from '../../hooks/useSuccessModal';

const mapAppointments = (data) => data.map((item) => ({
  id: item.appointmentId,
  doctor: item.doctorName ?? 'No asignado',
  doctorDocument: item.doctorDocument ?? 'No disponible',
  date: item.date,
  hour: item.hour,
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
  const { successMessage, showSuccess, confirmSuccess } = useSuccessModal();
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredAppointments,
  } = useSearchFilter(appointments, ['doctor', 'doctorDocument']);

  const scheduleAppointment = async (id) => {
    const result = await scheduleRequest({
      url: `${API_URL}/patient/appointment/${id}/schedule`,
      method: 'PATCH',
    });
    if (result.success) {
      await reloadAppointments();
      showSuccess('Cita agendada correctamente.');
    }
  };
  const shownError = error || scheduleError;

  return (
    <div className="mx-auto" style={{ maxWidth: '1200px' }}>
      <SuccessModal message={successMessage} onConfirm={confirmSuccess} />
      <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 bg-white">
        <div className="row align-items-center g-3">
          <div className="col-md-5">
            <h2 className="text-success fw-bold mb-0">Citas Disponibles</h2>
          </div>
          <div className="col-md-5">
            <SearchFilter
              value={searchTerm}
              onChange={setSearchTerm}
              label="Buscar nombre o documento del doctor..."
              loading={loading}
            />
          </div>
          <div className="col-md-2 text-md-end">
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
              {filteredAppointments.length} disponibles
            </span>
          </div>
        </div>
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
      ) : filteredAppointments.length > 0 ? (
        <div className="row g-4">
          {filteredAppointments.map(appointment => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                    <div>
                      <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.7rem' }}>Profesional</small>
                      <h5 className="card-title text-dark fw-bold mb-1">{appointment.doctor}</h5>
                    </div>
                    <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill flex-shrink-0">
                      Disponible
                    </span>
                  </div>
                  <div className="rounded-3 bg-light p-3 mb-3">
                    <small className="d-block text-uppercase fw-bold text-muted mb-1" style={{ fontSize: '0.7rem' }}>
                      Documento del profesional
                    </small>
                    <span className="text-dark small">{appointment.doctorDocument}</span>
                  </div>
                  <div className="d-flex justify-content-between gap-2 border-top pt-3 mb-3">
                    <p className="text-muted small mb-0">
                      <strong>Fecha</strong><br />{formatDate(appointment.date)}
                    </p>
                    <p className="text-muted small mb-0 text-end">
                      <strong>Hora</strong><br />{formatTime(appointment.hour)}
                    </p>
                  </div>
                  <div className="mt-auto">
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
          <h5 className="fw-bold text-dark">
            {appointments.length > 0 ? 'Sin resultados' : 'No hay citas disponibles'}
          </h5>
          <p className="text-muted small">
            {appointments.length > 0
              ? 'No hay citas de doctores que coincidan con la búsqueda.'
              : 'Por el momento no contamos con horarios abiertos. Por favor, intenta de nuevo más tarde.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default AvailableAppointments;