import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getFetch } from '../../fetchs/GetFetch';

function ManagePatientAppointments() {
  const [paciente, setPaciente] = useState(null);
  const { onPatientClick} = useOutletContext();

  const buscarPaciente = async (e) => {
   e.preventDefault()
    dispatch({type: 'LOADING', payload: true});
    try {
      const data = await getFetch(
        `http://localhost:8080/receptionist/patient/${state.document}`,
        auth.user
      );

      dispatch({type: 'LOADING', payload: false});
      
      const facturas = data.map((factura) => ({
        id: factura.invoiceId,
        amount: factura.total,
        date: factura.date,
        isPaid: factura.isPaid
      }));

      setResultados(facturas);
    } catch(error) {
      dispatch({type: 'ERROR', payload: error.message});
    }
  };

  const handleAgendar = (e) => {
    e.preventDefault();
    //aqui va la API POST para agendar nueva cita al paciente
    alert('Llamando API para agendar nueva cita al paciente (POST)');
  };

  const handleCancelar = (id) => {
    //aqui va la API DELETE o PUT para cancelar la cita
    alert(`Llamando API para cancelar la cita ID: ${id} (DELETE/PUT)`);
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

      {paciente && (
        <>
          <div className="alert alert-success mb-4">
            Paciente encontrado: <strong>{paciente.nombre}</strong>
          </div>

          <div className="row">
            <div className="col-md-6 border-end">
              <h5 className="text-success mb-3">Agendar Cita</h5>
              <form onSubmit={handleAgendar}>
                <div className="mb-3">
                  <label className="form-label fw-bold small">Doctor Asignado</label>
                  <select className="form-select form-select-sm" required>
                    <option>Dr. Gómez</option>
                    <option>Dra. Galeano</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small">Fecha y Hora</label>
                  <input type="datetime-local" className="form-control form-control-sm" required />
                </div>
                <button type="submit" className="btn btn-success btn-sm w-100">Agendar Cita</button>
              </form>
            </div>

            <div className="col-md-6">
              <h5 className="text-success mb-3">Citas Actuales</h5>
              {paciente.citas.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {paciente.citas.map(cita => (
                    <li key={cita.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <div>
                        <small className="d-block fw-bold text-primary">{cita.doctor}</small>
                        <small className="text-muted">{cita.fecha}</small>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleCancelar(cita.id)}
                      >
                        Cancelar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="small text-muted">No tiene citas agendadas.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ManagePatientAppointments;
