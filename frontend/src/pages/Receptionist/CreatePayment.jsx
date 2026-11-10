import { useContext } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../../context/InvoiceContext";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";

const initialState = {
  amount: '',
  methodPayment: '',
};

function CreatePayment() {
  const { invoice } = useContext(InvoiceContext);
  const { state, handleChange } = useForm(initialState);
  const { execute: createPayment, loading, error } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPayment({
      url: `${API_URL}/receptionist/pay`,
      method: 'POST',
      body: {
          amount: state.amount,
          methodPayment: state.methodPayment,
          state: 'PAID',
          invoiceId: invoice.id
      },
    });
    if (result.success) {
      navigate('/receptionist/viewInvoices');
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Registrar Pago</h2>
      
      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}

      {!invoice ? (
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

          <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Procesando...</> : 'Crear Pago'}
          </button>
        </form>
      )}
    </div>
  );
}

export default CreatePayment;