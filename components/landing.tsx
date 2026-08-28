'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { LANDING_HTML, LANDING_SCRIPT } from './landing-markup';

// The landing page is a near-verbatim port of the BREAKPOINT design artifact
// (claude.ai/code/artifact/d309027c). The markup and the presentational script
// (live clock, marquee, scroll reveals) come straight from the artifact; the only
// functional change here is turning the hero "deck" into a real uploader wired to
// POST /api/analyze/all.
export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Enable the scroll-reveal animation only now that JS is running. The
    // presentational script (next/script, below) adds `.in` as sections scroll
    // into view; this belt-and-braces timer guarantees nothing stays hidden if
    // the observer never fires (e.g. `load` already passed before it ran).
    document.documentElement.classList.add('js-reveal');
    const revealSafety = window.setTimeout(() => {
      root.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    }, 2500);

    const deck = root.querySelector<HTMLElement>('.deck');
    if (!deck) {
      return () => window.clearTimeout(revealSafety);
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/webp,image/tiff';
    input.hidden = true;
    deck.appendChild(input);

    const label = deck.querySelector<HTMLElement>('.dz-t');
    const idleText = label?.textContent ?? 'Drop image here';

    const analyze = async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Choose a JPEG, PNG, WebP, or TIFF image.');
        return;
      }
      setError(null);
      setResult(null);
      if (label) label.textContent = 'Analysing…';
      deck.setAttribute('aria-busy', 'true');
      try {
        const body = new FormData();
        body.append('image', file);
        const res = await fetch('/api/analyze/all', { method: 'POST', body });
        const payload = await res.json();
        if (!res.ok) throw new Error(payload.error ?? 'Analysis failed.');
        setResult(JSON.stringify(payload, null, 2));
        document.getElementById('procedure')?.scrollIntoView({ behavior: 'smooth' });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Analysis failed.');
      } finally {
        if (label) label.textContent = idleText;
        deck.removeAttribute('aria-busy');
        input.value = '';
      }
    }

    const openPicker = () => input.click();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        input.click();
      }
    };
    const onChange = () => {
      const file = input.files?.[0];
      if (file) void analyze(file);
    };
    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      deck.classList.add('deck-drag');
    };
    const onDragLeave = () => deck.classList.remove('deck-drag');
    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      deck.classList.remove('deck-drag');
      const file = event.dataTransfer?.files?.[0];
      if (file) void analyze(file);
    };

    deck.addEventListener('click', openPicker);
    deck.addEventListener('keydown', onKey);
    input.addEventListener('change', onChange);
    deck.addEventListener('dragover', onDragOver);
    deck.addEventListener('dragleave', onDragLeave);
    deck.addEventListener('drop', onDrop);

    return () => {
      window.clearTimeout(revealSafety);
      deck.removeEventListener('click', openPicker);
      deck.removeEventListener('keydown', onKey);
      input.removeEventListener('change', onChange);
      deck.removeEventListener('dragover', onDragOver);
      deck.removeEventListener('dragleave', onDragLeave);
      deck.removeEventListener('drop', onDrop);
      input.remove();
    };
  }, []);

  return (
    <>
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
      {(error || result) && (
        <section className="run-output wrap" aria-live="polite">
          {error && <p className="run-error">{error}</p>}
          {result && <pre className="run-json">{result}</pre>}
        </section>
      )}
      <Script id="breakpoint-landing-fx" strategy="afterInteractive">
        {LANDING_SCRIPT}
      </Script>
    </>
  );
}
