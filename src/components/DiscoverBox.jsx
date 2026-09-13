import { useState } from "react";

function DiscoverBox({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;

    setOpening(true);

    // Laisser l'animation se jouer avant d'afficher la page principale
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center">

      {/* Zone interactive */}
      <button
        type="button"
        onClick={handleOpen}
        disabled={opening}
        aria-label="Ouvrir la galerie Jose World"
        className="
          group
          relative
          flex
          flex-col
          items-center
          focus:outline-none
        "
      >
        {/* Explosion */}
        {opening && (
          <div className="pointer-events-none absolute inset-1/2 z-20">
            <span className="firework spark-1" />
            <span className="firework spark-2" />
            <span className="firework spark-3" />
            <span className="firework spark-4" />
            <span className="firework spark-5" />
            <span className="firework spark-6" />
            <span className="firework spark-7" />
            <span className="firework spark-8" />
            <span className="firework spark-9" />
            <span className="firework spark-10" />
          </div>
        )}

        {/* Boîte */}
        <div
          className={`
            relative
            h-24
            w-28
            transition-all
            duration-700
            ${opening ? "translate-y-3 scale-95" : "group-hover:-translate-y-1"}
          `}
        >
          {/* Corps */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              h-16
              w-28
              -translate-x-1/2
              rounded-b-xl
              border-2
              border-[var(--accent)]
              bg-[var(--bg-secondary)]
            "
          >
            {/* Ruban vertical */}
            <div
              className="
                absolute
                left-1/2
                top-0
                h-full
                w-4
                -translate-x-1/2
                bg-[var(--accent)]
              "
            />
          </div>

          {/* Couvercle */}
          <div
            className={`
              absolute
              left-1/2
              top-1
              z-10
              h-7
              w-32
              -translate-x-1/2
              rounded-md
              border-2
              border-[var(--accent)]
              bg-[var(--bg-secondary)]
              transition-all
              duration-700
              ease-out
              ${
                opening
                  ? "-translate-y-16 rotate-[-18deg] opacity-0"
                  : "group-hover:-translate-y-1"
              }
            `}
          >
            {/* Ruban */}
            <div
              className="
                absolute
                left-1/2
                top-0
                h-full
                w-4
                -translate-x-1/2
                bg-[var(--accent)]
              "
            />
          </div>
        </div>

        {/* Texte */}
        <span
          className="
            mt-6
            rounded-full
            border
            border-[var(--accent)]
            px-8
            py-4
            text-sm
            font-semibold
            uppercase
            tracking-[0.2em]
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:bg-[var(--accent)]
            group-hover:text-white
          "
        >
          Découvrir
        </span>
      </button>
    </div>
  );
}

export default DiscoverBox;