// Lightweight inline-SVG charts (no chart library — keeps the no-deps convention).
// Each chart uses a fixed viewBox and scales to its container width.

const AXIS = '#9ca3af' // gray-400/500 axis text
const GRID = '#e5e7eb' // gray-200 gridlines

function fmt(v, unit = '', suffix = '') {
  return `${unit}${v}${suffix}`
}

/* Catmull-Rom → cubic bezier for a smooth line through the points. */
function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

export function LineChart({ trend, showComparison }) {
  const W = 780
  const H = 240
  const L = 46
  const R = 12
  const T = 12
  const B = 30
  const plotW = W - L - R
  const plotH = H - T - B
  const { xLabels, yMin, yMax, yStep, current, previous } = trend

  const yTicks = []
  for (let v = yMin; v <= yMax; v += yStep) yTicks.push(v)

  const xAt = (i) => L + (current.length === 1 ? 0 : (plotW * i) / (current.length - 1))
  const yAt = (v) => T + ((yMax - v) / (yMax - yMin)) * plotH

  const toPts = (arr) => arr.map((v, i) => ({ x: xAt(i), y: yAt(v) }))

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Total revenue trend">
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={L} y1={yAt(v)} x2={W - R} y2={yAt(v)} stroke={GRID} strokeWidth="1" />
          <text x={L - 8} y={yAt(v) + 4} textAnchor="end" fontSize="11" fill={AXIS}>
            ${v}
          </text>
        </g>
      ))}
      {showComparison && (
        <path d={smoothPath(toPts(previous))} fill="none" stroke="#a9dbfb" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
      )}
      <path d={smoothPath(toPts(current))} fill="none" stroke="#5dbcf9" strokeWidth="2.5" strokeLinecap="round" />
      {xLabels.map((lbl, i) => (
        <text key={lbl} x={xAt(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={AXIS}>
          {lbl}
        </text>
      ))}
    </svg>
  )
}

export function HBarChart({ chart, color = '#6875f5' }) {
  const { data, max, ticks, unit, suffix } = chart
  const W = 520
  const rowH = 34
  const gap = 10
  const L = 96
  const R = 16
  const T = 6
  const B = 26
  const plotW = W - L - R
  const H = T + data.length * rowH + B
  const barH = rowH - gap
  const xAt = (v) => L + (v / max) * plotW

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart">
      {ticks.map((t) => (
        <line key={t} x1={xAt(t)} y1={T} x2={xAt(t)} y2={T + data.length * rowH} stroke={GRID} strokeWidth="1" />
      ))}
      {data.map((d, i) => {
        const y = T + i * rowH
        return (
          <g key={d.label}>
            <text x={L - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize="11" fill="#6b7280">
              {d.label}
            </text>
            <rect x={L} y={y} width={Math.max(0, xAt(d.value) - L)} height={barH} rx="3" fill={color} />
          </g>
        )
      })}
      {ticks.map((t) => (
        <text key={`t${t}`} x={xAt(t)} y={H - 8} textAnchor="middle" fontSize="11" fill={AXIS}>
          {fmt(t, unit, suffix)}
        </text>
      ))}
    </svg>
  )
}

export function VBarChart({ chart, color = '#85cdfa' }) {
  const { data, max, ticks, unit, suffix } = chart
  const W = 560
  const H = 300
  const L = 52
  const R = 12
  const T = 12
  const B = 40
  const plotW = W - L - R
  const plotH = H - T - B
  const slot = plotW / data.length
  const barW = Math.min(64, slot * 0.5)
  const yAt = (v) => T + ((max - v) / max) * plotH

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} y1={yAt(t)} x2={W - R} y2={yAt(t)} stroke={GRID} strokeWidth="1" />
          <text x={L - 8} y={yAt(t) + 4} textAnchor="end" fontSize="11" fill={AXIS}>
            {fmt(t, unit, suffix)}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const cx = L + slot * i + slot / 2
        const h = (d.value / max) * plotH
        return (
          <g key={d.label}>
            <rect x={cx - barW / 2} y={T + plotH - h} width={barW} height={h} rx="3" fill={color} />
            <text x={cx} y={H - 22} textAnchor="middle" fontSize="11" fill="#6b7280">
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function PieChart({ data }) {
  // Wide viewBox so the radiating labels always fit (and scale with the chart).
  const W = 600
  const H = 280
  const cx = 300
  const cy = 140
  const r = 96
  const total = data.reduce((s, d) => s + d.value, 0)

  // cumulative value before each slice (no mutation — keeps the linter happy)
  const before = data.map((_, idx) => data.slice(0, idx).reduce((s, d) => s + d.value, 0))

  const slices = data.map((d, idx) => {
    const frac = d.value / total
    const start = -Math.PI / 2 + (before[idx] / total) * Math.PI * 2
    const end = start + frac * Math.PI * 2
    const mid = (start + end) / 2
    const large = end - start > Math.PI ? 1 : 0
    const p = (a, rad) => [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]
    const [x1, y1] = p(start, r)
    const [x2, y2] = p(end, r)
    const path = `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`
    const [lx, ly] = p(mid, r + 18)
    return { ...d, path, lx, ly, side: Math.cos(mid) >= 0 ? 'start' : 'end' }
  })

  return (
    <svg className="chart chart-pie" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Pie chart">
      {slices.map((s) => (
        <path key={s.label} d={s.path} fill={s.color} />
      ))}
      {slices.map((s) => (
        <text
          key={`l${s.label}`}
          x={s.side === 'start' ? Math.min(s.lx, W - 6) : Math.max(s.lx, 6)}
          y={s.ly}
          textAnchor={s.side}
          fontSize="11"
          fontWeight="500"
          fill={s.color}
        >
          {`${s.label}: $${s.value}k`}
        </text>
      ))}
    </svg>
  )
}
