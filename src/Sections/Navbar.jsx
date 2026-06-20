import { useState, useEffect } from "react";
import "../css/Navbar.css";

const NAV_ITEMS = [
  { label: "Home",       id: "hero" },
  { label: "About",      id: "about" },
  { label: "Projects",   id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Skills",     id: "skills" },
  { label: "Contact",    id: "contact" },
];

const Navbar = () => {
  const [lightMode, setLightMode] = useState(false);
  const [active, setActive]       = useState("hero");
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      setLightMode(true);
      document.body.classList.add("light-theme");
    }
  }, []);
  
  const toggleTheme = () => {
    const next = !lightMode;

    setLightMode(next);

    document.body.classList.toggle(
      "light-theme",
      next
    );

    localStorage.setItem(
      "theme",
      next ? "light" : "dark"
    );
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Highlight active section on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <span className="nav-logo" onClick={() => scrollTo("hero")}>
        AP.
      </span>

      <ul className="nav-links">
        {NAV_ITEMS.map(({ label, id }) => (
          <li
            key={id}
            className={active === id ? "active" : ""}
            onClick={() => scrollTo(id)}
          >
            {label}
          </li>
        ))}
      </ul>

      <button
        className={`theme-toggle${lightMode ? " active" : ""}`}
        onClick={toggleTheme}
        aria-label="Toggle colour theme"
      >
        <span className="toggle-circle" />
      </button>
    </nav>
  );
};

export default Navbar;
