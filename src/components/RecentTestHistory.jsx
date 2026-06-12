import TestsDataTable from './TestsDataTable'
import { ChevronRight } from './Icons'

export default function RecentTestHistory() {
  return (
    <section className="card history-card">
      <div className="history-header">
        <h2 className="stats-title">Recent Test History</h2>
        <button type="button" className="btn btn-primary">
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="table-shell table-shell-bordered">
        <TestsDataTable />
      </div>
    </section>
  )
}
