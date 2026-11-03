import React, { useState, useEffect, useReducer, useContext } from 'react'
import { getFetch } from '../../fetchs/GetFetch';
import { AuthContext } from '../../context/AuthContext';
import { patchFetch } from '../../fetchs/PatchFetch';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';


const initialState = {
  loading: false,
  error: null
};


export function AvailableAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);

  const loadAvailableAppointments = async () => {
    dispatch({ type: 'LOADING', payload: true });

    try {
      const data = await getFetch(
        'http://localhost:8080/patient/appointment/available',
        auth.user
      );

      dispatch({ type: 'LOADING', payload: false });

      const mappedAppointments = data.map((item) => ({
        id: item.appointmentId,
        doctor: item.doctorName,
        date: item.date + " " + item.hour
      }));

      setAppointments(mappedAppointments);
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  };

  useEffect(() => {
    loadAvailableAppointments();
  }, []);

    const scheduleAppointment = async (id) => {
        dispatch({ type: 'LOADING', payload: true });

        try {
            await patchFetch(
            `http://localhost:8080/patient/appointment/${id}/schedule`,
            auth.user
            );

            setAppointments((currentAppointments) =>
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
      <h2 className="text-success mb-4">Citas Disponibles</h2>
      <div className="row">
          {state.error && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              {state.error}
            </div>
          )}
        {appointments.map(appointment => (
          <div className="col-md-6 mb-3" key={appointment.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{appointment.doctor}</h5>
                <p className="card-text text-muted">{appointment.date}</p>
                <button className="btn btn-success" onClick={() => scheduleAppointment(appointment.id)}>Agendar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableAppointments;