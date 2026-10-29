function CreateUser() {
  const handleSubmit = (e) => {
    e.preventDefault();
    //aqui va la API POST para crear el usuario administrativo
    alert('Llamando API para crear usuario administrativo');
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Empleado (Doctor/Inventario)</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Rol</label>
          <select className="form-select" required>
            <option value="DOCTOR">Odontólogo</option>
            <option value="INVENTORY">Gestor de Inventario</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Crear Usuario</button>
      </form>
    </div>
  );
}

export default CreateUser;
