import { API_URL } from '../../config';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import SelectFilter from '../../components/SelectFilter';
import useStatusFilter from '../../hooks/useStatusFilter';
import { formatDate, formatTime } from '../../utils/date';

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

const mapAppointments = (data) => data.map((appointment) => ({
  id: appointment.appointmentId,
  patient: appointment.patientName ?? 'Sin paciente',
  document: appointment.patientDocument ?? 'Sin documento',
  date: appointment.date,
  hour: appointment.hour,
  status: appointment.appointmentStatus,
}));

function DoctorAppointments() {
  const { auth } = useAuth();
  const navigate = useNavigate();
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
  const {
    filterValue: statusFilter,
    setFilterValue: setStatusFilter,
    filteredItems: filteredAppointments,
  } = useStatusFilter(appointments, 'status');
  const getStatusClasses = (status) =>
    `${STATUS_STYLES[status] ?? 'bg-secondary text-secondary border-secondary'} bg-opacity-10 border border-opacity-25`;

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 bg-white">
        <div className="row align-items-center g-3">
          <div className="col-md-6">
            <h2 className="text-success fw-bold mb-0">Mi Agenda de Citas</h2>
          </div>
          <div className="col-md-4">
            <SelectFilter
              value={statusFilter}
              onChange={setStatusFilter}
              label="Filtrar por estado"
              loading={loading}
              options={[
                { value: '', label: 'Todos' },
                { value: 'AVAILABLE', label: 'Disponible' },
                { value: 'SCHEDULED', label: 'Programada' },
                { value: 'CLOSED', label: 'Cerrada' },
                { value: 'COMPLETED', label: 'Completada' },
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
      ) : filteredAppointments.length > 0 ? (
        <div className="row g-4">
          {filteredAppointments.map(appointment => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                    <div>
                      <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.7rem' }}>Paciente</small>
                      <h5 className="card-title text-dark fw-bold mb-1">{appointment.patient}</h5>
                    </div>
                    <span className={`badge rounded-pill flex-shrink-0 ${getStatusClasses(appointment.status)}`}>
                      {STATUS_LABELS[appointment.status] ?? appointment.status}
                    </span>
                  </div>

                  <div className="rounded-3 bg-light p-3 mb-3">
                    <small className="d-block text-uppercase fw-bold text-muted mb-1" style={{ fontSize: '0.7rem' }}>
                      Documento del paciente
                    </small>
                    <span className="text-dark small">{appointment.document}</span>
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
                    {appointment.status === 'SCHEDULED' && (
                      <button 
                        className="btn btn-success btn-sm w-100 rounded-3 fw-semibold py-2 shadow-sm" 
                        onClick={() => navigate(`/odontologist/appointments/${appointment.id}/treatments`)}
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
          <h5 className="fw-bold text-dark">
            {appointments.length > 0 ? 'Sin resultados' : 'Agenda Libre'}
          </h5>
          <p className="text-muted small">
            {appointments.length > 0
              ? 'No tienes citas con el estado seleccionado.'
              : 'No tienes citas programadas en este momento.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;