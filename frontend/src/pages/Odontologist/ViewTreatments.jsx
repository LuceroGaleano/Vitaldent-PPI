import { useContext } from 'react';
import { API_URL } from '../../config';
import useApiRequest from '../../customHooks/useApiRequest';
import { AppointmentContext } from '../../context/AppointmentContext';
import { useOutletContext } from 'react-router-dom';
import { TreatmentContext } from '../../context/TreatmentContext';

const mapTreatments = (data) => data.map((treat) => ({
  id: treat.treatmentId,
  name: treat.name,
  cost: treat.cost,
  description: treat.description,
  items: treat.treatmentItems,
}));

function ViewTreatments() {
  const { onTreatmentClick } = useOutletContext();
  const { appointment } = useContext(AppointmentContext);
  const { treatment } = useContext(TreatmentContext);
  const {
    data: treatmentData,
    loading,
    error,
  } = useApiRequest({
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

      {appointment && !treatment && (
        <div className="alert alert-info border-info border-opacity-25 bg-info bg-opacity-10 text-center rounded-4 p-3 mb-4 shadow-sm fw-semibold">
          💡 Estás creando el historial para {appointment.patient}. Selecciona el tratamiento a aplicar.
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}

      {loading || (treatmentData === null && !error) ? (
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

                  {appointment && !treatment && (
                    <div className="mt-auto">
                      <button 
                        className="btn btn-success btn-sm w-100 rounded-3 fw-semibold py-2 shadow-sm" 
                        onClick={() => onTreatmentClick(treatmentRecord)}
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