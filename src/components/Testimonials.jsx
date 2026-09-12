import { useLayoutEffect } from "react";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testimonials from "../data/testimonials";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-heading",
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
            trigger: ".testimonials-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".testimonial-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="testimonials-heading mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Témoignages
          </p>

          <h2 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Ce qu'ils pensent de mon travail
          </h2>
        </div>

        {/* Témoignages */}
        <div className="testimonials-grid grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="
                testimonial-card
                group
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--bg-secondary)]
                p-6
                transition-all duration-500
                hover:-translate-y-1
                hover:border-[var(--accent)]
              "
            >
              {/* Étoiles */}
              <div
                className="mb-7 flex items-center gap-1"
                aria-label={`Note : ${testimonial.rating} sur 5`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    strokeWidth={1.8}
                    className={
                      index < testimonial.rating
                        ? "fill-[var(--accent)] text-[var(--accent)]"
                        : "text-[var(--text-secondary)]"
                    }
                  />
                ))}
              </div>

              {/* Message */}
              <blockquote className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                “{testimonial.message}”
              </blockquote>

              {/* Auteur */}
              <div className="mt-8 border-t border-[var(--border)] pt-5">
                <p className="text-sm font-extrabold">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;