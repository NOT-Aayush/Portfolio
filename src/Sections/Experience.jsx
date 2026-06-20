import { useState, useEffect, useRef } from "react";
import { internships }  from "../data/internships";
import { certificates } from "../data/certificates";
import "../css/Experience.css";

const Experience = () => {
  const [tab, setTab] = useState("internships");
  const titleRef = useRef(null);
  const tabsRef  = useRef(null);
  const listRef  = useRef(null);

  const items = tab === "internships" ? internships : certificates;

  // Animate cards when tab changes
  useEffect(() => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".experience-card");
    cards.forEach((card, i) => {
      card.classList.remove("visible");
      card.style.transitionDelay = "0s";
      setTimeout(() => {
        card.style.transitionDelay = `${i * 0.1}s`;
        card.classList.add("visible");
      }, 50);
    });
  }, [tab]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.15 }
    );
    [titleRef.current, tabsRef.current].forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience" id="experience">
      <h1 className="experience-title" ref={titleRef}>Experience</h1>

      <div className="experience-tabs" ref={tabsRef}>
        <button
          className={tab === "internships" ? "active" : ""}
          onClick={() => setTab("internships")}
        >Internships</button>
        <button
          className={tab === "certificates" ? "active" : ""}
          onClick={() => setTab("certificates")}
        >Certificates</button>
      </div>

      <div className="experience-list" ref={listRef}>
        {items.map((item, index) => (
          <div className="experience-card visible" key={index}
            style={{ transitionDelay: `${index * 0.1}s` }}>
            <div className="experience-left">
              <h3>{item.title}</h3>
              {item.period  && <span>{item.period}</span>}
              {item.issuer  && <span>{item.issuer}</span>}
            </div>
            <div className="experience-divider" />
            <div className="experience-right">
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
