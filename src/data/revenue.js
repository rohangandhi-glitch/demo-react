// Revenue dashboard demo data (illustrative values matching the Figma design).

export const kpis = [
  {
    key: 'total',
    label: 'Total Revenue',
    icon: 'card',
    value: '$4,51,000',
    delta: '10%',
    dir: 'up',
    note: 'vs last 7 Days',
  },
  {
    key: 'game',
    label: 'Top Game Revenue',
    icon: 'dollar',
    name: 'Bubble Cash',
    value: '$1.57K',
    delta: '10%',
    dir: 'down',
    note: 'vs last 7 Days',
  },
  {
    key: 'advertiser',
    label: 'Top Advertiser',
    icon: 'clipboard',
    name: 'Papaya Gaming',
    value: '$5.2K',
    delta: '10%',
    dir: 'down',
    note: 'vs last 7 Days',
  },
  {
    key: 'country',
    label: 'Top Country',
    icon: 'flag',
    name: 'Japan',
    value: '$8.2K',
    delta: '10%',
    dir: 'up',
    note: 'vs last 7 Days',
  },
]

// Total Revenue Trend — designed 7-day series used for the default "Last 7 Days".
export const trend = {
  xLabels: ['02.10.24', '03.10.24', '04.10.24', '05.10.24', '06.10.24', '07.10.24', '08.10.24'],
  yMin: 1000,
  yMax: 5000,
  yStep: 1000,
  current: [1450, 2350, 1900, 4100, 1950, 2780, 2000],
  previous: [1350, 1300, 2350, 1800, 1950, 3550, 2050],
}

const DAY_MS = 86400000
const pad = (n) => String(n).padStart(2, '0')
const fmtDate = (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`

// Deterministic pseudo-data so each range produces a distinct, stable curve.
function series(n, seed) {
  return Array.from({ length: n }, (_, i) => {
    const t = n <= 1 ? 0 : i / (n - 1)
    const v =
      2350 +
      1250 * Math.sin(t * Math.PI * 1.8 + seed) +
      520 * Math.sin(t * Math.PI * 5 + seed * 1.7)
    return Math.round(Math.max(1150, Math.min(4650, v)))
  })
}

// Build the trend dataset for a selected range ({ preset, days, start, end }).
export function buildTrend(range) {
  // Keep the hand-tuned curve for the default preset.
  if (range?.preset === 'Last 7 Days') return trend

  const startTs = range?.start ?? new Date(2025, 0, 3).getTime()
  const endTs = range?.end ?? startTs + 6 * DAY_MS
  const totalDays = Math.max(1, Math.round((endTs - startTs) / DAY_MS)) + 1
  // One point per day, capped for readability; dates are spread across the
  // full start→end span so the last label is always the selected end date.
  const n = Math.max(2, Math.min(totalDays, 31))
  const xLabels = Array.from({ length: n }, (_, i) =>
    fmtDate(new Date(startTs + Math.round((i / (n - 1)) * (endTs - startTs)))),
  )
  const seed = totalDays * 0.13 + 1
  return {
    xLabels,
    yMin: 1000,
    yMax: 5000,
    yStep: 1000,
    current: series(n, seed),
    previous: series(n, seed + 1.6),
  }
}

// "Today" anchor — fixed so the calendar matches the design (Dec 2024 / Jan 2025).
export const TODAY = new Date(2025, 0, 9)

export const DEFAULT_RANGE = {
  label: 'Last 7 Days',
  preset: 'Last 7 Days',
  days: 7,
  start: new Date(2025, 0, 3).getTime(),
  end: new Date(2025, 0, 9).getTime(),
}

// Resolve a preset name to a concrete { label, preset, days, start, end } range.
export function presetRange(preset) {
  const end = new Date(TODAY)
  let start = new Date(TODAY)
  if (preset === 'Today') start = new Date(TODAY)
  else if (preset === 'Yesterday') {
    start = new Date(TODAY.getTime() - DAY_MS)
    end.setTime(start.getTime())
  } else if (preset === 'Last 7 Days') start = new Date(TODAY.getTime() - 6 * DAY_MS)
  else if (preset === 'Last 30 Days') start = new Date(TODAY.getTime() - 29 * DAY_MS)
  else if (preset === 'This Month') start = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1)
  const days = Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1
  return { label: preset, preset, days, start: start.getTime(), end: end.getTime() }
}

export function customRange(startTs, endTs) {
  const lo = Math.min(startTs, endTs)
  const hi = Math.max(startTs, endTs)
  const days = Math.round((hi - lo) / DAY_MS) + 1
  return {
    label: `${fmtDate(new Date(lo))} - ${fmtDate(new Date(hi))}`,
    preset: null,
    days,
    start: lo,
    end: hi,
  }
}

// Horizontal bar chart — revenue by country ($K).
export const topCountries = {
  unit: '$',
  suffix: 'K',
  max: 160,
  ticks: [0, 40, 80, 120, 160],
  data: [
    { label: 'United States', value: 145 },
    { label: 'Japan', value: 118 },
    { label: 'Australia', value: 35 },
    { label: 'Canada', value: 22 },
    { label: 'France', value: 48 },
    { label: 'Germany', value: 88 },
    { label: 'United Kingdom', value: 118 },
    { label: 'Others', value: 48 },
  ],
}

// Vertical bar chart — revenue by game ($).
export const topGames = {
  unit: '$',
  suffix: '',
  max: 10000,
  ticks: [0, 2500, 5000, 7500, 10000],
  data: [
    { label: 'Battle Royale Arena', value: 8800 },
    { label: 'Bubble Bash', value: 5000 },
    { label: 'Burger Dash', value: 4000 },
    { label: 'Casino Royal', value: 3200 },
    { label: 'Others', value: 2000 },
  ],
}

// Horizontal bar chart — revenue by channel ($K).
export const topChannels = {
  unit: '$',
  suffix: 'K',
  max: 160,
  ticks: [0, 40, 80, 120, 160],
  data: [
    { label: 'Inmobi', value: 135 },
    { label: 'Fyber', value: 120 },
    { label: 'Vungle', value: 35 },
    { label: 'Applovin', value: 15 },
    { label: 'Pubmatic', value: 45 },
    { label: 'Others', value: 45 },
  ],
}

// Pie palette (indigo / cyan / magenta / green) per the design.
const PIE = ['#6875f5', '#22c9e8', '#d61fdb', '#0e9f6e']

export const topPlatforms = [
  { label: 'Android', value: 40, color: PIE[0] },
  { label: 'iOS', value: 30, color: PIE[1] },
  { label: 'Web', value: 20, color: PIE[2] },
  { label: 'Others', value: 10, color: PIE[3] },
]

export const topAdvertisers = [
  { label: 'GameZoneEntertainment', value: 40, color: PIE[0] },
  { label: 'TechFlow Games Inc', value: 30, color: PIE[1] },
  { label: 'NextGen Apps Ltd', value: 20, color: PIE[2] },
  { label: 'Others', value: 10, color: PIE[3] },
]

export const advertiserOptions = [
  'Travian Games',
  'Bit.Games',
  'European Games Group AG',
  'Ad4Game',
  'Deltasoft',
  'Papaya Gaming',
  'Gameloft',
  'Social Quantum',
]

export const appOptions = [
  '21 Cash',
  'Balance Dash',
  'Burger Cash',
  'Bingo Cash',
  'Cookie Cash',
  'Solitaire',
  'Bubble Cash',
  'Diamond Cash',
]

export const datePresets = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month']
