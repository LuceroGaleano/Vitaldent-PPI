import React, { useState, useEffect, useReducer, useContext } from 'react'
import { getFetch } from '../../fetchs/GetFetch';
import { AuthContext } from '../../context/AuthContext';
import { patchFetch } from '../../fetchs/PatchFetch';
import { postFetchReduce } from '../../reduces/PostFetchReduce';


const initialState = {
  loading: false,
  error: null
};


export function CitasDisponibles() {
  const [citas, setCitas] = useState([]);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(postFetchReduce, initialState);

  const agregarCitas = async () => {
    dispatch({ type: 'LOANDING', payload: true });

    try {
      const data = await getFetch(
        'http://localhost:8080/patient/appointment/available',
        auth.user
      );

      dispatch({ type: 'LOANDING', payload: false });

      const citasMapeadas = data.map((item) => ({
        id: item.appointmentId,
        doctor: item.doctorName,
        fecha: item.date + " " + item.hour
      }));

      setCitas(citasMapeadas);
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  };

  useEffect(() => {
    agregarCitas();
  }, []);

    const handleAgendar = async (id) => {
        dispatch({ type: 'LOANDING', payload: true });

        try {
            await patchFetch(
            `http://localhost:8080/patient/appointment/${id}/schedule`,
            auth.user
            );

            setCitas((citasActuales) =>
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
      <h2 className="text-success mb-4">Citas Disponibles</h2>
      <div className="row">
          {state.error && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              {state.error}
            </div>
          )}
        {citas.map(cita => (
          <div className="col-md-6 mb-3" key={cita.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{cita.doctor}</h5>
                <p className="card-text text-muted">{cita.fecha}</p>
                <button className="btn btn-success" onClick={() => handleAgendar(cita.id)}>Agendar (Schedule)</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitasDisponibles;