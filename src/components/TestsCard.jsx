import TestPanel from './TestPanel'
import CreateTestPanel from './CreateTestPanel'
import ReportsPanel from './ReportsPanel'

const TABS = ['Test', 'Create Test', 'Reports']

export default function TestsCard({ activeTab, onTabChange }) {
  return (
    <section className="card table-card">
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            className={`tab${activeTab === tab ? ' is-active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Test' && <TestPanel onNewTest={() => onTabChange('Create Test')} />}
      {activeTab === 'Create Test' && <CreateTestPanel />}
      {activeTab === 'Reports' && <ReportsPanel />}
    </section>
  )
}
