import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const mapTreatments = (data) => data.map((treat) => ({
  id: treat.treatmentId,
  name: treat.name,
  cost: treat.cost,
  description: treat.description,
  items: treat.treatmentItems,
}));

const mapAppointments = (data) => data.map((appointment) => ({
  id: appointment.appointmentId,
  patient: appointment.patientName ?? 'Sin paciente',
}));

function ViewTreatments() {
  const { appointmentId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const {
    data: appointmentData,
    loading: loadingAppointment,
    error: appointmentError,
  } = useFetch({
    autoExecute: Boolean(appointmentId),
    url: appointmentId ? `${API_URL}/doctor/appointment/doctor/${auth.document}` : undefined,
    method: 'GET',
    mapper: mapAppointments,
  });
  const appointment = appointmentData?.find((record) => record.id === appointmentId);
  const {
    data: treatmentData,
    loading,
    error,
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/doctor/treatment`,
    method: 'GET',
    mapper: mapTreatments,
  });
  const treatments = treatmentData ?? [];

  return (
    <div className="mx-auto" style={{ maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold mb-0">Catálogo de Tratamientos</h2>
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
          Total: {treatments.length}
        </span>
      </div>

      {appointment && (
        <div className="alert alert-info border-info border-opacity-25 bg-info bg-opacity-10 text-center rounded-4 p-3 mb-4 shadow-sm fw-semibold">
          💡 Estás creando el historial para {appointment.patient}. Selecciona el tratamiento a aplicar.
        </div>
      )}

      {(appointmentError || error) && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {appointmentError || error}
        </div>
      )}

      {appointmentId && !loadingAppointment && !appointmentError && !appointment ? (
        <div className="card shadow-sm border-0 rounded-4 p-5 text-center bg-white">
          <h4 className="text-secondary fw-bold mb-2">Cita no encontrada</h4>
          <p className="text-muted mb-4">No se encontró la cita seleccionada en tu agenda.</p>
          <button className="btn btn-primary rounded-3 px-4 mx-auto" onClick={() => navigate('/odontologist/appointments')}>
            Ir a Mis Citas
          </button>
        </div>
      ) : loadingAppointment || loading || (treatmentData === null && !error) ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
          <p className="text-muted mt-2 small">Cargando tratamientos...</p>
        </div>
      ) : (
        <div className="row g-4">
          {treatments.map(treatmentRecord => (
            <div className="col-md-6 col-lg-4" key={treatmentRecord.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title text-dark fw-bold mb-0 pe-2">{treatmentRecord.name}</h5>
                    <span className="badge bg-light text-success border border-success border-opacity-50 px-2 py-1 rounded">
                      ${Number(treatmentRecord.cost).toLocaleString('es-CO')}
                    </span>
                  </div>
                  
                  <p className="card-text text-muted small mb-3" style={{ minHeight: '40px' }}>
                    {treatmentRecord.description}
                  </p>
                  
                  <div className="mb-4 bg-light p-3 rounded-3 flex-grow-1">
                    <small className="text-uppercase fw-bold text-secondary mb-2 d-block" style={{fontSize: '0.7rem'}}>Insumos requeridos:</small>
                    <div className="d-flex flex-wrap gap-1">
                      {treatmentRecord.items.map((item) =>(
                        <span className="badge bg-white text-muted border fw-normal" key={item.itemId}>{item.itemName}</span>
                      ))}
                    </div>
                  </div>

                  {appointment && (
                    <div className="mt-auto">
                      <button 
                        className="btn btn-success btn-sm w-100 rounded-3 fw-semibold py-2 shadow-sm" 
                        onClick={() => navigate(`/odontologist/appointments/${appointmentId}/treatments/${treatmentRecord.id}/clinical-record`)}
                      >
                        Vincular al Historial
                      </button>
                    </div>
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

export default ViewTreatments;