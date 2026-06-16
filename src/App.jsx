import { useState } from 'react'
import AppLayout from './components/AppLayout'
import UpliftTestPage from './UpliftTestPage'
import SspConfigPage from './SspConfigPage'

// Sidebar labels that map to a real page.
const PAGES = {
  'Uplift Test': UpliftTestPage,
  'SSP Config': SspConfigPage,
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
