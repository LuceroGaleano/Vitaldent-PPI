import { useContext, useReducer } from "react";
import { API_URL } from "../../config";
import { AppointmentContext } from "../../context/AppointmentContext";
import { TreatmentContext } from "../../context/TreatmentContext";
import { apiFetchReducer } from "../../reduces/ApiFetchReducer";
import useApiRequest from "../../customHooks/useApiRequest";
import { useNavigate } from "react-router-dom";

const initialState = {
  reasonForConsultation: '',
  record: '',
  diagnostic: '',
  appointmentId: '',
  treatmentId: '',
};

function CreateMedicalHistory() {
  const { appointment } = useContext(AppointmentContext);
  const { treatment } = useContext(TreatmentContext);
  const [state, dispatch] = useReducer(apiFetchReducer, initialState);
  const { execute: createClinicalRecord, loading, error } = useApiRequest();
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: 'OK', payload: { field: e.target.name, value: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createClinicalRecord({
      url: `${API_URL}/doctor/clinical_record`,
      method: 'POST',
      body: {
        reasonForConsultation: state.reasonForConsultation,
        record: state.record,
        diagnostic: state.diagnostic,
        appointmentId: appointment.id,
        treatmentId: treatment.id,
      },
    });
    if (result.success) {
      navigate('/odontologist/appointments');
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Registrar Historial Clínico</h2>

      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}
      
      {!appointment ? (
        <div className="card shadow-lg border-0 rounded-4 p-5 text-center">
          <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
            <span className="fs-1 opacity-50">📅</span>
          </div>
          <h4 className="text-secondary fw-bold mb-2">Ninguna cita seleccionada</h4>
          <p className="text-muted mb-4">Para crear un historial clínico, primero debes seleccionar al paciente desde tu agenda de citas.</p>
          <div>
            <button className="btn btn-primary rounded-3 px-4" onClick={() => navigate('/odontologist/appointments')}>
              Ir a Mis Citas
            </button>
          </div>
        </div>
      ) : !treatment ? (
        <div className="card shadow-lg border-0 rounded-4 p-5 text-center">
          <div className="alert alert-success border-0 bg-success bg-opacity-10 text-success fw-bold p-3 rounded-3 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            ✅ Paciente Seleccionado: {appointment.patient}
          </div>
          <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
            <span className="fs-1 opacity-50">💉</span>
          </div>
          <h4 className="text-secondary fw-bold mb-2">Tratamiento pendiente</h4>
          <p className="text-muted mb-4">Ahora debes seleccionar el procedimiento o tratamiento que se le aplicará al paciente.</p>
          <div>
            <button className="btn btn-primary rounded-3 px-4" onClick={() => navigate('/odontologist/viewTreatments')}>
              Ir a Tratamientos
            </button>
          </div>
        </div>
      ) : (
        <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 bg-white">
          <div className="d-flex flex-wrap gap-2 mb-4 pb-3 border-bottom">
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
              👤 Paciente: {appointment.patient}
            </span>
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
              🩺 Tratamiento: {treatment.name}
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="reasonForConsultation" name="reasonForConsultation" value={state.reasonForConsultation} onChange={handleChange} placeholder="Razón" disabled={loading} required />
              <label htmlFor="reasonForConsultation" className="text-secondary small">Razón de la consulta</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="record" name="record" value={state.record} onChange={handleChange} placeholder="Nota" disabled={loading} required />
              <label htmlFor="record" className="text-secondary small">Nota clínica (Evolución)</label>
            </div>
            <div className="form-floating mb-4">
              <textarea className="form-control rounded-3 border-light-subtle bg-light shadow-none" placeholder="Diagnóstico" id="diagnostic" name="diagnostic" value={state.diagnostic} onChange={handleChange} style={{ height: '120px' }} disabled={loading} required></textarea>
              <label htmlFor="diagnostic" className="text-secondary small">Diagnóstico Médico</label>
            </div>
            
            <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Guardando...</> : 'Guardar Historial Clínico'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateMedicalHistory;