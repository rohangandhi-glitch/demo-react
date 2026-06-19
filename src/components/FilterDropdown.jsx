import { useEffect, useRef, useState } from 'react'
import { Checkbox } from './FormFields'
import { Search, ChevronDown } from './Icons'

function selLabel(sel, all) {
  if (sel.length === 0 || sel.length === all.length) return 'All'
  if (sel.length === 1) return sel[0]
  return `${sel.length} selected`
}

// Anchored multi-select dropdown (Advertiser / Apps filters) — opens a popover
// below the pill, not a centered modal. Selection applies live.
export default function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
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

  const sel = new Set(value)
  const visible = options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))

  const toggle = (opt) => {
    const next = new Set(sel)
    next.has(opt) ? next.delete(opt) : next.add(opt)
    onChange([...next])
  }

  return (
    <div className="filter-dropdown" ref={ref}>
      <button
        type="button"
        className={`filter-pill${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="filter-pill-label">{label}</span>
        <span className="filter-pill-value">{selLabel(value, options)}</span>
        <ChevronDown size={12} className="muted-icon" />
      </button>

      {open && (
        <div className="filter-pop" role="dialog">
          <div className="search-field filter-search">
            <Search />
            <input
              type="text"
              placeholder={`Search ${label}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={`Search ${label}`}
            />
          </div>

          <div className="filter-list">
            {visible.map((opt) => (
              <Checkbox key={opt} label={opt} checked={sel.has(opt)} onChange={() => toggle(opt)} />
            ))}
            {visible.length === 0 && <span className="filter-empty">No matches</span>}
          </div>

          <div className="filter-bulk">
            <button type="button" className="btn btn-outline" onClick={() => onChange([...options])}>
              Select All
            </button>
            <button
              type="button"
              className="btn btn-outline btn-outline-danger"
              onClick={() => onChange([])}
            >
              Unselect All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
