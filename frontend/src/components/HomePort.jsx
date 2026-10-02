export default function HomePort({ name }) {
  return (
    <section className="island-section home-port">
      <div>
        <h1>{name || "Mirza"}'s Voyage</h1>
        <p className="sub">
          Set sail through the projects, skills, and waters that shaped this
          portfolio. Scroll to keep sailing.
        </p>
      </div>
      <div className="scroll-hint">⌄ scroll to sail ⌄</div>
    </section>
  );
}
