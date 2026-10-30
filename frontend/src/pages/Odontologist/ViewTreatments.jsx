import { useContext, useEffect, useReducer, useState } from 'react';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { getFetch } from '../../fetchs/GetFetch';
import { AppointmentContext } from '../../context/AppointmentContext';
import { useOutletContext } from 'react-router-dom';
import { TreatmentContext } from '../../context/TreatmentContext';

const initialState = {
  loading: true,
  error: null,
  document: ''
}
function ViewTreatments() {
    const { onTreatmentClick } = useOutletContext();
    const{appointment} = useContext(AppointmentContext);
    const{treatment} = useContext(TreatmentContext);
    const [tratamientos, setTratamientos] = useState([]);
    const [state, dispatch] = useReducer(apiFetchReduce, initialState);
    const {auth} = useContext(AuthContext);

    const agregarTratamientos = async() =>{
      dispatch({type: 'LOADING', payload: true});
      try{
        const data = await getFetch('http://localhost:8080/doctor/treatment', auth.user);
        
        dispatch({type: 'LOADING', payload: false});
        const tratamientos = data.map((tratamiento) => ({
          id: tratamiento.treatamentId, 
          nombre: tratamiento.name,
          costo: tratamiento.cost,
          descripcion: tratamiento.description,
          items: tratamiento.treatmentItems
        }));

        setTratamientos(tratamientos);
      } catch(error){
        dispatch({type: 'ERROR', payload: error.message});
      }
    }


  useEffect(() => {
    agregarTratamientos();
  }, []);

  return (
    <div>
      <h2 className="text-success mb-4">Lista de Tratamientos</h2>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      )}
      <div className="row">
        {tratamientos.map(t => (
          <div className="col-md-6 mb-3" key={t.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{t.nombre}</h5>
                <p className="card-text text-muted">Descripcion: {t.descripcion}</p>
                <p className="card-text text-muted">Costo: ${t.costo}</p>
                <p className="card-text text-muted fw-bold">Items:</p>
                {t.items.map((item) =>(
                  <p className="card-text text-muted mb-1" key={item.itemId}>{item.itemName}</p>
                ))}
                {appointment && !treatment? (
                  <div className = "mt-2">
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => onTreatmentClick(t)}
                      >
                      Agregar Historial
                    </button>
                  </div>
                ): null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTreatments;
