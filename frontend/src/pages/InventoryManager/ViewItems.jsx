import { useOutletContext } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';
import { getFetch } from '../../fetchs/GetFetch';
import { 
  FaSyringe, FaTooth, FaBox, FaMask, 
  FaHandPaper, FaPrescriptionBottleAlt, FaBandAid, FaPumpSoap 
} from 'react-icons/fa';

const initialState = { loading: true, error: null };

function ViewItems() {
  const { onUpdateClick } = useOutletContext();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);

  const loadItems = async () => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const data = await getFetch('http://localhost:8080/inventory_manager/item', auth.user);
      dispatch({ type: 'LOADING', payload: false });
      const mappedItems = data.map((item) => ({
        id: item.itemId,
        name: item.name,
        stock: item.stock,
        active: item.active
      }));
      setItems(mappedItems);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => { loadItems(); }, []);

  // Función de filtro local
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para asignar íconos dinámicamente según el nombre del insumo
  const getItemIcon = (name) => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('jeringa') || lowerName.includes('aguja')) 
      return <div className="bg-info bg-opacity-10 text-info p-2 rounded-3 d-inline-flex"><FaSyringe size={18} /></div>;
    
    if (lowerName.includes('guante')) 
      return <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-3 d-inline-flex"><FaHandPaper size={18} /></div>;
    
    if (lowerName.includes('cepillo') || lowerName.includes('hilo') || lowerName.includes('dental')) 
      return <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3 d-inline-flex"><FaTooth size={18} /></div>;
    
    if (lowerName.includes('mascarilla') || lowerName.includes('tapaboca')) 
      return <div className="bg-success bg-opacity-10 text-success p-2 rounded-3 d-inline-flex"><FaMask size={18} /></div>;
    
    if (lowerName.includes('anestesia') || lowerName.includes('liquido') || lowerName.includes('enjuague') || lowerName.includes('resina')) 
      return <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-3 d-inline-flex"><FaPrescriptionBottleAlt size={18} /></div>;
    
    if (lowerName.includes('algodon') || lowerName.includes('algodón') || lowerName.includes('gasa')) 
      return <div className="bg-secondary bg-opacity-10 text-secondary p-2 rounded-3 d-inline-flex"><FaBandAid size={18} /></div>;
    
    if (lowerName.includes('jabón') || lowerName.includes('jabon') || lowerName.includes('gel')) 
      return <div className="bg-info bg-opacity-10 text-info p-2 rounded-3 d-inline-flex"><FaPumpSoap size={18} /></div>;
    
    // Ícono por defecto (Caja genérica)
    return <div className="bg-dark bg-opacity-10 text-dark p-2 rounded-3 d-inline-flex"><FaBox size={18} /></div>;
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      
      {/* Encabezado y Buscador */}
      <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 bg-white">
        <div className="row align-items-center g-3">
          <div className="col-md-6">
            <h2 className="text-success fw-bold mb-0">Inventario Actual</h2>
            <p className="text-muted small mb-0">Total: {items.length} insumos registrados.</p>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input 
                type="text" 
                className="form-control rounded-3 bg-light shadow-none border-light-subtle" 
                placeholder="Buscar insumo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={state.loading}
              />
              <label className="text-secondary small">🔍 Buscar por nombre...</label>
            </div>
          </div>
        </div>
      </div>

      {state.error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
           {state.error}
        </div>
      )}

      {/* Tabla Interactiva */}
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
        {state.loading ? (
          <div className="text-center py-5">
            <span className="spinner-border text-success" role="status"></span>
            <p className="text-muted mt-2 small">Cargando inventario...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-secondary fw-semibold py-3">Insumo</th>
                  <th className="text-secondary fw-semibold py-3 text-center">Stock</th>
                  <th className="text-secondary fw-semibold py-3 text-center">Estado</th>
                  <th className="text-secondary fw-semibold py-3 text-end px-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <tr key={item.id}>

                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {getItemIcon(item.name)}
                          <span className="fw-semibold text-dark">{item.name}</span>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${item.stock > 10 ? 'bg-info bg-opacity-10 text-info border-info' : 'bg-danger bg-opacity-10 text-danger border-danger'} border px-3 py-2 rounded-pill`}>
                          {item.stock} uds
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${item.active ? 'bg-success' : 'bg-secondary'} bg-opacity-10 ${item.active ? 'text-success' : 'text-secondary'} border px-2 py-1 rounded`}>
                          {item.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <button 
                          className="btn btn-outline-success btn-sm rounded-3 fw-semibold px-3 shadow-sm"
                          onClick={() => onUpdateClick(item)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No se encontraron insumos que coincidan con la búsqueda "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewItems;