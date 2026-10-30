import { useContext, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';

const initialState = {
  loading: true,
  error: null,
  document: ''
}
function ViewMedicalHistory() {
  const [resultados, setResultados] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);

  
  const handleChange = (e) =>{
      dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    dispatch({type: 'LOADING', payload: true});
    try {
      const data = await getFetch(
        `http://localhost:8080/receptionist/clinical_record/patient/${state.document}`,
        auth.user
      );

      dispatch({type: 'LOADING', payload: false});
      const historiales = data.map((record) => ({
        id: record.clinicalRecordId,
        fecha: record.date,
        razon: record.reasonForConsultation,
        observaciones: record.diagnostic
      }));

      setResultados(historiales);
    } catch(error) {
      dispatch({type: 'ERROR', payload: error.message});
    }
  };

  return (
    <div>
      <h2 className="text-success mb-4">Buscar Historial</h2>

      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
           {state.error}
        </div>
      )}
      
      <form onSubmit={handleSearch} className="d-flex gap-2 mb-4" style={{ maxWidth: '400px' }}>
        <input type="text" className="form-control" id="document" name="document" value={state.document} onChange={handleChange} placeholder="Documento del paciente" required />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {resultados.length > 0 && (
        <div className="list-group">
          {resultados.map(res => (
            <div className="list-group-item shadow-sm mb-2 border-0 rounded" key={res.id}>
              <h6 className="text-success">Fecha: {res.fecha}</h6>
              <p className="mb-2">Razon de la consulta: {res.razon}</p>
              <p className="mb-2">Diagnostico: {res.observaciones}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMedicalHistory;
