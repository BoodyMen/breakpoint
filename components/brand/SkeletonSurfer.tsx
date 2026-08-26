type SkeletonSurferProps = { className?: string; decorative?: boolean };

export function SkeletonSurfer({ className = '', decorative = false }: SkeletonSurferProps) {
  const titleId = 'skeleton-surfer-title';
  return (
    <svg
      className={className}
      viewBox="0 0 560 560"
      fill="none"
      strokeLinejoin="round"
      role={decorative ? undefined : 'img'}
      aria-labelledby={decorative ? undefined : titleId}
      aria-hidden={decorative}
    >
      {!decorative && <title id={titleId}>Skeleton surfer in shades hanging ten on a purple surfboard</title>}
      <defs>
        <clipPath id="bp-surf-disk">
          <circle cx="280" cy="205" r="158" />
        </clipPath>
      </defs>

      {/* retro striped sunset disk */}
      <g clipPath="url(#bp-surf-disk)">
        <rect x="122" y="47" width="316" height="316" fill="var(--bp-purple)" />
        <rect x="122" y="150" width="316" height="40" fill="var(--bp-purple-mid)" opacity="0.5" />
        <rect x="122" y="214" width="316" height="7" fill="var(--bp-cream)" />
        <rect x="122" y="236" width="316" height="9" fill="var(--bp-cream)" />
        <rect x="122" y="262" width="316" height="12" fill="var(--bp-cream)" />
        <rect x="122" y="292" width="316" height="16" fill="var(--bp-cream)" />
        <rect x="122" y="326" width="316" height="22" fill="var(--bp-cream)" />
      </g>
      <circle cx="280" cy="205" r="158" fill="none" stroke="var(--bp-obsidian)" strokeWidth="5" />

      {/* stylized wave the board rides */}
      <path
        d="M0 488 C 120 470, 250 478, 342 470 C 430 462, 486 476, 516 436 C 540 404, 556 402, 556 402 L 556 560 L 0 560 Z"
        fill="var(--bp-purple)"
        stroke="var(--bp-obsidian)"
        strokeWidth="6"
      />
      <path
        d="M516 436 C 540 402, 532 360, 496 354 C 468 349, 448 372, 456 398"
        fill="none"
        stroke="var(--bp-obsidian)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M34 488 C 116 476, 188 482, 250 484" fill="none" stroke="var(--bp-cream)" strokeWidth="5" strokeLinecap="round" />
      <path d="M470 456 C 500 450, 522 458, 532 470" fill="none" stroke="var(--bp-cream)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="504" cy="340" r="4" fill="var(--bp-purple)" />
      <circle cx="524" cy="352" r="3" fill="var(--bp-purple)" />

      {/* surfboard, nose to the left */}
      <g transform="rotate(-7 268 452)">
        <path
          d="M150 452 C 210 434, 372 434, 430 452 C 372 470, 210 470, 150 452 Z"
          fill="var(--bp-purple)"
          stroke="var(--bp-obsidian)"
          strokeWidth="6"
        />
        <path d="M182 452 H 408" stroke="var(--bp-obsidian)" strokeWidth="3" strokeDasharray="3 7" />
        <ellipse cx="158" cy="452" rx="6" ry="9" fill="var(--bp-obsidian)" />
      </g>

      {/* skeleton, hanging ten */}
      <g stroke="var(--bp-obsidian)" strokeWidth="9" strokeLinecap="round">
        <path d="M234 232 C 204 206, 182 186, 156 150" fill="none" />
        <path d="M156 150 l-16 -3 m16 3 l-3 -16" />
        <path d="M282 232 C 318 220, 348 210, 384 198" fill="none" />
        <path d="M384 198 l15 -6 m-15 6 l9 13" />

        <path d="M257 184 L 256 296" fill="none" strokeWidth="8" />
        <path d="M252 206 C 240 206, 232 213, 230 224" fill="none" strokeWidth="6" />
        <path d="M252 228 C 239 228, 231 236, 230 248" fill="none" strokeWidth="6" />
        <path d="M253 250 C 241 251, 234 259, 234 270" fill="none" strokeWidth="6" />
        <path d="M262 206 C 274 206, 282 213, 284 224" fill="none" strokeWidth="6" />
        <path d="M262 228 C 275 228, 283 236, 284 248" fill="none" strokeWidth="6" />
        <path d="M261 250 C 273 251, 280 259, 280 270" fill="none" strokeWidth="6" />

        <path d="M236 296 C 244 314, 268 314, 276 296" fill="var(--bp-cream)" strokeWidth="8" />

        <path d="M246 310 C 236 344, 224 384, 210 420" fill="none" />
        <path d="M266 310 C 268 346, 258 388, 238 422" fill="none" />

        <path d="M210 420 C 198 424, 186 426, 176 426" fill="none" />
        <path d="M238 422 C 226 426, 214 428, 204 428" fill="none" />
      </g>

      {/* ten toe bones curling over the front edge of the nose */}
      <g stroke="var(--bp-obsidian)" strokeWidth="4" strokeLinecap="round">
        <path d="M176 426 c-2 6 -2 9 -1 12" />
        <path d="M182 425 c-2 6 -2 9 -1 12" />
        <path d="M188 425 c-2 6 -2 9 -1 12" />
        <path d="M194 425 c-2 6 -2 9 -1 12" />
        <path d="M200 426 c-2 6 -2 9 -1 12" />
        <path d="M204 428 c-2 6 -2 9 -1 12" />
        <path d="M210 428 c-2 6 -2 9 -1 12" />
        <path d="M216 427 c-2 6 -2 9 -1 12" />
        <path d="M222 427 c-2 6 -2 9 -1 12" />
        <path d="M228 427 c-2 6 -2 9 -1 12" />
      </g>

      {/* skull with bar shades */}
      <g>
        <circle cx="256" cy="140" r="44" fill="var(--bp-cream)" stroke="var(--bp-obsidian)" strokeWidth="7" />
        <path
          d="M256 146 v10 M244 166 h24 M248 160 v6 m8 -6 v6 m8 -6 v6"
          stroke="var(--bp-obsidian)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M226 128 h60 a7 7 0 0 1 7 7 v4 a12 12 0 0 1 -12 12 h-18 a7 7 0 0 1 -7 -6 a7 7 0 0 1 -7 6 h-18 a12 12 0 0 1 -12 -12 v-4 a7 7 0 0 1 7 -7 Z"
          fill="var(--bp-obsidian)"
        />
        <path d="M232 134 h16" stroke="var(--bp-purple-mid)" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
