import './css/App.css'
import Navbar from './Sections/Navbar.jsx'
import About from './Sections/About.jsx'
import Hero from './Sections/Hero.jsx'
import Projects from './Sections/Projects.jsx'
import Experience from './Sections/Experience.jsx'
import Skills from './Sections/Skills.jsx'
import Contact from './Sections/Contact.jsx'
import Footer from './Sections/Footer.jsx'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
    <Navbar />
    <main className="main-content">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
    <Analytics />
    </>
  )
}
export default App
