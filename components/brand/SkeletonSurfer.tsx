type SkeletonSurferProps = { className?: string; decorative?: boolean };

export function SkeletonSurfer({ className = '', decorative = false }: SkeletonSurferProps) {
  const titleId = 'skeleton-surfer-title';
  return (
    <svg className={className} viewBox="0 0 520 460" fill="none" role={decorative ? undefined : 'img'} aria-labelledby={decorative ? undefined : titleId} aria-hidden={decorative}>
      {!decorative && <title id={titleId}>Skeleton surfer hanging ten on a purple surfboard</title>}
      <path d="M40 382c100-58 310-60 440 0" stroke="var(--bp-purple)" strokeWidth="18" strokeLinecap="round" />
      <path d="M54 389c110-38 294-37 410 0" stroke="var(--bp-obsidian)" strokeWidth="4" strokeLinecap="round" />
      <path d="M104 349c20-55 58-81 102-81 64 0 101 36 133 81" fill="var(--bp-cream)" stroke="var(--bp-obsidian)" strokeWidth="7" />
      <circle cx="232" cy="105" r="39" fill="var(--bp-cream)" stroke="var(--bp-obsidian)" strokeWidth="7" />
      <path d="M209 98h15m16 0h15M224 121h17M232 75v18M204 80l12 11m45-11-12 11" stroke="var(--bp-obsidian)" strokeWidth="6" strokeLinecap="round" />
      <path d="M206 142c-8 49-8 81 4 111m48-111c9 45 17 76 42 109M210 175c29 20 48 20 70 0" stroke="var(--bp-obsidian)" strokeWidth="9" strokeLinecap="round" />
      <path d="M211 176c-45-27-70-52-78-82m79 82c35-13 59-35 76-69" stroke="var(--bp-obsidian)" strokeWidth="9" strokeLinecap="round" />
      <path d="M133 94 119 79m14 20-20-3m14 15-15 9M286 108l14-13m-13 28 19 0m-25-12 7-20" stroke="var(--bp-purple)" strokeWidth="6" strokeLinecap="round" />
      <path d="M190 274c-12 32-37 52-75 67m129-65c29 30 57 42 91 57" stroke="var(--bp-obsidian)" strokeWidth="9" strokeLinecap="round" />
      <path d="M115 340c-24 13-44 16-61 12m272-13c25 12 46 14 63 8" stroke="var(--bp-obsidian)" strokeWidth="8" strokeLinecap="round" />
      <path d="M54 385c42 9 66 3 84-8m220 4c42 10 76 9 108-3" stroke="var(--bp-cream)" strokeWidth="8" strokeLinecap="round" />
      <path d="M87 379c4-23 8-34 13-43m7 48c4-23 8-35 13-44m7 49c4-21 8-32 13-40m7 45c4-18 8-28 13-36" stroke="var(--bp-obsidian)" strokeWidth="5" strokeLinecap="round" />
      <path d="M88 380c-10 9-15 17-17 25" stroke="var(--bp-purple)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
