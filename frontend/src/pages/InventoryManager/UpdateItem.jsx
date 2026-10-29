import { useContext, useReducer } from 'react';
import { ItemContext } from '../../context/ItemContext';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { AuthContext } from '../../context/AuthContext';
import { putFetch } from '../../fetchs/PutFetch';
import { useNavigate } from 'react-router-dom';


function UpdateItem() {
  const { item } = useContext(ItemContext);
  
  const initialState ={
    name: item?.nombre,
    stock:item?.stock,
    active: item?.active
  };
  const[state, dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>{
      dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  }
  
  
  const handleSubmit =  async (event) => {
    event.preventDefault();
    dispatch({type: 'LOADING', payload: true});

    try{
      await putFetch(
        `http://localhost:8080/inventory_manager/item/${item.id}`,
        { name: state.name,
          stock: state.stock,
          active: true
        },
        auth.user
      )
      dispatch({type: 'LOADING', payload: false})
      navigate('/inventoryManager/viewItems')
    } catch(error){
      dispatch({type: 'ERROR', payload: error.message})
    } 
    
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Actualizar Item</h2>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      )}
      {item ? (
        <form onSubmit={handleSubmit}>
          <div className="alert alert-info small py-2">
            Editando el item ID: <strong>{item.id}</strong>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre del Item</label>
            <input type="text" className="form-control" id="name" name="name" value={state.name} onChange = {handleChange}  required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Cantidad en Stock</label>
            <input type="number" className="form-control" id="stock" name="stock" value={state.stock} onChange = {handleChange} required />
          </div>
          <div className = "mb-3">
            <label className="form-label fw-bold">Activado/Desactivado</label>
            <select className="form-control" id="active" name="active" value={state.active} onChange = {handleChange} >
              <option>Eligue uno</option>
              <option value="true">Activado</option>
              <option value="false">Desactivado</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Guardar Cambios</button>
        </form>
      ) : (
        <div className="alert alert-warning">
          Por favor, selecciona un item desde la pestaña "Ver Items" para actualizarlo.
        </div>
      )}
    </div>
  );
}

export default UpdateItem;
