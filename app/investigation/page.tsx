'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readLastRun, type LastRun } from '@/lib/last-run';
import type { Candidate } from '@/lib/consensus';

function osmEmbed(c: Candidate) {
  const latPad = Math.max(c.radius_km / 111, 0.05);
  const lngPad = Math.max(c.radius_km / (111 * Math.cos((c.lat * Math.PI) / 180) || 1), 0.05);
  const bbox = [c.lng - lngPad, c.lat - latPad, c.lng + lngPad, c.lat + latPad].map((n) => n.toFixed(4)).join(',');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${c.lat.toFixed(4)},${c.lng.toFixed(4)}`;
}

const pct = (n: number) => `${Math.round(n * 100)}%`;
const coord = (lat: number, lng: number) =>
  `${Math.abs(lat).toFixed(3)}°${lat >= 0 ? 'N' : 'S'} ${Math.abs(lng).toFixed(3)}°${lng >= 0 ? 'E' : 'W'}`;

export default function InvestigationPage() {
  const [run, setRun] = useState<LastRun | null | undefined>(undefined);

  useEffect(() => {
    // sessionStorage is client-only; render a neutral "Loading…" on the server
    // and first client paint, then hydrate the real run. This is the intended
    // use of an effect here, not a cascading-render smell.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRun(readLastRun());
  }, []);

  return (
    <main className="inv">
      <header className="inv-bar">
        <Link href="/" className="brand" aria-label="BREAKPOINT home">
          <span className="word">
            <b className="bone">BREAK</b>
            <b className="red">POINT</b>
          </span>
        </Link>
        <span className="label">Investigation</span>
        <Link href="/" className="inv-again">
          Run another →
        </Link>
      </header>

      {run === undefined && <p className="inv-note wrap">Loading…</p>}

      {run === null && (
        <section className="inv-empty wrap">
          <h1 className="h2">No investigation yet.</h1>
          <p className="lede">Drop a photo on the home page and the models will place it.</p>
          <Link href="/" className="inv-cta">
            Start one →
          </Link>
        </section>
      )}

      {run && run.candidates.length === 0 && (
        <section className="inv-empty wrap">
          <h1 className="h2">No location signal.</h1>
          <p className="lede">
            The models could not find enough in the frame to place it. Try a photo with more of the surroundings
            visible — coastline, buildings, signage, horizon.
          </p>
          <Link href="/" className="inv-cta">
            Try another →
          </Link>
        </section>
      )}

      {run && run.candidates.length > 0 && (
        <section className="inv-body wrap">
          {run.demo && (
            <div className="inv-demo" role="note">
              <strong>Sample result.</strong> No model API keys are configured, so this is a fixed
              example — not an analysis of your photo. Add the keys in the Vercel project settings to
              get real answers.
            </div>
          )}
          <div className="inv-head">
            <span className="label red">Coastal intelligence</span>
            <h1 className="h2">Where we think it is.</h1>
            <p className="lede">
              {run.candidates.length === 1
                ? 'One location stood out across the models.'
                : `The ${run.candidates.length} most likely places, ranked by how strongly the models pointed there.`}{' '}
              These are estimates, not confirmed positions.
            </p>
          </div>

          <ol className="cand-list">
            {run.candidates.map((c, i) => (
              <li className={`cand${i === 0 ? ' lead' : ''}`} key={`${c.label}-${i}`}>
                <div className="cand-rank data">{String(i + 1).padStart(2, '0')}</div>
                <div className="cand-main">
                  <div className="cand-name">{c.label}</div>
                  <div className="cand-meta data">
                    {coord(c.lat, c.lng)} · radius ~{Math.round(c.radius_km)} km · {c.models.join(' · ')}
                  </div>
                  <div className="cand-bar" aria-hidden="true">
                    <span style={{ width: pct(c.likelihood) }} />
                  </div>
                </div>
                <div className="cand-like">
                  <div className="cand-like-n data">{pct(c.likelihood)}</div>
                  <div className="cand-like-k">likely</div>
                </div>
              </li>
            ))}
          </ol>

          <div className="cand-map">
            <iframe
              title={`Map of ${run.candidates[0].label}`}
              src={osmEmbed(run.candidates[0])}
              loading="lazy"
            />
            <div className="cand-map-cap data">
              Top guess · {coord(run.candidates[0].lat, run.candidates[0].lng)}
            </div>
          </div>

          <p className="inv-fine label">
            Free view · names and likelihoods only. The full console adds the per-model reasoning, the
            evidence trail, and the metadata check.
          </p>
        </section>
      )}
    </main>
  );
}
