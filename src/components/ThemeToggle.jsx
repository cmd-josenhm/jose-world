import { Sun, Moon } from "lucide-react";

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      type="button"
      onClick={() => setDarkMode((current) => !current)}
      aria-label={
        darkMode ? "Activer le mode clair" : "Activer le mode sombre"
      }
      className="
        group relative flex h-11 w-11 items-center justify-center
        overflow-hidden rounded-full
        border border-[var(--border)]
        bg-[var(--bg-secondary)]
        text-[var(--text-primary)]
        transition-all duration-300
        hover:scale-105
        hover:border-[var(--accent)]
      "
    >
      <span
        className={`absolute transition-all duration-300 ${
          darkMode
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      >
        <Sun size={18} strokeWidth={2} />
      </span>

      <span
        className={`absolute transition-all duration-300 ${
          darkMode
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <Moon size={18} strokeWidth={2} />
      </span>
    </button>
  );
}

export default ThemeToggle;