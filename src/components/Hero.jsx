import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const orbRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ==================================================
         INTRODUCTION
         ================================================== */

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-kicker", {
          y: 25,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-title-line",
          {
            y: 75,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.45"
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            y: 10,
            duration: 0.8,
          },
          "-=0.3"
        );

      /* ==================================================
         HALO FLOTTANT
         ================================================== */

      gsap.to(".hero-orb", {
        y: -25,
        x: 15,
        scale: 1.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==================================================
         INDICATEUR DE SCROLL
         ================================================== */

      gsap.to(".hero-scroll-line", {
        scaleY: 0.35,
        transformOrigin: "top center",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==================================================
         PETITE PULSATION DU BOUTON PRINCIPAL
         ================================================== */

      gsap.to(".hero-primary-button", {
        boxShadow:
          "0 0 0 rgba(30, 136, 229, 0)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==================================================
         SORTIE AU SCROLL
         ================================================== */

      gsap.to(".hero-content", {
        y: -80,
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero-orb", {
        y: -120,
        scale: 1.2,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    /* ====================================================
       INTERACTION SOURIS
       ==================================================== */

    const handleMouseMove = (event) => {
      const hero = heroRef.current;
      const orb = orbRef.current;

      if (!hero || !orb) return;

      const rect = hero.getBoundingClientRect();

      const mouseX =
        (event.clientX - rect.left) / rect.width - 0.5;

      const mouseY =
        (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(".hero-content", {
        x: mouseX * 8,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(".hero-orb", {
        x: mouseX * -25,
        y: mouseY * -18,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(".hero-content", {
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".hero-orb", {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    };

    const hero = heroRef.current;

    hero.addEventListener(
      "mousemove",
      handleMouseMove
    );

    hero.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      hero.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        px-6
        pb-20
        pt-0
        md:px-10
        md:pb-24
        md:pt-32
      "
    >
      {/* ==================================================
          HALO
          ================================================== */}

      <div
        ref={orbRef}
        className="
          hero-orb
          pointer-events-none
          absolute
          left-[55%]
          top-[40%]
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--accent)]/10
          blur-[110px]
          md:h-[520px]
          md:w-[520px]
        "
      />

      {/* ==================================================
          CONTENU
          ================================================== */}

      <div className="relative mx-auto w-full max-w-7xl">

        <div className="hero-content max-w-5xl">

          {/* ==================================================
              KICKER
              ================================================== */}

          <p
            className="
              hero-kicker
              mb-6
              text-sm
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[var(--accent)]
            "
          >
            Graphiste Designer · Développeur Web
          </p>

          {/* ==================================================
              TITRE
              ================================================== */}

          <h1
            className="
              overflow-hidden
              text-5xl
              font-extrabold
              leading-[0.95]
              tracking-[-0.04em]
              sm:text-6xl
              md:text-8xl
              lg:text-[7.5rem]
            "
          >
            <span className="hero-title-line block">
              Je donne
            </span>

            <span
              className="
                hero-title-line
                block
                text-[var(--accent)]
              "
            >
              vie
            </span>

            <span className="hero-title-line block">
              à vos idées.
            </span>
          </h1>

          {/* ==================================================
              DESCRIPTION
              ================================================== */}

          <div className="hero-description mt-10 max-w-2xl">
            <p
              className="
                text-base
                leading-8
                text-[var(--text-secondary)]
                md:text-lg
              "
            >
              Je transforme des idées en identités visuelles,
              interfaces élégantes et expériences web pensées
              pour être vues, comprises et retenues.
            </p>
          </div>

          {/* ==================================================
              ACTIONS
              ================================================== */}

          <div
            className="
              hero-actions
              mt-10
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            {/* CTA principal */}

            <a
              href="#projects"
              className="
                hero-primary-button
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[var(--accent)]
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              Voir mes réalisations

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </a>

            {/* CTA secondaire */}

            <a
              href="#about"
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[var(--border)]
                px-6
                py-4
                text-sm
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--accent)]
                hover:text-[var(--accent)]
              "
            >
              À propos de moi
            </a>
          </div>
        </div>

        {/* ==================================================
            INDICATEUR DE SCROLL
            ================================================== */}

        <div
          className="
            hero-scroll
            mt-20
            flex
            items-center
            gap-4
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[var(--text-secondary)]
          "
        >
          <span
            className="
              hero-scroll-line
              block
              h-10
              w-px
              bg-[var(--accent)]
            "
          />

          <span>
            Défiler pour découvrir mes projets
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;