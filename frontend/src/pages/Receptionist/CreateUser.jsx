import { useContext, useReducer } from "react";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { postFetch } from "../../fetchs/PostFetch";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

function CreateUser() {
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: 'OK',
      payload: { field: e.target.name, value: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING', payload: true });
    try {
      await postFetch('http://localhost:8080/receptionist/user',
        {
          userName: state.userName,
          fullName: state.fullName,
          document: state.document,
          password: state.password,
          email: state.email,
          phone: state.phone,
          address: state.address,
          birthDate: state.birthDate,
          rol: state.rol
        },
        auth.user
      );

      dispatch({ type: 'LOADING', payload: false });
      navigate('/receptionist/viewAppointments');
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '800px', width: '100%' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Crear Empleado</h2>
      
      {state.error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {state.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h5 className="text-muted small mb-3 border-bottom pb-2">Datos Personales</h5>
        <div className="row g-3 mb-3">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="fullName" name="fullName" value={state.fullName} onChange={handleChange} placeholder="Nombre" disabled={state.loading} required />
            <label htmlFor="fullName" className="text-secondary small ms-2">Nombre Completo</label>
          </div>
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="document" name="document" value={state.document} onChange={handleChange} placeholder="Documento" disabled={state.loading} required />
            <label htmlFor="document" className="text-secondary small ms-2">Documento</label>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4 form-floating">
            <input type="email" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="email" name="email" value={state.email} onChange={handleChange} placeholder="Correo" disabled={state.loading} required />
            <label htmlFor="email" className="text-secondary small ms-2">Correo</label>
          </div>
          <div className="col-md-4 form-floating">
            <input type="tel" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="phone" name="phone" value={state.phone} onChange={handleChange} placeholder="Teléfono" disabled={state.loading} required />
            <label htmlFor="phone" className="text-secondary small ms-2">Teléfono</label>
          </div>
          <div className="col-md-4 form-floating">
            <input type="date" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="birthDate" name="birthDate" value={state.birthDate} onChange={handleChange} disabled={state.loading} required />
            <label htmlFor="birthDate" className="text-secondary small ms-2">Nacimiento</label>
          </div>
        </div>
        
        <div className="form-floating mb-4">
          <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="address" name="address" value={state.address} onChange={handleChange} placeholder="Dirección" disabled={state.loading} required />
          <label htmlFor="address" className="text-secondary small">Dirección de Residencia</label>
        </div>

        <h5 className="text-muted small mb-3 border-bottom pb-2">Credenciales de Acceso</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="userName" name="userName" value={state.userName} onChange={handleChange} placeholder="Usuario" disabled={state.loading} required />
            <label htmlFor="userName" className="text-secondary small ms-2">Usuario</label>
          </div>
          <div className="col-md-4 form-floating">
            <input type="password" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="password" name="password" value={state.password} onChange={handleChange} placeholder="Contraseña" disabled={state.loading} required />
            <label htmlFor="password" className="text-secondary small ms-2">Contraseña</label>
          </div>
          <div className="col-md-4 form-floating">
            <select className="form-select form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="rol" name="rol" value={state.rol} onChange={handleChange} disabled={state.loading} required>
              <option value="" disabled>Seleccionar...</option>
              <option value="DOCTOR">Odontólogo</option>
              <option value="INVENTORY_MANAGER">Gestor Inventario</option>
              <option value="RECEPTIONIST">Recepcionista</option>
            </select>
            <label htmlFor="rol" className="text-secondary small ms-2">Rol del Sistema</label>
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={state.loading}>
          {state.loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Guardando...</> : 'Crear Usuario'}
        </button>
      </form>
    </div>
  );
}

export default CreateUser;