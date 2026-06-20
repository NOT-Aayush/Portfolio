import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
console.log("GSAP Plugins", gsap.plugins);
export { gsap, ScrollTrigger };