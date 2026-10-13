import { useEffect, useState } from "react";

export default function Ocean() {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    let frameId = null;

    function updateDepth() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setDepth(Math.min(Math.max(progress, 0), 1));
      frameId = null;
    }

    function handleScroll() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateDepth);
      }
    }

    updateDepth();
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

  const phase = depth < 0.25 ? "surface" : depth < 0.5 ? "sharks" : depth < 0.75 ? "whales" : "deep";

  return (
    <div className="ocean-bg" aria-hidden="true">
      <div className="wave-layer wave-1" />
      <div className="wave-layer wave-2" />
      <div className="wave-layer wave-3" />
      <div className="wave-layer wave-4" />
      <div className="ocean-dark-overlay" />
      <div className={`sea-life sea-life-${phase}`}>
        <svg className="creature creature-fish fish-one" viewBox="0 0 160 80">
          <path d="M18 40c24-25 58-25 85 0-27 25-61 25-85 0Z" />
          <path d="m103 40 40-28-11 28 11 28-40-28Z" />
          <circle cx="42" cy="34" r="3" />
        </svg>
        <svg className="creature creature-fish fish-two" viewBox="0 0 160 80">
          <path d="M18 40c24-25 58-25 85 0-27 25-61 25-85 0Z" />
          <path d="m103 40 40-28-11 28 11 28-40-28Z" />
          <circle cx="42" cy="34" r="3" />
        </svg>
        <svg className="creature creature-shark shark-one" viewBox="0 0 260 120">
          <path d="M12 68c37-33 84-42 139-26l32-31 8 40c29 7 48 17 61 30-34 2-58-2-82-12-42 22-91 25-158-1Z" />
          <path d="m75 44 21-34 13 40M188 54l18-29 7 37" />
          <circle cx="178" cy="57" r="3" />
        </svg>
        <svg className="creature creature-shark shark-two" viewBox="0 0 260 120">
          <path d="M12 68c37-33 84-42 139-26l32-31 8 40c29 7 48 17 61 30-34 2-58-2-82-12-42 22-91 25-158-1Z" />
          <path d="m75 44 21-34 13 40M188 54l18-29 7 37" />
          <circle cx="178" cy="57" r="3" />
        </svg>
        <svg className="creature creature-whale whale-one" viewBox="0 0 320 180">
          <path d="M20 103c44-57 139-65 207-17 20-29 49-38 76-32-19 11-25 24-22 40 13 8 22 18 28 31-37 4-67-5-93-26-54 38-126 42-196 4Z" />
          <path d="M115 61c18-23 22-37 17-52 18 15 24 35 17 56M88 91c-13-19-28-27-45-29" />
          <circle cx="218" cy="92" r="4" />
        </svg>
        <svg className="creature creature-whale whale-two" viewBox="0 0 320 180">
          <path d="M20 103c44-57 139-65 207-17 20-29 49-38 76-32-19 11-25 24-22 40 13 8 22 18 28 31-37 4-67-5-93-26-54 38-126 42-196 4Z" />
          <path d="M115 61c18-23 22-37 17-52 18 15 24 35 17 56M88 91c-13-19-28-27-45-29" />
          <circle cx="218" cy="92" r="4" />
        </svg>
        <div className="creature creature-jelly jelly-one"><span /><i /><b /></div>
        <div className="creature creature-jelly jelly-two"><span /><i /><b /></div>
        <div className="creature creature-jelly jelly-three"><span /><i /><b /></div>
      </div>
    </div>
  );
}
