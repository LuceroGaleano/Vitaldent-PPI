import { useState } from 'react';

// Componente para buscar un historial clínico
function SearchMedicalHistory() {
  const [resultados, setResultados] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // aqui va la API GET Buscar historial por documento
    setResultados([
      { id: 1, fecha: '2026-10-01', observaciones: 'Revisión general ok.' }
    ]);
  };

  return (
    <div>
      <h2 className="text-success mb-4">Buscar Historial</h2>
      <form onSubmit={handleSearch} className="d-flex gap-2 mb-4" style={{ maxWidth: '400px' }}>
        <input type="text" className="form-control" placeholder="Documento del paciente" required />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {resultados.length > 0 && (
        <div className="list-group">
          {resultados.map(res => (
            <div className="list-group-item shadow-sm mb-2 border-0 rounded" key={res.id}>
              <h6 className="text-success">Fecha: {res.fecha}</h6>
              <p className="mb-2">{res.observaciones}</p>
              <button className="btn btn-sm btn-outline-success">Actualizar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchMedicalHistory;
