import { useEffect, useRef } from "react";
import gsap from "gsap";

function ThemeToggle({ darkMode, setDarkMode }) {
  const buttonRef = useRef(null);
  const indicatorRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (!indicatorRef.current || !iconRef.current) return;

    gsap.to(indicatorRef.current, {
      x: darkMode ? 0 : 28,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(iconRef.current, {
      rotate: darkMode ? 0 : 180,
      duration: 0.45,
      ease: "back.out(1.7)",
    });
  }, [darkMode]);

  const handleToggle = () => {
    const button = buttonRef.current;

    if (!button) {
      setDarkMode((prev) => !prev);
      return;
    }

    gsap.timeline()
      .to(button, {
        scale: 0.92,
        duration: 0.08,
        ease: "power2.in",
      })
      .to(button, {
        scale: 1,
        duration: 0.28,
        ease: "back.out(2)",
      });

    setDarkMode((prev) => !prev);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      aria-label={
        darkMode
          ? "Activer le mode clair"
          : "Activer le mode sombre"
      }
      title={
        darkMode
          ? "Passer au mode clair"
          : "Passer au mode sombre"
      }
      className="
        group
        relative
        flex
        h-10
        w-[72px]
        items-center
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--bg-secondary)]/80
        p-1
        shadow-[0_10px_30px_rgba(0,0,0,0.16)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-[var(--accent)]/40
        hover:shadow-[0_12px_35px_rgba(30,136,229,0.16)]
        focus:outline-none
        focus:ring-2
        focus:ring-[var(--accent)]/50
        focus:ring-offset-2
        focus:ring-offset-[var(--bg-primary)]
      "
    >
      {/* Fond lumineux */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-[var(--accent)]/5
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Indicateur */}
      <span
        ref={indicatorRef}
        className="
          absolute
          left-1
          top-1
          h-8
          w-8
          rounded-full
          bg-[var(--accent)]
          shadow-[0_0_18px_rgba(30,136,229,0.30)]
        "
      />

      {/* Soleil */}
      <span
        className="
          relative
          z-10
          flex
          h-8
          w-8
          items-center
          justify-center
          text-white
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
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
          <path d="m6.35 17.65-1.42 1.42" />
          <path d="m19.07 4.93-1.42 1.42" />
        </svg>
      </span>

      {/* Lune */}
      <span
        ref={iconRef}
        className="
          relative
          z-10
          -ml-8
          flex
          h-8
          w-8
          translate-x-7
          items-center
          justify-center
          text-white
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
        </svg>
      </span>

      {/* Labels */}
      <span
        className="
          absolute
          left-[42px]
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-[var(--text-secondary)]
          transition-all
          duration-300
          group-hover:text-[var(--text-primary)]
        "
      >
        {darkMode ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default ThemeToggle;