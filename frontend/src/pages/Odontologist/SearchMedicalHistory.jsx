import { useContext, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';

const initialState = { loading: false, error: null, document: '' };

function SearchMedicalHistory() {
  const [results, setResults] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const { auth } = useContext(AuthContext);

  const handleChange = (e) => {
    dispatch({ type: 'OK', payload: { field: e.target.name, value: e.target.value } });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING', payload: true });
    try {
      const data = await getFetch(`http://localhost:8080/doctor/clinical_record/patient/${state.document}`, auth.user);
      dispatch({ type: 'LOADING', payload: false });
      const clinicalHistory = data.map((record) => ({
        id: record.clinicalRecordId, date: record.date, reason: record.reasonForConsultation, diagnosis: record.diagnostic
      }));
      setResults(clinicalHistory);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '900px' }}>
      <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mb-4">
        <h2 className="text-success fw-bold mb-4 text-center">Búsqueda de Historial Médico</h2>

        <form onSubmit={handleSearch} className="d-flex gap-3">
          <div className="form-floating flex-grow-1">
            <input 
              type="text" 
              className="form-control rounded-3 bg-light shadow-none border-light-subtle" 
              id="document" 
              name="document" 
              value={state.document} 
              onChange={handleChange} 
              placeholder="Documento"
              disabled={state.loading}
              required 
            />
            <label htmlFor="document" className="text-secondary small">Documento del paciente...</label>
          </div>
          <button type="submit" className="btn btn-primary rounded-3 px-4 fw-semibold shadow-sm" disabled={state.loading}>
            {state.loading ? <span className="spinner-border spinner-border-sm"></span> : 'Buscar'}
          </button>
        </form>

        {state.error && (
          <div className="alert alert-danger mt-3 py-2 small text-center border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
             {state.error}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="d-flex flex-column gap-3 mt-4">
          <h5 className="text-muted fw-bold mb-2 ps-2">Resultados ({results.length})</h5>
          {results.map(record => (
            <div className="card shadow-sm border-0 rounded-4 bg-white" key={record.id}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                  <h5 className="text-primary fw-bold mb-0">Atención Médica</h5>
                  <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">📅 {record.date}</span>
                </div>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <p className="small text-uppercase fw-bold text-muted mb-1">Razón de la consulta</p>
                    <p className="text-dark bg-light p-3 rounded-3 mb-0 h-100">{record.reason}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="small text-uppercase fw-bold text-muted mb-1">Diagnóstico Médico</p>
                    <p className="text-dark bg-light p-3 rounded-3 mb-0 h-100">{record.diagnosis}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchMedicalHistory;