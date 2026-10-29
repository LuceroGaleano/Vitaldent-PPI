import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { getFetch } from "../../fetchs/GetFetch";
import { postFetch } from "../../fetchs/PostFetch";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: '',
  description: '',
  cost: '',
  treatmentItems: [],
  loading: false,
  error: null
};

// Componente para crear un nuevo tratamiento
function CreateTreatment() {
  const [items,setItems] = useState([]);
  const[itemAgregados, setItemsAgregados] =useState([]);
  const{auth} = useContext(AuthContext);
  const[state, dispatch] = useReducer(apiFetchReduce, initialState);
  const navigate = useNavigate();

  const verItem = (item) => {
    setItemsAgregados([...itemAgregados, item]);
  }

  //Extrar items
  const agregarItems = async() =>{
      dispatch({type:'LOADING', payload: true});
  
      try{
        const data = await getFetch(
          'http://localhost:8080/doctor/item',
          auth.user
        )
         
        dispatch({type:'LOADING', payload: false})
        const items = data.map((item) => ({
          id: item.itemId,
          nombre: item.name,
          stock: item.stock,
          active: item.active
        }))
        setItems(items)
      } catch(error){
        dispatch({type:'ERROR', payload: error})
      }
    }
  
    useEffect(() => {
      agregarItems();
    }, []);

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type: 'LOADING', payload: true});
    const itemsEntregar = itemAgregados.map((item) => ({
      itemId: item.id,
      quantityUsed: 1
    }))

    try{
      await postFetch('http://localhost:8080/doctor/treatment',
        { name: state.name,
          description: state.description,
          cost: state.cost,
          treatmentItems: itemsEntregar
        },
        auth.user
      )
      dispatch({type: 'LOADING', payload: false});
      navigate('/odontologist/viewTreatments');
    } catch(error){
        dispatch({type:'ERROR', payload: error})
    }
  };

  return (
    <>
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Nuevo Tratamiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del Tratamiento</label>
          <input type="text" className="form-control" id="name" name="name" value={state.name} onChange = {handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Descripciond el tratamiento</label>
          <textarea type="text" className="form-control" id="description" name="description" value={state.description} onChange = {handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Costo Estimado</label>
          <input type="number" className="form-control" id="cost" name="cost" value={state.cost} onChange = {handleChange} required />
        </div>
         <div className="mb-3">
          <label className="form-label fw-bold">Items Agregados</label>
          {itemAgregados.length ?
           itemAgregados.map(item => (
            <p className="card-text text-muted mb-1" key={item.id}>{item.nombre}</p>
           )): <p className="card-text text-muted mb-1">No hay items agregados</p>}
        </div>
        <button type="submit" className="btn btn-success">Crear</button>
      </form>
    </div>
    
    <div className="card shadow-sm border-0 p-4 mt-3" style={{ maxWidth: '600px' }}>
      <h3 className="text-success mb-4">Agregar Items</h3>
        {items.map(item => (
          <div className="col-md-6 mb-3" key={item.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{item.nombre}</h5>
                <p className="card-text text-muted mb-1">Stock: {item.stock} unidades</p>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => verItem(item)}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
    </>
  );
}

export default CreateTreatment;
