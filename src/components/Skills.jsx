import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import skills from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const sectionRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);

  /* ========================================================
     APPARITION
     ======================================================== */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .from(".skills-kicker", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".skills-title",
          {
            y: 45,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".skill-card",
          {
            y: 60,
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  /* ========================================================
     OUVERTURE D'UN BLOC
     ======================================================== */

  const handleEnter = (event, index) => {
    const card = event.currentTarget;

    setActiveSkill(index);

    gsap.to(card, {
      y: -8,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(
      card.querySelector(".skill-number"),
      {
        scale: 1.1,
        color: "#1E88E5",
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      }
    );

    gsap.to(
      card.querySelector(".skill-arrow"),
      {
        x: 5,
        y: -5,
        rotate: 8,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      }
    );

    gsap.to(
      card.querySelector(".skill-line"),
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      }
    );

    gsap.to(
      card.querySelectorAll(".skill-tool"),
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.035,
        ease: "power2.out",
        overwrite: true,
      }
    );
  };

  const handleLeave = (event) => {
    const card = event.currentTarget;

    gsap.to(card, {
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(
      card.querySelector(".skill-number"),
      {
        scale: 1,
        color: "",
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      }
    );

    gsap.to(
      card.querySelector(".skill-arrow"),
      {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      }
    );

    gsap.to(
      card.querySelector(".skill-line"),
      {
        scaleX: 0,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
      }
    );

    gsap.to(
      card.querySelectorAll(".skill-tool"),
      {
        y: 4,
        opacity: 0.72,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
        overwrite: true,
      }
    );
  };

  /* ========================================================
     RENDER
     ======================================================== */

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="
        relative
        overflow-hidden
        px-6
        py-24
        md:px-10
        md:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            TITRE
            ================================================== */}

        <div className="mb-14 max-w-4xl">

          <p
            className="
              skills-kicker
              mb-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[var(--accent)]
            "
          >
            Expertise
          </p>

          <h2
            className="
              skills-title
              text-4xl
              font-extrabold
              tracking-tight
              md:text-6xl
            "
          >
            Mes compétences
          </h2>

        </div>

        {/* ==================================================
            BLOCS
            ================================================== */}

        <div className="grid gap-5 lg:grid-cols-3">

          {skills.map((skill, index) => {
            const isActive =
              activeSkill === index;

            return (
              <article
                key={skill.title}
                className="
                  skill-card
                  group
                  relative
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-[var(--border)]
                  bg-[var(--bg-secondary)]
                  p-6
                  transition-colors
                  duration-500
                  hover:border-[#1E88E5]/40
                  md:p-8
                "
                onMouseEnter={(event) =>
                  handleEnter(event, index)
                }
                onMouseLeave={handleLeave}
              >

                {/* ==================================================
                    GLOW
                    ================================================== */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    bg-[#1E88E5]/0
                    blur-3xl
                    transition-all
                    duration-700
                    ${
                      isActive
                        ? "bg-[#1E88E5]/10"
                        : ""
                    }
                  `}
                />

                {/* ==================================================
                    HAUT
                    ================================================== */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      skill-number
                      text-xs
                      font-semibold
                      tracking-[0.2em]
                      text-[var(--text-secondary)]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      skill-arrow
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--border)]
                      text-sm
                      text-[var(--text-secondary)]
                      transition-colors
                      duration-300
                      group-hover:border-[#1E88E5]/50
                      group-hover:text-[#1E88E5]
                    "
                  >
                    ↗
                  </span>

                </div>

                {/* ==================================================
                    TITRE
                    ================================================== */}

                <h3
                  className="
                    relative
                    z-10
                    mt-10
                    max-w-xs
                    text-2xl
                    font-extrabold
                    leading-tight
                    tracking-tight
                    transition-colors
                    duration-300
                    group-hover:text-[var(--accent)]
                    md:text-3xl
                  "
                >
                  {skill.title}
                </h3>

                {/* ==================================================
                    OUTILS
                    ================================================== */}

                <div
                  className="
                    relative
                    z-10
                    mt-8
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {skill.tools.map(
                    (tool) => (
                      <span
                        key={tool}
                        className="
                          skill-tool
                          translate-y-1
                          rounded-full
                          border
                          border-[var(--border)]
                          bg-[var(--bg-primary)]/40
                          px-3
                          py-1.5
                          text-[10px]
                          font-semibold
                          text-[var(--text-secondary)]
                          opacity-70
                          transition-colors
                          duration-300
                          hover:border-[#1E88E5]/50
                          hover:text-[#1E88E5]
                        "
                      >
                        {tool}
                      </span>
                    )
                  )}
                </div>

                {/* ==================================================
                    LIGNE ACTIVE
                    ================================================== */}

                <div
                  className="
                    relative
                    z-10
                    mt-8
                    h-px
                    w-full
                    overflow-hidden
                    bg-[var(--border)]
                  "
                >
                  <span
                    className="
                      skill-line
                      absolute
                      inset-y-0
                      left-0
                      w-full
                      origin-left
                      scale-x-0
                      bg-[var(--accent)]
                      shadow-[0_0_15px_rgba(30,136,229,0.55)]
                    "
                  />
                </div>

              </article>
            );
          })}

        </div>

        {/* ==================================================
            INDICATION
            ================================================== */}

        <div
          className="
            mt-10
            flex
            items-center
            gap-3
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[var(--text-secondary)]
          "
        >
          <span
            className="
              h-px
              w-8
              bg-[var(--accent)]
            "
          />

          Expertise & technologies

          <span
            className="
              h-px
              flex-1
              bg-[var(--border)]
            "
          />
        </div>

      </div>
    </section>
  );
}

export default Skills;