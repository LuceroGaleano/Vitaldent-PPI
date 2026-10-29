function CreatePayment() {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //aqui va la API POST para crear el pago
    alert('Llamando API para crear pago');
  };
  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Registrar Pago</h2>
      <form>
        <div className="mb-3">
          <label className="form-label fw-bold">ID del Tratamiento / Cita</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Monto a Pagar</label>
          <input type="number" className="form-control" required />
        </div>
        <button type="button" className="btn btn-success" onClick={() => alert('Generando factura...')}>Crear Pago</button>
      </form>
    </div>
  );
}

export default CreatePayment;
