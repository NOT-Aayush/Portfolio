import { useEffect, useRef } from "react";
import "../css/Hero.css";
import person from "../assets/me111.png";
import { gsap, ScrollTrigger } from "../Components/gsap";

const Hero = () => {
  const imageRef  = useRef(null);
  const greetRef  = useRef(null);
  const descRef   = useRef(null);
  const nameRef   = useRef(null);
  const titleRef  = useRef(null);
  const lineRef   = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    
    // Create floating particles
    const section = sectionRef.current;
    let container;

    if (section) {
      container = document.createElement("div");
      container.className = "particles";
      for (let i = 0; i < 20; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${1 + Math.random() * 2}px;
          height: ${1 + Math.random() * 2}px;
          animation-delay: ${Math.random() * 8}s;
          animation-duration: ${6 + Math.random() * 8}s;
        `;
        container.appendChild(p);
      }
      section.appendChild(container);
    }

    // Staggered pop-in animations
    const animate = (el, delay, duration = 0.8) => {
      if (!el) return;
      el.style.transition = `opacity ${duration}s cubic-bezier(.22,1,.36,1) ${delay}s, transform ${duration}s cubic-bezier(.22,1,.36,1) ${delay}s`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
    };

    // Image slides in first
    const img = imageRef.current;
    if (img) {
      setTimeout(() => {
        img.style.transition = "opacity 1s cubic-bezier(.22,1,.36,1), transform 1.2s cubic-bezier(.22,1,.36,1)";
        img.style.opacity = "1";
        img.style.transform = "translateY(0) scale(1)";
        img.classList.add("loaded");
      }, 200);
    }

    // Text pops in staggered
    setTimeout(() => animate(greetRef.current,  0,   0.7), 400);
    setTimeout(() => animate(descRef.current,   0.15, 0.7), 400);
    setTimeout(() => animate(nameRef.current,   0.3,  0.7), 400);
    setTimeout(() => animate(titleRef.current,  0.5,  0.9), 400);
    
    // Decorative line
    const line = lineRef.current;
    if (line) {
      setTimeout(() => { line.style.width = "180px"; }, 1000);
    }
    const heroTween = gsap.fromTo(
      [
        ".hero-greet",
        ".hero-desc",
        ".hero-name",
        ".hero-title",
        ".hero-line"
      ],
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -80,

        scrollTrigger: {
          trigger: "#about",
          start: "top 85%",
          end: "top 45%",
          scrub: true
        }
      }
    );

    return () => {
      heroTween.kill();

      if (container) {
        container.remove();
      }
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-grid" />

      {/* Glowing image */}
      <div id="hero-image-transition" className="hero-image" ref={(el) => {
          imageRef.current = el;
          }}>
        <div className="hero-image-glow" />
        <img src={person} alt="Aayush Pandey" />
      </div>

      {/* Animated text */}
      <h2 className="hero-greet"  ref={greetRef}>Hi!</h2>
      <p  className="hero-desc"   ref={descRef}>I am</p>
      <div className="hero-line"  ref={lineRef} />
      <h2 className="hero-name"   ref={nameRef}>Aayush Pandey</h2>
      <h1 className="hero-title"  ref={titleRef}>AI &amp; Full Stack Developer</h1>

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
};

export default Hero;
