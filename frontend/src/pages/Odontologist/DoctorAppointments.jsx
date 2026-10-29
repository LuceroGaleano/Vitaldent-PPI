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
  const [citas, setCitas] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);

  const agregarCita = useCallback(async() =>{
    dispatch({type: 'LOADING', payload: true});
    try{
      const data = await getFetch(
        `http://localhost:8080/doctor/appointment/doctor/${auth.document}`,
        auth.user
      )
      
        dispatch({type: 'LOADING', payload: false})
        console.log(data)
        const citasDoctor = data.map((cita) => ({
          id: cita.appointmentId,
          paciente: cita.patientName ?? 'Sin paciente',
          documento: cita.patientDocument ?? 'Sin documento',
          fecha: cita.date + " - " + cita.hour,
          status: cita.appointmentStatus
        }));

        setCitas(citasDoctor)
    } catch(error){
      dispatch({type: 'ERROR', payload: error})
    } 
  }, [auth.document, auth.user]);

  useEffect(() => {
    agregarCita();
  }, [agregarCita]);

  return (
    <div>
      <h2 className="text-success mb-4">Mis Citas Agendadas</h2>
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error.message}
        </div>
      )}
      <div className="list-group">
        {citas.map(cita => (
          <div className="list-group-item p-3 shadow-sm mb-2 border-0 rounded" key={cita.id}>
            <h5 className="mb-1 text-primary">Paciente: {cita.paciente}</h5>
            <p className="mb-1 text-muted">Documento: {cita.documento}</p>
            <small className="fw-bold text-secondary">{cita.fecha}</small>
            <div className="mt-2">
              {cita.status === 'COMPLETED' ? (
                <p className="card-text text-muted mb-1" key={cita.id}>Cita atendida</p>
              ) :<button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => onAppointmentClick(cita)}
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
