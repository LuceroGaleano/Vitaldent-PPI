import { useContext, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";
import {postFetchReduce } from "../reduces/PostFetchReduce";
import { postFetch } from "../fetchs/PostFetch";


function ReceptionistPortal() {
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
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#128c5a' }}>Portal Recepcionista</h1>
      <p>Bienvenido al módulo de recepción.</p>
      {state.error ? (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      ) : (
        <div className="alert alert-success py-2 small text-center" role="alert">
          Todo correcto
        </div>
      )}

      <pre>
        {JSON.stringify(auth.user, null, 3)}
      </pre>
      <h3>Estado de la petición / Resultado:</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '5px' }}>
        {JSON.stringify(state, null, 3)}
      </pre>

      <button onClick={agregarUsuario}>Agregar usuario</button>
    </div>
  );
}

export default ReceptionistPortal;