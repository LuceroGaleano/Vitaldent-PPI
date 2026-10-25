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

export default ReceptionistPortal;