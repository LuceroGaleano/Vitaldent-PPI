import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

// componente para ver un item
function ViewItems() {
  const { onUpdateClick } = useOutletContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // aqui va la API GET Lista de Items

    // Simulación de datos de ejemplo
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

export default ViewItems;
