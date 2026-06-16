import { WandSparkles, ChevronDown, Moon, Menu } from './Icons'

export default function Topbar({ onMenuClick, breadcrumb = 'Uplift Test' }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          type="button"
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu />
        </button>

        <button type="button" className="breadcrumb-btn">
          <WandSparkles />
          <span>General</span>
        </button>
        <span className="breadcrumb-sep">/</span>
        <button type="button" className="breadcrumb-btn">
          <span>{breadcrumb}</span>
          <ChevronDown size={16} className="muted-icon" />
        </button>

        <div className="topbar-right">
          <button type="button" className="icon-btn" aria-label="Toggle theme">
            <Moon />
          </button>
        </div>
      </div>
    </header>
  )
}
