import { useCallback, useContext, useEffect, useReducer } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiFetch } from '../fetchs/ApiFetch';
import { apiFetchReducer } from '../reduces/ApiFetchReducer';

const initialState = { loading: false, error: null, data: null };
const identity = (data) => data;

const useFetch = ({
  autoExecute = false,
  url: defaultUrl,
  method: defaultMethod,
  body: defaultBody = null,
  mapper: defaultMapper = identity,
} = {}) => {
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(apiFetchReducer, initialState);

  const execute = useCallback(async (request = {}) => {
    const {
      url = defaultUrl,
      method = defaultMethod,
      body = defaultBody,
      mapper = defaultMapper,
    } = request;

    if (!url || !method) {
      throw new Error('La URL y el método son obligatorios para realizar la petición.');
    }

    dispatch({ type: 'LOADING', payload: true });

    try {
      const response = await apiFetch({ url, method, body, token: auth.token });
      const data = mapper(response);
      dispatch({ type: 'SET_DATA', payload: data });
      return { success: true, data };
    } catch (requestError) {
      dispatch({ type: 'ERROR', payload: requestError.message });
      return { success: false, data: null };
    } finally {
      dispatch({ type: 'LOADING', payload: false });
    }
  }, [auth.token, defaultUrl, defaultMethod, defaultBody, defaultMapper]);

  useEffect(() => {
    if (autoExecute) {
      execute();
    }
  }, [autoExecute, execute]);

  return {
    execute,
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
};

export default useFetch;
