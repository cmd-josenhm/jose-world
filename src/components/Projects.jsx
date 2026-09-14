import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import projects from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_PROJECTS = 4;
const LOAD_MORE_COUNT = 4;

function Projects({ onProjectSelect }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [visibleProjects, setVisibleProjects] =
    useState(INITIAL_PROJECTS);

  const displayedProjects = projects.slice(
    0,
    visibleProjects
  );

  /* ========================================================
     ANIMATIONS PRINCIPALES
     ======================================================== */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      /* ----------------------------------------------------
         TITRE DE SECTION
         ---------------------------------------------------- */

      gsap.from(".projects-kicker", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".projects-title-line", {
        y: 55,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".projects-description", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      /* ----------------------------------------------------
         CARTES
         ---------------------------------------------------- */

      const cards = grid.querySelectorAll(
        "[data-project-card]"
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            delay: (index % 4) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [displayedProjects.length]);

  /* ========================================================
     INTERACTIONS DES CARTES
     ======================================================== */

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const cards = grid.querySelectorAll(
      "[data-project-card]"
    );

    const cleanups = [];

    cards.forEach((card) => {
      const image = card.querySelector(
        ".project-card-image"
      );

      const inner = card.querySelector(
        ".project-card-inner"
      );

      const arrow = card.querySelector(
        ".project-card-arrow"
      );

      if (!image || !inner) return;

      const handleMove = (event) => {
        const rect =
          card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;

        gsap.to(inner, {
          rotateX: y * -7,
          rotateY: x * 7,
          y: -4,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });

        gsap.to(image, {
          x: x * -10,
          y: y * -10,
          scale: 1.08,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        });

        if (arrow) {
          gsap.to(arrow, {
            x: 4,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        }
      };

      const handleLeave = () => {
        gsap.to(inner, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        });

        gsap.to(image, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        }
      };

      card.addEventListener(
        "mousemove",
        handleMove
      );

      card.addEventListener(
        "mouseleave",
        handleLeave
      );

      cleanups.push(() => {
        card.removeEventListener(
          "mousemove",
          handleMove
        );

        card.removeEventListener(
          "mouseleave",
          handleLeave
        );
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [displayedProjects.length]);

  /* ========================================================
     OUVERTURE PROJET
     ======================================================== */

  const handleProjectClick = (project) => {
    onProjectSelect(project);
  };

  /* ========================================================
     CLAVIER
     ======================================================== */

  const handleCardKeyDown = (
    event,
    project
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleProjectClick(project);
    }
  };

  /* ========================================================
     VOIR PLUS
     ======================================================== */

  const handleLoadMore = () => {
    const previousCount =
      displayedProjects.length;

    setVisibleProjects((current) =>
      Math.min(
        current + LOAD_MORE_COUNT,
        projects.length
      )
    );

    requestAnimationFrame(() => {
      const newCards =
        gridRef.current?.querySelectorAll(
          "[data-project-card]"
        );

      if (!newCards) return;

      const cardsArray =
        Array.from(newCards);

      cardsArray
        .slice(previousCount)
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.08,
              ease: "power3.out",
            }
          );
        });
    });
  };

  const hasMore =
    visibleProjects < projects.length;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative
        overflow-hidden
        px-6
        py-24
        md:px-10
        md:py-32
        lg:px-16
      "
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* ==================================================
            EN-TÊTE
            ================================================== */}

        <div
          className="
            mb-14
            max-w-4xl
            md:mb-20
          "
        >
          <p
            className="
              projects-kicker
              mb-5
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[var(--accent)]
              md:text-sm
            "
          >
            Mes réalisations
          </p>

          <h2
            className="
              overflow-hidden
              text-4xl
              font-extrabold
              leading-[0.95]
              tracking-[-0.04em]
              sm:text-5xl
              md:text-7xl
            "
          >
            <span className="projects-title-line block">
              Des projets
            </span>

            <span className="projects-title-line block">
              qui donnent
              <span className="text-[var(--accent)]">
                {" "}vie aux idées.
              </span>
            </span>
          </h2>

          <p
            className="
              projects-description
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-[var(--text-secondary)]
              md:text-base
            "
          >
            Découvrez une sélection de projets
            conçus entre design graphique,
            développement web et expérience
            digitale.
          </p>
        </div>

        {/* ==================================================
            GALERIE
            ================================================== */}

        <div
          ref={gridRef}
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {displayedProjects.map(
            (project, index) => (
              <article
                key={project.id}
                data-project-card
                className="
                  project-card
                  group
                  relative
                  cursor-pointer
                  outline-none
                "
                role="button"
                tabIndex={0}
                aria-label={`Voir le projet ${project.name}`}
                onClick={() =>
                  handleProjectClick(project)
                }
                onKeyDown={(event) =>
                  handleCardKeyDown(
                    event,
                    project
                  )
                }
              >
                <div
                  className="
                    project-card-inner
                    relative
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-[var(--border)]
                    bg-[var(--bg-secondary)]
                    [transform-style:preserve-3d]
                    transition-[border-color,box-shadow]
                    duration-500
                    group-hover:border-[#1E88E5]/40
                    group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.22)]
                  "
                >
                  {/* ======================================
                      IMAGE
                  ======================================= */}

                  <div
                    className="
                      relative
                      aspect-[4/5]
                      overflow-hidden
                    "
                  >
                    <img
                      src={project.cover}
                      alt={project.name}
                      className="
                        project-card-image
                        h-full
                        w-full
                        object-cover
                        will-change-transform
                      "
                      loading={
                        index < 4
                          ? "eager"
                          : "lazy"
                      }
                    />

                    {/* Voile */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/75
                        via-black/5
                        to-transparent
                        opacity-75
                        transition-opacity
                        duration-500
                        group-hover:opacity-90
                      "
                    />

                    {/* Accent */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-1/3
                        bg-gradient-to-t
                        from-[#1E88E5]/10
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Numéro */}

                    <span
                      className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        border
                        border-white/10
                        bg-black/30
                        px-3
                        py-1
                        text-[9px]
                        font-semibold
                        tracking-[0.15em]
                        text-white/80
                        backdrop-blur-md
                      "
                    >
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    {/* Flèche */}

                    <span
                      className="
                        project-card-arrow
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-black/25
                        text-white
                        backdrop-blur-md
                        transition-colors
                        duration-300
                        group-hover:bg-[#1E88E5]
                      "
                    >
                      ↗
                    </span>

                    {/* Texte */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-5
                      "
                    >
                      <p
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-[#1E88E5]
                        "
                      >
                        {project.category}
                      </p>

                      <h3
                        className="
                          mt-2
                          text-lg
                          font-extrabold
                          tracking-tight
                          text-white
                          md:text-xl
                        "
                      >
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* ======================================
                      BARRE BASSE
                  ======================================= */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[var(--border)]
                      px-4
                      py-3
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[var(--text-secondary)]
                      "
                    >
                      Ouvrir le projet
                    </span>

                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[var(--accent)]
                        shadow-[0_0_10px_rgba(30,136,229,0.7)]
                      "
                    />
                  </div>
                </div>
              </article>
            )
          )}
        </div>

        {/* ==================================================
            VOIR PLUS
            ================================================== */}

        {hasMore && (
          <div
            className="
              mt-12
              flex
              justify-center
            "
          >
            <button
              type="button"
              onClick={handleLoadMore}
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--bg-secondary)]
                px-6
                py-3
                text-xs
                font-semibold
                text-[var(--text-primary)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--accent)]
                hover:text-[var(--accent)]
              "
            >
              Voir plus

              <span
                className="
                  text-base
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                "
              >
                ↓
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;