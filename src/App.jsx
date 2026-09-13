import { useEffect, useState } from "react";

import CustomCursor from "./components/CustomCursor";
import WebGLBackground from "./components/WebGLBackground";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import Clients from "./components/Clients";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import DiscoverBox from "./components/DiscoverBox";
import LiveNotifications from "./components/LiveNotifications";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // ==========================================
  // GESTION DU THÈME
  // ==========================================

  useEffect(() => {
    document.documentElement.classList.toggle(
      "light",
      !darkMode
    );
  }, [darkMode]);

  // ==========================================
  // PAGE DE COUVERTURE
  // ==========================================

  if (!showPortfolio) {
    return (
      <div
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-[var(--bg-primary)]
          px-6
          text-[var(--text-primary)]
        "
      >
        {/* Bouton thème */}
        <div className="absolute right-6 top-6 z-20">
          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>

        {/* Contenu de la couverture */}
        <main className="relative z-10 text-center">
          <p
            className="
              mb-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[var(--accent)]
            "
          >
            Welcome To My World!
          </p>

          <h1
            className="
              text-5xl
              font-extrabold
              tracking-tight
              md:text-7xl
            "
          >
            Mon portfolio
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-[var(--text-secondary)]
            "
          >
            L’univers créatif de José Nahounmé.
          </p>

          {/* Box interactive */}
          <DiscoverBox
            onOpen={() => setShowPortfolio(true)}
          />
        </main>
      </div>
    );
  }

  // ==========================================
  // PAGE PRINCIPALE
  // ==========================================

  return (
    <div
      className="
        custom-cursor-active
        relative
        min-h-screen
        overflow-x-hidden
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
      "
    >
      {/* Arrière-plan WebGL */}
      <WebGLBackground />

      {/* Contenu au-dessus du WebGL */}
      <div className="relative z-10">
        {/* Curseur personnalisé */}
        <CustomCursor />

        {/* Bouton WhatsApp */}
        <WhatsAppButton />

        {/* Notifications flottantes */}
        <LiveNotifications />

        {/* Navigation */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ======================================
            CONTENU DU PORTFOLIO
        ======================================= */}

        <main>
          {/* Hero */}
          <Hero />

          {/* Réalisations */}
          <Projects
            onProjectSelect={setSelectedProject}
          />

          {/* Clients */}
          <Clients />

          {/* Compétences */}
          <Skills />

          {/* Témoignages */}
          <Testimonials />

          {/* À propos */}
          <About />

          {/* Contact */}
          <Contact />

          {/* Footer */}
          <Footer />
        </main>

        {/* ======================================
            FENÊTRE PROJET
        ======================================= */}

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;