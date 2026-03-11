export default function ContentTab({ d }) {
  const posts = d.blog_content || [];

  function intentBadge(intent) {
    if (intent === 'Commercial')    return 'bi-comm';
    if (intent === 'Transactional') return 'bi-trans';
    return 'bi-info';
  }

  return (
    <div className="r-card">
      <div className="r-card-title">✍ Blog Content Strategy for AI Overviews</div>
      {posts.map((p, i) => (
        <div className="blog-card" key={i}>
          <span className={`blog-intent-badge ${intentBadge(p.search_intent)}`}>
            {p.search_intent}
          </span>
          <div className="blog-title">Post {i + 1}: &ldquo;{p.topic}&rdquo;</div>
          <div className="blog-angle">{p.ai_angle}</div>
          <div className="blog-outline">
            {(p.outline || []).map((o, j) => (
              <span className="bo-chip" key={j}>{o}</span>
            ))}
          </div>
          <div className="blog-meta">
            <span className="blog-vol">📊 {p.volume}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
