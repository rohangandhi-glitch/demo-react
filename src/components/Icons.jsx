// Inline SVG icons recreated from the Figma design (lucide-style, 24px grid).
// Each accepts a `size` (px) and spreads remaining SVG props.

const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

export function Home({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 9.5 12 3l9 6.5" />
      <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
      <path d="M9 21v-6h6v6" />
    </svg>
  )
}

export function Layers({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  )
}

export function WandSparkles({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m3 21 12-12" />
      <path d="m14 6 4 4" />
      <path d="M5 4v4M3 6h4M18 14v4M16 16h4" />
    </svg>
  )
}

export function LifeBuoy({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </svg>
  )
}

export function ChevronDown({ size = 12, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ChevronUp({ size = 12, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  )
}

export function ChevronSort({ size = 12, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m8 9 4-5 4 5M8 15l4 5 4-5" />
    </svg>
  )
}

export function Search({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function Plus({ size = 14, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Moon({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export function Columns({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M12 4v16" />
    </svg>
  )
}

export function Menu({ size = 20, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

export function X({ size = 20, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function Info({ size = 12, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  )
}

export function ChevronRight({ size = 14, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function Check({ size = 10, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m5 12 5 5 9-11" />
    </svg>
  )
}

export function DotsVertical({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="5" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="12" cy="19" r="1.4" />
    </svg>
  )
}

export function Pencil({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M4 20h4l10-10a2 2 0 0 0-4-4L4 16v4Z" />
      <path d="M13.5 6.5 17.5 10.5" />
    </svg>
  )
}

export function Copy({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

export function Trash({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    </svg>
  )
}

export function Eye({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function EyeOff({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.5 10.5 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 3.9M6.6 6.6A17 17 0 0 0 2 12s4 7 10 7a10 10 0 0 0 4-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  )
}

export function FileCsv({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13.5h2M8.5 16.5h4M13.5 13.5h2" />
    </svg>
  )
}

export function Upload({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
    </svg>
  )
}

export function Download({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 4v12M7 11l5 5 5-5" />
      <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
    </svg>
  )
}

export function CreditCard({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  )
}

export function DollarSign({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 2v20M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 3 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3" />
    </svg>
  )
}

export function ClipboardList({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  )
}

export function Flag({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  )
}

export function Printer({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="7" rx="1" />
    </svg>
  )
}

/* Stat tile icons */
export function Flask({ size = 18, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M9 3h6M10 3v6.5L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-8.5V3" />
      <path d="M7.5 14h9" />
    </svg>
  )
}

export function Activity({ size = 18, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 12h4l2 7 4-16 2 9h6" />
    </svg>
  )
}

export function TrendingUp({ size = 18, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  )
}

export function CircleCheck({ size = 18, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  )
}
