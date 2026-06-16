import { useMemo, useState } from 'react'
import Modal from './components/Modal'
import ConfirmDialog from './components/ConfirmDialog'
import ActionMenu from './components/ActionMenu'
import Toggle from './components/Toggle'
import TagSelect from './components/TagSelect'
import { TextField, SelectField, Label } from './components/FormFields'
import {
  Columns,
  ChevronDown,
  ChevronSort,
  Search,
  Pencil,
  Upload,
  Download,
  Eye,
  EyeOff,
} from './components/Icons'
import {
  initialSsps,
  initialPublishers,
  initialIps,
  initialCountries,
  sspOptions,
  countryOptions,
} from './data/sspConfig'

const BL_TABS = ['Publisher', 'IP Address', 'Countries']
let uid = 100
const nextKey = () => `k${uid++}`

export default function SspConfigPage() {
  const [mainTab, setMainTab] = useState('SSP')
  const [blTab, setBlTab] = useState('Publisher')
  const [query, setQuery] = useState('')

  const [ssps, setSsps] = useState(initialSsps)
  const [publishers, setPublishers] = useState(initialPublishers)
  const [ips, setIps] = useState(initialIps)
  const [countries, setCountries] = useState(initialCountries)

  // modal: { type, row, entity }
  const [modal, setModal] = useState(null)
  const close = () => setModal(null)

  const filterBL = (rows, fields) => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      fields.some((f) => String(r[f] ?? '').toLowerCase().includes(q)),
    )
  }

  /* ---- per-entity list helpers ---- */
  const setters = { publisher: setPublishers, ip: setIps, country: setCountries }
  const removeRow = (entity, key) =>
    setters[entity]((rows) => rows.filter((r) => r.key !== key))
  const duplicateRow = (entity, row) =>
    setters[entity]((rows) => {
      const i = rows.findIndex((r) => r.key === row.key)
      const copy = { ...row, key: nextKey() }
      const next = [...rows]
      next.splice(i + 1, 0, copy)
      return next
    })
  const upsertRow = (entity, row) =>
    setters[entity]((rows) =>
      rows.some((r) => r.key === row.key)
        ? rows.map((r) => (r.key === row.key ? row : r))
        : [...rows, row],
    )

  return (
    <section className="card table-card">
      {/* main tabs */}
      <div className="tabs">
        {['SSP', 'Black Lists'].map((t) => (
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

      {mainTab === 'SSP' ? (
        <SspPanel
          ssps={ssps}
          query={query}
          setQuery={setQuery}
          onEdit={(row) => setModal({ type: 'editSsp', row })}
          onToggle={(row) => setModal({ type: 'discrepancy', row })}
        />
      ) : (
        <BlackListsPanel
          blTab={blTab}
          setBlTab={setBlTab}
          query={query}
          setQuery={setQuery}
          publishers={filterBL(publishers, ['bundleId'])}
          ips={filterBL(ips, ['ip', 'reason'])}
          countries={filterBL(countries, ['country'])}
          openEdit={(entity, row) => setModal({ type: `edit-${entity}`, row, entity })}
          openDuplicate={(entity, row) =>
            setModal({ type: 'duplicate', row, entity })
          }
          openDelete={(entity, row) => setModal({ type: 'delete', row, entity })}
        />
      )}

      {/* ---- Modals ---- */}
      {modal?.type === 'editSsp' && (
        <EditSspModal
          row={modal.row}
          onClose={close}
          onSave={(row) => {
            setSsps((rows) => rows.map((r) => (r.id === row.id ? row : r)))
            close()
          }}
        />
      )}

      {modal?.type === 'discrepancy' && (
        <DiscrepancyModal
          row={modal.row}
          onClose={close}
          onSave={(discrepancy) => {
            setSsps((rows) =>
              rows.map((r) => (r.id === modal.row.id ? { ...r, discrepancy } : r)),
            )
            close()
          }}
        />
      )}

      {modal?.type === 'edit-publisher' && (
        <PublisherModal
          row={modal.row}
          onClose={close}
          onSave={(row) => {
            upsertRow('publisher', row)
            close()
          }}
        />
      )}
      {modal?.type === 'edit-ip' && (
        <IpModal
          row={modal.row}
          onClose={close}
          onSave={(row) => {
            upsertRow('ip', row)
            close()
          }}
        />
      )}
      {modal?.type === 'edit-country' && (
        <CountryModal
          row={modal.row}
          onClose={close}
          onSave={(row) => {
            upsertRow('country', row)
            close()
          }}
        />
      )}

      {modal?.type === 'duplicate' && (
        <ConfirmDialog
          title="Duplicate"
          message="Are you sure you want to duplicate it?"
          onCancel={close}
          onConfirm={() => {
            duplicateRow(modal.entity, modal.row)
            close()
          }}
        />
      )}
      {modal?.type === 'delete' && (
        <ConfirmDialog
          title="Delete"
          message="Are you sure you want to delete it?"
          danger
          onCancel={close}
          onConfirm={() => {
            removeRow(modal.entity, modal.row.key)
            close()
          }}
        />
      )}
    </section>
  )
}

/* ============ SSP tab ============ */
function SspPanel({ ssps, query, setQuery, onEdit, onToggle }) {
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ssps
    return ssps.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameId.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q),
    )
  }, [ssps, query])

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
              aria-label="Search SSPs"
            />
          </div>
        </div>
      </div>

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <Th label="ID" />
              <Th label="Name" />
              <Th label="Name ID" />
              <Th label="Discrepancy Report" />
              <Th label="Status" />
              <th className="is-right">
                <span className="th-content">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td className="cell-muted">{s.nameId}</td>
                <td>
                  <Toggle
                    checked={s.discrepancy}
                    onChange={() => onToggle(s)}
                    ariaLabel={`Discrepancy report for ${s.name}`}
                  />
                </td>
                <td>
                  <span className={`pill ${s.discrepancy ? 'pill-active' : 'pill-inactive'}`}>
                    {s.discrepancy ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="is-right">
                  <button
                    type="button"
                    className="icon-action"
                    aria-label={`Edit ${s.name}`}
                    onClick={() => onEdit(s)}
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

/* ============ Black Lists tab ============ */
function BlackListsPanel({
  blTab,
  setBlTab,
  query,
  setQuery,
  publishers,
  ips,
  countries,
  openEdit,
  openDuplicate,
  openDelete,
}) {
  return (
    <div className="bl-panel">
      <div className="subtabs">
        {BL_TABS.map((t) => (
          <button
            type="button"
            key={t}
            className={`subtab${blTab === t ? ' is-active' : ''}`}
            onClick={() => setBlTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="table-shell">
        <div className="table-toolbar">
          <button type="button" className="btn btn-outline">
            <Columns />
            <span>Columns</span>
          </button>
          <div className="toolbar-right">
            <div className="search-field">
              <Search />
              <input
                type="text"
                placeholder="Search in Table"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search blacklist"
              />
            </div>
            <button type="button" className="btn btn-outline">
              <Upload />
              <span>Bulk Upload</span>
            </button>
            <button type="button" className="btn btn-primary">
              <Download />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="table-scroll">
          {blTab === 'Publisher' && (
            <table className="data-table">
              <thead>
                <tr>
                  <Th label="Bundle ID" />
                  <Th label="SSP" center />
                  <th className="is-right"><span className="th-content">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {publishers.map((p) => (
                  <tr key={p.key}>
                    <td className="cell-link">{p.bundleId}</td>
                    <td className="is-center">
                      <SspTags tags={p.ssps} />
                    </td>
                    <td className="is-right">
                      <ActionMenu
                        onEdit={() => openEdit('publisher', p)}
                        onDuplicate={() => openDuplicate('publisher', p)}
                        onDelete={() => openDelete('publisher', p)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {blTab === 'IP Address' && (
            <table className="data-table">
              <thead>
                <tr>
                  <Th label="IP Address" />
                  <Th label="Reason" />
                  <Th label="Date Added" />
                  <th className="is-right"><span className="th-content">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {ips.map((r) => (
                  <tr key={r.key}>
                    <td className="cell-link">{r.ip}</td>
                    <td>{r.reason}</td>
                    <td>{r.date}</td>
                    <td className="is-right">
                      <ActionMenu
                        onEdit={() => openEdit('ip', r)}
                        onDuplicate={() => openDuplicate('ip', r)}
                        onDelete={() => openDelete('ip', r)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {blTab === 'Countries' && (
            <table className="data-table">
              <thead>
                <tr>
                  <Th label="Country" />
                  <Th label="SSP" center />
                  <th className="is-right"><span className="th-content">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {countries.map((c) => (
                  <tr key={c.key}>
                    <td>{c.country}</td>
                    <td className="is-center">
                      <SspTags tags={c.ssps} />
                    </td>
                    <td className="is-right">
                      <ActionMenu
                        onEdit={() => openEdit('country', c)}
                        onDuplicate={() => openDuplicate('country', c)}
                        onDelete={() => openDelete('country', c)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

/* ============ small bits ============ */
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

function SspTags({ tags }) {
  return (
    <span className="ssp-tags">
      {tags.map((t) => (
        <span className="ssp-tag" key={t}>
          {t}
        </span>
      ))}
    </span>
  )
}

function ModalFooter({ onClose, onSave, saveLabel = 'Save' }) {
  return (
    <div className="modal-footer">
      <button type="button" className="btn btn-ghost" onClick={onClose}>
        Cancel
      </button>
      <button type="button" className="btn btn-primary" onClick={onSave}>
        {saveLabel}
      </button>
    </div>
  )
}

/* ============ Modals ============ */
function EditSspModal({ row, onClose, onSave }) {
  const [form, setForm] = useState({ ...row })
  const [showKey, setShowKey] = useState(false)
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <Modal onClose={onClose} width={430} className="form-modal">
      <p className="modal-title">Edit SSP</p>
      <div className="modal-body">
        <TextField label="SSP ID" required info placeholder="e.g., 560" value={form.id} onChange={set('id')} className="field-full" />
        <TextField label="SSP Name" required info placeholder="e.g., Google Ads" value={form.name} onChange={set('name')} className="field-full" />
        <TextField label="Name ID" required info placeholder="e.g., google_adm" value={form.nameId} onChange={set('nameId')} className="field-full" />

        <p className="section-heading">Discrepancy Report Configuration</p>
        <div className="discrepancy-row">
          <span className="field-label">Discrepancy Report:</span>
          <Toggle checked={form.discrepancy} onChange={set('discrepancy')} />
          <span className={`pill ${form.discrepancy ? 'pill-active' : 'pill-inactive'}`}>
            {form.discrepancy ? 'Active' : 'Inactive'}
          </span>
        </div>
        <ApiFields form={form} set={set} showKey={showKey} setShowKey={setShowKey} />
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave(form)} />
    </Modal>
  )
}

function DiscrepancyModal({ row, onClose, onSave }) {
  const [on, setOn] = useState(row.discrepancy)
  const [form, setForm] = useState({ apiUrl: '', apiKey: '' })
  const [showKey, setShowKey] = useState(false)
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <Modal onClose={onClose} width={430} className="form-modal">
      <p className="modal-title">Discrepancy Report Configuration</p>
      <div className="modal-body">
        <div className="discrepancy-row">
          <span className="field-label">Discrepancy Report:</span>
          <Toggle checked={on} onChange={setOn} />
          <span className={`pill ${on ? 'pill-active' : 'pill-inactive'}`}>
            {on ? 'Active' : 'Inactive'}
          </span>
        </div>
        <ApiFields form={form} set={set} showKey={showKey} setShowKey={setShowKey} />
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave(on)} />
    </Modal>
  )
}

function ApiFields({ form, set, showKey, setShowKey }) {
  return (
    <>
      <div className="field field-full">
        <Label required info>API URL</Label>
        <div className="input-control">
          <input
            type="text"
            placeholder="https://api.google.com/admanager/reporting"
            value={form.apiUrl ?? ''}
            onChange={(e) => set('apiUrl')(e.target.value)}
          />
        </div>
      </div>
      <div className="field field-full">
        <Label required>API Key</Label>
        <div className="input-control">
          <input
            type={showKey ? 'text' : 'password'}
            placeholder="••••••••••"
            value={form.apiKey ?? ''}
            onChange={(e) => set('apiKey')(e.target.value)}
          />
          <button
            type="button"
            className="input-icon-btn"
            aria-label={showKey ? 'Hide API key' : 'Show API key'}
            onClick={() => setShowKey((s) => !s)}
          >
            {showKey ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>
    </>
  )
}

function PublisherModal({ row, onClose, onSave }) {
  const [bundleId, setBundleId] = useState(row?.bundleId ?? '')
  const [ssps, setSsps] = useState(row?.ssps ?? [])
  return (
    <Modal onClose={onClose} width={430} className="form-modal">
      <p className="modal-title">Edit Publisher Blacklist</p>
      <div className="modal-body">
        <TextField label="Bundle ID" required info placeholder="e.g., 560" value={bundleId} onChange={setBundleId} className="field-full" />
        <div className="field field-full">
          <Label required>SSP</Label>
          <TagSelect value={ssps} options={sspOptions} onChange={setSsps} placeholder="Select SSP" />
        </div>
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave({ ...row, key: row?.key ?? nextKey(), bundleId, ssps })} />
    </Modal>
  )
}

function IpModal({ row, onClose, onSave }) {
  const [ip, setIp] = useState(row?.ip ?? '')
  const [reason, setReason] = useState(row?.reason ?? '')
  return (
    <Modal onClose={onClose} width={430} className="form-modal">
      <p className="modal-title">Edit IP Address Blacklist</p>
      <div className="modal-body">
        <TextField label="IP Address" required info placeholder="82.97.206.104" value={ip} onChange={setIp} className="field-full" />
        <TextField label="Reason" required info placeholder="Policy violation" value={reason} onChange={setReason} className="field-full" />
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave({ ...row, key: row?.key ?? nextKey(), ip, reason, date: row?.date ?? '2022-07-11' })} />
    </Modal>
  )
}

function CountryModal({ row, onClose, onSave }) {
  const [country, setCountry] = useState(row?.country ?? '')
  const [ssps, setSsps] = useState(row?.ssps ?? [])
  return (
    <Modal onClose={onClose} width={430} className="form-modal">
      <p className="modal-title">Edit Countries Blacklist</p>
      <div className="modal-body">
        <SelectField label="Select Country" required placeholder="Choose" options={countryOptions} value={country} onChange={setCountry} className="field-full" />
        <div className="field field-full">
          <Label required>SSP</Label>
          <TagSelect value={ssps} options={sspOptions} onChange={setSsps} placeholder="Choose SSP" />
        </div>
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave({ ...row, key: row?.key ?? nextKey(), country, ssps })} />
    </Modal>
  )
}
