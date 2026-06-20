import { useEffect, useRef } from "react";
import person from "../assets/me111.png";
import "../css/About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
console.log("GSAP of About", gsap.version);
console.log("ScrollTrigger of About", ScrollTrigger);
const About = () => {

  const sectionRef  = useRef(null);
  const imageRef    = useRef(null);
  const contentRef  = useRef(null);
  const h2Ref       = useRef(null);
  const p1Ref       = useRef(null);
  const p2Ref       = useRef(null);
  const tagsRef     = useRef(null);
  const badge1Ref   = useRef(null);
  const badge2Ref   = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const ease = "cubic-bezier(.22,1,.36,1)";

        // h2 pops in
        const animEl = (el, delay) => {
          if (!el) return;
          el.style.transition = `opacity 0.7s ${ease} ${delay}s, transform 0.7s ${ease} ${delay}s`;
          el.style.opacity  = "1";
          el.style.transform = "translateY(0)";
        };

        animEl(h2Ref.current,  0.3);
        animEl(p1Ref.current,  0.45);
        animEl(p2Ref.current,  0.6);
        animEl(tagsRef.current, 0.75);

        // Badges
        [badge1Ref.current, badge2Ref.current].forEach((b, i) => {
          if (!b) return;
          setTimeout(() => {
            b.style.opacity   = "1";
            b.style.transform = "scale(1)";
          }, 800 + i * 200);
          b.style.transform = "scale(0.8)";
          b.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        });
      },
      { threshold: 0.15 }
    );
    gsap.fromTo(
      imageRef.current,
      {
        x: -150,
        opacity: 0,
        scale: 0.9,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,

        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );

    gsap.fromTo(
      contentRef.current,
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,

        scrollTrigger: {
          trigger: "#about",
          start: "top 40%",
          end: "top 15%",
          scrub: 1,
        }
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div id="about-image-transition" className="about-image" ref={imageRef}>
        <div className="about-badge about-badge-1" ref={badge1Ref}>
          🚀 Full Stack
        </div>
        <div className="about-badge about-badge-2" ref={badge2Ref}>
          🤖 AI / ML
        </div>
        <img src={person} alt="Aayush Pandey" />
      </div>

      <div className="about-content" ref={contentRef}>
        <h2 ref={h2Ref}>
          Give me ideas &amp; I'll turn them into intelligent,{" "}
          AI-powered systems that Rock
        </h2>

        <p ref={p1Ref}>
          I love building{" "}
          <span className="about-highlight">full-stack systems from the ground up</span>{" "}
          — architecting scalable backends, crafting seamless frontends,
          and weaving in ML to keep products sharp in a world that never
          stops moving.
        </p>

        <p ref={p2Ref}>
          For me, engineering is crafting what you want into reality.
          I bring both depth and passion to every layer, because I
          believe the{" "}
          <span className="about-highlight">best products are made by people</span>{" "}
          who truly love what they build.
        </p>

        <div className="about-tags" ref={tagsRef}>
          {["React", "Node.js", "Python", "TensorFlow", "PostgreSQL", "AWS"].map(tag => (
            <span key={tag} className="about-tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
