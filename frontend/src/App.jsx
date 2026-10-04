import { useEffect, useState } from "react";
import client from "./api/client.js";
import Ocean from "./components/Ocean.jsx";
import Ship from "./components/Ship.jsx";
import HomePort from "./components/HomePort.jsx";
import AboutIsland from "./components/AboutIsland.jsx";
import ProjectIsland from "./components/ProjectIsland.jsx";
import SkillsReef from "./components/SkillsReef.jsx";
import CertificationsIsland from "./components/CertificationsIsland.jsx";
import SignalTower from "./components/SignalTower.jsx";
import CaptainsQuarters from "./components/CaptainsQuarters.jsx";

export default function App() {
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [socials, setSocials] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);

  async function loadData() {
    const [aboutRes, projectsRes, socialsRes, certsRes] = await Promise.all([
      client.get("/about"),
      client.get("/projects"),
      client.get("/socials"),
      client.get("/certifications")
    ]);
    setAbout(aboutRes.data);
    setProjects(projectsRes.data);
    setSocials(socialsRes.data);
    setCertifications(certsRes.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    function setViewportVar() {
      document.documentElement.style.setProperty("--vw", `${window.innerWidth}px`);
    }
    setViewportVar();
    window.addEventListener("resize", setViewportVar);
    return () => window.removeEventListener("resize", setViewportVar);
  }, []);

  return (
    <>
      <div className="voyage-wrapper">
        <div className="voyage-sticky">
          <Ocean />
          <Ship />
          <div className="voyage-track">
            <HomePort name={about?.name} />
            <AboutIsland about={about} />
            {projects.map((p, i) => (
              <ProjectIsland key={p._id} project={p} index={i + 2} />
            ))}
            <SkillsReef skills={about?.skills} />
            <CertificationsIsland certifications={certifications} />
            <SignalTower socials={socials} />
          </div>
        </div>
      </div>

      <button className="captains-quarters-trigger" onClick={() => setAdminOpen(true)}>
        ⚓ Captain's Quarters
      </button>

      {adminOpen && (
        <CaptainsQuarters
          about={about}
          projects={projects}
          socials={socials}
          certifications={certifications}
          onRefresh={loadData}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </>
  );
}
