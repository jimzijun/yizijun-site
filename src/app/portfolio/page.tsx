const items = [
  { title: 'Bio', text: 'Student at Syracuse University, Information Management & Technology.' },
  { title: 'Application Letter', text: 'Professional writing sample and communication portfolio artifact.' },
  { title: 'Memo', text: 'Business memo sample demonstrating concise professional writing.' },
  { title: 'Research', text: 'Academic and project research excerpts from coursework.' },
  { title: 'Projects', text: 'Web and software projects built across internships and school.' },
  { title: 'Contact', text: 'Social links and contact channels from original site.' },
];

export default function PortfolioPage() {
  return (
    <section className="page">
      <h1>Online Portfolio</h1>
      <p className="lead">This page recreates the portfolio structure from the original website.</p>
      <div className="grid">
        {items.map((item) => (
          <article className="panel" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
