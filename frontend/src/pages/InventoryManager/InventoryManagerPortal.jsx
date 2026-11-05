import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ItemContext } from '../../context/ItemContext';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { 
  FaBoxes, FaPlusSquare, FaEdit, 
  FaUserEdit, FaSignOutAlt 
} from 'react-icons/fa';

function InventoryManagerPortal() {
  const { setAuth } = useContext(AuthContext);
  const { setItem } = useContext(ItemContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  const goToUpdate = (item) => {
    setItem(item);
    navigate('/inventoryManager/updateItem');
  };

  // Función para los estilos del enlace activo
  const getNavLinkClass = ({ isActive }) => 
    `btn w-100 text-start d-flex align-items-center gap-3 py-2 px-3 rounded-3 mb-1 border-0 transition-all ${
      isActive 
        ? 'bg-white text-success fw-bold shadow-sm' 
        : 'bg-transparent text-white opacity-75 hover-opacity-100'
    }`;

  return (
    <div className="d-flex min-vh-100 bg-light">
      
      {/* Menú Lateral Premium */}
      <div className="text-white p-4 d-flex flex-column shadow-lg" style={{ width: '280px', background: 'linear-gradient(180deg, #198754 0%, #146c43 100%)' }}>
        
        {/* Encabezado del Menú */}
        <div className="mb-4 text-center">
          <div className="bg-white text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ width: '50px', height: '50px' }}>
            <span className="fs-4 fw-bold">V</span>
          </div>
          <h4 className="fw-bold mb-0">Vitaldent</h4>
          <span className="badge bg-white text-success bg-opacity-25 mt-1 fw-normal">Inventario</span>
        </div>
        
        {/* Opciones de Navegación */}
        <div className="nav flex-column mb-auto mt-2">
          
          <small className="text-white-50 fw-bold text-uppercase mb-2" style={{fontSize: '0.7rem'}}>Gestión de Stock</small>
          
          <NavLink to="/inventoryManager/viewItems" className={getNavLinkClass}>
            <FaBoxes size={18} /> Ver Inventario
          </NavLink>
          
          <NavLink to="/inventoryManager/createItem" className={getNavLinkClass}>
            <FaPlusSquare size={18} /> Nuevo Insumo
          </NavLink>
          
          <NavLink to="/inventoryManager/updateItem" className={getNavLinkClass}>
            <FaEdit size={18} /> Editar Insumo
          </NavLink>

        </div>

        {/* Botones de Acción Final */}
        <div className="mt-4 pt-3 border-top border-white border-opacity-25">
          <NavLink to="/inventoryManager/actualizarUsuario" className={getNavLinkClass}>
            <FaUserEdit size={18} /> Mi Perfil
          </NavLink>
          <button 
            className="btn btn-danger w-100 mt-2 d-flex align-items-center justify-content-center gap-2 rounded-3" 
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh', backgroundColor: '#f4f6f8' }}>
        <div className="container-fluid max-w-7xl">
          <Outlet context={{ onUpdateClick: goToUpdate }} />
        </div>
      </div>
    </div>
  );
}

export default InventoryManagerPortal;