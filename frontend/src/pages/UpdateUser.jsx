import { useContext, useEffect } from "react";
import { API_URL } from '../config';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import useForm from "../customHooks/useForm";

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

function UpdateUser() {
  const { state, handleChange, setValues } = useForm(initialState);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    data: userData,
    loading: loadingUser,
    error: loadError,
  } = useFetch({
    autoExecute: true,
    url: `${API_URL}/user/user/${auth.document}`,
    method: 'GET',
  });
  const {
    execute: saveProfile,
    loading: saving,
    error: saveError,
  } = useFetch();
  const loading = loadingUser || saving;
  const error = loadError || saveError;

  useEffect(() => {
    if (userData) {
      setValues({
        ...userData,
        birthDate: userData.birthDate?.split('T')[0] ?? ''
      });
    }
  }, [userData, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await saveProfile({
      url: `${API_URL}/user/profile`,
      method: 'PUT',
      body: {
        userName: state.userName,
        fullName: state.fullName,
        document: state.document,
        email: state.email,
        phone: state.phone,
        address: state.address,
        birthDate: state.birthDate,
        rol: state.rol,
        ...(state.password ? { password: state.password } : {})
      },
    });
    if (result.success) {
      if (state.rol === 'PATIENT') {
        navigate('/patient/citasDisponibles');
      } else if (state.rol === 'INVENTORY_MANAGER') {
        navigate('/inventoryManager/viewItems');
      } else if (state.rol === 'RECEPTIONIST') {
        navigate('/receptionist/createAppointment');
      } else if (state.rol === "DOCTOR") {
        navigate('/odontologist/appointments');
      }
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 bg-white">
        <div className="text-center mb-4">
          <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
            <span className="fs-3 fw-bold">⚙️</span>
          </div>
          <h2 className="text-success fw-bold mb-1">Mi Perfil</h2>
          <p className="text-muted small">Actualiza tu información personal y credenciales de acceso.</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
            {error}
          </div>
        )}

        {loadingUser && !state.fullName ? (
          <div className="text-center py-5">
            <span className="spinner-border text-success" role="status"></span>
            <p className="text-muted mt-2 small">Cargando perfil...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            
            <h5 className="text-muted small mb-3 border-bottom pb-2">Información Personal</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6 form-floating">
                <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="fullName" name="fullName" value={state.fullName} onChange={handleChange} placeholder="Nombre" required disabled={loading} />
                <label htmlFor="fullName" className="text-secondary small ms-2">Nombre Completo</label>
              </div>
              <div className="col-md-6 form-floating">
                <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="document" name="document" value={state.document} onChange={handleChange} placeholder="Documento" required disabled={loading} />
                <label htmlFor="document" className="text-secondary small ms-2">Documento de Identidad</label>
              </div>
            </div>

            <h5 className="text-muted small mb-3 border-bottom pb-2">Contacto y Residencia</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-6 form-floating">
                <input type="email" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="email" name="email" value={state.email} onChange={handleChange} placeholder="Correo" required disabled={loading} />
                <label htmlFor="email" className="text-secondary small ms-2">Correo Electrónico</label>
              </div>
              <div className="col-md-6 form-floating">
                <input type="tel" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="phone" name="phone" value={state.phone} onChange={handleChange} placeholder="Teléfono" required disabled={loading} />
                <label htmlFor="phone" className="text-secondary small ms-2">Número de Teléfono</label>
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-6 form-floating">
                <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="address" name="address" value={state.address} onChange={handleChange} placeholder="Dirección" required disabled={loading} />
                <label htmlFor="address" className="text-secondary small ms-2">Dirección de Residencia</label>
              </div>
              <div className="col-md-6 form-floating">
                <input type="date" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="birthDate" name="birthDate" value={state.birthDate} onChange={handleChange} required disabled={loading} />
                <label htmlFor="birthDate" className="text-secondary small ms-2">Fecha de Nacimiento</label>
              </div>
            </div>

            <h5 className="text-muted small mb-3 border-bottom pb-2">Datos de Cuenta</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-4 form-floating">
                <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="userName" name="userName" value={state.userName} onChange={handleChange} placeholder="Usuario" required disabled={loading} />
                <label htmlFor="userName" className="text-secondary small ms-2">Usuario</label>
              </div>
              <div className="col-md-4 form-floating">
                <input type="password" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="password" name="password" value={state.password} onChange={handleChange} autoComplete="new-password" placeholder="Contraseña" disabled={loading} />
                <label htmlFor="password" className="text-secondary small ms-2">Nueva Contraseña</label>
              </div>
              <div className="col-md-4 form-floating">
                <select className="form-select form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="rol" name="rol" value={state.rol} onChange={handleChange} disabled>
                  <option value="" disabled>Seleccionar...</option>
                  <option value="DOCTOR">Odontólogo</option>
                  <option value="RECEPTIONIST">Recepcionista</option>
                  <option value="INVENTORY_MANAGER">Gestor de Inventario</option>
                  <option value="PATIENT">Paciente</option>
                </select>
                <label htmlFor="rol" className="text-secondary small ms-2">Rol Asignado</label>
              </div>
            </div>
            
            <div className="alert alert-info py-2 small text-center border-0 bg-primary bg-opacity-10 text-primary rounded-3 mb-4">
              Dejar el campo de "Nueva Contraseña" vacío si no deseas cambiarla.
            </div>

            <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Guardando Cambios...</> : 'Actualizar Perfil'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateUser;
