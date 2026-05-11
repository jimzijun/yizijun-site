import Link from 'next/link';
import BubbleBackground from '@/components/BubbleBackground';

export default function HomePage() {
  return (
    <>
      <BubbleBackground />
      <section className="hero hero--foreground">
        <h1>Yizijun&apos;s Website</h1>
        <p>WELCOME</p>
        <div className="cta-row">
          <Link className="card-link" href="/games">GAMES</Link>
          <Link className="card-link" href="/portfolio">PORTFOLIO</Link>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="resume-section">
        <h2 id="projects-heading">Projects</h2>
        <div className="grid">
          <article className="panel">
            <h3>Portfolio Showcase</h3>
            <p>A curated set of software, automation, and AI projects.</p>
            <p>
              <Link className="nav-link" href="/portfolio">
                View project details
              </Link>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
