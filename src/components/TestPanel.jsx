import { useMemo, useState } from 'react'
import { tests } from '../data/upliftTests'
import TestsDataTable from './TestsDataTable'
import { Columns, ChevronDown, Search, Plus } from './Icons'

export default function TestPanel() {
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tests
    return tests.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.game.toLowerCase().includes(q) ||
        String(t.id).includes(q),
    )
  }, [query])

  return (
    <div className="table-shell">
      <div className="table-toolbar">
        <button type="button" className="btn btn-outline">
          <Columns />
          <span>Columns</span>
        </button>

        <div className="toolbar-right">
          <button type="button" className="btn btn-outline">
            <span>Status</span>
            <ChevronDown className="muted-icon" />
          </button>

          <div className="search-field">
            <Search />
            <input
              type="text"
              placeholder="Search in Table"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search in table"
            />
          </div>

          <button type="button" className="btn btn-primary">
            <Plus />
            <span>New Test</span>
          </button>
        </div>
      </div>

      <TestsDataTable rows={rows} query={query} />
    </div>
  )
}
