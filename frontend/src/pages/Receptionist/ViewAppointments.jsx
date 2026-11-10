import SelectFilter from '../../components/SelectFilter';
import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import useStatusFilter from '../../hooks/useStatusFilter';
import useDateSort from '../../hooks/useDateSort';

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

const formatDate = (date) => {
  const [year, month, day] = date.split('-').map(Number);
  const monthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(
    new Date(year, month - 1, 1)
  );

  return `${day}/${monthName}/${year}`;
};

const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
};

//El mapeo de las citas
const mapAppointments = (data) =>
  data.map((appointment) => ({
    id: appointment.appointmentId,
    patient: appointment.patientName ?? 'Sin paciente',
    patientDocument: appointment.patientDocument,
    doctor: appointment.doctorName,
    doctorDocument: appointment.doctorDocument,
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
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/receptionist/appointment`,
    method: 'GET',
    mapper: mapAppointments,
  });
  
  const {
    execute: closeAppointmentRequest,
    loading: closing,
    error: actionError,
  } = useFetch();
  const appointments = appointmentData ?? [];

  //Si selecciona cancelar, ejecutamos la petición y recargamos las citas.
  const closeAppointment = async (id) => {
    const result = await closeAppointmentRequest({
        url: `${API_URL}/receptionist/appointment/${id}/close`,
        method: 'PATCH',
      });

    if (result.success) {
      await reloadAppointments();
    }
  };
  const {
    filterValue: statusFilter,
    setFilterValue: setStatusFilter,
    filteredItems,
  } = useStatusFilter(appointments, 'status');
  const {
    sortOrder: dateOrder,
    setSortOrder: setDateOrder,
    sortedItems: sortedAppointments,
  } = useDateSort(filteredItems, 'date', 'hour');
  

  const shownError = error || actionError;

  return (
    <div className="mx-auto" style={{ maxWidth: '1200px' }}>
      {/* Encabezado y Buscador */}
      <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 bg-white">
        <div className="row align-items-center g-3">
          <div className="col-md-4">
            <h2 className="text-success fw-bold mb-0">Listado General de Citas</h2>
          </div>
          {/*Filtro de busqeuda*/}
          <div className="col-md-4">
            <SelectFilter
              value={statusFilter}
              onChange={setStatusFilter}
              label="Filtrar por estado"
              loading={loadingAppointments}
              options={[
                { value: '', label: 'Todos' },
                { value: 'AVAILABLE', label: 'Disponible' },
                { value: 'SCHEDULED', label: 'Programada' },
                { value: 'CLOSED', label: 'Cerrada' },
                { value: 'COMPLETED', label: 'Completada' },
              ]}
            />
          </div>
          <div className="col-md-4">
            <SelectFilter
              value={dateOrder}
              onChange={setDateOrder}
              label="Ordenar por fecha"
              loading={loadingAppointments}
              options={[
                { value: 'asc', label: 'Más antigua a más reciente' },
                { value: 'desc', label: 'Más reciente a más antigua' },
              ]}
            />
          </div>
        </div>
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
      ) : filteredItems.length === 0 ? (
        <p className="text-center text-muted py-5">No hay citas para mostrar.</p>
      ) : (
        <div className="row g-4">
          {sortedAppointments.map((appointment) => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                    <div>
                      <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.7rem' }}>Paciente</small>
                      <h5 className="card-title text-dark fw-bold mb-1">{appointment.patient}</h5>
                    </div>
                    <span className={`badge rounded-pill flex-shrink-0 ${getStatusClasses(appointment.status)}`}>
                      {translateStatus(appointment.status)}
                    </span>
                  </div>

                  <div className="rounded-3 bg-light p-3 mb-3">
                    <div className="mb-3">
                      <small className="d-block text-uppercase fw-bold text-muted mb-1" style={{ fontSize: '0.7rem' }}>
                        Documento del paciente
                      </small>
                      <span className="text-dark small">{appointment.patientDocument || 'No disponible'}</span>
                    </div>
                    <div>
                      <small className="d-block text-uppercase fw-bold text-muted mb-1" style={{ fontSize: '0.7rem' }}>
                        Doctor
                      </small>
                      <span className="d-block text-dark small fw-semibold">{appointment.doctor || 'No asignado'}</span>
                      <small className="text-muted">
                        Documento: {appointment.doctorDocument || 'No disponible'}
                      </small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between gap-2 border-top pt-3 mb-3">
                    <p className="text-muted small mb-0">
                      <strong>Fecha</strong><br />{formatDate(appointment.date)}
                    </p>
                    <p className="text-muted small mb-0 text-end">
                      <strong>Hora</strong><br />{formatTime(appointment.hour)}
                    </p>
                  </div>

                  {appointment.status === 'AVAILABLE' && (
                    <button
                      className="btn btn-outline-danger btn-sm w-100 rounded-3 fw-semibold mt-auto"
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