import { useContext, useEffect, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';
import { InoviceContext } from '../../context/InvoiceContext';

const initialState = {
  loading: true,
  error: null,
  document: ''
}

function ViewPayments() {
  const [resultados, setResultados] = useState([]);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);
  const {invoice} = useContext(InoviceContext)



    const agregarPagos = async () => {
      dispatch({type: 'LOADING', payload: true});
      try {
        const data = await getFetch(
          `http://localhost:8080/receptionist/pay/invoice/${invoice.id}`,
          auth.user
        );

        const pagos = data.map((pago) => ({
          id: pago.payId,
          fecha: pago.date,
          monto: pago.amount,
          metodo: pago.methodPayment
        }));

        setResultados(pagos);
        dispatch({type: 'LOADING', payload: false});
      } catch(error) {
        dispatch({type: 'ERROR', payload: error});
      }
    };

  useEffect(() => {
    agregarPagos();
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
            {state.error.message}
          </div>
        )}

        <div className="row">
          {resultados.length > 0 && resultados.map(res => (
            <div className="col-md-6 mb-3" key={res.id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">Fecha: {res.fecha}</h5>
                  <p className="card-text text-muted mb-1">Monto: {res.monto}</p>
                  <p className="card-text text-muted">Método de pago: {res.metodo}</p>
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
