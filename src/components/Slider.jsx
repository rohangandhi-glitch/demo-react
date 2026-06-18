// Range slider with integer tick labels (Acceptance Rate, 0–10 in the design).
export default function Slider({ value = 0, min = 0, max = 10, onChange }) {
  const pct = ((value - min) / (max - min)) * 100
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="slider">
      <input
        type="range"
        className="slider-input"
        min={min}
        max={max}
        value={value}
        style={{ '--pct': `${pct}%` }}
        onChange={(e) => onChange?.(Number(e.target.value))}
        aria-label="Acceptance rate"
      />
      <div className="slider-ticks">
        {ticks.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  )
}
