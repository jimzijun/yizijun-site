import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="hero">
      <h1>Yizijun&apos;s Website</h1>
      <p>WELCOME</p>
      <div className="cta-row">
        <Link className="card" href="/games">GAMES</Link>
        <Link className="card" href="/portfolio">PORTFOLIO</Link>
      </div>
    </section>
  );
}
