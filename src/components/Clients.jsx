import { useEffect, useRef } from "react";
import gsap from "gsap";

import clients from "../data/clients";

function Clients() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || clients.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      /* ==================================================
         INTRODUCTION DE LA SECTION
         ================================================== */

      gsap.from(".clients-kicker", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".clients-title", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".clients-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
          once: true,
        },
      });

      /* ==================================================
         CARROUSEL
         ================================================== */

      const distance = track.scrollWidth / 2;

      animationRef.current = gsap.to(track, {
        x: -distance,
        duration: Math.max(
          clients.length * 4,
          22
        ),
        repeat: -1,
        ease: "none",
      });

      /* ==================================================
         APPARITION DES NOMS
         ================================================== */

      gsap.from(".client-item", {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          once: true,
        },
      });
    }, sectionRef);

    /* ====================================================
       PAUSE AU SURVOL
       ==================================================== */

    const handleEnter = () => {
      if (animationRef.current) {
        animationRef.current.timeScale(0.18);
      }
    };

    const handleLeave = () => {
      if (animationRef.current) {
        animationRef.current.timeScale(1);
      }
    };

    section.addEventListener(
      "mouseenter",
      handleEnter
    );

    section.addEventListener(
      "mouseleave",
      handleLeave
    );

    return () => {
      section.removeEventListener(
        "mouseenter",
        handleEnter
      );

      section.removeEventListener(
        "mouseleave",
        handleLeave
      );

      animationRef.current?.kill();

      ctx.revert();
    };
  }, []);

  /* ========================================================
     INTERACTION CLIENTS
     ======================================================== */

  const handleClientEnter = (event) => {
    const item = event.currentTarget;

    gsap.to(item, {
      y: -5,
      scale: 1.05,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });

    const dot = item.querySelector(
      ".client-item-dot"
    );

    if (dot) {
      gsap.to(dot, {
        scale: 1.7,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const handleClientLeave = (event) => {
    const item = event.currentTarget;

    gsap.to(item, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });

    const dot = item.querySelector(
      ".client-item-dot"
    );

    if (dot) {
      gsap.to(dot, {
        scale: 1,
        opacity: 0.75,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  /*
    On duplique la liste pour créer une boucle
    visuellement continue.
  */
  const duplicatedClients = [
    ...clients,
    ...clients,
  ];

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="
        relative
        overflow-hidden
        px-6
        py-24
        md:px-10
        md:py-28
        lg:px-16
      "
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* ==================================================
            EN-TÊTE
            ================================================== */}

        <div className="text-center">

          <p
            className="
              clients-kicker
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[var(--accent)]
              md:text-xs
            "
          >
            Ils me font confiance
          </p>

          <h2
            className="
              clients-title
              mt-4
              text-3xl
              font-extrabold
              tracking-tight
              sm:text-4xl
              md:text-6xl
            "
          >
            Des collaborations
            <span className="text-[var(--accent)]">
              {" "}qui comptent.
            </span>
          </h2>

          <p
            className="
              clients-subtitle
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-[var(--text-secondary)]
            "
          >
            Des entreprises et projets qui m'ont
            accordé leur confiance pour donner vie
            à leurs idées.
          </p>
        </div>

        {/* ==================================================
            CARROUSEL
            ================================================== */}

        <div
          className="
            relative
            mt-16
            overflow-hidden
          "
        >
          {/* Masque gauche */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              z-10
              h-full
              w-20
              bg-gradient-to-r
              from-[var(--bg-primary)]
              to-transparent
              md:w-32
            "
          />

          {/* Masque droit */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-10
              h-full
              w-20
              bg-gradient-to-l
              from-[var(--bg-primary)]
              to-transparent
              md:w-32
            "
          />

          {/* Ligne */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-1/2
              h-px
              -translate-y-1/2
              bg-[var(--border)]
            "
          />

          <div
            ref={trackRef}
            className="
              flex
              w-max
              items-center
              gap-12
              py-10
              will-change-transform
              md:gap-20
            "
          >
            {duplicatedClients.map(
              (client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="
                    client-item
                    group
                    relative
                    flex
                    min-w-[150px]
                    cursor-default
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--bg-secondary)]
                    px-5
                    py-4
                    transition-colors
                    duration-300
                    hover:border-[#1E88E5]/45
                    md:min-w-[190px]
                    md:px-6
                    md:py-5
                  "
                  onMouseEnter={
                    handleClientEnter
                  }
                  onMouseLeave={
                    handleClientLeave
                  }
                >
                  {/* Point */}

                  <span
                    className="
                      client-item-dot
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      bg-[var(--accent)]
                      opacity-75
                      shadow-[0_0_10px_rgba(30,136,229,0.65)]
                    "
                  />

                  {/* Nom */}

                  <span
                    className="
                      whitespace-nowrap
                      text-xs
                      font-bold
                      tracking-tight
                      text-[var(--text-primary)]
                      transition-colors
                      duration-300
                      group-hover:text-[var(--accent)]
                      md:text-sm
                    "
                  >
                    {client.name}
                  </span>

                  {/* Numéro */}

                  <span
                    className="
                      ml-auto
                      text-[8px]
                      font-semibold
                      tracking-[0.12em]
                      text-[var(--text-secondary)]
                    "
                  >
                    {String(
                      (index %
                        clients.length) +
                        1
                    ).padStart(2, "0")}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* ==================================================
            BAS DE SECTION
            ================================================== */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-3
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
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

          Collaborations

          <span
            className="
              h-px
              w-8
              bg-[var(--border)]
            "
          />
        </div>
      </div>
    </section>
  );
}

export default Clients;