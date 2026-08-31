import type { Candidate } from '@/lib/consensus';

const W = 1000;
const H = 560;
const PAD = 46;

// A self-contained "instrument" locator: candidates plotted by their real
// relative position, radius rings to scale, no external tiles. Deliberately
// abstract — for the true street-level view each card links out to a map.
export function Locator({ candidates }: { candidates: Candidate[] }) {
  const lats = candidates.map((c) => c.lat);
  const lngs = candidates.map((c) => c.lng);
  const midLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const lngScale = Math.max(Math.cos((midLat * Math.PI) / 180), 0.2);

  const latSpan = Math.max(...lats) - Math.min(...lats);
  const lngSpan = (Math.max(...lngs) - Math.min(...lngs)) * lngScale;
  const span = Math.max(latSpan, lngSpan, 0.25) * 1.6; // pad + minimum zoom
  const cLat = midLat;
  const cLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  const inner = Math.min(W, H) - PAD * 2;
  const pxPerDeg = inner / span;
  const project = (lat: number, lng: number) => ({
    x: W / 2 + (lng - cLng) * lngScale * pxPerDeg,
    y: H / 2 - (lat - cLat) * pxPerDeg
  });
  const kmToPx = pxPerDeg / 111;

  return (
    <svg className="locator" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Approximate locator for the candidate places">
      <defs>
        <radialGradient id="loc-bg" cx="0.5" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#14110f" />
          <stop offset="1" stopColor="#070605" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#loc-bg)" />

      {/* graticule */}
      <g stroke="#1e1a16" strokeWidth="1">
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <line key={`v${f}`} x1={W * f} y1="0" x2={W * f} y2={H} />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={`h${f}`} x1="0" y1={H * f} x2={W} y2={H * f} />
        ))}
      </g>

      {/* corner brackets + north */}
      <g stroke="#2e2a26" strokeWidth="1.4" fill="none">
        <path d="M14 34 V14 H34" />
        <path d={`M${W - 34} 14 H${W - 14} V34`} />
        <path d={`M14 ${H - 34} V${H - 14} H34`} />
        <path d={`M${W - 34} ${H - 14} H${W - 14} V${H - 34}`} />
      </g>
      <text x={W - 26} y={H - 22} fill="#6E6862" fontFamily="Arimo, Arial" fontSize="13" textAnchor="end" letterSpacing="2">
        N ↑
      </text>

      {[...candidates].reverse().map((c, ri) => {
        const i = candidates.length - 1 - ri;
        const { x, y } = project(c.lat, c.lng);
        const r = Math.min(Math.max(c.radius_km * kmToPx, 12), 260);
        const lead = i === 0;
        return (
          <g key={`${c.label}-${i}`}>
            <circle cx={x} cy={y} r={r} fill={lead ? 'rgba(228,19,15,0.10)' : 'rgba(232,226,212,0.04)'}
              stroke={lead ? 'rgba(228,19,15,0.5)' : 'rgba(232,226,212,0.18)'} strokeWidth="1"
              strokeDasharray={lead ? undefined : '3 4'} />
            <circle cx={x} cy={y} r={lead ? 7 : 5} fill={lead ? '#E4130F' : 'none'}
              stroke={lead ? '#E4130F' : '#E8E2D4'} strokeWidth="2" />
            <text x={x + 14} y={y - 10} fill={lead ? '#E8E2D4' : '#8A847D'} fontFamily="Arimo, Arial"
              fontSize="15" fontWeight="700" letterSpacing="0.5">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={x + 14} y={y + 8} fill="#6E6862" fontFamily="Arimo, Arial" fontSize="12">
              {c.label.split(',')[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
