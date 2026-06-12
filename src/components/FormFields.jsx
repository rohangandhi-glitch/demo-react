import { Info, ChevronDown, ChevronSort, Check } from './Icons'

export function Label({ children, required, info }) {
  return (
    <span className="field-label">
      <span>
        {children}
        {required && <span className="req"> *</span>}
      </span>
      {info && <Info className="muted-icon" />}
    </span>
  )
}

export function TextField({ label, required, info, placeholder, value, onChange, className = '' }) {
  return (
    <div className={`field ${className}`}>
      {label && (
        <Label required={required} info={info}>
          {label}
        </Label>
      )}
      <div className="input-control">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  )
}

export function SelectField({ label, required, info, placeholder, value, options = [], onChange, className = '' }) {
  return (
    <div className={`field ${className}`}>
      {label && (
        <Label required={required} info={info}>
          {label}
        </Label>
      )}
      <div className="input-control select-control">
        <select
          className={value ? '' : 'is-placeholder'}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={10} className="muted-icon select-caret" />
      </div>
    </div>
  )
}

export function DateField({ label, value, onChange }) {
  return (
    <div className="date-field">
      <span className="field-label inline">{label}</span>
      <div className="date-control">
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <ChevronDown size={10} className="muted-icon" />
      </div>
    </div>
  )
}

export function Radio({ label, checked, onChange }) {
  return (
    <button
      type="button"
      className={`radio${checked ? ' is-checked' : ''}`}
      onClick={onChange}
    >
      <span className="radio-mark" />
      <span className="choice-label">{label}</span>
    </button>
  )
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <button
      type="button"
      className={`checkbox${checked ? ' is-checked' : ''}`}
      onClick={onChange}
    >
      <span className="checkbox-mark">{checked && <Check size={10} />}</span>
      <span className="choice-label">{label}</span>
    </button>
  )
}

export function Stepper({ value, onChange, max = 100, step = 5 }) {
  return (
    <div className="stepper">
      <span>{value}</span>
      <span className="stepper-arrows">
        <button
          type="button"
          aria-label="Increase"
          onClick={() => onChange?.(Math.min(max, value + step))}
        >
          <ChevronSort size={12} className="muted-icon" />
        </button>
      </span>
    </div>
  )
}

export function SectionLabel({ children }) {
  return (
    <div className="section-block">
      <p className="section-label">{children}</p>
      <div className="divider" />
    </div>
  )
}
