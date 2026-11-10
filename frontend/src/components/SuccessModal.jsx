function SuccessModal({ message, onConfirm }) {
  if (!message) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ zIndex: 1055, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4 text-center"
        style={{ width: '100%', maxWidth: '420px' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <div className="text-success fs-1 mb-2" aria-hidden="true">✅</div>
        <h2 id="success-modal-title" className="h5 fw-bold text-dark mb-2">
          Proceso exitoso
        </h2>
        <p className="text-muted mb-4">{message}</p>
        <button type="button" className="btn btn-success px-4" onClick={onConfirm} autoFocus>
          OK
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
