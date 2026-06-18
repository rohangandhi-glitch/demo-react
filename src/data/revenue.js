// Revenue dashboard demo data (illustrative values matching the Figma design).

export const kpis = [
  {
    key: 'total',
    label: 'Total Revenue',
    icon: 'card',
    tone: 'blue',
    value: '$4,51,000',
    delta: '10%',
    note: 'vs last 7 Days',
  },
  {
    key: 'game',
    label: 'Top Game Revenue',
    icon: 'dollar',
    tone: 'green',
    name: 'Bubble Cash',
    value: '$1.57K',
    delta: '10%',
    note: 'vs last 7 Days',
  },
  {
    key: 'advertiser',
    label: 'Top Advertiser',
    icon: 'clipboard',
    tone: 'purple',
    name: 'Papaya Gaming',
    value: '$5.2K',
    delta: '10%',
    note: 'vs last 7 Days',
  },
  {
    key: 'country',
    label: 'Top Country',
    icon: 'flag',
    tone: 'orange',
    name: 'Japan',
    value: '$8.2K',
    delta: '10%',
    note: 'vs last 7 Days',
  },
]

// Total Revenue Trend — 7 daily points.
export const trend = {
  xLabels: ['02.10.24', '03.10.24', '04.10.24', '05.10.24', '06.10.24', '07.10.24', '08.10.24'],
  yMin: 1000,
  yMax: 5000,
  yStep: 1000,
  current: [1450, 2350, 1900, 4100, 1950, 2780, 2000],
  previous: [1350, 1300, 2350, 1800, 1950, 3550, 2050],
}

// Horizontal bar chart — revenue by country ($K).
export const topCountries = {
  unit: '$',
  suffix: 'K',
  max: 160,
  ticks: [0, 40, 80, 120, 160],
  data: [
    { label: 'United States', value: 120 },
    { label: 'Japan', value: 100 },
    { label: 'Australia', value: 50 },
    { label: 'Canada', value: 60 },
    { label: 'France', value: 70 },
    { label: 'Germany', value: 55 },
    { label: 'United Kingdom', value: 95 },
    { label: 'Others', value: 40 },
  ],
}

// Vertical bar chart — revenue by game ($K).
export const topGames = {
  unit: '$',
  suffix: 'K',
  max: 1000,
  ticks: [0, 250, 500, 750, 1000],
  data: [
    { label: 'Battle Royale Arena', value: 950 },
    { label: 'Bubble Rush', value: 520 },
    { label: 'Burger Dash', value: 430 },
    { label: 'Casino Royal', value: 330 },
    { label: 'Others', value: 300 },
  ],
}

// Horizontal bar chart — revenue by channel ($K).
export const topChannels = {
  unit: '$',
  suffix: 'K',
  max: 160,
  ticks: [0, 40, 80, 120, 160],
  data: [
    { label: 'Ironside', value: 150 },
    { label: 'Fyber', value: 140 },
    { label: 'Vungle', value: 60 },
    { label: 'Applovin', value: 35 },
    { label: 'Pubmatic', value: 75 },
    { label: 'Others', value: 70 },
  ],
}

// Pie palette (indigo / cyan / magenta / green) per the design.
const PIE = ['#6875f5', '#5dbcf9', '#e74694', '#0e9f6e']

export const topPlatforms = [
  { label: 'Android', value: 40, color: PIE[0] },
  { label: 'iOS', value: 30, color: PIE[1] },
  { label: 'Web', value: 20, color: PIE[2] },
  { label: 'Others', value: 10, color: PIE[3] },
]

export const topAdvertisers = [
  { label: 'GameZonz Entertainment', value: 40, color: PIE[0] },
  { label: 'TechPton Games Inc', value: 30, color: PIE[2] },
  { label: 'NextGen Apps Ltd', value: 20, color: PIE[1] },
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
