import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import { formatDate, formatTime } from '../../utils/date';
import { SearchFilter } from '../../components/SearchFilter';
import useSearchFilter from '../../hooks/useSearchFilter';
import SelectFilter from '../../components/SelectFilter';
import useStatusFilter from '../../hooks/useStatusFilter';
import SuccessModal from '../../components/SuccessModal';
import useSuccessModal from '../../hooks/useSuccessModal';

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

const mapAppointments = (data) => data.map((item) => ({
  id: item.appointmentId,
  doctor: item.doctorName ?? 'No asignado',
  doctorDocument: item.doctorDocument ?? 'No disponible',
  date: item.date,
  hour: item.hour,
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
  const { successMessage, showSuccess, confirmSuccess } = useSuccessModal();
  const {
    filterValue: statusFilter,
    setFilterValue: setStatusFilter,
    filteredItems: appointmentsByStatus,
  } = useStatusFilter(myAppointments, 'status');
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredAppointments,
  } = useSearchFilter(appointmentsByStatus, ['doctor', 'doctorDocument']);

  const cancelAppointment = async (id) => {
    const result = await cancelRequest({
      url: `${API_URL}/patient/appointment/${id}/cancel`,
      method: 'PATCH',
    });
    if (result.success) {
      await reloadAppointments();
      showSuccess('Cita cancelada correctamente.');
    }
  };
  const shownError = error || cancelError;
  const getStatusClasses = (status) =>
    `${STATUS_STYLES[status] ?? 'bg-secondary text-secondary border-secondary'} bg-opacity-10 border border-opacity-25`;

  return (
    <div className="mx-auto" style={{ maxWidth: '1200px' }}>
      <SuccessModal message={successMessage} onConfirm={confirmSuccess} />
      <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 bg-white">
        <div className="row align-items-center g-3">
          <div className="col-md-3">
            <h2 className="text-success fw-bold mb-0">Mis Citas Agendadas</h2>
          </div>
          <div className="col-md-4">
            <SearchFilter
              value={searchTerm}
              onChange={setSearchTerm}
              label="Buscar doctor por nombre o documento..."
              loading={loading}
            />
          </div>
          <div className="col-md-3">
            <SelectFilter
              value={statusFilter}
              onChange={setStatusFilter}
              label="Filtrar por estado"
              loading={loading}
              options={[
                { value: '', label: 'Todos' },
                { value: 'SCHEDULED', label: 'Programada' },
                { value: 'COMPLETED', label: 'Completada' },
                { value: 'CLOSED', label: 'Cerrada' },
                { value: 'AVAILABLE', label: 'Disponible' },
              ]}
            />
          </div>
          <div className="col-md-2 text-md-end">
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
              Total: {filteredAppointments.length}
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
                      <h5 className="mb-1 text-dark fw-bold">{appointment.doctor}</h5>
                    </div>
                    <span className={`badge rounded-pill flex-shrink-0 ${getStatusClasses(appointment.status)}`}>
                      {STATUS_LABELS[appointment.status] ?? appointment.status}
                    </span>
                  </div>
                  <div className="rounded-3 bg-light p-3 mb-3">
                    <small className="d-block text-uppercase fw-bold text-muted mb-1" style={{ fontSize: '0.7rem' }}>
                      Documento del profesional
                    </small>
                    <span className="text-dark small">{appointment.doctorDocument}</span>
                  </div>
                  <div className="d-flex justify-content-between gap-2 border-top pt-3">
                    <p className="text-muted small mb-0">
                      <strong>Fecha</strong><br />{formatDate(appointment.date)}
                    </p>
                    <p className="text-muted small mb-0 text-end">
                      <strong>Hora</strong><br />{formatTime(appointment.hour)}
                    </p>
                  </div>

                  {appointment.status !== 'COMPLETED' && (
                    <button 
                      className="btn btn-outline-danger btn-sm w-100 rounded-3 mt-auto pt-2 fw-semibold py-2" 
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
          <h5 className="fw-bold text-dark">
            {myAppointments.length > 0 ? 'Sin resultados' : 'No tienes citas programadas'}
          </h5>
          <p className="text-muted small">
            {myAppointments.length > 0
              ? statusFilter && appointmentsByStatus.length === 0
                ? 'No tienes citas con el estado seleccionado.'
                : 'No hay citas de doctores que coincidan con la búsqueda.'
              : 'Ve a la pestaña de "Citas Disponibles" para agendar tu próxima visita.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;