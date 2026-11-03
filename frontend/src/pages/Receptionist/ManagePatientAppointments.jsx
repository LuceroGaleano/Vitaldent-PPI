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
  const [patient, setPatient] = useState(null);
  const [availableAppointments, setAvailableAppointments] = useState([])
  const [patientAppointments, setPatientAppointments] = useState([])
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);

  const handleChange = (e) =>{
      dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
      });
  };

  const findPatient = async (e) => {
   e.preventDefault()
    dispatch({type: 'LOADING', payload: true});
    try {
      const foundPatient = await getFetch(
        `http://localhost:8080/receptionist/patient/${state.document}`,
        auth.user
      );



      setPatient(foundPatient);
      dispatch({type: 'LOADING', payload: false});

      await loadAvailableAppointments();
      await loadPatientAppointments(foundPatient.document);
    } catch(error) {
      dispatch({type: 'ERROR', payload: error.message});
    }
  };

  const loadAvailableAppointments = async() =>{
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/appointment`,
          auth.user
        );

        dispatch({type: 'LOADING', payload: false});
        const mappedAppointments = data
          .filter((appointment) => appointment.appointmentStatus === 'AVAILABLE')
          .map((appointment) => ({
            id: appointment.appointmentId,
            patient: appointment.patientName ?? 'Sin paciente',
            doctor: appointment.doctorName,
            date: appointment.date + " - " + appointment.hour,
            status: appointment.appointmentStatus
          }));


        setAvailableAppointments(mappedAppointments);
      } catch(error) {
        dispatch({type: 'ERROR', payload: error.message});
      }
    };

    const loadPatientAppointments = async(document) => {
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/appointment/patient/${document}`,
          auth.user
        );

        dispatch({type: 'LOADING', payload: false});
        const mappedPatientAppointments = data
          .filter((appointment) => appointment.appointmentStatus === 'SCHEDULED')
          .map((appointment) => ({
            id: appointment.appointmentId,
            patient: appointment.patientName ?? 'Sin paciente',
            doctor: appointment.doctorName,
            date: appointment.date + " - " + appointment.hour,
            status: appointment.appointmentStatus
          }));


        setPatientAppointments(mappedPatientAppointments)
      } catch(error) {
        dispatch({type: 'ERROR', payload: error.message});
      }
    }

    const scheduleAppointment = async (id, document) => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            await patchFetch(
            `http://localhost:8080/receptionist/appointment/${id}/${document}/schedule`,
            auth.user
            );

            setAvailableAppointments((currentAppointments) =>
              currentAppointments.filter((appointment) => appointment.id !== id)
            );
            await loadPatientAppointments(patient.document);
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    };

  const cancelAppointment = async (id, document) => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            await patchFetch(
            `http://localhost:8080/receptionist/appointment/${id}/cancel`,
            auth.user
            );

            setAvailableAppointments((currentAppointments) =>
              currentAppointments.filter((appointment) => appointment.id !== id)
            );
            await loadPatientAppointments(document);
            await loadAvailableAppointments();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
  };
  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '700px' }}>
      <h2 className="text-success mb-4">Gestión de Citas por Paciente</h2>

      <form onSubmit={findPatient} className="d-flex gap-2 mb-4">
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

      {patient && (
        <>
          <div className="alert alert-success mb-4">
            Paciente encontrado: <strong>{patient.fullName}</strong>
          </div>
          <div className="mt-3">
            <div className="row">
              <div className="col-12">
                <h5 className="text-success mb-3">Citas Disponibles</h5>
                {availableAppointments?.length > 0 ? (
                  <div className="row">
                    {availableAppointments.map(appointment => (
                      <div className="col-md-6 mb-3" key={appointment.id}>
                        <div className="card shadow-sm border-0">
                          <div className="card-body">
                            <h5 className="card-title text-primary">{appointment.patient}</h5>
                            <p className="card-text text-muted mb-1">Doctor: {appointment.doctor}</p>
                            <p className="card-text text-muted">{appointment.date}</p>
                            {appointment.status == 'AVAILABLE' ? (
                              <button className="btn btn-success" onClick={() => scheduleAppointment(appointment.id, patient.document)} >Agendar</button>
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
                {patientAppointments.length > 0 ? (
                  <div className="row">
                    {patientAppointments.map(appointment => (
                      <div className="col-md-6 mb-3" key={appointment.id}>
                        <div className="card shadow-sm border-0">
                          <div className="card-body">
                            <h5 className="card-title text-primary">{appointment.patient}</h5>
                            <p className="card-text text-muted mb-1">Doctor: {appointment.doctor}</p>
                            <p className="card-text text-muted">{appointment.date}</p>
                            <p className="card-text text-muted">{appointment.status}</p>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => cancelAppointment(appointment.id, patient.document)}
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
