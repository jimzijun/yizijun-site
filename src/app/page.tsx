import Link from 'next/link';
import BubbleBackground from '@/components/BubbleBackground';
import { getPinnedProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getPinnedProjects();

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
