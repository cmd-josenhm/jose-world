import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

function Projects({ onProjectSelect }) {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const sectionRef = useRef(null);

  const displayedProjects = projects.slice(0, visibleProjects);

  const showMore = () => {
    setVisibleProjects((current) => current + 4);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".projects-heading",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleProjects]);

  const handleMouseMove = (event) => {
    const card = event.currentTarget;
    const image = card.querySelector(".project-image");
    const info = card.querySelector(".project-info");

    if (!image) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = ((y / rect.height) - 0.5) * -5;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(image, {
      x: ((x / rect.width) - 0.5) * 10,
      y: ((y / rect.height) - 0.5) * 10,
      scale: 1.06,
      duration: 0.45,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(info, {
      y: -4,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = (event) => {
    const card = event.currentTarget;
    const image = card.querySelector(".project-image");
    const info = card.querySelector(".project-info");

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(image, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(info, {
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        <div className="projects-heading mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              Portfolio
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Mes réalisations
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[var(--text-secondary)] md:text-right">
            Visiez mes projets récents.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {displayedProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onProjectSelect(project)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onProjectSelect(project);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Voir le projet ${project.name}`}
              className="
                project-card
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-xl
                will-change-transform
              "
            >
              <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-secondary)]">
                <img
                  src={project.cover}
                  alt={project.name}
                  loading="lazy"
                  className="
                    project-image
                    h-full
                    w-full
                    object-cover
                    will-change-transform
                  "
                />
              </div>

              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-transparent
                "
              />

              <div
                className="
                  project-info
                  pointer-events-none
                  absolute inset-x-0 bottom-0
                  flex items-end justify-between
                  gap-3 p-4
                  transition-opacity duration-300
                "
              >
                <h3
                  className="
                    text-sm font-extrabold uppercase
                    tracking-wide text-white
                    drop-shadow-lg md:text-base
                  "
                >
                  {project.name}
                </h3>

                <span
                  className="
                    flex h-8 w-8 shrink-0
                    translate-x-2 items-center justify-center
                    rounded-full
                    border border-white/20
                    bg-black/20
                    text-xs text-white
                    opacity-0
                    backdrop-blur-md
                    transition-all duration-300
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                >
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        {visibleProjects < projects.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={showMore}
              className="
                rounded-full
                border border-[var(--border)]
                px-7 py-3
                text-sm font-semibold
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[var(--accent)]
                hover:bg-[var(--accent)]
                hover:text-white
              "
            >
              Voir plus
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;