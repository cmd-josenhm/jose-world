import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clients from "../data/clients";

gsap.registerPlugin(ScrollTrigger);

function Clients() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".clients-heading",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".clients-section",
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const duplicatedClients = [...clients, ...clients];

  return (
    <section
      id="clients"
      className="
        clients-section
        overflow-hidden
        border-y
        border-[var(--border)]
        py-12
        md:py-14
      "
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Titre */}
        <div className="clients-heading mb-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--text-secondary)] md:text-xs">
            Ils nous font confiance
          </p>
        </div>

      </div>

      {/* Zone du carrousel */}
      <div className="relative overflow-hidden">

        {/* Dégradés sur les bords */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent md:w-28" />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent md:w-28" />

        {/* Piste */}
        <div
          className="
            clients-track
            flex
            w-max
            items-center
            gap-10
            md:gap-16
          "
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="
                group
                flex
                h-8
                min-w-[90px]
                items-center
                justify-center
                opacity-45
                transition-all
                duration-500
                hover:opacity-100
              "
            >
              <span
                className="
                  whitespace-nowrap
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]
                  transition-colors
                  duration-300
                  group-hover:text-[var(--accent)]
                  md:text-xs
                "
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .clients-track {
          animation: clientsInfiniteScroll 28s linear infinite;
          will-change: transform;
        }

        .clients-section:hover .clients-track {
          animation-play-state: paused;
        }

        @keyframes clientsInfiniteScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .clients-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Clients;