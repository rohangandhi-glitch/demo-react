import { useState } from 'react'
import AppLayout from './components/AppLayout'
import UpliftTestPage from './UpliftTestPage'
import SspConfigPage from './SspConfigPage'
import UaConfigPage from './UaConfigPage'
import RevenuePage from './RevenuePage'

// Sidebar labels that map to a real page.
const PAGES = {
  'Uplift Test': UpliftTestPage,
  'UA Config': UaConfigPage,
  'SSP Config': SspConfigPage,
  Revenue: RevenuePage,
}

function App() {
  const [page, setPage] = useState('Uplift Test')

  const navigate = (label) => {
    if (PAGES[label]) setPage(label)
  }

  const PageContent = PAGES[page]

  return (
    <AppLayout active={page} onNavigate={navigate}>
      <PageContent />
    </AppLayout>
  )
}

export default App
