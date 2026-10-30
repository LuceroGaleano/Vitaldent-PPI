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

    const[citas, setCitas] = useState([]);
    const [state, dispatch] = useReducer(apiFetchReduce, initialState);
    const {auth} = useContext(AuthContext);

    const cerrarCita = async (id) => {
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

  
    const agregarCitas = async () => {
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/appointment`,
          auth.user
        );

        dispatch({type: 'LOADING', payload: false});
        const citasResultado = data.map((cita) => ({
          id: cita.appointmentId,
          paciente: cita.patientName ?? 'Sin paciente',
          doctor: cita.doctorName,
          fecha: cita.date + " - " + cita.hour,
          status: cita.appointmentStatus
        }));

        setCitas(citasResultado);
      } catch(error) {
        dispatch({type: 'ERROR', payload: error.message});
      }
    };

     useEffect(() => {
       agregarCitas();
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
        {citas.map(cita => (
          <div className="col-md-6 mb-3" key={cita.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{cita.paciente}</h5>
                <p className="card-text text-muted mb-1">Doctor: {cita.doctor}</p>
                <p className="card-text text-muted">{cita.fecha}</p>
                <p className="card-text text-muted">{cita.status}</p>
                {cita.status == 'AVAILABLE' ? (
                  <button className="btn btn-outline-danger btn-sm" onClick={() => cerrarCita(cita.id)}>Cancelar</button>
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
