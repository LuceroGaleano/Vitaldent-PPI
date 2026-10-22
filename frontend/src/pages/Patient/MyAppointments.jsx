import React, { useState, useEffect } from 'react'

export function MisCitas() {
  const [misCitas, setMisCitas] = useState([]);

  useEffect(() => {
    // aqui va la llamada a la API para obtener las citas agendadas del paciente

    // Datos falsos temporales:
    setMisCitas([
      { id: 101, doctor: 'Dr. Gomez', fecha: '2026-10-22 09:00 AM', estado: 'Confirmada' }
    ]);
  }, []);

  const handleCancelar = (id) => {
    alert(`Llamando API para cancelar cita ID: ${id}`);
    // aqui iría la llamada a la API para cancelar la cita y luego actualizar el estado de las citas agendadas
  };

  return (
    <div>
      <h2 className="text-success mb-4">Mis Citas Agendadas</h2>
      <div className="list-group">
        {misCitas.map(cita => (
          <div className="list-group-item d-flex justify-content-between align-items-center p-3 shadow-sm mb-2 border-0 rounded" key={cita.id}>
            <div>
              <h5 className="mb-1 text-primary">{cita.doctor}</h5>
              <small className="text-muted">{cita.fecha}</small>
            </div>
            <button className="btn btn-outline-danger" onClick={() => handleCancelar(cita.id)}>Cancelar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisCitas;