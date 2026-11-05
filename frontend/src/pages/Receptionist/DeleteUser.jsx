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
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const { auth } = useContext(AuthContext);

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING', payload: true });
    try {
      await deleteFetch(`http://localhost:8080/receptionist/user/${state.document}`, auth.user);
      dispatch({ type: 'LOADING', payload: false });
      setUsuarioEliminado(true);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
      <div className="text-center mb-4">
        <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
          <span className="fs-3 fw-bold">🗑️</span>
        </div>
        <h2 className="text-danger fw-bold mb-1">Eliminar Usuario</h2>
        <p className="text-muted small">Ingresa el documento del usuario a eliminar.</p>
      </div>

      {state.error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {state.error.message}
        </div>
      )}

      {usuarioEliminado ? (
        <div className="alert alert-success border-0 bg-success bg-opacity-10 text-success shadow-sm d-flex flex-column align-items-center justify-content-center text-center p-4 rounded-4">
          <span className="fs-1 mb-2">✅</span>
          <h5 className="fw-bold mb-0">¡Usuario eliminado con éxito!</h5>
          <button className="btn btn-outline-success btn-sm mt-3 rounded-3" onClick={() => setUsuarioEliminado(false)}>Eliminar otro</button>
        </div>
      ) : (
        <form onSubmit={handleSearch}>
          <div className="form-floating mb-4">
            <input 
              type="text" 
              className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" 
              placeholder="Buscar por documento..."  
              id="document" 
              name="document" 
              value={state.document} 
              onChange={handleChange} 
              disabled={state.loading}
              required 
            />
            <label htmlFor="document" className="text-secondary small">Documento del usuario</label>
          </div>
          <button type="submit" className="btn btn-danger btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={state.loading}>
            {state.loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Buscando...</> : 'Eliminar Usuario'}
          </button>
        </form>
      )}
    </div>
  );
}

export default DeleteUser;