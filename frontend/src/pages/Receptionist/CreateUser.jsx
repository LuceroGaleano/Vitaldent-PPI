import { API_URL } from "../../config";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import SuccessModal from "../../components/SuccessModal";
import useSuccessModal from "../../hooks/useSuccessModal";
import useFormValidation from "../../hooks/useFormValidation";
import { getLocalDateString } from "../../utils/date";

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
};

function CreateUser() {
  const { state, handleChange } = useForm(initialState);
  const { execute: createUser, loading, error } = useFetch();
  const navigate = useNavigate();
  const { successMessage, showSuccess, confirmSuccess } = useSuccessModal();
  const { validationClassName, handleInvalid } = useFormValidation();
  const maxBirthDate = getLocalDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createUser({
      url: `${API_URL}/receptionist/user`,
      method: 'POST',
      body: {
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
    });
    if (result.success) {
      showSuccess('Usuario creado correctamente.', () => navigate('/receptionist/viewAppointments'));
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '800px', width: '100%' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Crear Empleado</h2>
      
      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}
      <SuccessModal
        message={successMessage}
        onConfirm={confirmSuccess}
      />

      <form onSubmit={handleSubmit} onInvalid={handleInvalid} className={validationClassName}>
        <h5 className="text-muted small mb-3 border-bottom pb-2">Datos Personales</h5>
        <div className="row g-3 mb-3">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="fullName" name="fullName" value={state.fullName} onChange={handleChange} placeholder="Nombre" disabled={loading} required />
            <label htmlFor="fullName" className="text-secondary small ms-2">Nombre Completo</label>
          </div>
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="document" name="document" value={state.document} onChange={handleChange} placeholder="Documento" disabled={loading} required />
            <label htmlFor="document" className="text-secondary small ms-2">Documento</label>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4 form-floating">
            <input type="email" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="email" name="email" value={state.email} onChange={handleChange} placeholder="Correo" disabled={loading} required />
            <label htmlFor="email" className="text-secondary small ms-2">Correo</label>
          </div>
          <div className="col-md-4 form-floating">
            <input type="tel" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="phone" name="phone" value={state.phone} onChange={handleChange} placeholder="Teléfono" disabled={loading} required />
            <label htmlFor="phone" className="text-secondary small ms-2">Teléfono</label>
          </div>
          <div className="col-md-4 form-floating">
            <input type="date" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="birthDate" name="birthDate" value={state.birthDate} onChange={handleChange} max={maxBirthDate} disabled={loading} required />
            <label htmlFor="birthDate" className="text-secondary small ms-2">Nacimiento</label>
          </div>
        </div>
        
        <div className="form-floating mb-4">
          <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="address" name="address" value={state.address} onChange={handleChange} placeholder="Dirección" disabled={loading} required />
          <label htmlFor="address" className="text-secondary small">Dirección de Residencia</label>
        </div>

        <h5 className="text-muted small mb-3 border-bottom pb-2">Credenciales de Acceso</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="userName" name="userName" value={state.userName} onChange={handleChange} placeholder="Usuario" disabled={loading} required />
            <label htmlFor="userName" className="text-secondary small ms-2">Usuario</label>
          </div>
          <div className="col-md-4 form-floating">
            <input type="password" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="password" name="password" value={state.password} onChange={handleChange} placeholder="Contraseña" disabled={loading} required />
            <label htmlFor="password" className="text-secondary small ms-2">Contraseña</label>
          </div>
          <div className="col-md-4 form-floating">
            <select className="form-select form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="rol" name="rol" value={state.rol} onChange={handleChange} disabled={loading} required>
              <option value="" disabled>Seleccionar...</option>
              <option value="DOCTOR">Odontólogo</option>
              <option value="INVENTORY_MANAGER">Gestor Inventario</option>
              <option value="RECEPTIONIST">Recepcionista</option>
            </select>
            <label htmlFor="rol" className="text-secondary small ms-2">Rol del Sistema</label>
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading} aria-busy={loading}>
          <span
            className={`spinner-border spinner-border-sm me-2${loading ? '' : ' d-none'}`}
            role={loading ? 'status' : undefined}
            aria-hidden={!loading}
          />
          <span translate="no">Crear Usuario</span>
        </button>
      </form>
    </div>
  );
}

export default CreateUser;