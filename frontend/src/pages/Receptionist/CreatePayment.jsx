import { API_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import SuccessModal from "../../components/SuccessModal";
import useSuccessModal from "../../hooks/useSuccessModal";

const initialState = {
  amount: '',
  methodPayment: '',
};

const mapInvoice = (invoice) => ({
  id: invoice.invoiceId,
});

function CreatePayment() {
  const { invoiceId } = useParams();
  const { state, handleChange } = useForm(initialState);
  const { successMessage, showSuccess, confirmSuccess } = useSuccessModal();
  const {
    execute: createPayment,
    loading: saving,
    error,
  } = useFetch();
  const navigate = useNavigate();
  const {
    data: invoice,
    loading: loadingInvoice,
    error: invoiceError,
  } = useFetch({
    autoExecute: Boolean(invoiceId),
    url: invoiceId ? `${API_URL}/receptionist/invoice/${invoiceId}` : undefined,
    method: 'GET',
    mapper: mapInvoice,
  });
  const loading = saving || loadingInvoice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPayment({
      url: `${API_URL}/receptionist/pay`,
      method: 'POST',
      body: {
          amount: state.amount,
          methodPayment: state.methodPayment,
          state: 'PAID',
          invoiceId
      },
    });
    if (result.success) {
      showSuccess('Pago creado correctamente.', () => navigate('/receptionist/viewInvoices'));
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Registrar Pago</h2>
      
      {(invoiceError || error) && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {invoiceError || error}
        </div>
      )}
      <SuccessModal
        message={successMessage}
        onConfirm={confirmSuccess}
      />

      {loadingInvoice ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
          <p className="text-muted mt-2 small">Cargando factura...</p>
        </div>
      ) : !invoiceId || !invoice ? (
        <div className="text-center py-5">
          <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
            <span className="fs-1 opacity-50">🧾</span>
          </div>
          <h5 className="text-secondary fw-semibold">No hay factura seleccionada</h5>
          <p className="text-muted small mb-4">Por favor, selecciona una factura desde el módulo de "Ver Facturas" para procesar su pago.</p>
          <button className="btn btn-outline-success rounded-3" onClick={() => navigate('/receptionist/viewInvoices')}>Ir a Facturas</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="alert alert-success bg-opacity-10 border-success border-opacity-25 rounded-3 mb-4">
            <small className="d-block text-success fw-bold">Factura ID: {invoice.id}</small>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="amount" name="amount" value={state.amount} onChange={handleChange} placeholder="Monto" disabled={loading} required />
            <label htmlFor="amount" className="text-secondary small">Monto a Pagar</label>
          </div>
          
          <div className="form-floating mb-4">
            <select className="form-select form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="methodPayment" name="methodPayment" value={state.methodPayment} onChange={handleChange} disabled={loading} required>
              <option value="" disabled>Selecciona el método...</option>
              <option value="CARD">Tarjeta (Card)</option>
              <option value="CASH">Efectivo (Cash)</option>
            </select>
            <label htmlFor="methodPayment" className="text-secondary small">Método de pago</label>
          </div>

          <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading} aria-busy={loading}>
            <span
              className={`spinner-border spinner-border-sm me-2${loading ? '' : ' d-none'}`}
              role={loading ? 'status' : undefined}
              aria-hidden={!loading}
            />
            <span translate="no">Crear Pago</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default CreatePayment;