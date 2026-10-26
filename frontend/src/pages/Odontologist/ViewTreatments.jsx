import { useEffect, useState } from 'react';

// Componente para ver la lista de tratamientos
function ViewTreatments() {
  const [tratamientos, setTratamientos] = useState([]);

  useEffect(() => {
    // aqui va la API GET Lista de Tratamientos

    // Simulación de datos de ejemplo
    setTratamientos([
      { id: 1, nombre: 'Ortodoncia Básica', costo: 1500000 },
      { id: 2, nombre: 'Limpieza Profunda', costo: 120000 }
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-success mb-4">Lista de Tratamientos</h2>
      <div className="row">
        {tratamientos.map(t => (
          <div className="col-md-6 mb-3" key={t.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{t.nombre}</h5>
                <p className="card-text text-muted">Costo: ${t.costo}</p>
                <button className="btn btn-outline-success btn-sm">Actualizar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTreatments;
