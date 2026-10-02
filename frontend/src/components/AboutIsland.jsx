export default function AboutIsland({ about }) {
  if (!about) return null;

  return (
    <section className="island-section">
      <div className="panel">
        <span className="panel-tag">Island I — About</span>
        <h2>{about.tagline || "The Captain's Log"}</h2>
        <p>{about.bio}</p>
        {about.education && (
          <p>
            <strong>Education:</strong> {about.education}
          </p>
        )}
        {about.resumeUrl && (
          <div className="link-row">
            <a className="brass-btn" href={about.resumeUrl} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
