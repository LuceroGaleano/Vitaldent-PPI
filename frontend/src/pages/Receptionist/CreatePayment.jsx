import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { InoviceContext } from "../../context/InvoiceContext";
import { AuthContext } from "../../context/AuthContext";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { postFetch } from "../../fetchs/PostFetch";

const initialState = {
  amount: '',
  methodPayment: '',
  loading: false,
  error: null
};
function CreatePayment() {
  const {invoice} = useContext(InoviceContext)
    const[state, dispatch] = useReducer(apiFetchReduce, initialState)
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:'LOADING', payload: true});
    try{
      await postFetch('http://localhost:8080/receptionist/pay',
        {
          amount: state.amount,
          methodPayment: state.methodPayment,
          state: 'PAID',
          invoiceId: invoice.id
        },
        auth.user
      )

      dispatch({type:'LOADING', payload: false});
      navigate('/receptionist/viewInvoices');
    } catch(error){
        dispatch({type:'ERROR', payload: error.message})
    }
  };
  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Registrar Pago</h2>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      )}
        {!invoice ? (
        <div className="alert alert-info py-2 small text-center" role="status">
          Selecciona una factura desde "Ver Facturas" para crear su pago.
        </div>
      ): (
      <>  
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Monto a Pagar</label>
              <input type="text" className="form-control" id="amount" name="amount" value={state.amount} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Metodo de pago</label>
              <select className="form-select" id="methodPayment" name="methodPayment" value={state.methodPayment} onChange={handleChange} required>
                <option value="" disabled>Selecciona el método de pago</option>
                <option value="CARD">Card</option>
                <option value="CASH">Cash</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Crear Pago</button>
          </form>
      </>
      )}
    </div>
  );
}

export default CreatePayment;
