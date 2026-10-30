import { useContext, useReducer, useState } from "react";
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
  const[state, dispatch] = useReducer(apiFetchReduce, initialState)
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
    dispatch({type:'LOADING', payload: true});
    try{
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
      )

      dispatch({type:'LOADING', payload: false});
      navigate('/receptionist/viewAppointments');
    } catch(error){
        dispatch({type:'ERROR', payload: error.message})
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="fullName">Nombre Completo</label>
          <input type="text" className="form-control" id="fullName" name="fullName" value={state.fullName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Documento</label>
          <input type="text" className="form-control" id="document" name="document" value={state.document} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Correo Electronico</label>
          <input type="text" className="form-control" id="email" name="email" value={state.email} onChange={handleChange}required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Numero de telefono</label>
          <input type="text" className="form-control" id="phone" name="phone" value={state.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Direccion</label>
          <input type="text" className="form-control" id="address" name="address" value={state.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre de usuario</label>
          <input type="text" className="form-control" id="userName" name="userName" value={state.userName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={state.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Fecha de Nacimiento</label>
          <input type="date" className="form-control" id="birthDate" name="birthDate" value={state.birthDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Rol</label>
          <select className="form-select" id="rol" name="rol" value={state.rol} onChange={handleChange} required>
            <option value="" disabled>Selecciona un rol</option>
            <option value="DOCTOR">Odontólogo</option>
            <option value="INVENTORY_MANAGER">Gestor de Inventario</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Crear Usuario</button>
      </form>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      )}
    </div>
  );
}

export default CreateUser;
