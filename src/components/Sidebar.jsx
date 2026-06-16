import { useState } from 'react'
import logo from '../assets/uplift/logo.svg'
import avatarAccount from '../assets/uplift/avatar-account.png'
import avatarUser from '../assets/uplift/avatar-user.jpg'
import {
  Home,
  Layers,
  WandSparkles,
  LifeBuoy,
  ChevronUp,
  ChevronDown,
  ChevronSort,
  X,
} from './Icons'

const appsItems = [
  'Analytics',
  'Campaigns',
  'Creatives',
  'Segments',
  'Cohorts',
  'Settings',
]

const generalItems = [
  'Request Management',
  'Alerts Management',
  'Uplift Test',
  'UA Config',
  'SSP Config',
  'Apps',
  'App Developers',
  'Revenue',
  'Users',
]

export default function Sidebar({ open = false, onClose, active, onNavigate }) {
  const [appsOpen, setAppsOpen] = useState(true)
  const [generalOpen, setGeneralOpen] = useState(true)

  const select = (label) => onNavigate?.(label)

  return (
    <aside className={`sidebar${open ? ' is-open' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <img src={logo} alt="YouAppi" />
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <button type="button" className="account-switch">
          <span className="account-info">
            <img className="avatar" src={avatarAccount} alt="" />
            <span className="account-text">
              <span className="account-label">App Dev</span>
              <span className="account-name">European Games Group AG</span>
            </span>
          </span>
          <ChevronSort className="muted-icon" />
        </button>

        <nav className="nav-section">
          <button
            type="button"
            className={`nav-item${active === 'Dashboard' ? ' is-selected' : ''}`}
            onClick={() => select('Dashboard')}
          >
            <span className="nav-item-left">
              <Home />
              <span>Dashboard</span>
            </span>
          </button>

          <div className="nav-group">
            <button
              type="button"
              className="nav-item nav-group-head"
              onClick={() => setAppsOpen((v) => !v)}
              aria-expanded={appsOpen}
            >
              <span className="nav-item-left">
                <Layers />
                <span>Apps</span>
              </span>
              {appsOpen ? (
                <ChevronUp className="muted-icon" />
              ) : (
                <ChevronDown className="muted-icon" />
              )}
            </button>
            {appsOpen && (
              <div className="nav-submenu">
                {appsItems.map((label) => (
                  <button
                    type="button"
                    className={`nav-subitem${active === label ? ' is-active' : ''}`}
                    onClick={() => select(label)}
                    key={label}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="nav-group nav-section general-section">
          <button
            type="button"
            className="nav-item nav-group-head"
            onClick={() => setGeneralOpen((v) => !v)}
            aria-expanded={generalOpen}
          >
            <span className="nav-item-left">
              <WandSparkles />
              <span>General</span>
            </span>
            {generalOpen ? (
              <ChevronUp className="muted-icon" />
            ) : (
              <ChevronDown className="muted-icon" />
            )}
          </button>
          {generalOpen && (
            <div className="nav-submenu nav-submenu-scroll">
              {generalItems.map((label) => (
                <button
                  type="button"
                  className={`nav-subitem${active === label ? ' is-active' : ''}`}
                  onClick={() => select(label)}
                  key={label}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className={`nav-item${active === 'Help' ? ' is-selected' : ''}`}
          onClick={() => select('Help')}
        >
          <span className="nav-item-left">
            <LifeBuoy />
            <span>Help</span>
          </span>
        </button>

        <button type="button" className="account-switch profile">
          <span className="account-info">
            <img className="avatar avatar-round" src={avatarUser} alt="" />
            <span className="account-text">
              <span className="profile-name">Eyal Hilzenrat</span>
              <span className="profile-email">eyal@youappi.com</span>
            </span>
          </span>
          <ChevronSort className="muted-icon" />
        </button>
      </div>
    </aside>
  )
}
