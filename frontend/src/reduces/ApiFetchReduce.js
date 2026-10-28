export const apiFetchReduce = (state, action = {}) => {
  switch (action.type) {
    case 'OK':
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
        error: null
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};