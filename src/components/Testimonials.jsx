import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import testimonials from "../data/testimonials";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const total = testimonials.length;

  /* ========================================================
     INTRODUCTION
     ======================================================== */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-heading",
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".testimonials-slider",
        {
          y: 55,
          opacity: 0,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  /* ========================================================
     SLIDE
     ======================================================== */

  useEffect(() => {
    if (!sliderRef.current || total === 0) return;

    gsap.to(sliderRef.current, {
      xPercent: -(activeIndex * 100),
      duration: 0.8,
      ease: "power3.inOut",
      overwrite: true,
    });
  }, [activeIndex, total]);

  /* ========================================================
     AUTOPLAY
     ======================================================== */

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current + 1 >= total
          ? 0
          : current + 1
      );
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [total, isPaused]);

  /* ========================================================
     NAVIGATION
     ======================================================== */

  const goTo = (index) => {
    if (index < 0) {
      setActiveIndex(total - 1);
      return;
    }

    if (index >= total) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex(index);
  };

  const goNext = () => {
    goTo(activeIndex + 1);
  };

  const goPrevious = () => {
    goTo(activeIndex - 1);
  };

  /* ========================================================
     CLAVIER
     ======================================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  });

  /* ========================================================
     SWIPE MOBILE
     ======================================================== */

  const handleTouchStart = (event) => {
    setTouchStartX(
      event.touches[0].clientX
    );

    setIsPaused(true);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;

    const endX =
      event.changedTouches[0].clientX;

    const distance =
      endX - touchStartX;

    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    setTouchStartX(null);

    window.setTimeout(() => {
      setIsPaused(false);
    }, 2500);
  };

  /* ========================================================
     SÉCURITÉ
     ======================================================== */

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  /* ========================================================
     RENDER
     ======================================================== */

  return (
    <section
      ref={sectionRef}
      id="testimonials"
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

        <div className="testimonials-heading mb-14">
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
            Témoignages
          </p>

          <h2
            className="
              max-w-4xl
              text-4xl
              font-extrabold
              leading-[0.95]
              tracking-tight
              md:text-6xl
            "
          >
            Ce que mes clients
            <span className="text-[var(--accent)]">
              {" "}disent.
            </span>
          </h2>
        </div>

        {/* ==================================================
            SLIDER
            ================================================== */}

        <div
          className="
            testimonials-slider
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-[var(--border)]
            bg-[var(--bg-secondary)]
          "
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Glow supérieur */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-80
              w-80
              rounded-full
              bg-[#1E88E5]/10
              blur-[90px]
            "
          />

          {/* Glow inférieur */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-80
              w-80
              rounded-full
              bg-[#1E88E5]/5
              blur-[90px]
            "
          />

          {/* Barre décorative */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-8
              top-8
              h-px
              w-14
              bg-[var(--accent)]
              opacity-70
            "
          />

          {/* ==================================================
              TRACK
              ================================================== */}

          <div
            ref={sliderRef}
            className="
              flex
              w-full
            "
          >
            {testimonials.map(
              (testimonial, index) => {

                const rating = Math.max(
                  0,
                  Math.min(
                    5,
                    Number(
                      testimonial.rating || 0
                    )
                  )
                );

                const isActive =
                  index === activeIndex;

                return (
                  <article
                    key={
                      testimonial.id ??
                      `${testimonial.name}-${index}`
                    }
                    className="
                      relative
                      w-full
                      shrink-0
                      px-6
                      py-10
                      sm:px-10
                      sm:py-14
                      md:px-16
                      md:py-16
                    "
                  >
                    <div
                      className="
                        grid
                        gap-10
                        lg:grid-cols-[1fr_auto]
                        lg:items-end
                      "
                    >
                      {/* ==================================================
                          CONTENU
                          ================================================== */}

                      <div>

                        {/* Rating */}

                        <div
                          className="
                            mb-8
                            flex
                            items-center
                            gap-1
                          "
                          aria-label={`${rating} sur 5 étoiles`}
                        >
                          {Array.from({
                            length: 5,
                          }).map(
                            (_, starIndex) => (
                              <span
                                key={
                                  starIndex
                                }
                                className={`
                                  text-lg
                                  transition-all
                                  duration-300
                                  ${
                                    starIndex <
                                    rating
                                      ? "text-[#1E88E5]"
                                      : "text-[var(--border)]"
                                  }
                                `}
                              >
                                ★
                              </span>
                            )
                          )}
                        </div>

                        {/* Message */}

                        <blockquote
                          className="
                            max-w-4xl
                            text-2xl
                            font-extrabold
                            leading-tight
                            tracking-tight
                            sm:text-3xl
                            md:text-5xl
                          "
                        >
                          “
                          {testimonial.message}
                          ”
                        </blockquote>

                        {/* Auteur */}

                        <div
                          className="
                            mt-9
                            flex
                            items-center
                            gap-4
                          "
                        >
                          <div
                            className="
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[var(--accent)]
                              text-sm
                              font-extrabold
                              text-white
                              shadow-[0_0_25px_rgba(30,136,229,0.2)]
                            "
                          >
                            {testimonial.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "J"}
                          </div>

                          <div>
                            <p
                              className="
                                text-sm
                                font-bold
                              "
                            >
                              {
                                testimonial.name
                              }
                            </p>

                            <p
                              className="
                                mt-1
                                text-[10px]
                                text-[var(--text-secondary)]
                              "
                            >
                              {
                                testimonial.role
                              }
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* ==================================================
                          INDEX
                          ================================================== */}

                      <div
                        className="
                          hidden
                          text-right
                          lg:block
                        "
                      >
                        <p
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-[var(--text-secondary)]
                          "
                        >
                          Témoignage
                        </p>

                        <div
                          className="
                            mt-2
                            text-7xl
                            font-extrabold
                            leading-none
                            tracking-tight
                            text-[#1E88E5]/15
                          "
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    {/* Ligne basse */}

                    <div
                      className="
                        mt-10
                        h-px
                        w-full
                        bg-[var(--border)]
                      "
                    >
                      <div
                        className={`
                          h-full
                          bg-[var(--accent)]
                          transition-all
                          duration-700
                          ${
                            isActive
                              ? "w-full"
                              : "w-0"
                          }
                        `}
                      />
                    </div>
                  </article>
                );
              }
            )}
          </div>

          {/* ==================================================
              NAVIGATION BASSE
              ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-[var(--border)]
              px-5
              py-4
              sm:px-8
            "
          >
            {/* Pagination */}

            <div className="flex items-center gap-2">
              {testimonials.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      goTo(index)
                    }
                    aria-label={`Afficher le témoignage ${
                      index + 1
                    }`}
                    className="
                      relative
                      h-1.5
                      w-8
                      overflow-hidden
                      rounded-full
                      bg-[var(--border)]
                    "
                  >
                    <span
                      className={`
                        absolute
                        inset-y-0
                        left-0
                        rounded-full
                        bg-[var(--accent)]
                        transition-all
                        duration-500
                        ${
                          activeIndex ===
                          index
                            ? "w-full"
                            : "w-0"
                        }
                      `}
                    />
                  </button>
                )
              )}
            </div>

            {/* Compteur + flèches */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  hidden
                  text-[9px]
                  font-semibold
                  tracking-[0.16em]
                  text-[var(--text-secondary)]
                  sm:inline
                "
              >
                {String(
                  activeIndex + 1
                ).padStart(2, "0")}
                {" / "}
                {String(total).padStart(
                  2,
                  "0"
                )}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Témoignage précédent"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    text-sm
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:bg-[var(--accent)]
                    hover:text-white
                  "
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Témoignage suivant"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    text-sm
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:bg-[var(--accent)]
                    hover:text-white
                  "
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            INDICATION
            ================================================== */}

        <div
          className="
            mt-8
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

          {isPaused
            ? "Pause"
            : "Défilement automatique"}

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

export default Testimonials;