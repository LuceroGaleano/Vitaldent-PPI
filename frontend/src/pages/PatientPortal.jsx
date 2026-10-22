import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PatientPortal() {
  const [activeView, setActiveView] = useState('disponibles'); // Controla qué vista se muestra
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Menú Lateral (Sidebar) */}
      <div className="bg-success text-white p-3" style={{ width: '250px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Paciente</p>
        
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'disponibles' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('disponibles')}
            >
              Citas Disponibles
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'miscitas' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('miscitas')}
            >
              Mis Citas
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'historial' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('historial')}
            >
              Historial Clínico
            </button>
          </li>
        </ul>

        <div className="mt-auto pt-5">
          <button className="btn btn-outline-light w-100 mb-2">Actualizar Perfil</button>
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-5">
        {activeView === 'disponibles' && <CitasDisponibles />}
        {activeView === 'miscitas' && <MisCitas />}
        {activeView === 'historial' && <HistorialClinico />}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: Citas Disponibles
// ==========================================
function CitasDisponibles() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // API: getCitasDisponibles
    // fetch('http://localhost:8080/api/citas/disponibles')
    //   .then(res => res.json())
    //   .then(data => setCitas(data));
    
    // Datos falsos temporales para que puedas diseñar:
    setCitas([
      { id: 1, doctor: 'Dr. Pérez', fecha: '2026-10-25 10:00 AM' },
      { id: 2, doctor: 'Dra. Gómez', fecha: '2026-10-26 02:00 PM' }
    ]);
  }, []);

  const handleAgendar = (id) => {
    alert(`Llamando API para agendar cita ID: ${id}`);
    // fetch(`http://localhost:8080/api/citas/agendar/${id}`, { method: 'POST' })
  };

  return (
    <div>
      <h2 className="text-success mb-4">Citas Disponibles</h2>
      <div className="row">
        {citas.map(cita => (
          <div className="col-md-6 mb-3" key={cita.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{cita.doctor}</h5>
                <p className="card-text text-muted">{cita.fecha}</p>
                <button className="btn btn-success" onClick={() => handleAgendar(cita.id)}>Agendar (Schedule)</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: Mis Citas
// ==========================================
function MisCitas() {
  const [misCitas, setMisCitas] = useState([]);

  useEffect(() => {
    // API: GetAppointment
    // fetch('http://localhost:8080/api/citas/paciente/1')
    //   .then(res => res.json())
    //   .then(data => setMisCitas(data));

    // Datos falsos temporales:
    setMisCitas([
      { id: 101, doctor: 'Dr. López', fecha: '2026-10-22 09:00 AM', estado: 'Confirmada' }
    ]);
  }, []);

  const handleCancelar = (id) => {
    alert(`Llamando API para cancelar cita ID: ${id}`);
    // fetch(`http://localhost:8080/api/citas/cancelar/${id}`, { method: 'DELETE' })
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

// ==========================================
// COMPONENTE: Historial Clínico
// ==========================================
function HistorialClinico() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // API para traer el historial
    // fetch('http://localhost:8080/api/historial/paciente/1')
    
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