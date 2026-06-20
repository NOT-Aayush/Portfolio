import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

console.log("GSAP:", gsap.version);
console.log("Plugin:", ScrollTrigger);

export { gsap, ScrollTrigger };