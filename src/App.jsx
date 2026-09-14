import { useCallback, useEffect, useState } from "react";

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
import Game from "./components/Game";
import GameButton from "./components/GameButton";

function App() {
  /* ========================================================
     ÉTATS GLOBAUX
     ======================================================== */

  const [darkMode, setDarkMode] = useState(true);

  const [showPortfolio, setShowPortfolio] = useState(false);

  const [showGame, setShowGame] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  /* ========================================================
     GESTION DU THÈME
     ======================================================== */

  useEffect(() => {
    document.documentElement.classList.toggle(
      "light",
      !darkMode
    );

    localStorage.setItem(
      "jose-world-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  /* ========================================================
     RESTAURATION DU THÈME
     ======================================================== */

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "jose-world-theme"
    );

    if (savedTheme === "light") {
      setDarkMode(false);
    }

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  /* ========================================================
     OUVERTURE DU PORTFOLIO
     ======================================================== */

  const handleOpenPortfolio = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      setShowPortfolio(true);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 50);
  }, [isTransitioning]);

  /* ========================================================
     OUVERTURE DU JEU
     ======================================================== */

  const handleOpenGame = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      setShowGame(true);
      setIsTransitioning(false);
    }, 250);
  }, [isTransitioning]);

  /* ========================================================
     RETOUR DU JEU
     ======================================================== */

  const handleCloseGame = useCallback(() => {
    setIsTransitioning(true);

    window.setTimeout(() => {
      setShowGame(false);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 150);
  }, []);

  /* ========================================================
     PROJET
     ======================================================== */

  const handleProjectSelect = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  /* ========================================================
     PAGE DE COUVERTURE
     ======================================================== */

  if (!showPortfolio) {
    return (
      <div
        className={`
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-[var(--bg-primary)]
          px-6
          text-[var(--text-primary)]
          transition-opacity
          duration-500
          ${isTransitioning ? "opacity-90" : "opacity-100"}
        `}
      >
        {/* ================================================
            THÈME
        ================================================= */}

        <div className="absolute right-6 top-6 z-30">
          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>

        {/* ================================================
            CONTENU COVER
        ================================================= */}

        <main className="relative z-10 w-full text-center">
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

          {/* ================================================
              BOX DISCOVER
          ================================================= */}

          <DiscoverBox
            onOpen={handleOpenPortfolio}
          />
        </main>
      </div>
    );
  }

  /* ========================================================
     PAGE JEU
     ======================================================== */

  if (showGame) {
    return (
      <div
        className="
          min-h-screen
          bg-[var(--bg-primary)]
          text-[var(--text-primary)]
        "
      >
        <Game
          onBack={handleCloseGame}
          darkMode={darkMode}
        />
      </div>
    );
  }

  /* ========================================================
     PAGE PRINCIPALE
     ======================================================== */

  return (
    <div
      className="
        custom-cursor-active
        relative
        min-h-screen
        overflow-x-hidden
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
        transition-colors
        duration-500
      "
    >
      {/* ====================================================
          WEBGL
      ==================================================== */}

      <WebGLBackground />

      {/* ====================================================
          CONTENU PRINCIPAL
      ==================================================== */}

      <div className="relative z-10">

        {/* ================================================
            CURSEUR
        ================================================= */}

        <CustomCursor />

        {/* ================================================
            WHATSAPP
        ================================================= */}

        <WhatsAppButton />

        {/* ================================================
            NOTIFICATIONS
        ================================================= */}

        <LiveNotifications />

        {/* ================================================
            NAVBAR
        ================================================= */}

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ================================================
            CONTENU DU PORTFOLIO
        ================================================= */}

        <main>

          {/* Hero */}

          <Hero />

          {/* Projets */}

          <Projects
            onProjectSelect={handleProjectSelect}
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

          {/* ==============================================
              TESTER MON JEU
              volontairement absent de la Navbar
          =============================================== */}

          <GameButton
            onClick={handleOpenGame}
          />

          {/* Footer */}

          <Footer />

        </main>

        {/* ==================================================
            MODALE PROJET
        ================================================== */}

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </div>
    </div>
  );
}

export default App;