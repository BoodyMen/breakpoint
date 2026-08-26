type SwellBadgeProps = { className?: string };

const UI_FONT = "'Hanken Grotesk', 'Arial Narrow', Arial, sans-serif";

export function SwellBadge({ className = '' }: SwellBadgeProps) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" role="img" aria-label="Never miss a swell campaign badge">
      <defs>
        <path id="bp-badge-arc-top" d="M28 120 A 92 92 0 0 1 212 120" />
        <path id="bp-badge-arc-bot" d="M36 120 A 84 84 0 0 0 204 120" />
      </defs>

      {/* screen-print rings */}
      <circle cx="120" cy="120" r="116" fill="var(--bp-cream)" stroke="var(--bp-obsidian)" strokeWidth="4" />
      <circle cx="120" cy="120" r="106" fill="none" stroke="var(--bp-purple)" strokeWidth="3" />
      <circle cx="120" cy="120" r="72" fill="none" stroke="var(--bp-obsidian)" strokeWidth="1.5" strokeDasharray="2 5" />

      {/* curved lockup text */}
      <text fontFamily={UI_FONT} fontWeight="800" fontSize="20" letterSpacing="3.4" fill="var(--bp-obsidian)">
        <textPath href="#bp-badge-arc-top" startOffset="50%" textAnchor="middle">NEVER MISS A SWELL</textPath>
      </text>
      <text fontFamily={UI_FONT} fontWeight="700" fontSize="12" letterSpacing="5" fill="var(--bp-purple-dark)">
        <textPath href="#bp-badge-arc-bot" startOffset="50%" textAnchor="middle">FIND THE SPOT</textPath>
      </text>

      {/* side stars */}
      <path d="M26 120 l2.2 4.8 5.2.6 -3.8 3.6 1 5.2 -4.6-2.6 -4.6 2.6 1-5.2 -3.8-3.6 5.2-.6 Z" fill="var(--bp-purple)" />
      <path d="M214 120 l2.2 4.8 5.2.6 -3.8 3.6 1 5.2 -4.6-2.6 -4.6 2.6 1-5.2 -3.8-3.6 5.2-.6 Z" fill="var(--bp-purple)" />

      {/* grinning skeleton head */}
      <path
        d="M120 66 C 148 66, 168 86, 168 114 C 168 129, 161 139, 153 146 C 151 148, 151 150, 151 154 L 151 160 C 151 169, 143 175, 131 175 L 109 175 C 97 175, 89 169, 89 160 L 89 154 C 89 150, 89 148, 87 146 C 79 139, 72 129, 72 114 C 72 86, 92 66, 120 66 Z"
        fill="var(--bp-cream)"
        stroke="var(--bp-obsidian)"
        strokeWidth="4.5"
      />
      <ellipse cx="103" cy="112" rx="12" ry="14" fill="var(--bp-obsidian)" />
      <ellipse cx="137" cy="112" rx="12" ry="14" fill="var(--bp-obsidian)" />
      <circle cx="99" cy="107" r="3" fill="var(--bp-purple-mid)" />
      <circle cx="133" cy="107" r="3" fill="var(--bp-purple-mid)" />
      <path d="M120 126 l-6 12 h12 Z" fill="var(--bp-obsidian)" />
      <path d="M96 152 h48" stroke="var(--bp-obsidian)" strokeWidth="4" strokeLinecap="round" />
      <path d="M104 152 v11 m8 -11 v13 m8 -13 v13 m8 -13 v11" stroke="var(--bp-obsidian)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
