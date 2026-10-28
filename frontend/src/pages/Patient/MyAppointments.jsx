import React, { useState, useEffect, useReducer, useContext } from 'react'
import { getFetch } from '../../fetchs/GetFetch';
import { AuthContext } from '../../context/AuthContext';
import { postFetchReduce } from '../../reduces/PostFetchReduce';
import { patchFetch } from '../../fetchs/PatchFetch';


const initialState = {
  loanding: false,
  error: null
}

export function MisCitas() {
  const [misCitas, setMisCitas] = useState([]);
    const { auth } = useContext(AuthContext);
    const [state, dispatch] = useReducer(postFetchReduce, initialState);

  const agregarMisCitas = async() =>{
    dispatch({type: 'LOANDING', payload:true})
    try{
      const data = await getFetch(
        'http://localhost:8080/patient/appointment',
        auth.user
      );
      dispatch({type: 'LOANDING', payload: false})

      const citasMapeadas = data.map((item) => ({
        id: item.appointmentId,
        doctor: item.doctorName,
        fecha: item.date + " " + item.hour
      }));

      setMisCitas(citasMapeadas);
    } catch (error){
      dispatch({
        type: 'ERROR',
        payload: error.message
      })
    }
  }
  
  useEffect(() => {
    agregarMisCitas();
  }, []);

  const handleCancelar = async (id) => {
    dispatch({type: 'LOANDING', payload:true})
    try{
      await patchFetch(
        `http://localhost:8080/patient/appointment/${id}/cancel`,
        auth.user
      )


     setMisCitas((citasActuales) =>
          citasActuales.filter((cita) => cita.id !== id)
      );
    } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'LOANDING', payload: false });
    }
  };

  return (
    <div>
      <h2 className="text-success mb-4">Mis Citas Agendadas</h2>
      <div className="list-group">
          {state.error && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              {state.error}
            </div>
          )}
        {misCitas.map(cita => (
          <div className="list-group-item d-flex justify-content-between align-items-center p-3 shadow-sm mb-2 border-0 rounded" key={cita.id}>
            <div>
              <h5 className="mb-1 text-primary">{cita.doctor}</h5>
              <small className="text-muted">{cita.fecha}</small>
            </div>
            <button className="btn btn-outline-danger" onClick={() => handleCancelar(cita.id)}>Cancelar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisCitas;