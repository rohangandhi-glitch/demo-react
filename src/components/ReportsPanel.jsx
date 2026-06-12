import { useState } from 'react'
import {
  TextField,
  SelectField,
  DateField,
  Checkbox,
  SectionLabel,
} from './FormFields'
import { tests } from '../data/upliftTests'

const REPORT_TYPES = ['Performance Summary', 'Detailed Analytics', 'Conversion Funnel', 'Revenue Breakdown']
const FORMATS = ['PDF', 'CSV', 'XLSX']

export default function ReportsPanel() {
  const [form, setForm] = useState({
    name: '',
    test: '',
    startDate: '',
    endDate: '',
    reportType: '',
    format: 'PDF',
    email: '',
    includeCharts: true,
    includeMetrics: false,
  })

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))
  const toggle = (key) => () => setForm((f) => ({ ...f, [key]: !f[key] }))

  return (
    <>
      <div className="form-block">
        <p className="panel-title">Generate Report</p>

        <div className="form-row">
          <TextField
            label="Report Name"
            required
            info
            placeholder="e.g., Creative Test A"
            value={form.name}
            onChange={set('name')}
            className="field-half"
          />
          <SelectField
            label="Select Test"
            required
            placeholder="Select"
            options={tests.map((t) => t.name)}
            value={form.test}
            onChange={set('test')}
            className="field-half"
          />
        </div>

        <div className="date-row">
          <DateField label="Start Date:" value={form.startDate} onChange={set('startDate')} />
          <DateField label="End Date:" value={form.endDate} onChange={set('endDate')} />
        </div>

        <SelectField
          label="Report Type"
          required
          placeholder="Choose a Report Type"
          options={REPORT_TYPES}
          value={form.reportType}
          onChange={set('reportType')}
          className="field-wide"
        />

        <div className="form-block">
          <SectionLabel>Report Options</SectionLabel>
          <div className="choice-group">
            <Checkbox
              label="Include Charts & Visualizations"
              checked={form.includeCharts}
              onChange={toggle('includeCharts')}
            />
            <Checkbox
              label="Include Detailed Metrics"
              checked={form.includeMetrics}
              onChange={toggle('includeMetrics')}
            />
          </div>
          <div className="form-row">
            <SelectField
              label="Format"
              required
              placeholder="PDF"
              options={FORMATS}
              value={form.format}
              onChange={set('format')}
              className="field-half"
            />
            <TextField
              label="Email Recipients"
              placeholder="email@example.com"
              value={form.email}
              onChange={set('email')}
              className="field-half"
            />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="button" className="btn btn-ghost">
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          Generate Report
        </button>
      </div>
    </>
  )
}
