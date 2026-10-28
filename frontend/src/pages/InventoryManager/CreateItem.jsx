import { useContext, useReducer } from "react";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { AuthContext } from "../../context/AuthContext";
import { postFetch } from "../../fetchs/PostFetch";
import { useNavigate } from "react-router-dom";


function CreateItem() {

  const initialState ={
    name: '',
    stock:'',
    active:''
  };
  
  const[state,dispatch] = useReducer(apiFetchReduce, initialState);
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>{
      dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  }

  const handleSubmit = async (e) => {
    dispatch({type: 'LOANDING', payload: true});

    try{
      await postFetch(
        'http://localhost:8080/inventory_manager/item',
        { name: state.name,
          stock: state.stock,
          active: true
        },
        auth.user
      )

      dispatch({type: 'LOANDING', payload: false})
      navigate('/inventoryManager/viewItems')
    } catch(error){
      dispatch({type: 'ERROR', payload: error.message})
    } 
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Nuevo Item</h2>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del Item</label>
          <input type="text" className="form-control" id="name" name="name" value={state.name} onChange = {handleChange} placeholder="Ej: Jeringas Descartables" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Cantidad en Stock</label>
          <input type="text" className="form-control" id="stock" name="stock" value={state.stock} onChange = {handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Crear Item</button>
      </form>
      
    </div>
  );
}

export default CreateItem;
