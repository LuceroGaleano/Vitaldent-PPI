import { useState } from 'react';

function DeleteUser() {
  const [usuario, setUsuario] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    //aqui va la API GET para buscar el usuario por documento

    // datos de simulación para el usuario encontrado
    setUsuario({ id: 99, nombre: 'Luis F.', rol: 'PACIENTE', documento: '112233' });
  };

  return (
    <div>
      <h2 className="text-success mb-4">Eliminar Usuario</h2>
      <form onSubmit={handleSearch} className="d-flex gap-2 mb-4" style={{ maxWidth: '400px' }}>
        <input type="text" className="form-control" placeholder="Buscar por documento..." required />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {usuario && (
        <div className="card shadow-sm border-danger" style={{ maxWidth: '400px' }}>
          <div className="card-body text-center">
            <h5 className="card-title">{usuario.nombre}</h5>
            <p className="text-muted">Documento: {usuario.documento} | Rol: {usuario.rol}</p>
            <button className="btn btn-danger w-100" onClick={() => alert('Llamando API DELETE')}>
              Confirmar Eliminación
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteUser;
