export default function ProjectIsland({ project, index }) {
  return (
    <section className="island-section">
      <div className="panel">
        <span className="panel-tag">Island {index} — Project</span>
        <h2>{project.title}</h2>
        {project.tagline && <p style={{ fontStyle: "italic" }}>{project.tagline}</p>}
        <p>{project.description}</p>
        {project.tech?.length > 0 && (
          <div className="chip-row">
            {project.tech.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="link-row">
          {project.githubUrl && (
            <a className="brass-btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              Code
            </a>
          )}
          {project.liveUrl && (
            <a className="ghost-btn" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live site
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
