import { useEffect, useRef } from "react";
import "../css/Hero.css";
import person from "../assets/m311.png";
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
      gsap.fromTo(
        img,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => img.classList.add("loaded"),
        }
      );
    }

    // Text pops in staggered
    gsap.fromTo(
      [
        greetRef.current,
        descRef.current,
        nameRef.current,
        titleRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4,
      }
    );
    
    // Decorative line
    const line = lineRef.current;
    if (line) {
      gsap.fromTo(
        line,
        {
          width: 0,
        },
        {
          width: 180,
          duration: 0.8,
          delay: 1,
          ease: "power2.out",
        }
      );
    }
    gsap.to(".hero-scroll-hint", {
      y: 10,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
        

    return () => {
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
