import { useState } from 'react'
import Toggle from './components/Toggle'
import FilterDropdown from './components/FilterDropdown'
import DateRangePicker from './components/DateRangePicker'
import { LineChart, HBarChart, VBarChart, PieChart } from './components/Charts'
import {
  CreditCard,
  DollarSign,
  ClipboardList,
  Flag,
  ChevronDown,
  Info,
} from './components/Icons'
import {
  kpis,
  trend,
  topCountries,
  topGames,
  topChannels,
  topPlatforms,
  topAdvertisers,
  advertiserOptions,
  appOptions,
} from './data/revenue'

const KPI_ICONS = {
  card: CreditCard,
  dollar: DollarSign,
  clipboard: ClipboardList,
  flag: Flag,
}

function ExportButton() {
  return (
    <button type="button" className="btn btn-outline export-btn">
      <span>Export</span>
      <ChevronDown size={12} className="muted-icon" />
    </button>
  )
}

function ChartCard({ title, info, children }) {
  return (
    <section className="card chart-card">
      <div className="chart-card-head">
        <h3 className="chart-title">
          {title}
          {info && <Info size={14} className="muted-icon" />}
        </h3>
        <ExportButton />
      </div>
      <div className="chart-body">{children}</div>
    </section>
  )
}

export default function RevenuePage() {
  const [advertisers, setAdvertisers] = useState(advertiserOptions)
  const [apps, setApps] = useState(appOptions)
  const [comparison, setComparison] = useState(false)
  const [range, setRange] = useState('Last 7 Days')

  return (
    <>
      {/* ===== Revenue Analytics + KPIs ===== */}
      <section className="card revenue-analytics">
        <div className="revenue-head">
          <h2 className="stats-title">Revenue Analytics</h2>
          <div className="revenue-filters">
            <FilterDropdown label="Advertiser" options={advertiserOptions} value={advertisers} onChange={setAdvertisers} />
            <FilterDropdown label="Apps" options={appOptions} value={apps} onChange={setApps} />
          </div>
        </div>

        <div className="kpi-band">
          {kpis.map((k) => {
            const Icon = KPI_ICONS[k.icon]
            return (
              <div className="kpi-card" key={k.key}>
                <div className="kpi-top">
                  <span className="kpi-ic">
                    <Icon size={16} />
                  </span>
                  <span className="kpi-label">{k.label}</span>
                </div>
                <div className="kpi-value-row">
                  {k.name && <span className="kpi-name">{k.name}</span>}
                  <span className="kpi-value">{k.value}</span>
                </div>
                <div className="kpi-delta">
                  <span className={`kpi-trend ${k.dir}`}>
                    {k.delta} {k.dir === 'up' ? '↑' : '↓'}
                  </span>
                  <span className="kpi-note">{k.note}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ===== Total Revenue Trend ===== */}
      <section className="card">
        <div className="chart-card-head">
          <h3 className="chart-title">Total Revenue Trend</h3>
          <div className="trend-controls">
            <label className="comparison-toggle">
              <Toggle checked={comparison} onChange={() => setComparison((v) => !v)} ariaLabel="Comparison period" />
              <span>Comparison Period</span>
            </label>
            <DateRangePicker value={range} onChange={setRange} />
            <ExportButton />
          </div>
        </div>
        <div className="chart-body trend-body">
          <LineChart trend={trend} showComparison={comparison} />
          <div className="pie-legend trend-legend">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#5dbcf9' }} />
              Current Period
            </span>
            {comparison && (
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#a9dbfb' }} />
                Previous Period
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== Charts grid ===== */}
      <div className="charts-grid">
        <ChartCard title="Top Countries" info>
          <HBarChart chart={topCountries} color="#6875f5" />
        </ChartCard>
        <ChartCard title="Top Platforms">
          <PieChart data={topPlatforms} />
        </ChartCard>

        <div className="grid-span-2">
          <ChartCard title="Top Games">
            <VBarChart chart={topGames} color="#85cdfa" />
          </ChartCard>
        </div>

        <ChartCard title="Top Channels" info>
          <HBarChart chart={topChannels} color="#5dbcf9" />
        </ChartCard>
        <ChartCard title="Top Advertisers">
          <PieChart data={topAdvertisers} />
        </ChartCard>
      </div>
    </>
  )
}
