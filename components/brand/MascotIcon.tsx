type MascotIconProps = { className?: string; decorative?: boolean };

export function MascotIcon({ className = '', decorative = false }: MascotIconProps) {
  return <svg className={className} viewBox="0 0 96 96" fill="none" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : 'Skeleton surfer icon'} aria-hidden={decorative}><path d="M10 70c20-10 54-11 76 0" stroke="var(--bp-purple)" strokeWidth="9" strokeLinecap="round" /><circle cx="46" cy="25" r="12" fill="var(--bp-cream)" stroke="var(--bp-obsidian)" strokeWidth="4" /><path d="M39 24h5m6 0h5M43 32h7M40 39l-3 18m16-18 8 18M38 44c10 6 17 6 25 0M36 56 20 68m27-12 18 12M18 68l-8 2m56-2 9 0" stroke="var(--bp-obsidian)" strokeWidth="5" strokeLinecap="round" /><path d="M12 68c4-9 7-14 10-18m4 20c3-8 6-13 9-18m4 21c3-7 6-12 9-16" stroke="var(--bp-cream)" strokeWidth="4" strokeLinecap="round" /></svg>;
}
