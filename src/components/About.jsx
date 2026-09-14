import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const secondaryImageRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const secondaryImage = secondaryImageRef.current;

    if (!section || !image || !secondaryImage) return;

    const ctx = gsap.context(() => {
      /* ==================================================
         APPARITION PRINCIPALE
         ================================================== */

      gsap.fromTo(
        ".about-image",
        {
          x: -60,
          opacity: 0,
          scale: 0.96,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* ==================================================
         PHOTO SECONDAIRE
         ================================================== */

      gsap.fromTo(
        ".about-secondary-photo",
        {
          x: 35,
          y: 25,
          opacity: 0,
          scale: 0.88,
          rotate: 8,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: -5,
          duration: 1,
          delay: 0.25,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 72%",
            once: true,
          },
        }
      );

      /* ==================================================
         CONTENU
         ================================================== */

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
            once: true,
          },
        }
      );

      /* ==================================================
         PARAGRAPHES
         ================================================== */

      gsap.fromTo(
        ".about-content-paragraph",
        {
          y: 22,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 75%",
            once: true,
          },
        }
      );

      /* ==================================================
         SIGNATURE
         ================================================== */

      gsap.fromTo(
        ".about-signature",
        {
          x: -15,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-signature",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* ==================================================
         PARALLAX PRINCIPAL
         ================================================== */

      gsap.to(image, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* ==================================================
         PARALLAX SECONDAIRE
         ================================================== */

      gsap.to(secondaryImage, {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* ==================================================
         FLOTTEMENT ÉLÉMENT GRAPHIQUE
         ================================================== */

      gsap.to(".about-accent-circle", {
        y: -9,
        x: 5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==================================================
         FLOTTEMENT DE LA PHOTO SECONDAIRE
         ================================================== */

      gsap.to(".about-secondary-photo", {
        rotate: -3,
        y: -5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==================================================
         ANIMATION LUMIÈRE PHOTO PRINCIPALE
         ================================================== */

      gsap.to(".about-photo-light", {
        xPercent: 180,
        duration: 4.5,
        repeat: -1,
        repeatDelay: 2,
        ease: "power1.inOut",
      });

      /* ==================================================
         ANIMATION LUMIÈRE PHOTO SECONDAIRE
         ================================================== */

      gsap.to(".about-secondary-light", {
        xPercent: 180,
        duration: 3.8,
        repeat: -1,
        repeatDelay: 2.5,
        ease: "power1.inOut",
      });

      /* ==================================================
         PULSE POINT BLEU
         ================================================== */

      gsap.to(".about-blue-dot", {
        scale: 1.5,
        opacity: 0.55,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    /* ====================================================
       INTERACTION SOURIS
       ==================================================== */

    const handleMouseMove = (event) => {
      const sectionRect =
        section.getBoundingClientRect();

      const x =
        (event.clientX - sectionRect.left) /
          sectionRect.width -
        0.5;

      const y =
        (event.clientY - sectionRect.top) /
          sectionRect.height -
        0.5;

      /* Portrait principal */

      gsap.to(image, {
        x: x * 7,
        rotateY: x * 2.5,
        rotateX: y * -2,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });

      /* Portrait secondaire */

      gsap.to(secondaryImage, {
        x: x * -12,
        rotateY: x * -3,
        rotateX: y * 2,
        duration: 0.9,
        ease: "power3.out",
        overwrite: true,
      });

      /* Halo */

      gsap.to(".about-halo", {
        x: x * -15,
        y: y * -10,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });

      /* Cercle décoratif */

      gsap.to(".about-accent-circle", {
        x: 5 + x * 10,
        y: -9 + y * -8,
        duration: 0.9,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        x: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(secondaryImage, {
        x: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".about-halo", {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    section.addEventListener(
      "mousemove",
      handleMouseMove
    );

    section.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      section.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      section.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        about-section
        relative
        overflow-hidden
        px-6
        py-24
        md:px-10
        md:py-32
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-12
          md:grid-cols-2
          md:items-center
          md:gap-20
        "
      >
        {/* ==================================================
            PORTRAITS
            ================================================== */}

        <div
          ref={imageRef}
          className="
            about-image
            relative
            [transform-style:preserve-3d]
          "
        >
          <div className="relative mx-auto max-w-md">

            {/* ==================================================
                HALO BLEU
                ================================================== */}

            <div
              className="
                about-halo
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

            {/* ==================================================
                CADRE PRINCIPAL
                ================================================== */}

            <div
              className="
                about-image-frame
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-[var(--border)]
                bg-[var(--bg-secondary)]
                shadow-[0_30px_80px_rgba(0,0,0,0.18)]
              "
            >
              {/* PHOTO NATURELLE */}

              <img
                src="/images/profil.png"
                alt="Portrait de José Nahounmé"
                loading="lazy"
                className="
                  aspect-[4/5]
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* ==================================================
                  LUMIÈRE BLEUE ANIMÉE
                  ================================================== */}

              <div
                className="
                  about-photo-light
                  pointer-events-none
                  absolute
                  -left-[35%]
                  top-0
                  h-full
                  w-[28%]
                  -skew-x-[18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-[#1E88E5]/25
                  to-transparent
                  blur-[6px]
                "
              />

              {/* ==================================================
                  VOILE SUBTIL
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#111111]/35
                  via-transparent
                  to-[#1E88E5]/5
                  opacity-70
                  transition-opacity
                  duration-700
                  group-hover:opacity-40
                "
              />

              {/* ==================================================
                  HALO HOVER
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-0
                  transition-opacity
                  duration-700
                  group-hover:opacity-100
                  bg-[radial-gradient(circle_at_50%_20%,rgba(30,136,229,0.15),transparent_48%)]
                "
              />

              {/* ==================================================
                  REFLET
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-[80%]
                  w-[42%]
                  skew-x-[-18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent
                  transition-all
                  duration-1000
                  group-hover:left-[130%]
                "
              />

              {/* ==================================================
                  TEXTE PHOTO
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-6
                  left-6
                  right-6
                "
              >
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#1E88E5]
                  "
                >
                  Jose World
                </p>

                <p
                  className="
                    mt-2
                    text-xl
                    font-extrabold
                    tracking-tight
                    text-white
                  "
                >
                  José Nahounmè
                </p>
              </div>
            </div>

            {/* ==================================================
                PHOTO SECONDAIRE
                ================================================== */}

            <div
              ref={secondaryImageRef}
              className="
                about-secondary-photo
                group
                absolute
                -bottom-5
                -right-7
                z-20
                w-[145px]
                rotate-[-5deg]
                overflow-hidden
                rounded-[1.2rem]
                border
                border-white/15
                bg-[#111111]
                p-2
                shadow-[0_25px_55px_rgba(0,0,0,0.35)]
                [transform-style:preserve-3d]
                md:-right-10
                md:w-[170px]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[0.8rem]
                "
              >
                <img
                  src="/projects/mon-portfolio/profile.jpeg"
                  alt="José Nahounmé"
                  loading="lazy"
                  className="
                    aspect-[4/3]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* Lumière animée */}

                <div
                  className="
                    about-secondary-light
                    pointer-events-none
                    absolute
                    -left-[45%]
                    top-0
                    h-full
                    w-[35%]
                    -skew-x-[18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-[#1E88E5]/30
                    to-transparent
                    blur-[4px]
                  "
                />

                {/* Voile */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                  "
                />

                {/* Texte */}

                <div
                  className="
                    absolute
                    bottom-2
                    left-2
                    right-2
                  "
                >
                  <p
                    className="
                      text-[7px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#1E88E5]
                    "
                  >
                    Profil
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    Créateur digital
                  </p>
                </div>
              </div>

              {/* Point */}

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-3
                  w-3
                  rounded-full
                  bg-[#1E88E5]
                  shadow-[0_0_14px_rgba(30,136,229,0.8)]
                "
              />
            </div>

            {/* ==================================================
                CERCLE DÉCORATIF
                ================================================== */}

            <div
              className="
                about-accent-circle
                pointer-events-none
                absolute
                -bottom-3
                -right-3
                h-20
                w-20
                rounded-full
                border
                border-[var(--accent)]/40
                bg-[var(--accent)]/5
                backdrop-blur-sm
              "
            />

            {/* Point lumineux */}

            <div
              className="
                about-blue-dot
                pointer-events-none
                absolute
                bottom-5
                right-12
                h-2
                w-2
                rounded-full
                bg-[var(--accent)]
                shadow-[0_0_14px_rgba(30,136,229,0.9)]
              "
            />
          </div>
        </div>

        {/* ==================================================
            CONTENU
            ================================================== */}

        <div className="about-content">

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
            <p className="about-content-paragraph">
              Je conçois des identités visuelles, des interfaces et des
              expériences digitales avec une approche centrée sur
              l'esthétique, la simplicité et l'efficacité.
            </p>

            <p className="about-content-paragraph">
              Mon objectif est de transformer une idée en une expérience
              claire, moderne et mémorable, du premier pixel jusqu'à la
              mise en ligne.
            </p>
          </div>

          {/* ==================================================
              SIGNATURE
              ================================================== */}

          <div
            className="
              about-signature
              mt-10
              flex
              items-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-12
                bg-[var(--accent)]
              "
            />

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