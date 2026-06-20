import { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";
import "../css/Projects.css";

const Projects = () => {
  const [current, setCurrent] = useState(0);
  const headingRef    = useRef(null);
  const carouselRef   = useRef(null);

  const prev = (current - 1 + projects.length) % projects.length;
  const next = (current + 1) % projects.length;

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  setCurrent(p => (p - 1 + projects.length) % projects.length);
      if (e.key === "ArrowRight") setCurrent(p => (p + 1) % projects.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // IntersectionObserver reveal
  useEffect(() => {
    const els = [headingRef.current, carouselRef.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects" id="projects">
      <h1 className="projects-heading" ref={headingRef}>MY PROJECTS</h1>

      <div className="carousel-container" ref={carouselRef}>
        <button
          className="carousel-btn left"
          onClick={() => setCurrent(prev)}
          aria-label="Previous project"
        >❮</button>

        <div className="carousel">
          {projects.map((project, index) => {
            let className = "project-card hidden-card";
            if (index === current)      className = "project-card center-card";
            else if (index === prev)    className = "project-card left-card";
            else if (index === next)    className = "project-card right-card";

            return (
              <div key={index} className={className} onClick={() => setCurrent(index)}>
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-card-placeholder">{project.icon || "💡"}</div>
                )}

                <div className="project-overlay">
                  <h2>{project.title}</h2>
                  {index === current && (
                    <div className="project-details">
                      <p>{project.description}</p>
                      <span>{project.tech}</span>
                      <div className="project-links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} >
                            GitHub
                          </a>
                        )}

                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                          >
                            Live Demo
                          </a>
                        )}

                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="carousel-btn right"
          onClick={() => setCurrent(next)}
          aria-label="Next project"
        >❯</button>
      </div>

      {/* Dot indicators */}
      <div className="project-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`project-dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
