import { tests } from '../data/upliftTests'
import { ChevronSort } from './Icons'

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'game', label: 'Game' },
  { key: 'splitMethod', label: 'Split Method' },
  { key: 'conversionEvent', label: 'Conversion Event', center: true },
  { key: 'status', label: 'Status', center: true },
]

const statusTone = {
  Running: 'running',
  'Will Run': 'will-run',
  Finished: 'finished',
}

export default function TestsDataTable({ rows = tests, query }) {
  return (
    <div className="table-scroll">
    <table className="data-table">
      <thead>
        <tr>
          {COLUMNS.map((col) => (
            <th key={col.key} className={col.center ? 'is-center' : undefined}>
              <span className="th-content">
                {col.label}
                <ChevronSort size={10} className="muted-icon" />
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className={row.highlighted ? 'is-highlighted' : undefined}>
            <td>{row.id}</td>
            <td>
              <a className="test-name" href="#">
                {row.name}
              </a>
              <span className="test-dates">
                {row.start} <span className="dash">-</span> {row.end}
              </span>
            </td>
            <td>{row.game}</td>
            <td>{row.splitMethod}</td>
            <td className="is-center">
              <span className="pill pill-neutral">{row.conversionEvent}</span>
            </td>
            <td className="is-center">
              <span className={`pill pill-${statusTone[row.status]}`}>
                {row.status}
              </span>
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={COLUMNS.length} className="table-empty">
              No tests match “{query}”.
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}
