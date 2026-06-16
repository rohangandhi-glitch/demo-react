// Multi-select shown as removable chips with a dropdown to add more.
export default function TagSelect({ value = [], options = [], placeholder = 'Select', onChange }) {
  const remaining = options.filter((o) => !value.includes(o))

  const add = (opt) => {
    if (opt && !value.includes(opt)) onChange?.([...value, opt])
  }
  const remove = (opt) => onChange?.(value.filter((v) => v !== opt))

  return (
    <div className="tag-select">
      {value.map((tag) => (
        <span className="tag-chip" key={tag}>
          {tag}
          <button
            type="button"
            className="tag-remove"
            aria-label={`Remove ${tag}`}
            onClick={() => remove(tag)}
          >
            ×
          </button>
        </span>
      ))}
      {value.length === 0 && <span className="tag-placeholder">{placeholder}</span>}
      <select
        className="tag-add"
        value=""
        onChange={(e) => add(e.target.value)}
        aria-label="Add option"
      >
        <option value="" disabled>
          +
        </option>
        {remaining.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
