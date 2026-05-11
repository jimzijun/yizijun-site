const highlights = [
  '3+ years shipping production data and backend systems',
  '30% infrastructure cost reduction on Kubernetes migration',
  '99.9% API uptime for simulation orchestration services',
  'Scaled ML/data pipelines to 30M+ scientific documents',
];

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

const experience: ExperienceItem[] = [
  {
    company: 'Bases Data Science (NielsenIQ)',
    role: 'Software Engineer',
    period: '2022 – Present',
    location: 'Chicago, IL',
    bullets: [
      'Led migration of a core simulation engine to Kubernetes with health checks and observability, improving reliability while lowering compute costs by ~30%.',
      'Built and maintained Django REST APIs for simulation lifecycle orchestration, supporting high availability and 99.9% uptime.',
      'Optimized memory-heavy simulation paths with NumPy vectorization, enabling roughly 2x scenario throughput on high-dimensional workloads.',
      'Partnered with product and data science teams to turn experimental models into repeatable production services.',
    ],
  },
  {
    company: 'Syracuse University — Science of Science & Computational Discovery Lab',
    role: 'Research Assistant',
    period: '2021 – 2022',
    location: 'Syracuse, NY',
    bullets: [
      'Developed an LSA + TF-IDF recommendation pipeline for scientific literature discovery.',
      'Processed and indexed 30M+ papers using Spark and Elasticsearch to support large-scale retrieval.',
      'Contributed to evaluation work on linguistic and speech bias using a 2AFC framework for comparative analysis.',
    ],
  },
];

type CuratedRepoConfig = {
  repo: string;
  blurb?: string;
};

const curatedProjects: CuratedRepoConfig[] = [
  {
    repo: 'jimzijun/skills',
    blurb: 'Reusable agent skills and automation playbooks focused on practical engineering execution.',
  },
  {
    repo: 'jimzijun/career-cli',
    blurb: 'Terminal-first toolkit for job-search workflows, helping recruiters and candidates review artifacts quickly.',
  },
  {
    repo: 'jimzijun/job-search-ui',
    blurb: 'Frontend experience for organizing and tracking applications with clean recruiter-facing summaries.',
  },
  {
    repo: 'jimzijun/github-project-viewer',
    blurb: 'Curated GitHub project showcase utility built for fast scanning of high-signal repositories.',
  },
];

type GithubRepoMetadata = {
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  name: string;
};

type ProjectCard = {
  repo: string;
  name: string;
  url: string;
  description: string;
  language: string;
};

async function fetchCuratedProjects(): Promise<{ cards: ProjectCard[]; hasFetchFailure: boolean }> {
  const results = await Promise.all(
    curatedProjects.map(async (item) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${item.repo}`, {
          next: { revalidate: 3600 },
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'yizijun-site-projects-section',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub fetch failed for ${item.repo}: ${response.status}`);
        }

        const repo = (await response.json()) as GithubRepoMetadata;
        const description = item.blurb ?? repo.description ?? 'No description available yet.';

        return {
          card: {
            repo: item.repo,
            name: repo.name,
            url: repo.html_url,
            description,
            language: repo.language ?? 'Not specified',
          },
          fetchFailed: false,
        };
      } catch {
        return {
          card: {
            repo: item.repo,
            name: item.repo.split('/')[1],
            url: `https://github.com/${item.repo}`,
            description: item.blurb ?? 'Project details are temporarily unavailable. View the repository on GitHub.',
            language: 'Unavailable',
          },
          fetchFailed: true,
        };
      }
    }),
  );

  return {
    cards: results.map((result) => result.card),
    hasFetchFailure: results.some((result) => result.fetchFailed),
  };
}

const skills = {
  languages: ['Python', 'Java', 'SQL', 'Bash'],
  backend: ['Django', 'REST APIs', 'Redis', 'SQL Server'],
  infra: ['Kubernetes', 'Docker', 'CI/CD', 'Monitoring/Health checks'],
  dataMl: ['Spark', 'Airflow', 'Elasticsearch', 'Pandas', 'NumPy', 'PyTorch', 'scikit-learn', 'Transformers/Embeddings'],
};

export default async function PortfolioPage() {
  const { cards: projectCards, hasFetchFailure } = await fetchCuratedProjects();

  return (
    <section className="page resume-page">
      <article className="resume-hero panel">
        <p className="resume-kicker">Building useful systems at scale</p>
        <h1>Portfolio / Resume</h1>
        <p className="lead">
          Software engineer focused on backend systems, data infrastructure, and production ML workflows.
        </p>
        <div className="resume-highlight-pills" aria-label="Career highlights">
          <span>30% infra cost saved</span>
          <span>99.9% API uptime</span>
          <span>30M+ papers indexed</span>
          <span>2x simulation throughput</span>
        </div>
      </article>

      <article className="panel">
        <h3>Snapshot</h3>
        <ul className="resume-list">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <div className="resume-section">
        <h2>Experience</h2>
        {experience.map((item) => (
          <article className="panel resume-entry resume-timeline-item" key={`${item.company}-${item.period}`}>
            <div className="resume-entry-header">
              <h3>{item.role}</h3>
              <p>{item.period}</p>
            </div>
            <p className="resume-meta">
              {item.company} · {item.location}
            </p>
            <ul className="resume-list">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div id="projects" className="resume-section">
        <h2>Projects</h2>
        <p className="resume-meta">Curated repositories selected for recruiter-friendly scanning.</p>
        {hasFetchFailure ? (
          <p className="resume-note" role="status">
            Some live GitHub metadata could not be loaded. Showing fallback project details.
          </p>
        ) : null}
        {projectCards.map((project) => (
          <article className="panel" key={project.repo}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p className="resume-meta">Tech/Language: {project.language}</p>
            <p>
              <a href={project.url} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </p>
          </article>
        ))}
      </div>

      <article className="panel">
        <h3>Skills</h3>
        <ul className="resume-skill-groups">
          <li>
            <strong>Languages:</strong> {skills.languages.join(', ')}
          </li>
          <li>
            <strong>Backend:</strong> {skills.backend.join(', ')}
          </li>
          <li>
            <strong>Infrastructure:</strong> {skills.infra.join(', ')}
          </li>
          <li>
            <strong>Data & ML:</strong> {skills.dataMl.join(', ')}
          </li>
        </ul>
      </article>

      <article className="panel">
        <h3>Education & Publication</h3>
        <ul className="resume-list">
          <li>M.S. Applied Data Science, Syracuse University</li>
          <li>B.S. Information Management & Technology, Syracuse University</li>
          <li>Co-authored research on predicting scientific dataset usage from bibliometric signals</li>
        </ul>
      </article>
    </section>
  );
}
