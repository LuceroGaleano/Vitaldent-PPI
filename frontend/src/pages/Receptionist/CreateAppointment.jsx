import { useReducer } from "react";
import { apiFetchReducer } from "../../reduces/ApiFetchReducer";
import useApiRequest from "../../customHooks/useApiRequest";
import { useNavigate } from "react-router-dom";

const initialState = {
  dateAndHour: '',
  doctorDocument: '',
};

function CreateAppointment() {
  const [state, dispatch] = useReducer(apiFetchReducer, initialState);
  const { execute: createAppointment, loading, error } = useApiRequest();
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [date, time] = state.dateAndHour.split('T');
    const result = await createAppointment({
      url: 'http://localhost:8080/receptionist/appointment',
      method: 'POST',
      body: {
        date,
        hour: time,
        doctorDocument: state.doctorDocument,
      },
    });
    if (result.success) {
      navigate('/receptionist/viewAppointments');
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Agendar Nueva Cita</h2>
      
      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}
      
      
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input 
            type="text" 
            className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" 
            id="doctorDocument" 
            name="doctorDocument" 
            value={state.doctorDocument} 
            onChange={handleChange} 
            placeholder="Documento"
            disabled={loading}
            required 
          />
          <label htmlFor="doctorDocument" className="text-secondary small">Documento del Doctor</label>
        </div>

        <div className="form-floating mb-4">
          <input 
            type="datetime-local" 
            className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" 
            id="dateAndHour" 
            name="dateAndHour" 
            value={state.dateAndHour} 
            onChange={handleChange} 
            disabled={loading}
            required 
          />
          <label htmlFor="dateAndHour" className="text-secondary small">Fecha y Hora</label>
        </div>

        <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading}>
          {loading ? (
            <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Procesando...</>
          ) : 'Crear Cita'}
        </button>
      </form>
    </div>
  );
}

export default CreateAppointment;