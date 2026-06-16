// Pill toggle switch (green when on), matching the Figma discrepancy toggle.
export default function Toggle({ checked, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`toggle${checked ? ' is-on' : ''}`}
      onClick={() => onChange?.(!checked)}
    >
      <span className="toggle-knob" />
    </button>
  )
}
