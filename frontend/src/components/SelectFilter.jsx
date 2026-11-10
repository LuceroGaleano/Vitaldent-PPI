function SelectFilter({ value, onChange, label, options, loading = false }) {
  return (
    <div className="form-floating">
      <select
        className="form-select rounded-3 bg-light shadow-none border-light-subtle"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="text-secondary small">{label}</label>
    </div>
  );
}

export default SelectFilter;
