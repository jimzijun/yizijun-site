const sections = [
  {
    title: 'Professional Summary',
    text:
      'Software Engineer with 3+ years of experience building distributed data systems and scalable backend infrastructure. Strong in Kubernetes orchestration, cloud-native architecture, and Python/Django API development. Delivered measurable impact including 30% infrastructure cost reduction and an 80% drop in production incidents.',
  },
  {
    title: 'Current Role Impact — Bases Data Science (NielsenIQ)',
    text:
      'Architected migration of a core simulation engine to Kubernetes with robust health checks and monitoring, improving reliability while reducing compute cost by 30%. Built a high-availability Django REST API to orchestrate simulation lifecycles with 99.9% uptime. Removed memory bottlenecks through NumPy vectorization, doubling simulation capacity for high-dimensional scenarios.',
  },
  {
    title: 'Research & Data Engineering Experience',
    text:
      'At Syracuse University\'s Science of Science and Computational Discovery Lab, developed an LSA + TF-IDF topic-modeling pipeline for scientific-paper recommendations. Scaled processing to 30M+ documents with Spark and indexed embeddings in Elasticsearch. Also researched bias in language and speech systems using a 2AFC evaluation framework.',
  },
  {
    title: 'Selected Project — Bakery Demand Forecasting',
    text:
      'Built a fault-tolerant forecasting system connected to the Square API. Designed an orchestration pipeline to ingest live transactions and served real-time demand predictions via Streamlit to support day-to-day inventory decisions.',
  },
  {
    title: 'Core Skills',
    text:
      'Python, Java, SQL, Bash • Kubernetes, Docker, CI/CD • Spark, Airflow, Elasticsearch, Redis, SQL Server • PyTorch, scikit-learn, Transformers/Embeddings, Pandas, NumPy.',
  },
  {
    title: 'Education & Publication',
    text:
      'M.S. in Applied Data Science and B.S. in Information Management & Technology (Syracuse University). Co-authored research on predicting scientific dataset usage from bibliometric signals.',
  },
];

export default function PortfolioPage() {
  return (
    <section className="page">
      <h1>Portfolio</h1>
      <p className="lead">
        Recruiter-ready overview of experience, technical depth, and outcomes based on the latest resume.
      </p>
      <div className="grid">
        {sections.map((section) => (
          <article className="panel" key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
