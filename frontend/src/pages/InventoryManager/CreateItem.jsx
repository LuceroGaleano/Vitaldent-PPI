// compente para crear un item
function CreateItem() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Llamando API para crear un nuevo item (POST Item)');
    // aqui va la API POST para crear un nuevo item
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Nuevo Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del Item</label>
          <input type="text" className="form-control" placeholder="Ej: Jeringas Descartables" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Cantidad en Stock</label>
          <input type="number" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Proveedor / Marca</label>
          <input type="text" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Crear Item</button>
      </form>
    </div>
  );
}

export default CreateItem;
