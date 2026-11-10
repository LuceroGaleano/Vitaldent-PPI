import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { useOutletContext } from 'react-router-dom';

const mapInvoices = (data) =>
  data.map((invoice) => ({
    id: invoice.invoiceId,
    amount: invoice.total,
    date: invoice.date,
    isPaid: invoice.isPaid,
  }));

function ViewInvoices() {
  const { onInvoiceClick, onCreatePayClick } = useOutletContext();
  const { state, handleChange } = useForm({ document: '' });
  
  const {
    execute: searchInvoices,
    data: responseData,
    loading,
    error,
  } = useFetch();
  const invoices = responseData ?? [];
  
  const handleSearch = async (e) => {
    e.preventDefault();
    await searchInvoices({
      url: `${API_URL}/receptionist/invoice/patient/${encodeURIComponent(state.document.trim())}`,
      method: 'GET',
      mapper: mapInvoices,
    });
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mb-4">
        <h2 className="text-success fw-bold mb-4 text-center">Búsqueda de Facturas</h2>

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
              disabled={loading}
              required 
            />
            <label htmlFor="document" className="text-secondary small">Documento del paciente...</label>
          </div>
          <button type="submit" className="btn btn-primary rounded-3 px-4 fw-semibold shadow-sm" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Buscar'}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 py-2 small text-center border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
             {error}
          </div>
        )}
      </div>

      {invoices.length > 0 && (
        <div className="row g-4">
          {invoices.map(res => (
            <div className="col-md-6 col-lg-4" key={res.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 bg-white transition-all hover-shadow">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="text-uppercase fw-bold text-muted" style={{fontSize: '0.7rem'}}>Factura #{res.id}</small>
                      <h5 className="card-title text-dark fw-bold mb-0">${res.amount.toLocaleString('es-CO')}</h5>
                    </div>
                    {res.isPaid ? (
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill">Pagada</span>
                    ) : (
                      <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 rounded-pill">Pendiente</span>
                    )}
                  </div>
                  
                  <p className="card-text text-muted mb-4 small">📅 <strong>Fecha:</strong> {res.date}</p>
                  
                  <div className="mt-auto d-flex flex-column gap-2">
                    {!res.isPaid && (
                      <button className="btn btn-success btn-sm w-100 rounded-3 fw-semibold" onClick={() => onCreatePayClick(res)}>
                        Realizar Pago
                      </button>
                    )}
                    <button className="btn btn-outline-primary btn-sm w-100 rounded-3 fw-semibold" onClick={() => onInvoiceClick(res)}>
                      Ver Historial de Pagos
                    </button>
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

export default ViewInvoices;