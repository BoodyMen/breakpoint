export function AppIcon({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" role="img" aria-label="BREAKPOINT app icon"><rect width="64" height="64" rx="12" fill="var(--bp-obsidian)" /><path d="M8 46c16-8 32-8 48 0" stroke="var(--bp-purple)" strokeWidth="8" strokeLinecap="round" /><path d="M18 45c4-10 10-16 17-16 6 0 10 4 13 11" stroke="var(--bp-cream)" strokeWidth="6" strokeLinecap="round" /><path d="m46 10 2 5 5 1-4 3 1 5-4-3-5 2 2-5-3-4 5 1 1-5Z" fill="var(--bp-purple)" /></svg>;
}
