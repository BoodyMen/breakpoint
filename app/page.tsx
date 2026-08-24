import { UploadForm } from '@/components/upload-form';
import { SkeletonIcon } from '@/components/skeleton-icon';

export default function Home() {
  return (
    <main className="landing-shell">
      <div className="topline"><span>BREAKPOINT / FIELD NOTES 001</span><span>OPEN TO EVERYONE</span></div>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Surf spot intelligence</p>
          <h1><span>BREAK</span>POINT</h1>
          <p className="hero-tagline">DEATH TO THE DOXERS.</p>
          <p className="hero-description">Find where the wave was photographed. Chase better waves, share the stoke, and make surfing easier to enter.</p>
        </div>
        <div className="hero-mark"><SkeletonIcon /><span>01 / 03</span></div>
      </section>
      <section className="investigation-section">
        <div className="section-label"><span>Start here</span><span>Drop a frame. Find a line.</span></div>
        <UploadForm />
      </section>
      <section className="feature-section">
        <div className="section-label"><span>How it works</span><span>Signal over noise</span></div>
        <div className="feature-grid">
          <article><span className="feature-number">01</span><h2>See the spot</h2><p>Three independent vision models read the coast, the light, the built world, and the details in between.</p></article>
          <article><span className="feature-number">02</span><h2>Compare the clues</h2><p>Coordinates, confidence, evidence, and disagreement stay visible so every guess can be challenged.</p></article>
          <article><span className="feature-number">03</span><h2>Go surf</h2><p>Turn a mystery frame into a starting point for your next session, wherever you are in the lineup.</p></article>
        </div>
      </section>
      <div className="ticker" aria-hidden="true"><span>FIND THE SPOT</span><span>SHARE THE STOKE</span><span>SURFING IS FOR EVERYONE</span><span>FIND THE SPOT</span></div>
      <footer><span>BREAKPOINT © 2026</span><span>BUILT FOR THE NEXT WAVE</span><a href="https://github.com/BoodyMen/breakpoint">GITHUB ↗</a></footer>
    </main>
  );
}
