import { useState } from 'react';

function ViewAppointments() {
  //aqui va la API GET para obtener las citas agendadas

  // Simulación de citas agendadas
  const [citas] = useState([
    { id: 1, paciente: 'Carlos Ruiz', doctor: 'Dr. Gómez', fecha: '2026-10-26 10:00 AM' },
    { id: 2, paciente: 'Ana Torres', doctor: 'Dra. Galeano', fecha: '2026-10-26 11:30 AM' }
  ]);

  return (
    <div>
      <h2 className="text-success mb-4">Citas Agendadas</h2>
      <div className="row">
        {citas.map(cita => (
          <div className="col-md-6 mb-3" key={cita.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{cita.paciente}</h5>
                <p className="card-text text-muted mb-1">Doctor: {cita.doctor}</p>
                <p className="card-text text-muted">{cita.fecha}</p>
                <button className="btn btn-outline-success btn-sm me-2">Actualizar</button>
                <button className="btn btn-outline-danger btn-sm">Cancelar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAppointments;
