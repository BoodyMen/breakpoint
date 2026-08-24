export function SkeletonIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="13" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M20 29c3-4 7-6 12-6s9 2 12 6M18 51c1-10 6-16 14-16s13 6 14 16M24 35v12M40 35v12M26 41h12M24 51h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 13h10M29 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
