import { useContext, useReducer } from "react";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { postFetch } from "../../fetchs/PostFetch";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  date: '',
  hour: '',
  doctorDocument: '',
  loading: false,
  error: null
};
function CreateAppointment() {
  const[state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:'LOADING', payload: true});
    try{
      const [date, time] = state.dateAndHour.split('T');
      const data = await postFetch('http://localhost:8080/receptionist/appointment',
        {
          date: date,
          hour: time,
          doctorDocument: state.doctorDocument
        },
        auth.user
      )

      dispatch({type:'LOADING', payload: false});
      navigate('/receptionist/viewAppointments');
    } catch(error){
        dispatch({type:'ERROR', payload: error})
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="doctorDocument">Documento del Doctor</label>
          <input type="text" className="form-control" id="doctorDocument" name="doctorDocument" value={state.doctorDocument} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Fecha y Hora</label>
          <input type="datetime-local" className="form-control" id="dateAndHour" name="dateAndHour" value={state.dateAndHour} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Crear Cita</button>
      </form>
    </div>
  );
}

export default CreateAppointment;
