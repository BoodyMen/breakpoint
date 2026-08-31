'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readLastRun, type LastRun } from '@/lib/last-run';
import { Locator } from '@/components/locator';

const pct = (n: number) => `${Math.round(n * 100)}%`;
const coord = (lat: number, lng: number) =>
  `${Math.abs(lat).toFixed(3)}°${lat >= 0 ? 'N' : 'S'} ${Math.abs(lng).toFixed(3)}°${lng >= 0 ? 'E' : 'W'}`;
const mapLink = (lat: number, lng: number) =>
  `https://www.openstreetmap.org/?mlat=${lat.toFixed(5)}&mlon=${lng.toFixed(5)}#map=11/${lat.toFixed(4)}/${lng.toFixed(4)}`;

function consensusLine(run: LastRun): string {
  const c = run.consensus;
  if (!c || run.candidates.length === 0) return '';
  if (c.status === 'converged') {
    const name = (c.label ?? run.candidates[0].label).split(',')[0];
    return `${c.members.length} of the models converged near ${name}, within about ${Math.round(c.radius_km ?? 0)} km.`;
  }
  if (c.status === 'single') return 'Only one model produced a usable location, so treat this as a lead, not an answer.';
  return 'The models did not agree on one place — the options below are genuinely open.';
}

export default function AnalysisPage() {
  const [run, setRun] = useState<LastRun | null | undefined>(undefined);

  useEffect(() => {
    // sessionStorage is client-only: render a neutral state on the server and
    // first client paint, then hydrate the real run.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRun(readLastRun());
  }, []);

  return (
    <main className="anl">
      <header className="anl-bar">
        <Link href="/" className="brand" aria-label="BREAKPOINT home">
          <span className="word">
            <b className="bone">BREAK</b>
            <b className="red">POINT</b>
          </span>
        </Link>
        <span className="label">Analysis</span>
        <Link href="/" className="anl-again">
          Run another →
        </Link>
      </header>

      {run === undefined && <p className="anl-note wrap">Loading…</p>}

      {run === null && (
        <section className="anl-empty wrap">
          <h1 className="h2">No analysis yet.</h1>
          <p className="lede">Drop a photo on the home page and the models will place it.</p>
          <Link href="/" className="anl-cta">
            Start one →
          </Link>
        </section>
      )}

      {run && run.candidates.length === 0 && (
        <section className="anl-empty wrap">
          <h1 className="h2">No location signal.</h1>
          <p className="lede">
            The models could not find enough in the frame to place it. Try a photo with more of the surroundings
            visible — coastline, buildings, signage, the horizon.
          </p>
          <Link href="/" className="anl-cta">
            Try another →
          </Link>
        </section>
      )}

      {run && run.candidates.length > 0 && (
        <section className="anl-body wrap">
          {run.demo && (
            <div className="anl-demo" role="note">
              <strong>Sample result.</strong> No model API keys are configured, so this is a fixed example — not
              an analysis of your photo. Add the keys in the Vercel project settings for real answers.
            </div>
          )}

          <div className="anl-head">
            <span className="label red">Coastal intelligence</span>
            <h1 className="h2">Where we think it is.</h1>
            <p className="lede">{consensusLine(run)} These are estimates, not confirmed positions.</p>
          </div>

          <div className="anl-grid">
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
                  <div className="cand-side">
                    <div className="cand-like-n data">{pct(c.likelihood)}</div>
                    <div className="cand-like-k">likely</div>
                    <a className="cand-map-link" href={mapLink(c.lat, c.lng)} target="_blank" rel="noreferrer">
                      map ↗
                    </a>
                  </div>
                </li>
              ))}
            </ol>

            <figure className="anl-locator">
              <Locator candidates={run.candidates} />
              <figcaption className="data">
                Relative positions · rings show each guess&rsquo;s radius · open a card&rsquo;s “map ↗” for streets
              </figcaption>
            </figure>
          </div>

          <p className="anl-fine label">
            Free view · names and likelihoods only. The full console adds the per-model reasoning, the evidence
            trail, and the metadata check.
          </p>
        </section>
      )}

      <footer className="anl-foot">
        <div className="wrap">
          <span className="doxer-strip">
            Death to the doxer <span className="x">✛</span> Find the spot
          </span>
        </div>
      </footer>
    </main>
  );
}
