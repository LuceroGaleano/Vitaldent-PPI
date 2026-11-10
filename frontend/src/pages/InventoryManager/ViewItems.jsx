import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { 
  FaSyringe, FaTooth, FaBox, FaMask, 
  FaHandPaper, FaPrescriptionBottleAlt, FaBandAid, FaPumpSoap 
} from 'react-icons/fa';
import { SearchFilter } from '../../components/SearchFilter';
import SelectFilter from '../../components/SelectFilter';
import useSearchFilter from '../../hooks/useSearchFilter';
import useStatusFilter from '../../hooks/useStatusFilter';

const mapItems = (data) => data.map((item) => ({
  id: item.itemId,
  name: item.name,
  stock: item.stock,
  active: item.active,
}));

function ViewItems() {
  const navigate = useNavigate();
  const {
    data: itemData,
    loading,
    error,
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/inventory_manager/item`,
    method: 'GET',
    mapper: mapItems,
  });

  const items = itemData ?? [];
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: searchedItems,
  } = useSearchFilter(items, 'name');
  const {
    filterValue: activeFilter,
    setFilterValue: setActiveFilter,
    filteredItems,
  } = useStatusFilter(searchedItems, 'active');

  // Función para asignar íconos dinámicamente según el nombre del insumo
  const getItemIcon = () => {
    return <div className="bg-dark bg-opacity-10 text-dark p-2 rounded-3 d-inline-flex"><FaBox size={18} /></div>;
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '1000px' }}>
      
      {/* Encabezado y Buscador */}
      <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 bg-white">
        <div className="row align-items-center g-3">
          <div className="col-md-4">
            <h2 className="text-success fw-bold mb-0">Inventario Actual</h2>
          </div>
          {/*Filtro de busqeuda*/}
          <div className="col-md-5">
            <SearchFilter
              value={searchTerm}
              onChange={setSearchTerm}
              label="Buscar por nombre..."
              loading={loading}
            />
          </div>
          <div className="col-md-3">
            <SelectFilter
              value={activeFilter}
              onChange={setActiveFilter}
              label="Filtrar por estado"
              loading={loading}
              options={[
                { value: '', label: 'Todos' },
                { value: 'true', label: 'Activo' },
                { value: 'false', label: 'Inactivo' },
              ]}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
           {error}
        </div>
      )}

      {/* Tabla Interactiva */}
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
        {loading || (itemData === null && !error) ? (
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
                        <span className={`badge ${item.active ? 'bg-success' : 'bg-danger'} bg-opacity-10 ${item.active ? 'text-success' : 'text-danger'} border px-2 py-1 rounded`}>
                          {item.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <button 
                          className="btn btn-outline-success btn-sm rounded-3 fw-semibold px-3 shadow-sm"
                          onClick={() => navigate(`/inventoryManager/items/${item.id}/editar`)}
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