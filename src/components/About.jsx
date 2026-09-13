import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-image",
        {
          x: -60,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".about-content",
        {
          x: 60,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
  id="about"
  className="about-section relative px-6 py-24 md:px-10 md:py-32"
>
  <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center md:gap-20">

    {/* =========================
        PORTRAIT
    ========================== */}
    <div className="about-image">
      <div className="relative mx-auto max-w-md">

        {/* Halo bleu */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[75%]
            w-[75%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--accent)]/15
            blur-[90px]
          "
        />

        {/* Cadre principal */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-[var(--border)]
            bg-[var(--bg-secondary)]
          "
        >
          {/* Image */}
          <img
            src="/images/profil.png"
            alt="Portrait de José Nahounmé"
            loading="lazy"
            className="
              aspect-[4/5]
              h-full
              w-full
              object-cover
              grayscale
              transition-all
              duration-700
              group-hover:scale-105
            "
          />

          {/* Teinte principale bleue */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#1E88E5]/20
              mix-blend-color
            "
          />

          {/* Dégradé noir / bleu */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-[#111111]/75
              via-[#111111]/10
              to-[#1E88E5]/10
            "
          />

          {/* Accent bleu */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-700
              group-hover:opacity-100
              bg-[radial-gradient(circle_at_50%_20%,rgba(30,136,229,0.20),transparent_45%)]
            "
          />
        </div>

        {/* Petit élément graphique */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-3
            -right-3
            h-20
            w-20
            rounded-full
            border
            border-[var(--accent)]/40
          "
        />

      </div>
    </div>

    {/* =========================
        CONTENU
    ========================== */}
    <div className="about-content">

      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
        À propos
      </p>

      <h2
        className="
          text-4xl
          font-extrabold
          tracking-tight
          md:text-6xl
        "
      >
        José Nahounmè
      </h2>

      <p
        className="
          mt-6
          text-lg
          font-semibold
          leading-8
          md:text-xl
        "
      >
        Graphiste designer & Développeur Web
      </p>

      <div
        className="
          mt-6
          max-w-2xl
          space-y-5
          text-sm
          leading-8
          text-[var(--text-secondary)]
          md:text-base
        "
      >
        <p>
          Je conçois des identités visuelles, des interfaces et des
          expériences digitales avec une approche centrée sur
          l'esthétique, la simplicité et l'efficacité.
        </p>

        <p>
          Mon objectif est de transformer une idée en une expérience
          claire, moderne et mémorable, du premier pixel jusqu'à la
          mise en ligne.
        </p>
      </div>

      {/* Signature */}
      <div className="mt-10 flex items-center gap-4">
        <span className="h-px w-12 bg-[var(--accent)]" />

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[var(--text-secondary)]
          "
        >
          Design · Web · Créativité
        </span>
      </div>

    </div>
  </div>
</section>
  );
}

export default About;