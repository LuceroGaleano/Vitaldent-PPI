import { useContext, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';
import { useOutletContext } from 'react-router-dom';

const initialState = {
  loading: true,
  error: null,
  document: ''
}
7
function ViewInovices() {
  const { onInvoiceClick } = useOutletContext();
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
        `http://localhost:8080/receptionist/invoice/patient/${state.document}`,
        auth.user
      );

      dispatch({type: 'LOADING', payload: false});
      
      const facturas = data.map((factura) => ({
        id: factura.invoiceId,
        date: factura.date,
        isPaid: factura.isPaid
      }));

      setResultados(facturas);
    } catch(error) {
      dispatch({type: 'ERROR', payload: error});
    }
  };

  return (
    <div>
      <h2 className="text-success mb-4">Lista de Facturas</h2>

      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
           {state.error.message}
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
              <h6 className="text-success">Fecha: {res.date}</h6>
              {res.isPaid ? (
                <span className="badge bg-success-subtle text-success border border-success-subtle p-2 mb-2">
                  Factura Pagada
                </span>
              ) : (
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle p-2 mb-2">
                  Factura Sin pagar
                </span>
              )}
                  <div className = "mt-2">
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => onInvoiceClick(res)}
                      >
                      Ver Pagos
                    </button>
                  </div>
            </div>
          ))}
        </div>
      )}
    
    </div>
  );
}

export default ViewInovices;
