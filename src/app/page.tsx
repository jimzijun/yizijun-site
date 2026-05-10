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
    </>
  );
}
