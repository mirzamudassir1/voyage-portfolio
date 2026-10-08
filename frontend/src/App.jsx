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

  useEffect(() => {
    let frameId = null;

    function setVoyageProgress() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      document.documentElement.style.setProperty(
        "--voyage-progress",
        Math.min(Math.max(progress, 0), 1).toFixed(3)
      );
      frameId = null;
    }

    function handleScroll() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(setVoyageProgress);
      }
    }

    setVoyageProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    let frameId = null;
    let targetX = window.innerWidth * 0.18;
    let targetY = window.innerHeight * 0.46;
    let currentX = targetX;
    let currentY = targetY;
    const moveStep = 36;

    function updateShipPosition() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      document.documentElement.style.setProperty("--ship-x", `${currentX}px`);
      document.documentElement.style.setProperty("--ship-y", `${currentY}px`);
      frameId = window.requestAnimationFrame(updateShipPosition);
    }

    function moveShip(key) {
      if (key === "ArrowLeft") {
        targetX -= moveStep;
      } else if (key === "ArrowRight") {
        targetX += moveStep;
      } else if (key === "ArrowUp") {
        targetY -= moveStep;
      } else if (key === "ArrowDown") {
        targetY += moveStep;
      }

      targetX = Math.min(Math.max(targetX, 70), window.innerWidth - 70);
      targetY = Math.min(Math.max(targetY, 60), window.innerHeight - 60);
    }

    function handleKeyDown(event) {
      const isArrowKey = event.key.startsWith("Arrow");
      const target = event.target;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target.isContentEditable;

      if (isArrowKey && !isEditable) {
        event.preventDefault();
        moveShip(event.key);
      }
    }

    updateShipPosition();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(frameId);
    };
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
