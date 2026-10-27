import { useOutletContext } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { postFetchReduce } from '../../reduces/PostFetchReduce';
import { getFetch } from '../../fetchs/GetFetch';

const initialState = {
  loading: false,
  error: null
};

function ViewItems() {
  
  const { onUpdateClick } = useOutletContext();
  const [items, setItems] = useState([]);
  const{auth} = useContext(AuthContext);
  const[state, dispatch] = useReducer(postFetchReduce, initialState);

  const agregarItems = async() =>{
    dispatch({type:'LOANDING', paylaod: true});

    try{
      const data = await getFetch(
        'http://localhost:8080/inventory_manager/item',
        auth.user
      )
       
      dispatch({type:'LOANDING', paylaod: false})
      const items = data.map((item) => ({
        id: item.itemId,
        nombre: item.name,
        stock: item.stock,
        active: item.active
      }))
      setItems(items)
    } catch(error){
      dispatch({type:'ERROR', paylaod: error})
    }
  }

  useEffect(() => {
    agregarItems();
  }, [items]);

  return (
    <div>
      <h2 className="text-success mb-4">Inventario Actual</h2>
      <div className="row">
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
           {state.error}
        </div>
      )}
        {items.map(item => (
          <div className="col-md-6 mb-3" key={item.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{item.nombre}</h5>
                <p className="card-text text-muted mb-1">Stock: {item.stock} unidades</p>
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
