import { useLocation } from 'react-router-dom';

// componente para actualizar un item
function UpdateItem() {
  const { state } = useLocation();
  const item = state?.item;
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Llamando API para actualizar el item (PUT/PATCH Item)');
    // aqui va la API PUT/PATCH para actualizar un item
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Actualizar Item</h2>
      {item ? (
        <form onSubmit={handleSubmit}>
          <div className="alert alert-info small py-2">
            Editando el item ID: <strong>{item.id}</strong>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre del Item</label>
            <input type="text" className="form-control" defaultValue={item.nombre} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Cantidad en Stock</label>
            <input type="number" className="form-control" defaultValue={item.cantidad} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Proveedor / Marca</label>
            <input type="text" className="form-control" defaultValue={item.proveedor} required />
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
