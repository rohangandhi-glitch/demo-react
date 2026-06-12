import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatsCard from './components/StatsCard'
import TestsCard from './components/TestsCard'
import RecentTestHistory from './components/RecentTestHistory'
import blob from './assets/uplift/blob.svg'
import './uplift.css'

export default function UpliftTestPage() {
  const [activeTab, setActiveTab] = useState('Test')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="uplift-app">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="main">
        <img className="bg-blob" src={blob} alt="" aria-hidden="true" />
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="content">
          <StatsCard />
          <TestsCard activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'Create Test' && <RecentTestHistory />}
        </main>
      </div>
    </div>
  )
}
