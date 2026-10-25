import { useContext, useReducer, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {postFetchReduce } from "../reduces/PostFetchReduce";
import { postFetch } from "../fetchs/PostFetch";
import { useNavigate } from "react-router-dom";


function ReceptionistPortal() {
  const [activeView, setActiveView] = useState('crearCita');
  const {auth} = useContext(AuthContext);
    const initialState = {
    userName: '',
    fullName: '',
    document: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    rol: '',
    loading: false,
    error: null
  };
  const navigate = useNavigate();
  //manejo de logout
  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  // Definición de los elementos del menú lateral
  const navItems = [
    { id: 'crearCita', label: 'Crear Cita' },
    { id: 'verCitas', label: 'Ver Citas' },
    { id: 'crearPaciente', label: 'Crear Paciente' },
    { id: 'crearUsuario', label: 'Crear Usuario' },
    { id: 'eliminarUsuario', label: 'Eliminar Usuario' },
    { id: 'verHistorial', label: 'Ver Historial' },
    { id: 'crearPago', label: 'Crear Pago' },
    { id: 'verPagos', label: 'Ver Pagos' }
  ];

  const [state, dispatch] = useReducer(postFetchReduce, initialState);

  const agregarUsuario = async() =>{
    dispatch({type: 'LOANDING', payloand:true});

    try{
      const data = await postFetch(
        'http://localhost:8080/receptionist/user',
        {
            userName: 'prueba3',
            fullName: 'prueba3',
            document: '1000000088',
            password: '123456',
            email: 'prueba3@test.com',
            phone: '3000000003',
            address: 'Calle 2',
            birthDate: '1990-01-01T05:00:00.000Z',
            rol: 'INVENTORY_MANAGER'
        },
        auth.user
      )
      dispatch({type: 'LOANDING', payload:false});
      console.log(data);
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Menú Lateral */}
      <div className="bg-success text-white p-3 d-flex flex-column" style={{ width: '260px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Recepcionista</p>
        
        <ul className="nav flex-column gap-2 mb-auto overflow-auto">
          {navItems.map(item => (
            <li className="nav-item" key={item.id}>
              <button 
                className={`btn w-100 text-start ${activeView === item.id ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
                onClick={() => setActiveView(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-5 overflow-auto" style={{ maxHeight: '100vh' }}>
        {activeView === 'crearCita' && <CrearCita />}
        {activeView === 'verCitas' && <VerCitas />}
        {activeView === 'crearPaciente' && <CrearPaciente />}
        {activeView === 'crearUsuario' && <CrearUsuario />}
        {activeView === 'eliminarUsuario' && <EliminarUsuario />}
        {activeView === 'verHistorial' && <VerHistorial />}
        {activeView === 'crearPago' && <CrearPago />}
        {activeView === 'verPagos' && <VerPagos />}
      </div>
    </div>
  );
}

// componente para crear cita
function CrearCita() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear cita'); 
    // aqui va la API POST para crear cita
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Agendar Nueva Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Documento del Paciente</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Doctor Asignado</label>
          <select className="form-select">
            <option>Dr. Gómez</option>
            <option>Dra. Galeano</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Fecha y Hora</label>
          <input type="datetime-local" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Crear Cita</button>
      </form>
    </div>
  );
}

// componente para ver citas
function VerCitas() {
  // aqui va la API GET Lista de Citas

  // Simulación de datos de ejemplo
  const [citas, setCitas] = useState([
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

// componente para crear paciente
function CrearPaciente() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear paciente (Y su usuario automáticamente)'); 
    // aqui va la API POST para crear paciente 
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Registrar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre Completo</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Documento</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Correo Electrónico</label>
          <input type="email" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Registrar</button>
      </form>
    </div>
  );
}

// componente para crear usuario
function CrearUsuario() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear usuario administrativo'); 
    // aqui va la API POST para crear usuario administrativo
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Empleado (Doctor/Inventario)</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Rol</label>
          <select className="form-select" required>
            <option value="DOCTOR">Odontólogo</option>
            <option value="INVENTORY">Gestor de Inventario</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Crear Usuario</button>
      </form>
    </div>
  );
}
// componente para eliminar usuario
function EliminarUsuario() {
  const [usuario, setUsuario] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    //aqui va la API GET Buscar usuario por documento


    // Simulando API GET para buscar usuario por documento
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

//componente para ver historial
function VerHistorial() {
  // aqui va la API GET Lista de Historiales

  return (
    <div>
      <h2 className="text-success mb-4">Todos los Historiales</h2>
      <p className="text-muted">Aquí irá la tabla general de historiales consultando la API[cite: 23].</p>
    </div>
  );
}

//componente para crear pago
function CrearPago() {
  // aqui va la API POST para crear pago

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

export default ReceptionistPortal;