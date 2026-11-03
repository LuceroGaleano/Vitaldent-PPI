import { useContext, useEffect, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';
import { InvoiceContext } from '../../context/InvoiceContext';

const initialState = {
  loading: true,
  error: null,
  document: ''
}

function ViewPayments() {
  const [paymentResults, setPaymentResults] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);
  const {invoice} = useContext(InvoiceContext)



    const loadPayments = async () => {
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/pay/invoice/${invoice.id}`,
          auth.user
        );

        const payments = data.map((payment) => ({
          id: payment.payId,
          date: payment.date,
          amount: payment.amount,
          paymentMethod: payment.methodPayment
        }));

        setPaymentResults(payments);
        dispatch({type: 'LOADING', payload: false});
      } catch(error) {
        dispatch({type: 'ERROR', payload: error.message});
      }
    };

  useEffect(() => {
    loadPayments();
  },[])

  return (
    <div>
      <h2 className="text-success mb-4">Lista de Pagos</h2>

      {!invoice ? (
        <div className="alert alert-info py-2 small text-center" role="status">
          Selecciona una factura desde "Ver Facturas" para ver sus pagos.
        </div>
      ): (
      <>  
        {state.error && (
          <div className="alert alert-danger py-2 small text-center" role="alert">
            {state.error}
          </div>
        )}

        <div className="row">
          {paymentResults.length > 0 && paymentResults.map(payment => (
            <div className="col-md-6 mb-3" key={payment.id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">Fecha: {payment.date}</h5>
                  <p className="card-text text-muted mb-1">Monto: ${Number(payment.amount).toLocaleString('es-CO')}</p>
                  <p className="card-text text-muted">Método de pago: {payment.paymentMethod}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
      )}

    </div>
  );
}

export default ViewPayments;
