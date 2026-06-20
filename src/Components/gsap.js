import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

console.log(
  "GSAP File Registered:",
  !!gsap.core.globals().ScrollTrigger
);

export { gsap, ScrollTrigger };