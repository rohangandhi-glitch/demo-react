import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import blob from '../assets/uplift/blob.svg'
import '../uplift.css'

// Shared app shell: sidebar + topbar + scrolling content area.
export default function AppLayout({ active, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (label) => {
    onNavigate(label)
    setSidebarOpen(false)
  }

  return (
    <div className="uplift-app">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={active}
        onNavigate={navigate}
      />
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="main">
        <img className="bg-blob" src={blob} alt="" aria-hidden="true" />
        <Topbar breadcrumb={active} onMenuClick={() => setSidebarOpen(true)} />
        <main className="content">{children}</main>
      </div>
    </div>
  )
}
