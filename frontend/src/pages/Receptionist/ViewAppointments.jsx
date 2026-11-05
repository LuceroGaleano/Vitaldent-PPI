import { useContext, useEffect, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';
import { patchFetch } from '../../fetchs/PatchFetch';

const initialState = { loading: true, error: null, document: '' };

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const { auth } = useContext(AuthContext);

  const closeAppointment = async (id) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      await patchFetch(`http://localhost:8080/receptionist/appointment/${id}/close`, auth.user);
      window.location.reload();
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'LOADING', payload: false });
    }
  };

  const loadAppointments = async () => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const data = await getFetch(`http://localhost:8080/receptionist/appointment`, auth.user);
      dispatch({ type: 'LOADING', payload: false });
      const mappedAppointments = data.map((appointment) => ({
        id: appointment.appointmentId,
        patient: appointment.patientName ?? 'Sin paciente',
        doctor: appointment.doctorName,
        date: appointment.date + " - " + appointment.hour,
        status: appointment.appointmentStatus
      }));
      setAppointments(mappedAppointments);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold mb-0">Listado General de Citas</h2>
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill shadow-sm">
          Total: {appointments.length}
        </span>
      </div>
      
      {state.error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {state.error}
        </div>
      )}

      {state.loading && appointments.length === 0 ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
          <p className="text-muted mt-2 small">Cargando citas...</p>
        </div>
      ) : (
        <div className="row g-4">
          {appointments.map(appointment => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="text-uppercase fw-bold text-muted" style={{fontSize: '0.7rem'}}>Paciente</small>
                      <h5 className="card-title text-dark fw-bold mb-0">{appointment.patient}</h5>
                    </div>
                    <span className={`badge rounded-pill ${appointment.status === 'AVAILABLE' ? 'bg-success bg-opacity-10 text-success border border-success' : 'bg-secondary bg-opacity-10 text-secondary border border-secondary'} border-opacity-25`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="card-text text-muted mb-1 small">👨‍⚕️ <strong>Doctor:</strong> {appointment.doctor}</p>
                    <p className="card-text text-muted small">📅 <strong>Fecha:</strong> {appointment.date}</p>
                  </div>

                  {appointment.status === 'AVAILABLE' && (
                    <button 
                      className="btn btn-outline-danger btn-sm w-100 rounded-3 fw-semibold" 
                      onClick={() => closeAppointment(appointment.id)}
                      disabled={state.loading}
                    >
                      {state.loading ? 'Cancelando...' : 'Cancelar Cita'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAppointments;