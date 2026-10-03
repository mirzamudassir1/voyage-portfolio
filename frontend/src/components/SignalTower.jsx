import IslandShape from "./IslandShape.jsx";

export default function SignalTower({ socials }) {
  return (
    <section className="island-section">
      <IslandShape variant="lighthouse" />
      <div className="panel">
        <span className="panel-tag">Connect</span>
        <h2>Reach the Captain</h2>
        <div className="social-list">
          {(socials || []).map((s) => (
            <a key={s._id} href={s.url} target="_blank" rel="noreferrer">
              {s.platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
