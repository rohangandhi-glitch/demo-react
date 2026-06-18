import { useState } from 'react'
import Modal from './Modal'
import { Checkbox } from './FormFields'
import { Search } from './Icons'

// Advertiser / Apps filter editor (Figma nodes 13296-24268 …24545).
// Two vertical tabs; each is an independent searchable multi-select list.
export default function FilterModal({
  initialTab = 'Advertiser',
  advertiserOptions,
  appOptions,
  advertisers,
  apps,
  onApply,
  onClose,
}) {
  const [tab, setTab] = useState(initialTab)
  const [advSel, setAdvSel] = useState(() => new Set(advertisers))
  const [appSel, setAppSel] = useState(() => new Set(apps))
  const [query, setQuery] = useState('')

  const isAdv = tab === 'Advertiser'
  const options = isAdv ? advertiserOptions : appOptions
  const sel = isAdv ? advSel : appSel
  const setSel = isAdv ? setAdvSel : setAppSel

  const visible = options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))

  const toggle = (opt) =>
    setSel((prev) => {
      const next = new Set(prev)
      next.has(opt) ? next.delete(opt) : next.add(opt)
      return next
    })

  return (
    <Modal onClose={onClose} width={720} className="filter-modal">
      <div className="filter-modal-body">
        <div className="filter-tabs">
          {['Advertiser', 'Apps'].map((t) => (
            <button
              type="button"
              key={t}
              className={`filter-tab${tab === t ? ' is-active' : ''}`}
              onClick={() => {
                setTab(t)
                setQuery('')
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="filter-panel">
          <div className="search-field filter-search">
            <Search />
            <input
              type="text"
              placeholder={isAdv ? 'Search Advertisers' : 'Search Apps'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={isAdv ? 'Search advertisers' : 'Search apps'}
            />
          </div>

          <div className="filter-list">
            {visible.map((opt) => (
              <Checkbox key={opt} label={opt} checked={sel.has(opt)} onChange={() => toggle(opt)} />
            ))}
          </div>

          <div className="filter-bulk">
            <button type="button" className="btn btn-outline" onClick={() => setSel(new Set(options))}>
              Select All
            </button>
            <button type="button" className="btn btn-outline btn-outline-danger" onClick={() => setSel(new Set())}>
              Unselect All
            </button>
          </div>
        </div>
      </div>

      <div className="modal-footer filter-footer">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onApply({ advertisers: [...advSel], apps: [...appSel] })}
        >
          Apply Filter
        </button>
      </div>
    </Modal>
  )
}
