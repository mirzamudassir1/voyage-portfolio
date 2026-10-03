import IslandShape from "./IslandShape.jsx";

export default function CertificationsIsland({ certifications }) {
  return (
    <section className="island-section">
      <IslandShape variant="peak" />
      <div className="panel">
        <span className="panel-tag">Summit — Certifications</span>
        <h2>Peaks Conquered</h2>
        <div className="social-list">
          {(certifications || []).map((c) => (
            <div key={c._id} style={{ marginBottom: "0.4rem" }}>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer">
                  {c.title}
                </a>
              ) : (
                <strong>{c.title}</strong>
              )}
              <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                {[c.issuer, c.date].filter(Boolean).join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}