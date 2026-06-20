import { useState, useEffect, useRef } from "react";
import { skills } from "../data/skills";
import "../css/Skills.css";

const ICONS = {
  Python: "🐍", Java: "☕", JavaScript: "⚡", TypeScript: "🔷", "C++": "⚙️",
  React: "⚛️", Vite: "🔥", Tailwind: "🌊", HTML: "📄", CSS: "🎨",
  "Node.js": "🟢", Express: "🚂", Electron: "💠", Prisma: "▲",
  PostgreSQL: "🐘", MongoDB: "🍃", MySQL: "🐬", SQLite: "📦",
  TensorFlow: "🤖", OpenCV: "👁️", NumPy: "🔢", Keras: "🧠",
  Docker: "🐳", AWS: "☁️", GitHub: "🐙", Linux: "🐧", Vercel: "▲",
};

const ACCENT = {
  "Languages":  "#4f8ef7",
  "Frontend":   "#a78bfa",
  "Backend":    "#34d399",
  "Databases":  "#f59e0b",
  "AI / ML":    "#f87171",
  "Tools":      "#38bdf8",
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const titleRef = useRef(null);
  const tabsRef  = useRef(null);
  const gridRef  = useRef(null);

  // Scroll reveal for title and tabs
  useEffect(() => {
    const els = [
      { el: titleRef.current, cls: "visible" },
      { el: tabsRef.current,  cls: "visible" },
    ];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.2 }
    );
    els.forEach(({ el }) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animate grid cards when tab changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".skill-item");
    cards.forEach((card, i) => {
      card.style.transition = "none";
      card.style.opacity = "0";
      card.style.transform = "translateY(24px) scale(0.92)";
      setTimeout(() => {
        card.style.transition = `opacity 0.45s cubic-bezier(.22,1,.36,1) ${i * 0.055}s, transform 0.45s cubic-bezier(.22,1,.36,1) ${i * 0.055}s`;
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1)";
      }, 20);
    });
  }, [activeTab]);

  const current = skills[activeTab];
  const accent  = ACCENT[current.category] || "var(--clr-accent)";

  return (
    <section className="skills" id="skills">
      <h1 className="skills-title" ref={titleRef}>SKILLS</h1>

      <div className="skills-tabs" ref={tabsRef}>
        {skills.map((s, i) => (
          <button
            key={s.category}
            className={`skills-tab${i === activeTab ? " active" : ""}`}
            style={{ "--tab-accent": ACCENT[s.category] }}
            onClick={() => setActiveTab(i)}
          >
            {s.category}
          </button>
        ))}
      </div>

      <div className="skills-grid" ref={gridRef} style={{ "--accent": accent }}>
        {current.items.map((item) => (
          <div className="skill-item" key={item}>
            <span className="skill-icon">{ICONS[item] || "◆"}</span>
            <span className="skill-name">{item}</span>
          </div>
        ))}
      </div>

      <div className="skills-meta" style={{ "--accent": accent }}>
        <span className="skills-meta-label">{current.category}</span>
        <span className="skills-meta-count">{current.items.length} technologies</span>
      </div>
    </section>
  );
};

export default Skills;
