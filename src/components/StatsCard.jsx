import { stats } from '../data/upliftTests'
import { Flask, Activity, TrendingUp, CircleCheck } from './Icons'

const icons = {
  flask: Flask,
  activity: Activity,
  trending: TrendingUp,
  check: CircleCheck,
}

export default function StatsCard() {
  return (
    <section className="card stats-card">
      <h1 className="stats-title">Uplift Test</h1>
      <div className="stats-row">
        {stats.map((stat) => {
          const Icon = icons[stat.icon]
          return (
            <div className="stat-tile" key={stat.label}>
              <span className={`stat-icon tone-${stat.tone}`}>
                <Icon />
              </span>
              <span className="stat-text">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
