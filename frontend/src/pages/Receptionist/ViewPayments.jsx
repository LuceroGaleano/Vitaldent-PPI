import { useContext } from 'react';
import useApiRequest from '../../customHooks/useApiRequest';
import { InvoiceContext } from '../../context/InvoiceContext';
import { useNavigate } from 'react-router-dom';

const mapPayments = (data) => data.map((payment) => ({
  id: payment.payId,
  date: payment.date,
  amount: payment.amount,
  paymentMethod: payment.methodPayment,
}));

function ViewPayments() {
  const {invoice} = useContext(InvoiceContext);
  const navigate = useNavigate();
  const {
    data: paymentData,
    loading,
    error,
  } = useApiRequest({
    autoExecute: Boolean(invoice),
    url: invoice ? `http://localhost:8080/receptionist/pay/invoice/${invoice.id}` : undefined,
    method: 'GET',
    mapper: mapPayments,
  });
  const paymentResults = paymentData ?? [];

  return (
    <div className="mx-auto" style={{ maxWidth: '900px' }}>
      
      {!invoice ? (
        <div className="card shadow-lg border-0 rounded-4 p-5 text-center">
          <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
            <span className="fs-1 opacity-50">💸</span>
          </div>
          <h4 className="text-secondary fw-bold mb-2">Ninguna factura seleccionada</h4>
          <p className="text-muted mb-4">Para visualizar el historial de pagos, por favor busca y selecciona una factura específica desde el módulo de facturación.</p>
          <div>
            <button className="btn btn-primary rounded-3 px-4" onClick={() => navigate('/receptionist/viewInvoices')}>
              Ir a Búsqueda de Facturas
            </button>
          </div>
        </div>
      ) : (
        <>  
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-success fw-bold mb-0">Pagos de Factura #{invoice.id}</h2>
            <button className="btn btn-outline-secondary btn-sm rounded-3" onClick={() => navigate('/receptionist/viewInvoices')}>
              Volver
            </button>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
              {error}
            </div>
          )}

          {loading || (paymentData === null && !error) ? (
             <div className="text-center py-5">
               <span className="spinner-border text-success" role="status"></span>
               <p className="text-muted mt-2 small">Cargando pagos...</p>
             </div>
          ) : (
            <div className="row g-4">
              {paymentResults.length > 0 ? paymentResults.map(payment => (
                <div className="col-md-6" key={payment.id}>
                  <div className="card shadow-sm border-0 rounded-4 h-100 bg-white">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title text-success fw-bold mb-0">${Number(payment.amount).toLocaleString('es-CO')}</h5>
                        <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                          💳 {payment.paymentMethod}
                        </span>
                      </div>
                      <p className="card-text text-muted small mb-0">📅 <strong>Fecha del pago:</strong> {payment.date}</p>
                      <p className="card-text text-muted small mt-1">🆔 <strong>Ref Pago:</strong> {payment.id}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-12 text-center py-4 bg-light rounded-4">
                  <p className="text-muted mb-0">Esta factura aún no registra ningún pago.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewPayments;