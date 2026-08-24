type WordmarkProps = {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
};

export function BreakpointWordmark({ size = 'md', showTagline = false, className = '' }: WordmarkProps) {
  return (
    <div className={`brand-wordmark brand-wordmark-${size} ${className}`}>
      <div className="wordmark-art">
        <svg viewBox="0 0 180 32" aria-hidden="true"><path d="M8 24C48 4 100 3 166 13" fill="none" stroke="var(--bp-purple)" strokeWidth="5" strokeLinecap="round" /><path d="m157 6 3 6 7 1-5 4 1 7-6-4-6 3 2-7-4-5 7 1 4-6Z" fill="var(--bp-purple)" /></svg>
      </div>
      <span className="wordmark-text"><b>BREAK</b>POINT</span>
      {showTagline && <span className="wordmark-tagline">FIND THE SPOT.</span>}
    </div>
  );
}
