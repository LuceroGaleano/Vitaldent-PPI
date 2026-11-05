import { useReducer } from "react";
import { apiFetchReducer } from "../../reduces/ApiFetchReducer";
import useApiRequest from "../../customHooks/useApiRequest";
import { useNavigate } from "react-router-dom";

const initialState = { name: '', stock: '', active: '' };

function CreateItem() {
  const [state, dispatch] = useReducer(apiFetchReducer, initialState);
  const { execute: createItem, loading, error } = useApiRequest();
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: 'OK', payload: { field: e.target.name, value: e.target.value } });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createItem({
      url: 'http://localhost:8080/inventory_manager/item',
      method: 'POST',
      body: {
        name: state.name, stock: state.stock, active: true 
      },
    });
    if (result.success) {
      navigate('/inventoryManager/viewItems');
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Registrar Nuevo Insumo</h2>
      
      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input 
            type="text" 
            className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" 
            id="name" 
            name="name" 
            value={state.name} 
            onChange={handleChange} 
            placeholder="Nombre" 
            disabled={loading}
            required 
          />
          <label htmlFor="name" className="text-secondary small">Nombre del Insumo (Ej: Jeringas)</label>
        </div>
        
        <div className="form-floating mb-4">
          <input 
            type="number" 
            className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" 
            id="stock" 
            name="stock" 
            value={state.stock} 
            onChange={handleChange} 
            placeholder="Stock" 
            disabled={loading}
            required 
          />
          <label htmlFor="stock" className="text-secondary small">Cantidad inicial en Stock</label>
        </div>
        
        <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading}>
          {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Guardando...</> : 'Crear Insumo'}
        </button>
      </form>
    </div>
  );
}

export default CreateItem;