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
