import { useMemo, useState } from 'react'
import Modal from './components/Modal'
import ConfirmDialog from './components/ConfirmDialog'
import ActionMenu from './components/ActionMenu'
import Toggle from './components/Toggle'
import TagSelect from './components/TagSelect'
import Slider from './components/Slider'
import UploadField from './components/UploadField'
import { TextField, SelectField, Label } from './components/FormFields'
import {
  Columns,
  ChevronDown,
  ChevronSort,
  Search,
  Plus,
  Pencil,
  FileCsv,
} from './components/Icons'
import {
  initialRules,
  initialSuppression,
  osOptions,
  deviceIdOptions,
  appNameOptions,
} from './data/uaConfig'
import { sspOptions, countryOptions } from './data/sspConfig'

let uid = 200
const nextKey = () => `u${uid++}`

export default function UaConfigPage() {
  const [mainTab, setMainTab] = useState('UA Traffic Control')
  const [query, setQuery] = useState('')
  const [rules, setRules] = useState(initialRules)
  const [suppression, setSuppression] = useState(initialSuppression)
  const [modal, setModal] = useState(null)
  const close = () => setModal(null)

  return (
    <section className="card table-card">
      <div className="tabs">
        {['UA Traffic Control', 'App Suppression Lists'].map((t) => (
          <button
            type="button"
            key={t}
            className={`tab${mainTab === t ? ' is-active' : ''}`}
            onClick={() => setMainTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {mainTab === 'UA Traffic Control' ? (
        <TrafficPanel
          rules={rules}
          query={query}
          setQuery={setQuery}
          onNew={() => setModal({ type: 'rule', row: null })}
          onEdit={(row) => setModal({ type: 'rule', row })}
          onDuplicate={(row) => setModal({ type: 'duplicate', row })}
          onDelete={(row) => setModal({ type: 'delete', row })}
        />
      ) : (
        <SuppressionPanel
          rows={suppression}
          query={query}
          setQuery={setQuery}
          onToggle={(row) =>
            setSuppression((rs) =>
              rs.map((r) => (r.key === row.key ? { ...r, active: !r.active } : r)),
            )
          }
          onEdit={(row) => setModal({ type: 'suppression', row })}
        />
      )}

      {/* Modals */}
      {modal?.type === 'rule' && (
        <TrafficRuleModal
          row={modal.row}
          onClose={close}
          onSave={(row) => {
            setRules((rs) =>
              rs.some((r) => r.key === row.key)
                ? rs.map((r) => (r.key === row.key ? row : r))
                : [...rs, row],
            )
            close()
          }}
        />
      )}
      {modal?.type === 'suppression' && (
        <SuppressionModal
          row={modal.row}
          onClose={close}
          onSave={(row) => {
            setSuppression((rs) =>
              rs.some((r) => r.key === row.key)
                ? rs.map((r) => (r.key === row.key ? row : r))
                : [...rs, row],
            )
            close()
          }}
        />
      )}
      {modal?.type === 'duplicate' && (
        <ConfirmDialog
          title="Duplicate"
          message="Are you sure you want to duplicate this Rule?"
          onCancel={close}
          onConfirm={() => {
            setRules((rs) => {
              const i = rs.findIndex((r) => r.key === modal.row.key)
              const copy = { ...modal.row, key: nextKey() }
              const next = [...rs]
              next.splice(i + 1, 0, copy)
              return next
            })
            close()
          }}
        />
      )}
      {modal?.type === 'delete' && (
        <ConfirmDialog
          title="Delete"
          message="Are you sure you want to delete this Rule?"
          danger
          onCancel={close}
          onConfirm={() => {
            setRules((rs) => rs.filter((r) => r.key !== modal.row.key))
            close()
          }}
        />
      )}
    </section>
  )
}

/* ===== UA Traffic Control ===== */
function TrafficPanel({ rules, query, setQuery, onNew, onEdit, onDuplicate, onDelete }) {
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rules
    return rules.filter(
      (r) =>
        r.countries.join(' ').toLowerCase().includes(q) ||
        r.ssps.join(' ').toLowerCase().includes(q) ||
        r.os.toLowerCase().includes(q),
    )
  }, [rules, query])

  return (
    <div className="table-shell">
      <div className="table-toolbar">
        <button type="button" className="btn btn-outline">
          <Columns />
          <span>Columns</span>
        </button>
        <div className="toolbar-right">
          <button type="button" className="btn btn-outline">
            <span>OS</span>
            <ChevronDown className="muted-icon" />
          </button>
          <div className="search-field">
            <Search />
            <input
              type="text"
              placeholder="Search in Table"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search rules"
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={onNew}>
            <Plus />
            <span>New Rule</span>
          </button>
        </div>
      </div>

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <Th label="Countries" center />
              <Th label="SSP" center />
              <Th label="OS" />
              <Th label="User Device ID" />
              <Th label="Bundle IDs" />
              <Th label="Acceptance Rate" />
              <th className="is-right"><span className="th-content">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td className="is-center">
                  <ChipRow items={r.countries} maxVisible={4} variant="country" />
                </td>
                <td className="is-center">
                  <ChipRow items={r.ssps} maxVisible={2} variant="ssp" />
                </td>
                <td>{r.os}</td>
                <td>{r.deviceId}</td>
                <td>
                  <a className="bundles-link" href="#">
                    <FileCsv size={15} className="file-icon" />
                    {r.bundles} Bundles
                  </a>
                </td>
                <td>{r.acceptance}%</td>
                <td className="is-right">
                  <ActionMenu
                    onEdit={() => onEdit(r)}
                    onDuplicate={() => onDuplicate(r)}
                    onDelete={() => onDelete(r)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ===== App Suppression Lists ===== */
function SuppressionPanel({ rows, query, setQuery, onToggle, onEdit }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(
      (r) => r.appName.toLowerCase().includes(q) || r.appId.includes(q),
    )
  }, [rows, query])

  return (
    <div className="table-shell">
      <div className="table-toolbar">
        <button type="button" className="btn btn-outline">
          <Columns />
          <span>Columns</span>
        </button>
        <div className="toolbar-right">
          <button type="button" className="btn btn-outline">
            <span>Status</span>
            <ChevronDown className="muted-icon" />
          </button>
          <div className="search-field">
            <Search />
            <input
              type="text"
              placeholder="Search in Table"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search apps"
            />
          </div>
        </div>
      </div>

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <Th label="App ID" />
              <Th label="App Name" />
              <Th label="Status" center />
              <th className="is-right"><span className="th-content">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.key}>
                <td>{r.appId}</td>
                <td>{r.appName}</td>
                <td className="is-center">
                  <span className="status-cell">
                    <Toggle
                      checked={r.active}
                      onChange={() => onToggle(r)}
                      ariaLabel={`Suppression for ${r.appName}`}
                    />
                    <span className={`pill ${r.active ? 'pill-active' : 'pill-inactive'}`}>
                      {r.active ? 'Active' : 'Inactive'}
                    </span>
                  </span>
                </td>
                <td className="is-right">
                  <button
                    type="button"
                    className="icon-action"
                    aria-label={`Edit ${r.appName}`}
                    onClick={() => onEdit(r)}
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ===== small bits ===== */
function Th({ label, center }) {
  return (
    <th className={center ? 'is-center' : undefined}>
      <span className="th-content">
        {label}
        <ChevronSort size={10} className="muted-icon" />
      </span>
    </th>
  )
}

function ChipRow({ items, maxVisible, variant }) {
  const visible = items.slice(0, maxVisible)
  const extra = items.length - visible.length
  return (
    <span className="chip-row">
      {visible.map((it) => (
        <span className={variant === 'ssp' ? 'ssp-tag' : 'mini-chip'} key={it}>
          {it}
        </span>
      ))}
      {extra > 0 && <span className="chip-overflow">+{extra}</span>}
    </span>
  )
}

function ModalFooter({ onClose, onSave }) {
  return (
    <div className="modal-footer">
      <button type="button" className="btn btn-ghost" onClick={onClose}>
        Cancel
      </button>
      <button type="button" className="btn btn-primary" onClick={onSave}>
        Save
      </button>
    </div>
  )
}

/* ===== Modals ===== */
function TrafficRuleModal({ row, onClose, onSave }) {
  const isEdit = !!row
  const [countries, setCountries] = useState(row?.countries ?? [])
  const [ssps, setSsps] = useState(row?.ssps ?? [])
  const [os, setOs] = useState(row?.os ?? '')
  const [deviceId, setDeviceId] = useState(row?.deviceId ?? '')
  const [file, setFile] = useState(row?.file ?? '')
  const [rate, setRate] = useState(row ? Math.round((row.acceptance ?? 0) / 10) : 0)

  const save = () =>
    onSave({
      key: row?.key ?? nextKey(),
      countries,
      ssps,
      os,
      deviceId,
      file,
      bundles: row?.bundles ?? 0,
      acceptance: rate * 10,
    })

  return (
    <Modal onClose={onClose} width={760} className="form-modal">
      <p className="modal-title">{isEdit ? 'Edit Traffic Control Rule' : 'New Traffic Control Rule'}</p>
      <div className="modal-body">
        <div className="form-row">
          <div className="field field-half">
            <Label required>Select Countries</Label>
            <TagSelect value={countries} options={countryOptions} onChange={setCountries} placeholder="Choose countries" />
          </div>
          <div className="field field-half">
            <Label required>SSP</Label>
            <TagSelect value={ssps} options={sspOptions} onChange={setSsps} placeholder="Choose SSP" />
          </div>
        </div>
        <div className="form-row">
          <SelectField label="OS" required placeholder="Select OS" options={osOptions} value={os} onChange={setOs} className="field-half" />
          <SelectField label="User Device ID" required placeholder="Choose" options={deviceIdOptions} value={deviceId} onChange={setDeviceId} className="field-half" />
        </div>
        <div className="field field-full">
          <Label required>Upload Bundle IDs CSV File</Label>
          <UploadField fileName={file} onFile={setFile} />
        </div>
        <div className="field field-full">
          <Label required>Acceptance Rate</Label>
          <Slider value={rate} min={0} max={10} onChange={setRate} />
        </div>
      </div>
      <ModalFooter onClose={onClose} onSave={save} />
    </Modal>
  )
}

function SuppressionModal({ row, onClose, onSave }) {
  const [appId, setAppId] = useState(row?.appId ?? '')
  const [appName, setAppName] = useState(row?.appName ?? '')
  const [active, setActive] = useState(row?.active ?? true)

  return (
    <Modal onClose={onClose} width={430} className="form-modal">
      <p className="modal-title">Edit Suppression Rule</p>
      <div className="modal-body">
        <TextField label="App ID" required info placeholder="e.g., 560" value={appId} onChange={setAppId} className="field-full" />
        <SelectField label="App Name" required placeholder="Select" options={appNameOptions} value={appName} onChange={setAppName} className="field-full" />
        <div className="discrepancy-row">
          <span className="field-label">Suppression Setting:</span>
          <Toggle checked={active} onChange={setActive} />
          <span className={`pill ${active ? 'pill-active' : 'pill-inactive'}`}>
            {active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave({ key: row?.key ?? nextKey(), appId, appName, active })} />
    </Modal>
  )
}
