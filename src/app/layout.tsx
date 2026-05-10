import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Yizijun's Website",
  description: 'Recreated with Next.js',
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
