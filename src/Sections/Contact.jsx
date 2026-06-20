import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import "../css/Contact.css";

const LINKS = [
  { href: "mailto:aayush4373pandey@gmail.com", icon: <FaEnvelope />, label: "Email",     external: false },
  { href: "https://www.linkedin.com/in/aayush-pandey-901854289", icon: <FaLinkedin />, label: "LinkedIn", external: true  },
  { href: "https://github.com/NOT-Aayush",     icon: <FaGithub />,   label: "GitHub",    external: true  },

];

const Contact = () => {
  const titleRef     = useRef(null);
  const containerRef = useRef(null);
  const itemRefs     = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );

    [titleRef.current, containerRef.current, ...itemRefs.current].forEach(el => {
      if (el) observer.observe(el);
    });

    // Stagger contact items
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transitionDelay = `${0.2 + i * 0.12}s`;
    });

    return () => observer.disconnect();
  }, []);

  // Open resume PDF
  const handleResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section className="contact" id="contact">
      <h1 className="contact-title" ref={titleRef}>Contact</h1>

      <div className="contact-container" ref={containerRef}>
        <div className="contact-left">
          <h2>Let's level up your work</h2>
          <p>
            Have a project in mind? Looking for a partner who cares
            about your product as much as you do? Drop me a line.
          </p>
          <button className="resume-btn" onClick={handleResume}>
            ↓ Resume
          </button>
        </div>

        <div className="contact-divider" />

        <div className="contact-right">
          {LINKS.map(({ href, icon, label, external }, i) => (
            <a
              key={label}
              href={href}
              className="contact-item"
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              ref={el => itemRefs.current[i] = el}
            >
              <div className="icon-circle">{icon}</div>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
