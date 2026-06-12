// Static data backing the Uplift Test dashboard, transcribed from the design.

export const stats = [
  { label: 'Total Tests', value: '5', icon: 'flask', tone: 'blue' },
  { label: 'Running', value: '2', icon: 'activity', tone: 'green' },
  { label: 'Avg Uplift', value: '19.0%', icon: 'trending', tone: 'purple' },
  { label: 'Will Run', value: '1', icon: 'check', tone: 'orange' },
]

const range = { start: "02 April '25", end: "12 April '25" }

export const tests = [
  {
    id: 340,
    name: 'In-App Purchase Optimization',
    ...range,
    game: 'Balance Dash',
    splitMethod: 'Random 50/50',
    conversionEvent: 'Sessions start',
    status: 'Running',
  },
  {
    id: 342,
    name: 'Retention Campaign Test',
    ...range,
    game: 'Diamond Cash',
    splitMethod: 'Geo-based',
    conversionEvent: 'New Player',
    status: 'Running',
  },
  {
    id: 212,
    name: 'Ad Frequency Optimization',
    ...range,
    game: 'Emerald Funds',
    splitMethod: 'User ID Hash',
    conversionEvent: 'Payment',
    status: 'Will Run',
  },
  {
    id: 772,
    name: 'Creative Format Test',
    ...range,
    game: 'Cookie Cash',
    splitMethod: 'User ID Hash',
    conversionEvent: 'Progress',
    status: 'Finished',
    highlighted: true,
  },
  {
    id: 332,
    name: 'Weekly Campaign Test',
    ...range,
    game: 'Burger Dash',
    splitMethod: 'Random 60/40',
    conversionEvent: 'Ad Click',
    status: 'Finished',
  },
]
