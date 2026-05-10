import Link from 'next/link';

export default function GamesPage() {
  return (
    <section className="page">
      <h1>Games</h1>
      <p className="lead">Mini-games recreated from the original site navigation.</p>
      <div className="grid">
        <Link className="panel-link" href="/games/snake">
          <h3>Snake</h3>
          <p>Canvas-based snake game route in Next.js.</p>
        </Link>
      </div>
    </section>
  );
}
