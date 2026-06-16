// Seed data for the SSP Config feature, transcribed from the designs.

export const initialSsps = [
  { id: 'SSP001', name: 'Google Ad Manager', nameId: 'google_adm', discrepancy: true },
  { id: 'SSP002', name: 'Bidswitch Ad Manager', nameId: 'bidswitch', discrepancy: false },
  { id: 'SSP003', name: 'Samsung for Business', nameId: 'Samsung', discrepancy: true },
  { id: 'SSP004', name: 'Smaato Ads', nameId: 'smaato', discrepancy: true },
  { id: 'SSP005', name: 'Mopub Ads', nameId: 'mopub', discrepancy: false },
]

export const initialPublishers = [
  { key: 'p1', bundleId: '381471023', ssps: ['Google Open'] },
  { key: 'p2', bundleId: '468990152', ssps: ['Meta', 'Google Open', 'Vungle'] },
  { key: 'p3', bundleId: '151598192', ssps: ['Vungle'] },
  { key: 'p4', bundleId: '561471044', ssps: ['Vungle'] },
  { key: 'p5', bundleId: '438908823', ssps: ['Pubmatic', 'Meta', 'Google Open'] },
]

export const initialIps = [
  { key: 'i1', ip: '82.97.206.104', reason: 'Policy violation', date: '2022-07-11' },
  { key: 'i2', ip: '87.120.252.69', reason: 'Fraudulent activity', date: '2022-07-11' },
  { key: 'i3', ip: '82.97.206.31', reason: 'Copyright infringement', date: '2022-07-11' },
  { key: 'i4', ip: '82.97.206.108', reason: 'Fraudulent activity', date: '2022-07-11' },
  { key: 'i5', ip: '37.128.250.182', reason: 'Malware detected', date: '2022-07-11' },
]

export const initialCountries = [
  { key: 'c1', country: 'Japan', ssps: ['Google Open'] },
  { key: 'c2', country: 'Iceland', ssps: ['Meta', 'Google Open', 'Vungle'] },
  { key: 'c3', country: 'Kuwait', ssps: ['Vungle'] },
  { key: 'c4', country: 'Nepal', ssps: ['Pubmatic'] },
  { key: 'c5', country: 'United States', ssps: ['Pubmatic', 'Meta', 'Google Open'] },
]

export const sspOptions = [
  'Google Open',
  'Meta',
  'Vungle',
  'Pubmatic',
  'Mopub',
  'Google',
  'Smaato',
]

export const countryOptions = [
  'Afghanistan',
  'Aland Island',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Iceland',
  'India',
  'Japan',
  'Kuwait',
  'Nepal',
  'United States',
]
