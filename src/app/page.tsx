import type { Metadata } from 'next';
import Link from 'next/link';
import BubbleBackground from '@/components/BubbleBackground';
import CTAEventLink from '@/components/CTAEventLink';
import { getHybridProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'AI Engineer portfolio homepage with recruiter-focused value proposition, project proof, and direct contact channels.',
  openGraph: {
    title: 'Zijun Yi | AI Engineer Portfolio',
    description:
      'Explore shipped AI and automation work, then connect via email, Calendly, or LinkedIn.',
    url: 'https://jimzijun.github.io/yizijun-site',
  },
};

export default async function HomePage() {
  const projects = await getHybridProjects('jimzijun');

  return (
    <>
      <BubbleBackground />
      <CTAEventLink className="sticky-contact-cta" href="#contact" ctaId="contact-jim-sticky" placement="sticky">
        Contact Jim
      </CTAEventLink>

      <section className="hero hero--foreground recruiter-hero" aria-labelledby="home-hero-heading">
        <p className="hero-eyebrow">Open to AI Engineer opportunities</p>
        <h1 id="home-hero-heading">AI Engineer shipping production-ready agent systems and automation.</h1>
        <p className="hero-subcopy">
          I build and operate reliable AI products end-to-end: model workflows, eval loops, and real user-facing
          delivery.
        </p>
        <div className="cta-row">
          <Link className="card-link" href="/portfolio">View AI Project Proof</Link>
          <CTAEventLink className="card-link" href="#contact" ctaId="contact-jim-hero" placement="hero">
            Contact Jim
          </CTAEventLink>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="resume-section">
        <h2 id="trust-heading">How I Deliver</h2>
        <div className="grid">
          <article className="panel">
            <h3>About</h3>
            <p>
              AI Engineer focused on shipping production systems end-to-end: product framing, backend reliability,
              and measurable delivery outcomes.
            </p>
          </article>
          <article className="panel">
            <h3>How I Work</h3>
            <ul className="resume-list">
              <li>Start with user outcome + acceptance criteria before implementation.</li>
              <li>Ship in small, testable increments with CI-backed validation.</li>
              <li>Prioritize reliability, observability, and maintainable handoff quality.</li>
            </ul>
          </article>
          <article className="panel">
            <h3>Public Metrics</h3>
            <p className="resume-meta">Selected recruiter-facing outcomes from shipped work:</p>
            <ul className="resume-list">
              <li><strong>99.9% API uptime</strong> for simulation orchestration services</li>
              <li><strong>~30% infrastructure cost reduction</strong> after Kubernetes migration</li>
              <li><strong>30M+ scientific documents processed/indexed</strong> for large-scale retrieval pipelines</li>
            </ul>
          </article>
        </div>
      </section>


      <section id="contact" aria-labelledby="contact-heading" className="resume-section contact-section panel">
        <h2 id="contact-heading">Contact</h2>
        <p className="lead contact-intro">Best for recruiter outreach, interview loops, and collaboration discussions.</p>
        <div className="contact-actions">
          <CTAEventLink
            className="card-link"
            href="mailto:yizijuny@gmail.com"
            aria-label="Email Jim at yizijuny@gmail.com"
            ctaId="contact-email"
            placement="contact-panel"
          >
            Email
          </CTAEventLink>
          <CTAEventLink
            className="card-link"
            href="https://calendly.com/yizijuny"
            target="_blank"
            rel="noreferrer"
            aria-label="Book time with Jim on Calendly"
            ctaId="contact-calendly"
            placement="contact-panel"
          >
            Calendly
          </CTAEventLink>
          <CTAEventLink
            className="card-link"
            href="https://www.linkedin.com/in/zijun-yi-03a4382ab"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Jim's LinkedIn profile"
            ctaId="contact-linkedin"
            placement="contact-panel"
          >
            LinkedIn
          </CTAEventLink>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="resume-section">
        <h2 id="projects-heading">Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <article className="panel" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Role:</strong> {project.role}
              </p>
              <p>
                <strong>Tech/Language:</strong> {project.language}
              </p>
              <p className="resume-meta">{project.impact}</p>
              {project.tags && project.tags.length > 0 && (
                <p>
                  <strong>Tags:</strong> {project.tags.join(', ')}
                </p>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul>
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <p>
                <a className="nav-link" href={project.link} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
