import { API_URL } from "../../config";
import useApiRequest from "../../customHooks/useApiRequest";
import useForm from "../../customHooks/useForm";
import { useNavigate } from "react-router-dom";

const initialForm = {
  fullName: '',
  document: '',
  email: '',
  phone: '',
  address: '',
  birthDate: '',
};

function CreatePatient() {
  const { state: form, handleChange } = useForm(initialForm);
  const { execute: createPatient, loading, error } = useApiRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPatient({
      url: `${API_URL}/receptionist/patient`,
      method: 'POST',
      body: {
        fullName: form.fullName,
        document: form.document,
        email: form.email,
        phone: form.phone,
        address: form.address,
        birthDate: form.birthDate,
      },
    });

    if (result.success) {
      navigate('/receptionist/viewAppointments');
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 p-sm-5 mx-auto" style={{ maxWidth: '800px', width: '100%' }}>
      <h2 className="text-success fw-bold mb-4 text-center">Registrar Paciente</h2>
      
      {error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nombre" disabled={loading} required />
            <label htmlFor="fullName" className="text-secondary small ms-2">Nombre Completo</label>
          </div>
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="document" name="document" value={form.document} onChange={handleChange} placeholder="Documento" disabled={loading} required />
            <label htmlFor="document" className="text-secondary small ms-2">Documento</label>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6 form-floating">
            <input type="email" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Correo" disabled={loading} required />
            <label htmlFor="email" className="text-secondary small ms-2">Correo Electrónico</label>
          </div>
          <div className="col-md-6 form-floating">
            <input type="tel" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" disabled={loading} required />
            <label htmlFor="phone" className="text-secondary small ms-2">Número de Teléfono</label>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="address" name="address" value={form.address} onChange={handleChange} placeholder="Dirección" disabled={loading} required />
            <label htmlFor="address" className="text-secondary small ms-2">Dirección</label>
          </div>
          <div className="col-md-6 form-floating">
            <input type="date" className="form-control form-control-lg rounded-3 border-light-subtle bg-light shadow-none" id="birthDate" name="birthDate" value={form.birthDate} onChange={handleChange} disabled={loading} required />
            <label htmlFor="birthDate" className="text-secondary small ms-2">Fecha de Nacimiento</label>
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-semibold shadow-sm" disabled={loading}>
          {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Guardando...</> : 'Registrar Paciente'}
        </button>
      </form>
    </div>
  );
}

export default CreatePatient;