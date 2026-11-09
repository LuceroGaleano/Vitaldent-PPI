import { useCallback, useReducer } from 'react';
import { apiFetchReducer } from '../reduces/ApiFetchReducer';

const useForm = (initialValues) => {
  const [state, dispatch] = useReducer(apiFetchReducer, initialValues);

  const handleChange = useCallback(({ target }) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        field: target.name,
        value: target.type === 'checkbox' ? target.checked : target.value,
      },
    });
  }, []);

  const setValues = useCallback((values) => {
    dispatch({ type: 'SET_USER', payload: values });
  }, []);

  return { state, handleChange, setValues };
};

export default useForm;
