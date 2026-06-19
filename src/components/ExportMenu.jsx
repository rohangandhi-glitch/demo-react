import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Printer, FileCsv } from './Icons'

// Build CSV text from an array of plain row objects (ignores any `color` field).
function toCsv(data) {
  if (!data || !data.length) return ''
  const keys = Object.keys(data[0]).filter((k) => k !== 'color')
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`
  const head = keys.join(',')
  const body = data.map((row) => keys.map((k) => esc(row[k])).join(',')).join('\n')
  return `${head}\n${body}`
}

// Export dropdown (Figma 1037-7377): Print / Download(.csv).
export default function ExportMenu({ name = 'export', data }) {
  const [open, setOpen] = useState(false)
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

  const print = () => {
    setOpen(false)
    window.print()
  }

  const download = () => {
    setOpen(false)
    const csv = toCsv(data)
    const blob = new Blob([csv || 'No data'], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="action-menu-wrap" ref={ref}>
      <button
        type="button"
        className={`btn btn-outline export-btn${open ? ' is-open' : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>Export</span>
        <ChevronDown size={12} className="muted-icon" />
      </button>
      {open && (
        <div className="action-menu export-menu" role="menu">
          <button type="button" className="menu-item" role="menuitem" onClick={print}>
            <Printer size={16} className="muted-icon" />
            <span>Print</span>
          </button>
          <button type="button" className="menu-item" role="menuitem" onClick={download}>
            <FileCsv size={16} className="muted-icon" />
            <span>Download(.csv)</span>
          </button>
        </div>
      )}
    </div>
  )
}
