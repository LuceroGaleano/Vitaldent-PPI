// Componente para crear un historial clínico
function CreateMedicalHistory() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear historial'); 
    // aqui va la API POST Historial
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Historial Clínico</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Documento del Paciente</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Observaciones</label>
          <textarea className="form-control" rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Guardar Historial</button>
      </form>
    </div>
  );
}

export default CreateMedicalHistory;
