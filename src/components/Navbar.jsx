import { useEffect, useState } from "react";

const links = [
  {
    label: "Accueil",
    target: "home",
    icon: "home",
  },
  {
    label: "Projets",
    target: "projects",
    icon: "projects",
  },
  {
    label: "À propos",
    target: "about",
    icon: "about",
  },
  {
    label: "Contact",
    target: "contact",
    icon: "contact",
  },
];

function Icon({ type, size = 19 }) {
  if (type === "home") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    );
  }

  if (type === "projects") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  if (type === "about") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
      </svg>
    );
  }

  if (type === "contact") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  return null;
}

function ThemeIcon({ darkMode }) {
  if (darkMode) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function Navbar({ darkMode, setDarkMode }) {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.target))
      .filter(Boolean);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <>
      {/* ==========================================
          NAVBAR DESKTOP
      ========================================== */}

      <header
        className="
          fixed
          left-1/2
          top-5
          z-50
          hidden
          w-[calc(100%-40px)]
          max-w-6xl
          -translate-x-1/2
          md:block
        "
      >
        <nav
          className="
            flex
            items-center
            justify-between
            rounded-full
            border
            border-[var(--border)]
            bg-[var(--bg-primary)]/75
            px-5
            py-3
            shadow-xl
            backdrop-blur-xl
          "
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            aria-label="Retour à l'accueil"
            className="
              flex
              items-center
              transition-transform
              duration-300
              hover:scale-105
            "
          >
            <img
              src="/images/logo.png"
              alt="Logo José Nahounmé"
              className="h-8 w-auto object-contain"
            />
          </button>

          {/* Liens */}
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                activeSection === link.target;

              return (
                <button
                  key={link.target}
                  type="button"
                  onClick={() =>
                    scrollToSection(link.target)
                  }
                  className={`
                    relative
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {link.label}

                  {isActive && (
                    <span
                      className="
                        absolute
                        bottom-1
                        left-1/2
                        h-1
                        w-1
                        -translate-x-1/2
                        rounded-full
                        bg-[var(--accent)]
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Thème */}
          <button
            type="button"
            onClick={toggleTheme}
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
              border
              border-[var(--border)]
              transition-all
              duration-300
              hover:scale-105
              hover:border-[var(--accent)]
              hover:text-[var(--accent)]
            "
          >
            <ThemeIcon darkMode={darkMode} />
          </button>
        </nav>
      </header>

      {/* ==========================================
          NAVBAR MOBILE
      ========================================== */}

      <nav
        className="
          fixed
          bottom-3
          left-1/2
          z-50
          flex
          -translate-x-1/2
          items-center
          gap-1
          rounded-full
          border
          border-[var(--border)]
          bg-[var(--bg-primary)]/80
          px-2
          py-2
          shadow-2xl
          backdrop-blur-xl
          md:hidden
        "
      >
        {links.map((link) => {
          const isActive =
            activeSection === link.target;

          return (
            <button
              key={link.target}
              type="button"
              onClick={() =>
                scrollToSection(link.target)
              }
              aria-label={link.label}
              className={`
                group
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                transition-all
                duration-300
                active:scale-90
                ${
                  isActive
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--text-secondary)]"
                }
              `}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                <Icon type={link.icon} />
              </span>

              {isActive && (
                <span
                  className="
                    absolute
                    bottom-1
                    h-1
                    w-1
                    rounded-full
                    bg-[var(--accent)]
                    shadow-[0_0_8px_rgba(30,136,229,0.7)]
                  "
                />
              )}
            </button>
          );
        })}

        {/* Thème mobile */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            darkMode
              ? "Activer le mode clair"
              : "Activer le mode sombre"
          }
          className="
            group
            ml-1
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[var(--border)]
            text-[var(--text-secondary)]
            transition-all
            duration-300
            active:scale-90
            hover:border-[var(--accent)]
            hover:text-[var(--accent)]
          "
        >
          <span className="transition-transform duration-500 group-hover:rotate-12">
            <ThemeIcon darkMode={darkMode} />
          </span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;