// Charts built on Recharts (the product's standard charting library).
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  BarChart as RBarChart,
  Bar,
  PieChart as RPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const AXIS = '#9ca3af' // gray axis labels
const CAT = '#6b7280' // category labels
const GRID = '#e5e7eb' // gridlines

const axisTick = { fontSize: 11, fill: AXIS }
const catTick = { fontSize: 11, fill: CAT }
const tooltipStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  fontSize: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

// "Nice" evenly-spaced ticks within [lo, hi] so a zoomed axis stays readable.
function niceTicks(lo, hi, count = 5) {
  const rawStep = (hi - lo) / (count - 1)
  if (!isFinite(rawStep) || rawStep <= 0) return [lo, hi]
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const norm = rawStep / mag
  const niceNorm = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10
  const step = niceNorm * mag
  const ticks = []
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-6; v += step) ticks.push(Math.round(v))
  return ticks
}

const Y_MIN_SPAN = 500 // closest Y zoom (a 500-unit window)

export function LineChart({ trend, showComparison }) {
  const data = trend.xLabels.map((x, i) => ({
    x,
    current: trend.current[i],
    previous: trend.previous[i],
  }))
  const lastIdx = data.length - 1

  const [domain, setDomain] = useState([trend.yMin, trend.yMax])
  const [xWin, setXWin] = useState([0, lastIdx]) // visible data-index window
  const [prevTrend, setPrevTrend] = useState(trend)
  const wrapRef = useRef(null)

  const resetZoom = () => {
    setDomain([trend.yMin, trend.yMax])
    setXWin([0, data.length - 1])
  }

  // Reset the zoom whenever the underlying series (date range) changes.
  if (prevTrend !== trend) {
    setPrevTrend(trend)
    setDomain([trend.yMin, trend.yMax])
    setXWin([0, data.length - 1])
  }

  // Wheel zooms toward the cursor: vertical → Y-axis, Shift/horizontal → X-axis.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const zoomX = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const factor = raw < 0 ? 0.85 : 1 / 0.85

      if (zoomX) {
        const plotLeft = 60 // approx: Y-axis width + left margin
        const plotRight = rect.width - 24
        const fx = Math.min(Math.max((e.clientX - rect.left - plotLeft) / (plotRight - plotLeft), 0), 1)
        setXWin(([s, e2]) => {
          const max = data.length - 1
          const focal = s + fx * (e2 - s)
          const span = Math.min(Math.max((e2 - s) * factor, 1), max)
          let ns = focal - fx * span
          let ne = focal + (1 - fx) * span
          if (ns < 0) { ne -= ns; ns = 0 }
          if (ne > max) { ns -= ne - max; ne = max }
          ns = Math.max(0, Math.round(ns))
          ne = Math.min(max, Math.round(ne))
          if (ne - ns < 1) ne = Math.min(max, ns + 1)
          return [ns, ne]
        })
        return
      }

      const plotTop = 12
      const plotBottom = rect.height - 38 // approx: exclude x-axis + bottom margin
      const y = Math.min(Math.max(e.clientY - rect.top, plotTop), plotBottom)
      const fracFromBottom = (plotBottom - y) / (plotBottom - plotTop)
      const fullSpan = trend.yMax - trend.yMin
      setDomain(([lo, hi]) => {
        const focal = lo + fracFromBottom * (hi - lo)
        const span = Math.min(Math.max((hi - lo) * factor, Y_MIN_SPAN), fullSpan)
        let nlo = focal - fracFromBottom * span
        let nhi = focal + (1 - fracFromBottom) * span
        if (nlo < trend.yMin) { nhi += trend.yMin - nlo; nlo = trend.yMin }
        if (nhi > trend.yMax) { nlo -= nhi - trend.yMax; nhi = trend.yMax }
        return [Math.max(trend.yMin, nlo), Math.min(trend.yMax, nhi)]
      })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [trend, data.length])

  const ticks = useMemo(() => niceTicks(domain[0], domain[1], 5), [domain])
  const view = data.slice(xWin[0], xWin[1] + 1)
  const zoomed =
    domain[0] !== trend.yMin || domain[1] !== trend.yMax || xWin[0] !== 0 || xWin[1] !== lastIdx

  return (
    <div
      className="trend-zoom"
      ref={wrapRef}
      onDoubleClick={resetZoom}
      title="Scroll to zoom the Y-axis · Shift+scroll (or trackpad horizontal) to zoom the X-axis · double-click to reset"
    >
      <ResponsiveContainer width="100%" height={320}>
        <RLineChart data={view} margin={{ top: 12, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="4 4" />
          <XAxis
            dataKey="x"
            tickLine={false}
            axisLine={false}
            tick={axisTick}
            dy={6}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            domain={domain}
            ticks={ticks}
            allowDataOverflow
            tickFormatter={(v) => `$${v}`}
            tickLine={false}
            axisLine={false}
            tick={axisTick}
            width={52}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${v}`} />
          {showComparison && (
            <Line
              type="monotone"
              dataKey="previous"
              name="Previous Period"
              stroke="#a9dbfb"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          )}
          <Line
            type="monotone"
            dataKey="current"
            name="Current Period"
            stroke="#5dbcf9"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </RLineChart>
      </ResponsiveContainer>
      {zoomed && (
        <button type="button" className="zoom-reset" onClick={resetZoom}>
          Reset zoom
        </button>
      )}
    </div>
  )
}

export function HBarChart({ chart, color = '#6875f5' }) {
  return (
    <ResponsiveContainer width="100%" height={chart.data.length * 42 + 36}>
      <RBarChart data={chart.data} layout="vertical" margin={{ top: 6, right: 24, left: 8, bottom: 6 }}>
        <CartesianGrid stroke={GRID} strokeDasharray="4 4" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, chart.max]}
          ticks={chart.ticks}
          tickFormatter={(v) => `${chart.unit}${v}${chart.suffix}`}
          tickLine={false}
          axisLine={false}
          tick={axisTick}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={96}
          tickLine={{ stroke: GRID }}
          axisLine={false}
          tick={catTick}
        />
        <Tooltip
          cursor={{ fill: 'rgba(0,0,0,0.03)' }}
          contentStyle={tooltipStyle}
          formatter={(v) => `${chart.unit}${v}${chart.suffix}`}
        />
        <Bar dataKey="value" fill={color} radius={[0, 3, 3, 0]} barSize={16} />
      </RBarChart>
    </ResponsiveContainer>
  )
}

export function VBarChart({ chart, color = '#5dbcf9' }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RBarChart data={chart.data} margin={{ top: 12, right: 12, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={GRID} strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="label" interval={0} tickLine={false} axisLine={false} tick={catTick} dy={6} />
        <YAxis
          domain={[0, chart.max]}
          ticks={chart.ticks}
          tickFormatter={(v) => `${chart.unit}${v}${chart.suffix}`}
          tickLine={false}
          axisLine={false}
          tick={axisTick}
          width={56}
        />
        <Tooltip
          cursor={{ fill: 'rgba(0,0,0,0.03)' }}
          contentStyle={tooltipStyle}
          formatter={(v) => `${chart.unit}${v}${chart.suffix}`}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} barSize={90} />
      </RBarChart>
    </ResponsiveContainer>
  )
}

const RAD = Math.PI / 180

// Colored leader labels around the pie (e.g. "Android: $40k").
function pieLabel({ cx, cy, midAngle, outerRadius, value, name, fill }) {
  const r = outerRadius + 18
  const x = cx + r * Math.cos(-midAngle * RAD)
  const y = cy + r * Math.sin(-midAngle * RAD)
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={12}
      fontWeight={500}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name}: $${value}k`}
    </text>
  )
}

export function PieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RPieChart margin={{ top: 16, right: 8, bottom: 16, left: 8 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={76}
          startAngle={90}
          endAngle={-270}
          stroke="none"
          isAnimationActive={false}
          label={pieLabel}
          labelLine={false}
        >
          {data.map((d) => (
            <Cell key={d.label} fill={d.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`$${v}k`, n]} />
      </RPieChart>
    </ResponsiveContainer>
  )
}
