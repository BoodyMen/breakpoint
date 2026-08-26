type WordmarkProps = {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
};

export function BreakpointWordmark({ size = 'md', showTagline = false, className = '' }: WordmarkProps) {
  return (
    <div className={`brand-wordmark brand-wordmark-${size} ${className}`}>
      <div className="wordmark-art">
        <svg viewBox="0 0 362 48" aria-hidden="true">
          {/* breaking wave swoosh riding over the tops of the letters */}
          <path
            d="M10 40 C 60 22, 120 20, 176 30 C 214 37, 246 40, 280 33 C 306 27, 330 26, 352 32"
            fill="none"
            stroke="var(--bp-purple)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* breaking lip: an open barrel hook curling forward on the left */}
          <path
            d="M10 40 C 1 31, 4 17, 19 18 C 31 19, 32 31, 22 33"
            fill="none"
            stroke="var(--bp-purple)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* spray flecks off the crest */}
          <circle cx="12" cy="10" r="2.3" fill="var(--bp-purple)" />
          <circle cx="24" cy="6" r="1.7" fill="var(--bp-purple)" />
          {/* star spark above the I */}
          <path
            d="M286 0 l3.6 8 8.6 1 -6.3 5.9 1.6 8.6 -7.5-4.2 -7.5 4 1.8-8.5 -6.1-6.1 8.6-.8 Z"
            fill="var(--bp-purple)"
          />
        </svg>
      </div>
      <span className="wordmark-text"><b>BREAK</b>POINT</span>
      {showTagline && <span className="wordmark-tagline">Find the <em>spot.</em></span>}
    </div>
  );
}
