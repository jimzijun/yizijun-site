import Link from 'next/link';
import BubbleBackground from '@/components/BubbleBackground';
import { getPinnedProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getPinnedProjects();

  return (
    <>
      <BubbleBackground />
      <a className="sticky-contact-cta" href="#contact">Contact Jim</a>

      <section className="hero hero--foreground recruiter-hero" aria-labelledby="home-hero-heading">
        <p className="hero-eyebrow">Open to AI Engineer opportunities</p>
        <h1 id="home-hero-heading">AI Engineer shipping production-ready agent systems and automation.</h1>
        <p className="hero-subcopy">
          I build and operate reliable AI products end-to-end: model workflows, eval loops, and real user-facing
          delivery.
        </p>
        <div className="cta-row">
          <Link className="card-link" href="/portfolio">View AI Project Proof</Link>
          <a className="card-link" href="#contact">Contact Jim</a>
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

      <section id="contact" aria-labelledby="contact-heading" className="resume-section contact-section panel">
        <h2 id="contact-heading">Contact</h2>
        <p className="lead contact-intro">Best for recruiter outreach, interview loops, and collaboration discussions.</p>
        <div className="contact-actions">
          <a className="card-link" href="mailto:yizijuny@gmail.com" aria-label="Email Jim at yizijuny@gmail.com">
            Email
          </a>
          <a
            className="card-link"
            href="https://calendly.com/yizijuny"
            target="_blank"
            rel="noreferrer"
            aria-label="Book time with Jim on Calendly"
          >
            Calendly
          </a>
          <a
            className="card-link"
            href="https://www.linkedin.com/in/zijun-yi-03a4382ab"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Jim's LinkedIn profile"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="resume-section">
        <h2 id="projects-heading">Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <article className="panel" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.impact}</p>
              <p>
                <strong>Role:</strong> {project.role}
              </p>
              {project.tags && (
                <p>
                  <strong>Tags:</strong> {project.tags.join(', ')}
                </p>
              )}
              {project.highlights && (
                <ul>
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <p>
                <a className="nav-link" href={project.link} target="_blank" rel="noreferrer">
                  View project
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
