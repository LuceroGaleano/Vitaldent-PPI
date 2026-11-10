export function SearchFilter({ value, onChange, label, loading = false }) {
  return (
    <div className="form-floating">
      <input
        type="text"
        className="form-control rounded-3 bg-light shadow-none border-light-subtle"
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
      />
      <label className="text-secondary small">{label}</label>
    </div>
  );
}