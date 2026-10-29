import { useContext, useReducer, useState } from "react";
import { apiFetchReduce } from "../../reduces/ApiFetchReduce";
import { postFetch } from "../../fetchs/PostFetch";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: '',
  document: '',
  email: '',
  phone: '',
  address: '',
  birthDate: '',
  rol: '',
  loading: false,
  error: null
};

function CreatePatient() {
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
       await postFetch('http://localhost:8080/receptionist/patient',
         {
           fullName: state.fullName,
           document: state.document,
           email: state.email,
           phone: state.phone,
           address: state.address,
           birthDate: state.birthDate,
         },
         auth.user
       )
 
       dispatch({type:'LOADING', payload: false});
       navigate('/receptionist/viewAppointments');
     } catch(error){
         dispatch({type:'ERROR', payload: error.message})
     }
    }

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-success mb-4">Crear Paciente</h2>
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
          <label className="form-label fw-bold">Fecha de Nacimiento</label>
          <input type="date" className="form-control" id="birthDate" name="birthDate" value={state.birthDate} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Crear Paciente</button>
      </form>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
          {state.error}
        </div>
      )}
    </div>
  );
}

export default CreatePatient;
