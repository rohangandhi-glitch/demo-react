import { useState } from 'react'
import { DotsVertical, Pencil, Copy, Trash } from './Icons'

// 3-dot row menu: Edit / Duplicate / Delete.
export default function ActionMenu({ onEdit, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(false)

  const run = (fn) => () => {
    setOpen(false)
    fn?.()
  }

  return (
    <div className="action-menu-wrap">
      <button
        type="button"
        className="dots-btn"
        aria-label="Row actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <DotsVertical />
      </button>
      {open && (
        <>
          <div className="menu-backdrop" onClick={() => setOpen(false)} />
          <div className="action-menu" role="menu">
            <button type="button" className="menu-item" onClick={run(onEdit)}>
              <Pencil size={16} />
              <span>Edit</span>
            </button>
            <button type="button" className="menu-item" onClick={run(onDuplicate)}>
              <Copy size={16} />
              <span>Duplicate</span>
            </button>
            <button type="button" className="menu-item danger" onClick={run(onDelete)}>
              <Trash size={16} />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
