import { useEffect, useRef, useState } from "react";

/* =========================================================
   LIENS
   ========================================================= */

const links = [
  {
    id: "home",
    label: "Accueil",
    icon: "home",
  },
  {
    id: "projects",
    label: "Projets",
    icon: "projects",
  },
  {
    id: "about",
    label: "À propos",
    icon: "about",
  },
  {
    id: "contact",
    label: "Contact",
    icon: "contact",
  },
];

/* =========================================================
   ICÔNES SVG
   ========================================================= */

function Icon({ type, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (type === "home") {
    return (
      <svg {...common}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </svg>
    );
  }

  if (type === "projects") {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
        <path d="M7 8h10" />
        <path d="M7 12h4" />
        <path d="M7 16h7" />
      </svg>
    );
  }

  if (type === "about") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6" />
      </svg>
    );
  }

  if (type === "contact") {
    return (
      <svg {...common}>
        <rect
          x="3.5"
          y="5"
          width="17"
          height="14"
          rx="2.5"
        />
        <path d="m5 7 7 5 7-5" />
      </svg>
    );
  }

  return null;
}

/* =========================================================
   ICÔNES THÈME
   ========================================================= */

function ThemeIcon({ darkMode }) {
  if (darkMode) {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.42 1.42" />
        <path d="m17.65 17.65 1.42 1.42" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m4.93 19.07 1.42-1.42" />
        <path d="m17.65 6.35 1.42-1.42" />
      </svg>
    );
  }

  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar({ darkMode, setDarkMode }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const previousScrollY = useRef(0);
  const observerRef = useRef(null);

  /* ======================================================
     ACTIVE SECTION
     ====================================================== */

  useEffect(() => {
    const sections = links
      .map((link) =>
        document.getElementById(link.id)
      )
      .filter(Boolean);

    if (!sections.length) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          );

        if (visibleEntries.length > 0) {
          setActiveSection(
            visibleEntries[0].target.id
          );
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin:
          "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  /* ======================================================
     SCROLL — VISIBILITÉ
     ====================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 20);

      if (currentY <= 10) {
        setIsVisible(true);
        previousScrollY.current = currentY;
        return;
      }

      const difference =
        currentY - previousScrollY.current;

      if (difference > 8) {
        setIsVisible(false);
      }

      if (difference < -8) {
        setIsVisible(true);
      }

      previousScrollY.current = currentY;
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ======================================================
     INDICATEUR ACTIF
     ====================================================== */

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;

    if (!nav || !indicator) return;

    const activeElement = nav.querySelector(
      `[data-nav-id="${activeSection}"]`
    );

    if (!activeElement) return;

    const navRect =
      nav.getBoundingClientRect();

    const itemRect =
      activeElement.getBoundingClientRect();

    const left =
      itemRect.left -
      navRect.left;

    indicator.style.width =
      `${itemRect.width}px`;

    indicator.style.transform =
      `translateX(${left}px)`;
  }, [activeSection]);

  /* ======================================================
     NAVIGATION
     ====================================================== */

  const scrollToSection = (
    event,
    sectionId
  ) => {
    event.preventDefault();

    const section =
      document.getElementById(sectionId);

    if (!section) return;

    setActiveSection(sectionId);
    setIsVisible(true);
    setIsMobileMenuOpen(false);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ======================================================
     MAGNÉTISME
     ====================================================== */

  const handleMagneticMove = (event) => {
    const element =
      event.currentTarget;

    const rect =
      element.getBoundingClientRect();

    const x =
      (event.clientX -
        rect.left -
        rect.width / 2) *
      0.12;

    const y =
      (event.clientY -
        rect.top -
        rect.height / 2) *
      0.12;

    element.style.transform =
      `translate(${x}px, ${y}px)`;
  };

  const handleMagneticLeave = (event) => {
    event.currentTarget.style.transform =
      "translate(0, 0)";
  };

  /* ======================================================
     RENDER DES LIENS
     ====================================================== */

  const renderLinks = (mobile = false) =>
    links.map((link) => {
      const isActive =
        activeSection === link.id;

      return (
        <a
          key={link.id}
          href={`#${link.id}`}
          data-nav-id={link.id}
          onClick={(event) =>
            scrollToSection(
              event,
              link.id
            )
          }
          onMouseMove={
            !mobile
              ? handleMagneticMove
              : undefined
          }
          onMouseLeave={
            !mobile
              ? handleMagneticLeave
              : undefined
          }
          className={`
            group
            relative
            flex
            items-center
            gap-2
            rounded-full
            transition-all
            duration-300
            ${
              mobile
                ? "w-full justify-between px-4 py-3"
                : "px-3 py-2"
            }
            ${
              isActive
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }
          `}
        >
          <span
            className={`
              transition-all
              duration-300
              ${
                isActive
                  ? "scale-110 text-[var(--accent)]"
                  : "group-hover:scale-110"
              }
            `}
          >
            <Icon
              type={link.icon}
              size={mobile ? 18 : 16}
            />
          </span>

          <span
            className={`
              font-semibold
              ${
                mobile
                  ? "text-sm"
                  : "text-[11px]"
              }
            `}
          >
            {link.label}
          </span>

          {mobile && (
            <span
              className={`
                text-[var(--accent)]
                transition-all
                duration-300
                ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0"
                }
              `}
            >
              →
            </span>
          )}
        </a>
      );
    });

  return (
    <>
      {/* ==================================================
          DESKTOP NAVBAR
          ================================================== */}

      <nav
        className={`
          fixed
          left-1/2
          top-5
          z-[100]
          hidden
          w-[calc(100%-40px)]
          max-w-6xl
          -translate-x-1/2
          md:block
          transition-all
          duration-500
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-20 opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          ref={navRef}
          className={`
            relative
            flex
            items-center
            justify-between
            rounded-full
            border
            border-[var(--border)]
            px-3
            py-2
            backdrop-blur-xl
            transition-all
            duration-500
            ${
              isScrolled
                ? "bg-[var(--bg-primary)]/80 shadow-[0_15px_50px_rgba(0,0,0,0.18)]"
                : "bg-[var(--bg-primary)]/55"
            }
          `}
        >
          {/* Logo */}

          <a
            href="#home"
            onClick={(event) =>
              scrollToSection(
                event,
                "home"
              )
            }
            className="
              group
              flex
              shrink-0
              items-center
            "
          >
            <img
              src="/images/logo.png"
              alt="José Nahounmé"
              className="
                h-8
                w-auto
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </a>

          {/* Liens */}

          <div className="relative flex items-center">
            {/* Indicateur */}

            <div
              ref={indicatorRef}
              className="
                pointer-events-none
                absolute
                bottom-0
                left-0
                h-px
                rounded-full
                bg-[var(--accent)]
                shadow-[0_0_12px_rgba(30,136,229,0.7)]
                transition-all
                duration-500
                ease-out
              "
            />

            <div className="flex items-center gap-1">
              {renderLinks(false)}
            </div>
          </div>

          {/* Thème */}

          <button
            type="button"
            onClick={() =>
              setDarkMode((value) => !value)
            }
            aria-label={
              darkMode
                ? "Activer le mode clair"
                : "Activer le mode sombre"
            }
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[var(--border)]
              text-[var(--text-secondary)]
              transition-all
              duration-300
              hover:border-[var(--accent)]
              hover:text-[var(--accent)]
            "
          >
            <span
              className="
                transition-transform
                duration-500
              "
            >
              <ThemeIcon
                darkMode={darkMode}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* ==================================================
          MOBILE NAVBAR
          ================================================== */}

      <div
        className="
          fixed
          bottom-3
          left-1/2
          z-[100]
          w-[calc(100%-20px)]
          max-w-md
          -translate-x-1/2
          md:hidden
        "
      >
        <div className="relative">
          {/* Menu étendu */}

          <div
            className={`
              absolute
              bottom-[58px]
              left-0
              right-0
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--bg-primary)]/90
              p-2
              backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.28)]
              transition-all
              duration-400
              ${
                isMobileMenuOpen
                  ? "visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible translate-y-3 opacity-0"
              }
            `}
          >
            <div className="flex flex-col">
              {renderLinks(true)}
            </div>
          </div>

          {/* Barre principale */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-1
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--bg-primary)]/85
              p-2
              shadow-[0_15px_45px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
            "
          >
            {/* Accueil */}

            <a
              href="#home"
              onClick={(event) =>
                scrollToSection(
                  event,
                  "home"
                )
              }
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition-all
                duration-300
                ${
                  activeSection === "home"
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)]"
                }
              `}
              aria-label="Accueil"
            >
              <Icon
                type="home"
                size={17}
              />
            </a>

            {/* Menu */}

            <button
              type="button"
              aria-label={
                isMobileMenuOpen
                  ? "Fermer le menu"
                  : "Ouvrir le menu"
              }
              onClick={() =>
                setIsMobileMenuOpen(
                  (value) => !value
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border)]
                text-[var(--text-primary)]
                transition-all
                duration-300
              "
            >
              <span className="relative h-4 w-5">
                <span
                  className={`
                    absolute
                    left-0
                    top-0
                    h-px
                    w-5
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMobileMenuOpen
                        ? "top-1/2 rotate-45"
                        : ""
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-1/2
                    h-px
                    w-5
                    -translate-y-1/2
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMobileMenuOpen
                        ? "opacity-0"
                        : ""
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    bottom-0
                    h-px
                    w-5
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMobileMenuOpen
                        ? "bottom-1/2 -rotate-45"
                        : ""
                    }
                  `}
                />
              </span>
            </button>

            {/* Thème */}

            <button
              type="button"
              onClick={() =>
                setDarkMode(
                  (value) => !value
                )
              }
              aria-label={
                darkMode
                  ? "Activer le mode clair"
                  : "Activer le mode sombre"
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-[var(--text-secondary)]
                transition-all
                duration-300
                hover:text-[var(--accent)]
              "
            >
              <ThemeIcon
                darkMode={darkMode}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;