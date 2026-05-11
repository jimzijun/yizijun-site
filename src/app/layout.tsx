import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://jimzijun.github.io/yizijun-site'),
  title: {
    default: 'Zijun Yi | AI Engineer',
    template: '%s | Zijun Yi',
  },
  description:
    'AI Engineer focused on production agents, backend automation, and reliable ML systems. Explore projects, portfolio highlights, and contact options.',
  openGraph: {
    type: 'website',
    title: 'Zijun Yi | AI Engineer',
    description:
      'Production-ready AI systems, automation workflows, and recruiter-focused project proof from Zijun Yi.',
    url: 'https://jimzijun.github.io/yizijun-site',
    siteName: 'Zijun Yi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zijun Yi | AI Engineer',
    description:
      'Production-ready AI systems, automation workflows, and recruiter-focused project proof from Zijun Yi.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <header className="site-header">
          <nav className="nav" aria-label="Primary">
            <Link className="nav-link" href="/">Home</Link>
            <Link className="nav-link" href="/portfolio">Portfolio</Link>
            <Link className="nav-link" href="/portfolio#projects">Projects</Link>
            <Link className="nav-link" href="/games">Games</Link>
          </nav>
        </header>
        <main id="main-content" className="page-shell">
          {children}
        </main>
      </body>
    </html>
  );
}
