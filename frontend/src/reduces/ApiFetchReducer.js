export const apiFetchReducer = (state, action = {}) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SET_USER':
      return{
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
    default:
      return state;
  }
};