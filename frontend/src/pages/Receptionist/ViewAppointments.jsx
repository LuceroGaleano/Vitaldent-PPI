import { useContext, useEffect, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';
import { patchFetch } from '../../fetchs/PatchFetch';

const initialState = {
  loading: true,
  error: null,
  document: ''
}
function ViewAppointments() {

    const[appointments, setAppointments] = useState([]);
    const [state, dispatch] = useReducer(apiFetchReduce, initialState);
    const {auth} = useContext(AuthContext);

    const closeAppointment = async (id) => {
        dispatch({ type: 'LOADING', payload: true });

        try {
            await patchFetch(
            `http://localhost:8080/receptionist/appointment/${id}/close`,
            auth.user
            );

            window.location.reload();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }

  
    const loadAppointments = async () => {
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/appointment`,
          auth.user
        );

        dispatch({type: 'LOADING', payload: false});
        const mappedAppointments = data.map((appointment) => ({
          id: appointment.appointmentId,
          patient: appointment.patientName ?? 'Sin paciente',
          doctor: appointment.doctorName,
          date: appointment.date + " - " + appointment.hour,
          status: appointment.appointmentStatus
        }));

        setAppointments(mappedAppointments);
      } catch(error) {
        dispatch({type: 'ERROR', payload: error.message});
      }
    };

     useEffect(() => {
       loadAppointments();
     }, []);

  return (
    <div>
      <h2 className="text-success mb-4">Citas</h2>
          {state.error && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              {state.error}
            </div>
          )}
      <div className="row">
        {appointments.map(appointment => (
          <div className="col-md-6 mb-3" key={appointment.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{appointment.patient}</h5>
                <p className="card-text text-muted mb-1">Doctor: {appointment.doctor}</p>
                <p className="card-text text-muted">{appointment.date}</p>
                <p className="card-text text-muted">{appointment.status}</p>
                {appointment.status == 'AVAILABLE' ? (
                  <button className="btn btn-outline-danger btn-sm" onClick={() => closeAppointment(appointment.id)}>Cancelar</button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAppointments;
