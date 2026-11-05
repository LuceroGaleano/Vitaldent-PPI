import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { getFetch } from "../../fetchs/GetFetch";
import { postFetch } from "../../fetchs/PostFetch";
import { useNavigate } from "react-router-dom";

const initialState = { name: '', description: '', cost: '', treatmentItems: [], loading: false, error: null };

function CreateTreatment() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const navigate = useNavigate();

  const addSelectedItem = (item) => {
    if (!selectedItems.some(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeSelectedItem = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const loadItems = async () => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const data = await getFetch('http://localhost:8080/doctor/item', auth.user);
      dispatch({ type: 'LOADING', payload: false });
      const mappedItems = data.map((item) => ({
        id: item.itemId, name: item.name, stock: item.stock, active: item.active
      }));
      setItems(mappedItems);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => { loadItems(); }, []);

  const handleChange = (e) => {
    dispatch({ type: 'OK', payload: { field: e.target.name, value: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING', payload: true });
    const itemsToSend = selectedItems.map((item) => ({ itemId: item.id, quantityUsed: 1 }));
    try {
      await postFetch('http://localhost:8080/doctor/treatment', {
        name: state.name, description: state.description, cost: state.cost, treatmentItems: itemsToSend
      }, auth.user);
      dispatch({ type: 'LOADING', payload: false });
      navigate('/odontologist/viewTreatments');
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      <h2 className="text-success fw-bold mb-4">Diseñar Nuevo Tratamiento</h2>
      
      {state.error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {state.error}
        </div>
      )}

      <div className="row g-4">
        {/* Formulario Principal */}
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 h-100 bg-white">
            <h5 className="text-success fw-bold mb-4 pb-2 border-bottom">Información del Tratamiento</h5>
            
            <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
              <div className="form-floating mb-3">
                <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="name" name="name" value={state.name} onChange={handleChange} placeholder="Nombre" disabled={state.loading} required />
                <label htmlFor="name" className="text-secondary small">Nombre del Tratamiento</label>
              </div>
              <div className="form-floating mb-3">
                <textarea className="form-control rounded-3 border-light-subtle bg-light shadow-none" id="description" name="description" value={state.description} onChange={handleChange} placeholder="Descripción" style={{ height: '100px' }} disabled={state.loading} required></textarea>
                <label htmlFor="description" className="text-secondary small">Descripción detallada</label>
              </div>
              <div className="form-floating mb-4">
                <input type="number" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="cost" name="cost" value={state.cost} onChange={handleChange} placeholder="Costo" disabled={state.loading} required />
                <label htmlFor="cost" className="text-secondary small">Costo Estimado ($)</label>
              </div>

              <div className="mb-4 flex-grow-1">
                <label className="form-label fw-bold text-secondary small text-uppercase">Insumos Agregados ({selectedItems.length})</label>
                <div className="d-flex flex-wrap gap-2">
                  {selectedItems.length > 0 ? selectedItems.map(item => (
                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill d-flex align-items-center gap-2" key={item.id}>
                      {item.name}
                      <button type="button" className="btn-close btn-close-white ms-1" style={{ fontSize: '0.5rem', filter: 'invert(1)' }} onClick={() => removeSelectedItem(item.id)}></button>
                    </span>
                  )) : (
                    <span className="text-muted small">Selecciona insumos del panel derecho ➔</span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm mt-auto" disabled={state.loading}>
                {state.loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Procesando...</> : 'Crear Tratamiento'}
              </button>
            </form>
          </div>
        </div>

        {/* Panel de Insumos */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 h-100 bg-light p-4">
            <h5 className="text-primary fw-bold mb-4 pb-2 border-bottom">Catálogo de Insumos</h5>
            <div className="d-flex flex-column gap-3 overflow-auto pe-2" style={{ maxHeight: '500px' }}>
              {items.map(item => (
                <div className="card border-0 rounded-3 shadow-sm bg-white" key={item.id}>
                  <div className="card-body p-3 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                      <small className="text-muted">Stock: {item.stock} unidades</small>
                    </div>
                    <button 
                      className={`btn btn-sm rounded-pill fw-semibold px-3 ${selectedItems.some(i => i.id === item.id) ? 'btn-secondary disabled' : 'btn-outline-primary'}`}
                      onClick={() => addSelectedItem(item)}
                    >
                      {selectedItems.some(i => i.id === item.id) ? 'Agregado' : 'Agregar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTreatment;