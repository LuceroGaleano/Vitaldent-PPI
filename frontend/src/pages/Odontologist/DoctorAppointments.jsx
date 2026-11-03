import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';
import { useOutletContext } from 'react-router-dom';

const initialState = {
  loading: false,
  error: null
}
function DoctorAppointments() {

  const { onAppointmentClick } = useOutletContext();
  const [appointments, setAppointments] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);

  const loadAppointments = useCallback(async() =>{
    dispatch({type: 'LOADING', payload: true});
    try{
      const data = await getFetch(
        `http://localhost:8080/doctor/appointment/doctor/${auth.document}`,
        auth.user
      )
      
        dispatch({type: 'LOADING', payload: false})
        console.log(data)
        const mappedAppointments = data.map((appointment) => ({
          id: appointment.appointmentId,
          patient: appointment.patientName ?? 'Sin paciente',
          document: appointment.patientDocument ?? 'Sin documento',
          date: appointment.date + " - " + appointment.hour,
          status: appointment.appointmentStatus
        }));

        setAppointments(mappedAppointments)
    } catch(error){
      dispatch({type: 'ERROR', payload: error.message})
    } 
  }, [auth.document, auth.user]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return (
    <div>
      <h2 className="text-success mb-4">Mis Citas Agendadas</h2>
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}
      <div className="list-group">
        {appointments.map(appointment => (
          <div className="list-group-item p-3 shadow-sm mb-2 border-0 rounded" key={appointment.id}>
            <h5 className="mb-1 text-primary">Paciente: {appointment.patient}</h5>
            <p className="mb-1 text-muted">Documento: {appointment.document}</p>
            <small className="fw-bold text-secondary">{appointment.date}</small>
            <div className="mt-2">
              {appointment.status === 'COMPLETED' ? (
                <p className="card-text text-muted mb-1" key={appointment.id}>Cita atendida</p>
              ) :<button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => onAppointmentClick(appointment)}
                    >
                    Crear Historial
                  </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments;
