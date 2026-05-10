import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="hero">
      <h1>Yizijun&apos;s Website</h1>
      <p>WELCOME</p>
      <div className="cta-row">
        <Link className="card-link" href="/games">GAMES</Link>
        <Link className="card-link" href="/portfolio">PORTFOLIO</Link>
      </div>
    </section>
  );
}
