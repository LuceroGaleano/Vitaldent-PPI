import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ItemContext } from '../../context/ItemContext';
import { useNavigate, Outlet } from 'react-router-dom';

function InventoryManagerPortal() {
  const { setAuth } = useContext(AuthContext);
  const { setItem } = useContext(ItemContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  // Funcion para pasar de ViewItem
  const goToUpdate = (item) => {
    setItem(item);
    navigate('/inventoryManager/updateItem');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Menú Lateral */}
      <div className="bg-success text-white p-3 d-flex flex-column" style={{ width: '260px' }}>
        <h3 className="fw-bold mb-4">Vitaldent</h3>
        <p className="small mb-4">Portal Inventario</p>
        
        <ul className="nav flex-column gap-2 mb-auto">
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/inventoryManager/viewItems')}
            >
              Ver Items
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/inventoryManager/createItem')}
            >
              Crear Item
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="btn btn-success w-100 text-start text-white"
              onClick={() => navigate('/inventoryManager/updateItem')}
            >
              Actualizar Item
            </button>
          </li>
        </ul>

        <div className="mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-5 overflow-auto">
        <Outlet context={{ onUpdateClick: goToUpdate }} />
      </div>
    </div>
  );
}

export default InventoryManagerPortal;