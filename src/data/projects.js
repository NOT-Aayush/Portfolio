// Import images directly so Vite bundles them correctly
import swsImg  from "../image/sws.png";
import osintImg from "../image/image.png";
import mindImg from "../image/mc.png";

export const projects = [
  {
    title: "MindConnect",
    image: mindImg,
    icon: "🧠",
    description:
      "Mental health web app connecting users with therapists and peers. Real-time support, AI mood tracking, and expert matching.",
    tech: "React • Node.js • PostgreSQL • Socket.io",
    github: "https://github.com/NOT-Aayush/MindConnect",
    live: "https://mediscan.aayushpandey.in/?city=Delhi",
  },
  {
    title: "SpeakWithSigns",
    image: swsImg,
    icon: "🤟",
    description:
      "Real-time sign language translator using MediaPipe and a custom gesture model. Bridges communication gaps instantly.",
    tech: "React • TensorFlow.js • MediaPipe • Express",
    github: "https://github.com/NOT-Aayush/SpeakWithSigns",
    live: "https://speakwithsign.aayushpandey.in",
  },
  {
    title: "MediScan",
    image: null,
    icon: "🩺",
    description:
      "Medical imaging software using OpenCV and ML for early anomaly detection. Supports X-ray, MRI, and CT scans.",
    tech: "Python • OpenCV • TensorFlow • Electron",
    github: "https://github.com/NOT-Aayush/MediScan",
    live: null,
  },
  {
    title: "Investigation AI",
    image: osintImg,
    icon: "🔍",
    description:
      "AI-powered OSINT workspace for intelligence gathering and evidence analysis.",
    tech: "React • Express • PostgreSQL • LangChain",
    github: "https://github.com/NOT-Aayush/Investigation-AI",
    live: null,
  },
];
