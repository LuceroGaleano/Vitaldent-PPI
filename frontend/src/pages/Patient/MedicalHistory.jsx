import React, { useState, useEffect } from 'react'

export function HistorialClinico() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // aqui va la llamada a la API para obtener el historial clínico del paciente
    
    // Datos falsos temporales:
    setHistorial([
      { id: 1, fecha: '2026-05-10', descripcion: 'Limpieza dental de rutina.' },
      { id: 2, fecha: '2026-08-15', descripcion: 'Tratamiento de caries en molar superior derecho.' }
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-success mb-4">Historial Clínico</h2>
      {historial.map(item => (
        <div className="card border-success mb-3 shadow-sm" key={item.id}>
          <div className="card-header bg-success text-white">Fecha: {item.fecha}</div>
          <div className="card-body">
            <p className="card-text">{item.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistorialClinico;