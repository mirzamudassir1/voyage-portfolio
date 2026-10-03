import { useEffect, useRef, useState } from "react";
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

  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

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

   // home + about + (one per project) + skills + certifications + connect
  const sectionCount = 5 + projects.length;
  const totalHeight = `${(sectionCount + 1) * 100}vh`;

  useEffect(() => {
    function onScroll() {
      if (!wrapperRef.current || !trackRef.current) return;
      const wrapper = wrapperRef.current;
      const rect = wrapper.getBoundingClientRect();
      const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      const trackWidth = trackRef.current.scrollWidth;
      const maxTranslate = trackWidth - window.innerWidth;
      trackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [projects.length]);

  return (
    <>
      <div className="voyage-wrapper" ref={wrapperRef} style={{ height: totalHeight }}>
        <div className="voyage-sticky">
          <Ocean />
          <Ship />
          <div className="voyage-track" ref={trackRef}>
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
