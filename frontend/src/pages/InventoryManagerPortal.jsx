import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
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

// compente para crear un item
function CrearItem() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Llamando API para crear un nuevo item (POST Item)'); 
    // aqui va la API POST 
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Nuevo Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del Item</label>
          <input type="text" className="form-control" placeholder="Ej: Jeringas Descartables" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Cantidad en Stock</label>
          <input type="number" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Proveedor / Marca</label>
          <input type="text" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Crear Item</button>
      </form>
    </div>
  );
}

// componente para actualizar un item
function VerItems({ onUpdateClick }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // aqui va la API GET Lista de Items
    setItems([
      { id: 1, nombre: 'Guantes de Látex', cantidad: 500, proveedor: 'MedPlus' },
      { id: 2, nombre: 'Anestesia Local (Frascos)', cantidad: 50, proveedor: 'PharmaDent' }
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-success mb-4">Inventario Actual</h2>
      <div className="row">
        {items.map(item => (
          <div className="col-md-6 mb-3" key={item.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{item.nombre}</h5>
                <p className="card-text text-muted mb-1">Stock: {item.cantidad} unidades</p>
                <p className="card-text text-muted">Proveedor: {item.proveedor}</p>
                <button 
                  className="btn btn-outline-success btn-sm"
                  onClick={() => onUpdateClick(item)}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default InventoryManagerPortal;