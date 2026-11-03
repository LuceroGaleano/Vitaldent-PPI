import React, { useState, useEffect, useReducer, useContext } from 'react'
import { getFetch } from '../../fetchs/GetFetch';
import { AuthContext } from '../../context/AuthContext';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { patchFetch } from '../../fetchs/PatchFetch';


const initialState = {
  loanding: false,
  error: null
}

export function MyAppointments() {
  const [myAppointments, setMyAppointments] = useState([]);
    const { auth } = useContext(AuthContext);
    const [state, dispatch] = useReducer(apiFetchReduce, initialState);

  const loadMyAppointments = async() =>{
    dispatch({type: 'LOADING', payload:true})
    try{
      const data = await getFetch(
        'http://localhost:8080/patient/appointment',
        auth.user
      );
      dispatch({type: 'LOADING', payload: false})

      const mappedAppointments = data.map((item) => ({
        id: item.appointmentId,
        doctor: item.doctorName,
        date: item.date + " " + item.hour,
        status: item.appointmentStatus
      }));

      setMyAppointments(mappedAppointments);
    } catch (error){
      dispatch({
        type: 'ERROR',
        payload: error.message
      })
    }
  }
  
  useEffect(() => {
    loadMyAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    dispatch({type: 'LOADING', payload:true})
    try{
      await patchFetch(
        `http://localhost:8080/patient/appointment/${id}/cancel`,
        auth.user
      )


     setMyAppointments((currentAppointments) =>
          currentAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'LOADING', payload: false });
    }
  };

  return (
    <div>
      <h2 className="text-success mb-4">Mis Citas Agendadas</h2>
      <div className="list-group">
          {state.error && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              {state.error}
            </div>
          )}
        {myAppointments.map(appointment => (
          <div className="list-group-item d-flex justify-content-between align-items-center p-3 shadow-sm mb-2 border-0 rounded" key={appointment.id}>
            <div>
              <h5 className="mb-1 text-primary">{appointment.doctor}</h5>
              <small className="text-muted">{appointment.date}</small>
            </div>
            {appointment.status === 'COMPLETED' ? (
               <p className="card-text text-muted">Cita Atendida</p>
            ):(
              <button className="btn btn-outline-danger" onClick={() => cancelAppointment(appointment.id)}>Cancelar</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;