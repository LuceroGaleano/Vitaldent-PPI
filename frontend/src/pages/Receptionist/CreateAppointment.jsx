function CreateAppointment() {
  const handleSubmit = (e) => {
    e.preventDefault();
    //aqui va la API POST para crear la cita
    alert('Llamando API para crear cita');
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Agendar Nueva Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Documento del Paciente</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Doctor Asignado</label>
          <select className="form-select">
            <option>Dr. Gómez</option>
            <option>Dra. Galeano</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Fecha y Hora</label>
          <input type="datetime-local" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Crear Cita</button>
      </form>
    </div>
  );
}

export default CreateAppointment;
