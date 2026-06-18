import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from './Icons'
import { datePresets } from '../data/revenue'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// 42-cell (6-week) grid starting on Sunday, with adjacent-month spill days.
function buildMonth(year, month) {
  const first = new Date(year, month, 1)
  const start = first.getDay()
  const cells = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(year, month, 1 - start + i)
    cells.push({ day: d.getDate(), inMonth: d.getMonth() === month, ts: d.getTime() })
  }
  return cells
}

// The design's highlighted "Last 7 Days" window: Jan 3 – Jan 9, 2025.
const RANGE_START = new Date(2025, 0, 3).getTime()
const RANGE_END = new Date(2025, 0, 9).getTime()

function MonthGrid({ year, month, onPrev, onNext }) {
  const cells = buildMonth(year, month)
  return (
    <div className="cal-month">
      <div className="cal-head">
        {onPrev ? (
          <button type="button" className="cal-nav" onClick={onPrev} aria-label="Previous month">
            ←
          </button>
        ) : (
          <span className="cal-nav-spacer" />
        )}
        <span className="cal-title">
          {MONTHS[month]} {year}
        </span>
        {onNext ? (
          <button type="button" className="cal-nav" onClick={onNext} aria-label="Next month">
            →
          </button>
        ) : (
          <span className="cal-nav-spacer" />
        )}
      </div>
      <div className="cal-grid">
        {DOW.map((d) => (
          <span key={d} className="cal-dow">
            {d}
          </span>
        ))}
        {cells.map((c, i) => {
          const inRange = c.inMonth && c.ts >= RANGE_START && c.ts <= RANGE_END
          const isEnd = c.inMonth && (c.ts === RANGE_START || c.ts === RANGE_END)
          return (
            <span
              key={i}
              className={[
                'cal-cell',
                c.inMonth ? '' : 'is-muted',
                inRange && !isEnd ? 'in-range' : '',
                isEnd ? 'is-end' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {c.day}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function DateRangePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [base, setBase] = useState({ year: 2024, month: 11 }) // Dec 2024 + next
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const shift = (delta) =>
    setBase(({ year, month }) => {
      const d = new Date(year, month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })

  const next = new Date(base.year, base.month + 1, 1)

  return (
    <div className="daterange" ref={ref}>
      <button type="button" className="btn btn-outline" onClick={() => setOpen((v) => !v)}>
        <span>{value}</span>
        <ChevronDown size={12} className="muted-icon" />
      </button>

      {open && (
        <div className="daterange-pop" role="dialog">
          <div className="cal-presets">
            {datePresets.map((p) => (
              <button
                type="button"
                key={p}
                className={`cal-preset${value === p ? ' is-active' : ''}`}
                onClick={() => {
                  onChange?.(p)
                  setOpen(false)
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="cal-months">
            <MonthGrid year={base.year} month={base.month} onPrev={() => shift(-1)} />
            <MonthGrid year={next.getFullYear()} month={next.getMonth()} onNext={() => shift(1)} />
          </div>
        </div>
      )}
    </div>
  )
}
