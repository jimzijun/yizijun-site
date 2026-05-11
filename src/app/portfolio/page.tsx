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

const projects = [
  {
    name: 'Bakery Demand Forecasting System',
    stack: 'Python, Streamlit, Square API, Time-series modeling',
    details:
      'Designed a fault-tolerant forecasting workflow that ingests live transaction data and serves real-time demand predictions for daily inventory planning.',
  },
];

const skills = {
  languages: ['Python', 'Java', 'SQL', 'Bash'],
  backend: ['Django', 'REST APIs', 'Redis', 'SQL Server'],
  infra: ['Kubernetes', 'Docker', 'CI/CD', 'Monitoring/Health checks'],
  dataMl: ['Spark', 'Airflow', 'Elasticsearch', 'Pandas', 'NumPy', 'PyTorch', 'scikit-learn', 'Transformers/Embeddings'],
};

export default function PortfolioPage() {
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

      <div className="resume-section">
        <h2>Projects</h2>
        {projects.map((project) => (
          <article className="panel" key={project.name}>
            <h3>{project.name}</h3>
            <p className="resume-meta">{project.stack}</p>
            <p>{project.details}</p>
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
