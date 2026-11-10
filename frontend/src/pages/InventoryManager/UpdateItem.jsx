import { useEffect } from 'react';
import { API_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useFormValidation from '../../hooks/useFormValidation';

const initialState = {
  name: '',
  stock: '',
  active: 'true',
};

const mapItem = (item) => ({
  id: item.itemId,
  name: item.name,
  stock: item.stock,
  active: item.active,
});

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, handleChange, setValues } = useForm(initialState);
  const { validationClassName, handleInvalid } = useFormValidation();
  const {
    data: item,
    loading: loadingItem,
    error: loadError,
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/inventory_manager/item/${id}`,
    method: 'GET',
    mapper: mapItem,
  });
  const {
    execute: updateItem,
    loading: saving,
    error: saveError,
  } = useFetch();

  useEffect(() => {
    if (item) {
      setValues({
        name: item.name,
        stock: item.stock,
        active: String(item.active),
      });
    }
  }, [item, setValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await updateItem({
      url: `${API_URL}/inventory_manager/item/${id}`,
      method: 'PUT',
      body: {
        name: state.name, stock: state.stock, active: state.active === 'true'
      },
    });
    if (result.success) {
      navigate('/inventoryManager/viewItems');
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '600px' }}>
      
      {(loadError || saveError) && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {loadError || saveError}
        </div>
      )}
      
      {loadingItem || (!item && !loadError) ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
          <p className="text-muted mt-2 small">Cargando insumo...</p>
        </div>
      ) : item ? (
        <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 bg-white">
          <h2 className="text-success fw-bold mb-4 text-center">Editar Insumo</h2>
          
          <div className="alert alert-info py-2 text-center border-0 bg-primary bg-opacity-10 text-primary rounded-3 mb-4 fw-semibold small">
            Modificando Insumo ID: #{item.id}
          </div>
          
          <form onSubmit={handleSubmit} onInvalid={handleInvalid} className={validationClassName}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="name" name="name" value={state.name} onChange={handleChange} placeholder="Nombre" disabled={saving} required />
              <label htmlFor="name" className="text-secondary small">Nombre del Insumo</label>
            </div>
            
            <div className="form-floating mb-3">
              <input type="number" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="stock" name="stock" value={state.stock} onChange={handleChange} placeholder="Stock" disabled={saving} required />
              <label htmlFor="stock" className="text-secondary small">Cantidad en Stock</label>
            </div>
            
            <div className="form-floating mb-4">
              <select className="form-select form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="active" name="active" value={state.active} onChange={handleChange} disabled={saving} required>
                <option value="true">Activo (Disponible)</option>
                <option value="false">Inactivo (Oculto)</option>
              </select>
              <label htmlFor="active" className="text-secondary small">Estado Operativo</label>
            </div>
            
            <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={saving}>
              {saving ? <><span className="spinner-border spinner-border-sm me-2"></span> Guardando...</> : 'Actualizar Inventario'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card shadow-lg border-0 rounded-4 p-5 text-center">
          <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
            <span className="fs-1 opacity-50">📦</span>
          </div>
          <h4 className="text-secondary fw-bold mb-2">Insumo no encontrado</h4>
          <p className="text-muted mb-4">No se encontró el insumo solicitado. Vuelve al inventario para seleccionar otro.</p>
          <div>
            <button className="btn btn-primary rounded-3 px-4" onClick={() => navigate('/inventoryManager/viewItems')}>
              Ir al Inventario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateItem;