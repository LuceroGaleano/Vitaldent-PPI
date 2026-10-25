import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function InventoryManagerPortal() {
const [activeView, setActiveView] = useState('verItems');
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ logged: false, user: null });
    navigate('/');
  };

  // Función para ir a la vista de actualización con un item preseleccionado
  const goToUpdate = (item) => {
    setItemToUpdate(item);
    setActiveView('actualizarItem');
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
              className={`btn w-100 text-start ${activeView === 'verItems' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('verItems')}
            >
              Ver Items
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'crearItem' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('crearItem')}
            >
              Crear Item
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn w-100 text-start ${activeView === 'actualizarItem' ? 'btn-light text-success fw-bold' : 'btn-success text-white'}`}
              onClick={() => setActiveView('actualizarItem')}
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
        {activeView === 'verItems' && <VerItems onUpdateClick={goToUpdate} />}
        {activeView === 'crearItem' && <CrearItem />}
        {activeView === 'actualizarItem' && <ActualizarItem item={itemToUpdate} />}
      </div>
    </div>
  );
}

export default InventoryManagerPortal;