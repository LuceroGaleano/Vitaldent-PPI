import { useContext, useReducer, useState } from "react";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { AuthContext } from "../../context/AuthContext";
import { deleteFetch } from "../../fetchs/DeleteFetch";

const initialState = {
  loading: false,
  error: null
};

function DeleteUser() {
  const [usuarioEliminado, setUsuarioEliminado] = useState(false);
  const[state, dispatch] = useReducer(apiFetchReduce, initialState)
  const { auth } = useContext(AuthContext);

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };
  const handleSearch = async (e) => {
    e.preventDefault();
     dispatch({type:'LOADING', payload: true});
     try{
       await deleteFetch( `http://localhost:8080/receptionist/user/${state.document}`,
        auth.user
       )
 
       dispatch({type:'LOADING', payload: false});
       setUsuarioEliminado(true);
     } catch(error){
         dispatch({type:'ERROR', payload: error.message})
     }
  };

  return (
    <div>
      <h2 className="text-success mb-4">Eliminar Usuario</h2>
      <form onSubmit={handleSearch} className="d-flex gap-2 mb-4" style={{ maxWidth: '400px' }}>
        <input type="text" className="form-control" placeholder="Buscar por documento..."  id="document" name="document" value={state.document} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Eliminar</button>
      </form>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error.message}
        </div>
      )}
      {usuarioEliminado ? (
        <div className="alert alert-success border-success shadow-sm d-flex align-items-center gap-3" style={{ maxWidth: '500px' }} role="status">
          <span className="fs-3 fw-bold" aria-hidden="true">✓</span>
          <div>
            <h5 className="alert-heading mb-1">¡Usuario eliminado con éxito!</h5>
          </div>
        </div>
      ): null}
    </div>
  );
}

export default DeleteUser;
