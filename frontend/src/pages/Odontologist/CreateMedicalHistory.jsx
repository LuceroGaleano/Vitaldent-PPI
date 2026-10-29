import { useContext, useReducer } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import { TreatmentContext } from "../../context/TreatmentContext";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { postFetch } from "../../fetchs/PostFetch";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  reasonForConsultation: '',
  record: '',
  diagnostic: '',
  appointmentId: '',
  treatmentId: '',
  loading: false,
  error: null
};

function CreateMedicalHistory() {
  const{appointment} = useContext(AppointmentContext);
  const{treatment} = useContext(TreatmentContext);
  const{auth} = useContext(AuthContext);
  const[state, dispatch] = useReducer(apiFetchReduce, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:'LOADING', payload: true});
    try{
      await postFetch('http://localhost:8080/doctor/clinical_record',
        {
          reasonForConsultation: state.reason,
          record: state.record,
          diagnostic: state.diagnostic,
          appointmentId: appointment.id,
          treatmentId: treatment.id
        },
        auth.user
      )

      dispatch({type:'LOADING', payload: false});
      navigate('/odontologist/appointments');
    } catch(error){
        dispatch({type:'ERROR', payload: error})
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Historial Clínico</h2>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      )}
      
      {appointment ? (
        treatment ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Razon de la consulta</label>
              <input type="text" className="form-control" id="reason" name="reason" value={state.reason} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Nota clinical</label>
              <input type="text" className="form-control" id="record" name="record" value={state.record} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Diagnostico</label>
              <textarea className="form-control" rows="4" id="diagnostic" name="diagnostic" value={state.diagnostic} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-success">Guardar Historial</button>
          </form>
        ) : (
          <div className="alert alert-warning">
              Cita seleccionada con exito del paciente: {appointment.paciente}.<br/>
              Ahora selecciona un tratamiento desde "Ver Tratamientos".
          </div>
        )
      ) : (
        <div className="alert alert-warning">
          Por favor, selecciona una cita en la pestaña "Mis Citas" Para crear el historial.
        </div>
      )}
    </div>
  );
}

export default CreateMedicalHistory;
