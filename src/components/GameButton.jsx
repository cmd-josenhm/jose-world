import { useRef } from "react";
import { gsap } from "gsap";

function GameButton({ onClick }) {
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  /* ========================================================
     INTERACTION SOURIS
     ======================================================== */

  const handleMouseMove = (event) => {
    const button = buttonRef.current;
    const glow = glowRef.current;

    if (!button || !glow) return;

    const rect = button.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    gsap.to(button, {
      x: x * 0.04,
      y: y * 0.04,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(glow, {
      x: x * 0.12,
      y: y * 0.12,
      opacity: 0.95,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    const glow = glowRef.current;

    if (!button || !glow) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.45)",
    });

    gsap.to(glow, {
      x: 0,
      y: 0,
      opacity: 0.45,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  /* ========================================================
     CLIC
     ======================================================== */

  const handleClick = () => {
    const button = buttonRef.current;

    if (!button) {
      onClick();
      return;
    }

    gsap.timeline({
      onComplete: onClick,
    })
      .to(button, {
        scale: 0.96,
        duration: 0.12,
        ease: "power2.out",
      })
      .to(button, {
        scale: 1,
        duration: 0.25,
        ease: "back.out(2)",
      });
  };

  return (
    <section
      className="
        game-button-section
        relative
        overflow-hidden
        px-6
        py-20
        md:px-10
        md:py-24
      "
    >
      {/* ==================================================
          LUMIÈRE CENTRALE
          ================================================== */}

      <div
        ref={glowRef}
        className="
          game-button-glow
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-64
          w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#1E88E5]/10
          opacity-45
          blur-[85px]
        "
      />

      {/* ==================================================
          LIGNES DÉCORATIVES
          ================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          h-px
          w-[18%]
          bg-gradient-to-r
          from-transparent
          to-[#1E88E5]/35
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-1/2
          h-px
          w-[18%]
          bg-gradient-to-l
          from-transparent
          to-[#1E88E5]/35
        "
      />

      {/* ==================================================
          CONTENU
          ================================================== */}

      <div
        className="
          game-button-content
          relative
          z-10
          mx-auto
          max-w-2xl
          text-center
        "
      >
        {/* Kicker */}

        <p
          className="
            game-button-kicker
            mb-4
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-[var(--accent)]
          "
        >
          Une petite surprise
        </p>

        {/* Titre */}

        <h2
          className="
            text-4xl
            font-extrabold
            leading-[0.95]
            tracking-tight
            sm:text-5xl
            md:text-6xl
          "
        >
          TESTER MON{" "}
          <span className="text-[var(--accent)]">
            JEU
          </span>
        </h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-6
            max-w-lg
            text-sm
            leading-7
            text-[var(--text-secondary)]
          "
        >
          Fais une pause et découvre une petite
          expérience interactive créée en JavaScript.
        </p>

        {/* ==================================================
            BOUTON
            ================================================== */}

        <div className="mt-8">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="
              game-entry-button
              group
              relative
              inline-flex
              items-center
              gap-3
              overflow-hidden
              rounded-full
              border
              border-[#1E88E5]/50
              bg-[#111111]
              px-7
              py-4
              text-xs
              font-bold
              tracking-[0.04em]
              text-white
              shadow-[0_15px_45px_rgba(30,136,229,0.08)]
              transition-colors
              duration-300
              hover:border-[#1E88E5]
              hover:bg-[#1E88E5]
            "
          >
            {/* Effet interne */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                transition-transform
                duration-700
                group-hover:translate-x-full
              "
            />

            <span className="relative z-10">
              TESTER MON JEU
            </span>

            <span
              className="
                relative
                z-10
                text-base
                text-[#1E88E5]
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
                group-hover:text-white
              "
            >
              ↗
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default GameButton;