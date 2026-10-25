import {useState, useEffect, useContext} from 'react';
import {authContext} from '../context/authContext';
import {useNavigate} from 'react-router-dom';

function OdontologistPortal() {
  const [activeView, setActiveView] = useState('citas');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Menú Lateral */}
      <div className="bg-success text-white p-3 d-flex flex-column" style={{ width: '260px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Odontólogo</p>
        
        <ul className="nav flex-column gap-2 mb-auto">
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'citas' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('citas')}
            >
              Mis Citas
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'crearHistorial' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('crearHistorial')}
            >
              Crear Historial
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'buscarHistorial' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('buscarHistorial')}
            >
              Buscar Historial
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'crearTratamiento' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('crearTratamiento')}
            >
              Crear Tratamiento
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'verTratamientos' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('verTratamientos')}
            >
              Ver Tratamientos
            </button>
          </li>
        </ul>

        <div className="mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-5 overflow-auto">
        {activeView === 'citas' && <MisCitasDoctor />}
        {activeView === 'crearHistorial' && <CrearHistorial />}
        {activeView === 'buscarHistorial' && <BuscarHistorial />}
        {activeView === 'crearTratamiento' && <CrearTratamiento />}
        {activeView === 'verTratamientos' && <VerTratamientos />}
      </div>
    </div>
  );
}
// Componente para mostrar las citas del doctor
function MisCitasDoctor() {
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

// Componente para crear un historial clínico
function CrearHistorial() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear historial'); 
    // aqui va la API POST Historial
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Historial Clínico</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Documento del Paciente</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Observaciones</label>
          <textarea className="form-control" rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Guardar Historial</button>
      </form>
    </div>
  );
}

// Componente para buscar un historial clínico
function BuscarHistorial() {
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

// Componente para crear un nuevo tratamiento
function CrearTratamiento() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear tratamiento'); 
    // aqui va la API POST Tratamiento
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Nuevo Tratamiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del Tratamiento</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Costo Estimado</label>
          <input type="number" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Crear</button>
      </form>
    </div>
  );
}

// Componente para ver la lista de tratamientos
function VerTratamientos() {
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

export default OdontologistPortal;