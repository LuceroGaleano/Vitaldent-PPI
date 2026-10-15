
const initialState = {
  username: '',
  password: '',
  loading: false,
  error: null
};

export const loginReducer = (state = initialState, action = {}) => {
switch(action.type){
        case 'OK':
            return{
                ...state, [action.payload.field]: action.payload.value
            };
        case "LOADING":
            return {
                ...state, loading: action.payload, error: null
            };
        case "ERROR":
            return {
                ...state, loading: false, error: action.payload
            };
        default:
            return state;
    }
};

export {initialState}