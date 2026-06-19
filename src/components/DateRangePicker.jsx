import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from './Icons'
import { datePresets, presetRange, customRange } from '../data/revenue'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// 42-cell (6-week) grid starting on Sunday, with adjacent-month spill days.
function buildMonth(year, month) {
  const first = new Date(year, month, 1)
  const start = first.getDay()
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(year, month, 1 - start + i)
    return { day: d.getDate(), inMonth: d.getMonth() === month, ts: d.getTime() }
  })
}

function MonthGrid({ year, month, lo, hi, onPick, onPrev, onNext }) {
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
          const inRange = c.ts >= lo && c.ts <= hi
          const isEnd = c.ts === lo || c.ts === hi
          return (
            <button
              type="button"
              key={i}
              className={[
                'cal-cell',
                c.inMonth ? '' : 'is-muted',
                inRange && !isEnd ? 'in-range' : '',
                isEnd ? 'is-end' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onPick(c.ts)}
            >
              {c.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function DateRangePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [base, setBase] = useState({ year: 2024, month: 11 }) // Dec 2024 + Jan 2025
  // in-progress custom selection: anchor day, and the live end (null until picked)
  const [anchor, setAnchor] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const shift = (delta) =>
    setBase(({ year, month }) => {
      const d = new Date(year, month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })

  // Highlight either the in-progress anchor or the applied range.
  const lo = anchor ?? value.start
  const hi = anchor ?? value.end

  const pickDay = (ts) => {
    if (anchor == null) {
      // first click → start a new selection
      setAnchor(ts)
    } else {
      // second click → complete the custom range, apply, close
      onChange(customRange(anchor, ts))
      setAnchor(null)
      setOpen(false)
    }
  }

  const choosePreset = (p) => {
    setAnchor(null)
    onChange(presetRange(p))
    setOpen(false)
  }

  const next = new Date(base.year, base.month + 1, 1)

  return (
    <div className="daterange" ref={ref}>
      <button type="button" className="btn btn-outline" onClick={() => setOpen((v) => !v)}>
        <span>{value.label}</span>
        <ChevronDown size={12} className="muted-icon" />
      </button>

      {open && (
        <div className="daterange-pop" role="dialog">
          <div className="cal-presets">
            {datePresets.map((p) => (
              <button
                type="button"
                key={p}
                className={`cal-preset${value.preset === p ? ' is-active' : ''}`}
                onClick={() => choosePreset(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="cal-pane">
            {anchor != null && <p className="cal-hint">Select the range end date</p>}
            <div className="cal-months">
              <MonthGrid
                year={base.year}
                month={base.month}
                lo={lo}
                hi={hi}
                onPick={pickDay}
                onPrev={() => shift(-1)}
              />
              <MonthGrid
                year={next.getFullYear()}
                month={next.getMonth()}
                lo={lo}
                hi={hi}
                onPick={pickDay}
                onNext={() => shift(1)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
