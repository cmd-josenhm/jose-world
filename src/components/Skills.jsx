import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skills from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-heading",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".skill-item",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-list",
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Titre */}
        <div className="skills-heading mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Expertise
          </p>

          <h2 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Mes compétences
          </h2>
        </div>

        {/* Compétences */}
        <div className="skills-list divide-y divide-[var(--border)]">
          {skills.map((skill, index) => (
            <article
              key={skill.title}
              className="
                skill-item
                group
                grid
                gap-6
                py-8
                md:grid-cols-[120px_1fr]
                md:items-center
                lg:grid-cols-[160px_1fr]
              "
            >
              {/* Numéro */}
              <span
                className="
                  text-xs
                  font-semibold
                  tracking-[0.2em]
                  text-[var(--text-secondary)]
                  transition-colors
                  duration-300
                  group-hover:text-[var(--accent)]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Contenu */}
              <div>
                <h3
                  className="
                    text-2xl
                    font-extrabold
                    tracking-tight
                    transition-transform
                    duration-300
                    group-hover:translate-x-2
                    md:text-3xl
                  "
                >
                  {skill.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="
                        text-sm
                        text-[var(--text-secondary)]
                        transition-colors
                        duration-300
                        hover:text-[var(--accent)]
                      "
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;