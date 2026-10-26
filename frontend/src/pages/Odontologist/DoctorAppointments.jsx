import { useEffect, useState } from 'react';

// Componente para mostrar las citas del doctor
function DoctorAppointments() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // aqui va la API  para listar citas del doctor


    // Simulación de datos de ejemplo
    setCitas([
      { id: 1, paciente: 'Juan Pérez', documento: '12345678', fecha: '2026-10-26 10:00 AM' },
      { id: 2, paciente: 'María Gómez', documento: '87654321', fecha: '2026-10-26 11:30 AM' }
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-success mb-4">Mis Citas Agendadas</h2>
      <div className="list-group">
        {citas.map(cita => (
          <div className="list-group-item p-3 shadow-sm mb-2 border-0 rounded" key={cita.id}>
            <h5 className="mb-1 text-primary">Paciente: {cita.paciente}</h5>
            <p className="mb-1 text-muted">Documento: {cita.documento}</p>
            <small className="fw-bold text-secondary">{cita.fecha}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments;
