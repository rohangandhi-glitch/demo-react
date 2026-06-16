import { useState } from 'react'
import StatsCard from './components/StatsCard'
import TestsCard from './components/TestsCard'
import RecentTestHistory from './components/RecentTestHistory'

// Content for the "Uplift Test" page (rendered inside AppLayout).
export default function UpliftTestPage() {
  const [activeTab, setActiveTab] = useState('Test')

  return (
    <>
      <StatsCard />
      <TestsCard activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'Create Test' && <RecentTestHistory />}
    </>
  )
}
