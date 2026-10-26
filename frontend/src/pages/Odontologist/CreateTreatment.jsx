// Componente para crear un nuevo tratamiento
function CreateTreatment() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear tratamiento'); 
    // aqui va la API POST Tratamiento
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Nuevo Tratamiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del Tratamiento</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Costo Estimado</label>
          <input type="number" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Crear</button>
      </form>
    </div>
  );
}

export default CreateTreatment;
