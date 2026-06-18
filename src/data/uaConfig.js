// Seed data for the UA Config module, transcribed from the designs.

export const initialRules = [
  {
    key: 'r1',
    countries: ['CA', 'US', 'FR', 'BZ', 'IN', 'DE'],
    ssps: ['Google Open'],
    os: 'Both',
    deviceId: 'With IDs',
    bundles: 1250,
    acceptance: 85,
  },
  {
    key: 'r2',
    countries: ['UK', 'US', 'FR'],
    ssps: ['Meta', 'Google Open', 'Vungle', 'Pubmatic'],
    os: 'Android',
    deviceId: 'Both',
    bundles: 50,
    acceptance: 25,
  },
  {
    key: 'r3',
    countries: ['US', 'FR'],
    ssps: ['Vungle'],
    os: 'Both',
    deviceId: 'Both',
    bundles: 10,
    acceptance: 50,
  },
  {
    key: 'r4',
    countries: ['US', 'BZ'],
    ssps: ['Vungle'],
    os: 'iOS',
    deviceId: 'With IDs',
    bundles: 320,
    acceptance: 90,
  },
  {
    key: 'r5',
    countries: ['US'],
    ssps: ['Pubmatic', 'Meta', 'Google', 'Smaato'],
    os: 'iOS',
    deviceId: 'Without IDs',
    bundles: 15,
    acceptance: 20,
  },
]

export const initialSuppression = [
  { key: 's1', appId: '340', appName: 'Balance Dash', active: true },
  { key: 's2', appId: '342', appName: 'Diamond Cash', active: false },
  { key: 's3', appId: '212', appName: 'Emerald Funds', active: true },
  { key: 's4', appId: '772', appName: 'Cookie Cash', active: true },
  { key: 's5', appId: '332', appName: 'Burger Dash', active: false },
]

export const osOptions = ['All', 'iOS', 'Android', 'Both']
export const deviceIdOptions = ['Both', 'With IDs', 'Without IDs', 'Device ID']
export const appNameOptions = [
  'Balance Dash',
  'Diamond Cash',
  'Emerald Funds',
  'Cookie Cash',
  'Burger Dash',
]
