function CreatePatient() {
  const handleSubmit = (e) => {
    e.preventDefault();
    //aqui va la API POST para crear el paciente y su usuario automáticamente
    alert('Llamando API para crear paciente (Y su usuario automáticamente)');
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Registrar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre Completo</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Documento</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Correo Electrónico</label>
          <input type="email" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Registrar</button>
      </form>
    </div>
  );
}

export default CreatePatient;
