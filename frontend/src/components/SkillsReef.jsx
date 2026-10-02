export default function SkillsReef({ skills }) {
  return (
    <section className="island-section">
      <div className="panel">
        <span className="panel-tag">Skills Reef</span>
        <h2>Cargo Hold</h2>
        <p>Tools and technologies carried on every voyage.</p>
        <div className="chip-row">
          {(skills || []).map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
