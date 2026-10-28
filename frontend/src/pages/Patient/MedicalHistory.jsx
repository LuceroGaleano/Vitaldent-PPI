import React, { useState, useEffect, useReducer, useContext } from 'react'
import { getFetch } from '../../fetchs/GetFetch';
import { AuthContext } from '../../context/AuthContext';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';


const initialState = {
  loading: false,
  error: null
};

export function HistorialClinico() {
  const [historial, setHistorial] = useState([]);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);

  const agregarHistoriales = async () =>{
    dispatch({type: 'LOANDING', payload: true});

    try{
      const data = await getFetch(
        'http://localhost:8080/patient/clinical_record',
        auth.user
      );

      dispatch({type: 'LOANDING', payload: false});
      const historiasMapeadas = data.map((item) => ({
        id: item.clinicalRecordId,
        fecha: item.date,
        descripcion: item.diagnostic
      }));
      setHistorial(historiasMapeadas);
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  }
  useEffect(() => {
    agregarHistoriales();
  }, [historial]);

  return (
    <div>
      <h2 className="text-success mb-4">Historial Clínico</h2>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
           {state.error}
        </div>
      )}
      {historial.map(item => (
        <div className="card border-success mb-3 shadow-sm" key={item.id}>
          <div className="card-header bg-success text-white">Fecha: {item.fecha}</div>
          <div className="card-body">
            <p className="card-text">{item.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistorialClinico;