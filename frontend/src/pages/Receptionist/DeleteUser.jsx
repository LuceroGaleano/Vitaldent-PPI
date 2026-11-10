import { API_URL } from "../../config";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import SuccessModal from "../../components/SuccessModal";
import useSuccessModal from "../../hooks/useSuccessModal";
import useFormValidation from "../../hooks/useFormValidation";

const initialState = { document: '' };

function DeleteUser() {
  const { state, handleChange, setValues } = useForm(initialState);
  const { execute: deleteUser, loading, error } = useFetch();
  const { successMessage, showSuccess, confirmSuccess } = useSuccessModal();
  const { validationClassName, handleInvalid } = useFormValidation();

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await deleteUser({
      url: `${API_URL}/receptionist/user/${encodeURIComponent(state.document.trim())}`,
      method: 'DELETE',
    });
    if (result.success) {
      showSuccess('Usuario eliminado correctamente.', () => setValues(initialState));
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
      <div className="text-center mb-4">
        <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
          <span className="fs-3 fw-bold">🗑️</span>
        </div>
        <h2 className="text-danger fw-bold mb-1">Eliminar Usuario</h2>
        <p className="text-muted small">Ingresa el documento del usuario a eliminar.</p>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}
      
      <SuccessModal
        message={successMessage}
        onConfirm={confirmSuccess}
      />
      <form onSubmit={handleSearch} onInvalid={handleInvalid} className={validationClassName}>
          <div className="form-floating mb-4">
            <input 
              type="text" 
              className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" 
              placeholder="Buscar por documento..."  
              id="document" 
              name="document" 
              value={state.document} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />
            <label htmlFor="document" className="text-secondary small">Documento del usuario</label>
          </div>
          <button type="submit" className="btn btn-danger btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading} aria-busy={loading}>
            <span
              className={`spinner-border spinner-border-sm me-2${loading ? '' : ' d-none'}`}
              role={loading ? 'status' : undefined}
              aria-hidden={!loading}
            />
            <span translate="no">Eliminar Usuario</span>
          </button>
      </form>

      
    </div>
    
  );
}

export default DeleteUser;