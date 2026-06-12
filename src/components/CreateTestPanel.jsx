import { useState } from 'react'
import {
  TextField,
  SelectField,
  DateField,
  Radio,
  SectionLabel,
  Stepper,
} from './FormFields'

const GAMES = ['Balance Dash', 'Diamond Cash', 'Emerald Funds', 'Cookie Cash', 'Burger Dash']
const EVENTS = ['Sessions start', 'New Player', 'Payment', 'Progress', 'Ad Click']
const SPLIT_METHODS = ['Percentage Split', 'Device ID List', 'IDFA Prefix']

export default function CreateTestPanel() {
  const [form, setForm] = useState({
    game: '',
    name: '',
    event: '',
    startDate: '',
    endDate: '',
    splitMethod: 'Percentage Split',
    percentage: 50,
  })

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <>
      <div className="form-block">
        <p className="panel-title">Create New Test</p>

        <SelectField
          label="Select Game"
          required
          placeholder="Choose a game"
          options={GAMES}
          value={form.game}
          onChange={set('game')}
          className="field-full"
        />

        <div className="form-row">
          <TextField
            label="Test Name"
            required
            info
            placeholder="e.g., Creative Test A"
            value={form.name}
            onChange={set('name')}
            className="field-half"
          />
          <SelectField
            label="Conversion Event"
            required
            placeholder="Select"
            options={EVENTS}
            value={form.event}
            onChange={set('event')}
            className="field-half"
          />
        </div>

        <div className="date-row">
          <DateField label="Start Date:" value={form.startDate} onChange={set('startDate')} />
          <DateField label="End Date:" value={form.endDate} onChange={set('endDate')} />
        </div>

        <div className="form-block">
          <SectionLabel>Controlled Group Setup</SectionLabel>
          <div className="choice-group">
            {SPLIT_METHODS.map((method) => (
              <Radio
                key={method}
                label={method}
                checked={form.splitMethod === method}
                onChange={() => set('splitMethod')(method)}
              />
            ))}
          </div>
          <div className="percentage-row">
            <Stepper value={form.percentage} onChange={set('percentage')} />
            <div className="input-control percent-input">
              <input type="text" placeholder="% control group" readOnly value="" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="button" className="btn btn-ghost">
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          Create Test
        </button>
      </div>
    </>
  )
}
