import { useContext, useReducer, useState } from 'react';
import { getFetch } from '../../fetchs/GetFetch';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { patchFetch } from '../../fetchs/PatchFetch';

const initialState = {
  loading: true,
  error: null,
  document: ''
}
function ManagePatientAppointments() {
  const [paciente, setPaciente] = useState(null);
  const [citasDisponibles, setCitasDisponibles] = useState([])
  const [citasPaciente, setCitasPaciente] = useState([])
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);

  const handleChange = (e) =>{
      dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
      });
  };

  const buscarPaciente = async (e) => {
   e.preventDefault()
    dispatch({type: 'LOADING', payload: true});
    try {
      const pacienteEncontrado = await getFetch(
        `http://localhost:8080/receptionist/patient/${state.document}`,
        auth.user
      );



      setPaciente(pacienteEncontrado);
      dispatch({type: 'LOADING', payload: false});

      await buscarCitasDisponibles();
      await buscarCitasPaciente(pacienteEncontrado.document);
    } catch(error) {
      dispatch({type: 'ERROR', payload: error.message});
    }
  };

  const buscarCitasDisponibles = async() =>{
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/appointment`,
          auth.user
        );

        dispatch({type: 'LOADING', payload: false});
        const citasResultado = data
          .filter((cita) => cita.appointmentStatus === 'AVAILABLE')
          .map((cita) => ({
            id: cita.appointmentId,
            paciente: cita.patientName ?? 'Sin paciente',
            doctor: cita.doctorName,
            fecha: cita.date + " - " + cita.hour,
            status: cita.appointmentStatus
          }));


        setCitasDisponibles(citasResultado);
      } catch(error) {
        dispatch({type: 'ERROR', payload: error.message});
      }
    };

    const buscarCitasPaciente = async(document) => {
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/appointment/patient/${document}`,
          auth.user
        );

        dispatch({type: 'LOADING', payload: false});
        const citasResultadoPaciente = data
          .filter((cita) => cita.appointmentStatus === 'SCHEDULED')
          .map((cita) => ({
            id: cita.appointmentId,
            paciente: cita.patientName ?? 'Sin paciente',
            doctor: cita.doctorName,
            fecha: cita.date + " - " + cita.hour,
            status: cita.appointmentStatus
          }));


        setCitasPaciente(citasResultadoPaciente)
      } catch(error) {
        dispatch({type: 'ERROR', payload: error.message});
      }
    }

    const handleAgendar = async (id, document) => {
        dispatch({ type: 'LOANDING', payload: true });
        try {
            await patchFetch(
            `http://localhost:8080/receptionist/appointment/${id}/${document}/schedule`,
            auth.user
            );

            setCitasDisponibles((citasDisponibles) =>
              citasDisponibles.filter((cita) => cita.id !== id)
            );
            await buscarCitasPaciente(paciente.document);
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'LOANDING', payload: false });
        }
    };

  const handleCancelar = async (id, document) => {
        dispatch({ type: 'LOANDING', payload: true });
        try {
            await patchFetch(
            `http://localhost:8080/receptionist/appointment/${id}/cancel`,
            auth.user
            );

            setCitasDisponibles((citasDisponibles) =>
              citasDisponibles.filter((cita) => cita.id !== id)
            );
            await buscarCitasPaciente(document);
            await buscarCitasDisponibles();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'LOANDING', payload: false });
        }
  };
  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '700px' }}>
      <h2 className="text-success mb-4">Gestión de Citas por Paciente</h2>

      <form onSubmit={buscarPaciente} className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Documento del paciente..."
          id="document" name="document" value={state.document} onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {state.error && (
        <div className="alert alert-danger py-2" role="alert">
          {state.error}
        </div>
      )}

      {paciente && (
        <>
          <div className="alert alert-success mb-4">
            Paciente encontrado: <strong>{paciente.fullName}</strong>
          </div>
          <div className="mt-3">
            <div className="row">
              <div className="col-12">
                <h5 className="text-success mb-3">Citas Disponibles</h5>
                {citasDisponibles?.length > 0 ? (
                  <div className="row">
                    {citasDisponibles.map(cita => (
                      <div className="col-md-6 mb-3" key={cita.id}>
                        <div className="card shadow-sm border-0">
                          <div className="card-body">
                            <h5 className="card-title text-primary">{cita.paciente}</h5>
                            <p className="card-text text-muted mb-1">Doctor: {cita.doctor}</p>
                            <p className="card-text text-muted">{cita.fecha}</p>
                            {cita.status == 'AVAILABLE' ? (
                              <button className="btn btn-success" onClick={() => handleAgendar(cita.id, paciente.document)} >Agendar</button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="small text-muted">No tiene citas agendadas.</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="row">
              <div className="col-12">
                <h5 className="text-success mb-3">Citas del Paciente</h5>
                {citasPaciente.length > 0 ? (
                  <div className="row">
                    {citasPaciente.map(cita => (
                      <div className="col-md-6 mb-3" key={cita.id}>
                        <div className="card shadow-sm border-0">
                          <div className="card-body">
                            <h5 className="card-title text-primary">{cita.paciente}</h5>
                            <p className="card-text text-muted mb-1">Doctor: {cita.doctor}</p>
                            <p className="card-text text-muted">{cita.fecha}</p>
                            <p className="card-text text-muted">{cita.status}</p>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleCancelar(cita.id, paciente.document)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="small text-muted">El paciente no tiene citas agendadas.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


export default ManagePatientAppointments;
