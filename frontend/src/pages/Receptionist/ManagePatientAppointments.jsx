import { useReducer, useState } from 'react';
import { API_URL } from '../../config';
import { apiFetchReducer } from '../../reduces/ApiFetchReducer';
import useApiRequest from '../../customHooks/useApiRequest';

const initialState = { document: '' };

function ManagePatientAppointments() {
  const [patient, setPatient] = useState(null);
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReducer, initialState);
  const { execute, loading, error } = useApiRequest();

  const handleChange = (e) => {
    dispatch({ type: 'OK', payload: { field: e.target.name, value: e.target.value } });
  };

  const findPatient = async (e) => {
    e.preventDefault();
    const result = await execute({
      url: `${API_URL}/receptionist/patient/${encodeURIComponent(state.document.trim())}`,
      method: 'GET',
    });
    if (result.success) {
      setPatient(result.data);
      await loadAvailableAppointments();
      await loadPatientAppointments(result.data.document);
    }
  };

  const loadAvailableAppointments = async () => {
    const result = await execute({
      url: `${API_URL}/receptionist/appointment`,
      method: 'GET',
      mapper: (data) => data
        .filter((appointment) => appointment.appointmentStatus === 'AVAILABLE')
        .map((appointment) => ({
          id: appointment.appointmentId,
          patient: appointment.patientName ?? 'Sin paciente',
          doctor: appointment.doctorName,
          date: appointment.date + " - " + appointment.hour,
          status: appointment.appointmentStatus
        })),
    });
    if (result.success) {
      setAvailableAppointments(result.data);
    }
  };

  const loadPatientAppointments = async (document) => {
    const result = await execute({
      url: `${API_URL}/receptionist/appointment/patient/${encodeURIComponent(document)}`,
      method: 'GET',
      mapper: (data) => data
        .filter((appointment) => appointment.appointmentStatus === 'SCHEDULED')
        .map((appointment) => ({
          id: appointment.appointmentId,
          patient: appointment.patientName ?? 'Sin paciente',
          doctor: appointment.doctorName,
          date: appointment.date + " - " + appointment.hour,
          status: appointment.appointmentStatus
        })),
    });
    if (result.success) {
      setPatientAppointments(result.data);
    }
  };

  const scheduleAppointment = async (id, document) => {
    const result = await execute({
      url: `${API_URL}/receptionist/appointment/${id}/${encodeURIComponent(document)}/schedule`,
      method: 'PATCH',
    });
    if (result.success) {
      setAvailableAppointments((current) => current.filter((app) => app.id !== id));
      await loadPatientAppointments(patient.document);
    }
  };

  const cancelAppointment = async (id, document) => {
    const result = await execute({
      url: `${API_URL}/receptionist/appointment/${id}/cancel`,
      method: 'PATCH',
    });
    if (result.success) {
      setAvailableAppointments((current) => current.filter((app) => app.id !== id));
      await loadPatientAppointments(document);
      await loadAvailableAppointments();
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '900px' }}>
      <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mb-4">
        <h2 className="text-success fw-bold mb-4 text-center">Gestión de Citas por Paciente</h2>
        
        <form onSubmit={findPatient} className="d-flex gap-3">
          <div className="form-floating flex-grow-1">
            <input type="text" className="form-control rounded-3 bg-light shadow-none border-light-subtle" placeholder="Documento" id="document" name="document" value={state.document} onChange={handleChange} disabled={loading} required />
            <label htmlFor="document" className="text-secondary small">Buscar por Documento...</label>
          </div>
          <button type="submit" className="btn btn-primary rounded-3 px-4 fw-semibold shadow-sm" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Buscar'}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3 py-2 small text-center border-0 bg-danger bg-opacity-10 text-danger fw-semibold">{error}</div>}
      </div>

      {patient && (
        <>
          <div className="alert alert-success border-success border-opacity-25 bg-success bg-opacity-10 mb-4 rounded-4 shadow-sm d-flex align-items-center gap-3 p-3">
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>👤</div>
            <div>
              <p className="mb-0 small text-success fw-bold text-uppercase">Paciente Seleccionado</p>
              <h5 className="mb-0 text-dark fw-bold">{patient.fullName}</h5>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-4 h-100 p-4 bg-white">
                <h5 className="text-success fw-bold mb-4 border-bottom pb-2">Agendar Nueva Cita</h5>
                {availableAppointments?.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {availableAppointments.map(app => (
                      <div className="p-3 border rounded-3 bg-light hover-shadow transition-all" key={app.id}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold text-dark mb-0">{app.doctor}</h6>
                          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill">Disponible</span>
                        </div>
                        <p className="small text-muted mb-3">📅 {app.date}</p>
                        <button className="btn btn-success btn-sm w-100 rounded-3 fw-semibold" onClick={() => scheduleAppointment(app.id, patient.document)} disabled={loading}>
                          Agendar Cita
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted small bg-light rounded-3">No hay citas disponibles.</div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-4 h-100 p-4 bg-white">
                <h5 className="text-primary fw-bold mb-4 border-bottom pb-2">Citas Actuales del Paciente</h5>
                {patientAppointments.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {patientAppointments.map(app => (
                      <div className="p-3 border rounded-3 bg-light hover-shadow transition-all" key={app.id}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold text-dark mb-0">{app.doctor}</h6>
                          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill">Programada</span>
                        </div>
                        <p className="small text-muted mb-3">📅 {app.date}</p>
                        <button className="btn btn-outline-danger btn-sm w-100 rounded-3 fw-semibold" onClick={() => cancelAppointment(app.id, patient.document)} disabled={loading}>
                          Cancelar Cita
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted small bg-light rounded-3">El paciente no tiene citas agendadas.</div>
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