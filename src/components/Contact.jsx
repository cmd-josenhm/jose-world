import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const initialForm = {
  nom: "",
  prenoms: "",
  email: "",
  tel: "",
  ville: "",
  message: "",
};

function Contact() {
  const sectionRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [isFocused, setIsFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* ========================================================
     ANIMATION
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
        .from(".contact-kicker", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".contact-title",
          {
            y: 45,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".contact-intro",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".contact-panel",
          {
            y: 50,
            opacity: 0,
            scale: 0.98,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  /* ========================================================
     FORMULAIRE
     ======================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      "Nouvelle demande depuis Jose World"
    );

    const body = encodeURIComponent(`
Nom : ${form.nom}
Prénoms : ${form.prenoms}
Email : ${form.email}
Téléphone : ${form.tel}
Ville / Pays : ${form.ville}

Message :
${form.message}
    `);

    window.location.href =
      `mailto:josenahounme@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
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
            EN-TÊTE
            ================================================== */}

        <div className="contact-heading max-w-4xl">

          <p
            className="
              contact-kicker
              mb-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[var(--accent)]
            "
          >
            Contact
          </p>

          <h2
            className="
              contact-title
              text-4xl
              font-extrabold
              leading-[0.95]
              tracking-tight
              sm:text-5xl
              md:text-7xl
            "
          >
            Parlons de votre
            <span className="text-[var(--accent)]">
              {" "}projet.
            </span>
          </h2>

          <p
            className="
              contact-intro
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-[var(--text-secondary)]
              md:text-base
            "
          >
            Une idée, un besoin ou un projet à concrétiser ?
            Écrivez-moi et construisons quelque chose
            d'utile, moderne et mémorable.
          </p>
        </div>

        {/* ==================================================
            PANNEAU
            ================================================== */}

        <div
          className="
            contact-panel
            mt-14
            grid
            overflow-hidden
            rounded-[2rem]
            border
            border-[var(--border)]
            bg-[var(--bg-secondary)]
            lg:grid-cols-[0.75fr_1.25fr]
          "
        >

          {/* ==================================================
              INFORMATIONS
              ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              border-b
              border-[var(--border)]
              p-7
              md:p-10
              lg:border-b-0
              lg:border-r
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-[#1E88E5]/10
                blur-[80px]
              "
            />

            <div className="relative z-10">

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[var(--accent)]
                "
              >
                Disponible pour collaborer
              </p>

              <h3
                className="
                  mt-5
                  max-w-sm
                  text-2xl
                  font-extrabold
                  leading-tight
                  tracking-tight
                  md:text-3xl
                "
              >
                Faisons passer votre idée
                à l'étape suivante.
              </h3>

              {/* Email */}

              <a
                href="mailto:josenahounme@gmail.com"
                className="
                  mt-10
                  block
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--bg-primary)]/40
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#1E88E5]/40
                "
              >
                <span
                  className="
                    block
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[var(--text-secondary)]
                  "
                >
                  Email
                </span>

                <span
                  className="
                    mt-2
                    block
                    break-all
                    text-sm
                    font-bold
                  "
                >
                  josenahounme@gmail.com
                </span>
              </a>

              {/* WhatsApp */}

              <a
                href="https://wa.me/2290151370949?text=Bonjour%20José%2C%20je%20souhaite%20parler%20d%27un%20projet."
                target="_blank"
                rel="noreferrer"
                className="
                  mt-3
                  block
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--bg-primary)]/40
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#1E88E5]/40
                "
              >
                <span
                  className="
                    block
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[var(--text-secondary)]
                  "
                >
                  WhatsApp
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-sm
                    font-bold
                  "
                >
                  +229 01 51 37 09 49
                </span>
              </a>

              {/* Localisation */}

              <div
                className="
                  mt-3
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--bg-primary)]/40
                  p-4
                "
              >
                <span
                  className="
                    block
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[var(--text-secondary)]
                  "
                >
                  Localisation
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-sm
                    font-bold
                  "
                >
                  Cotonou, Bénin
                </span>
              </div>
            </div>
          </div>

          {/* ==================================================
              FORMULAIRE
              ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="
              relative
              p-7
              md:p-10
            "
          >
            <div className="grid gap-5 sm:grid-cols-2">

              {/* Nom */}

              <div className="relative">
                <label
                  htmlFor="nom"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--text-secondary)]
                  "
                >
                  Nom *
                </label>

                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  value={form.nom}
                  onChange={handleChange}
                  onFocus={() =>
                    setIsFocused("nom")
                  }
                  onBlur={() =>
                    setIsFocused("")
                  }
                  className={`
                    w-full
                    rounded-xl
                    border
                    bg-[var(--bg-primary)]/40
                    px-4
                    py-3
                    text-sm
                    text-[var(--text-primary)]
                    outline-none
                    transition-all
                    duration-300
                    ${
                      isFocused === "nom"
                        ? "border-[#1E88E5] shadow-[0_0_20px_rgba(30,136,229,0.08)]"
                        : "border-[var(--border)]"
                    }
                  `}
                  placeholder="Votre nom"
                />
              </div>

              {/* Prénoms */}

              <div>
                <label
                  htmlFor="prenoms"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--text-secondary)]
                  "
                >
                  Prénoms *
                </label>

                <input
                  id="prenoms"
                  name="prenoms"
                  type="text"
                  required
                  value={form.prenoms}
                  onChange={handleChange}
                  onFocus={() =>
                    setIsFocused("prenoms")
                  }
                  onBlur={() =>
                    setIsFocused("")
                  }
                  className={`
                    w-full
                    rounded-xl
                    border
                    bg-[var(--bg-primary)]/40
                    px-4
                    py-3
                    text-sm
                    text-[var(--text-primary)]
                    outline-none
                    transition-all
                    duration-300
                    ${
                      isFocused === "prenoms"
                        ? "border-[#1E88E5] shadow-[0_0_20px_rgba(30,136,229,0.08)]"
                        : "border-[var(--border)]"
                    }
                  `}
                  placeholder="Vos prénoms"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--text-secondary)]
                  "
                >
                  Email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() =>
                    setIsFocused("email")
                  }
                  onBlur={() =>
                    setIsFocused("")
                  }
                  className={`
                    w-full
                    rounded-xl
                    border
                    bg-[var(--bg-primary)]/40
                    px-4
                    py-3
                    text-sm
                    text-[var(--text-primary)]
                    outline-none
                    transition-all
                    duration-300
                    ${
                      isFocused === "email"
                        ? "border-[#1E88E5] shadow-[0_0_20px_rgba(30,136,229,0.08)]"
                        : "border-[var(--border)]"
                    }
                  `}
                  placeholder="vous@email.com"
                />
              </div>

              {/* Téléphone */}

              <div>
                <label
                  htmlFor="tel"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--text-secondary)]
                  "
                >
                  Téléphone
                </label>

                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  value={form.tel}
                  onChange={handleChange}
                  onFocus={() =>
                    setIsFocused("tel")
                  }
                  onBlur={() =>
                    setIsFocused("")
                  }
                  className={`
                    w-full
                    rounded-xl
                    border
                    bg-[var(--bg-primary)]/40
                    px-4
                    py-3
                    text-sm
                    text-[var(--text-primary)]
                    outline-none
                    transition-all
                    duration-300
                    ${
                      isFocused === "tel"
                        ? "border-[#1E88E5] shadow-[0_0_20px_rgba(30,136,229,0.08)]"
                        : "border-[var(--border)]"
                    }
                  `}
                  placeholder="+229 ..."
                />
              </div>

              {/* Ville */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="ville"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--text-secondary)]
                  "
                >
                  Ville / Pays
                </label>

                <input
                  id="ville"
                  name="ville"
                  type="text"
                  value={form.ville}
                  onChange={handleChange}
                  onFocus={() =>
                    setIsFocused("ville")
                  }
                  onBlur={() =>
                    setIsFocused("")
                  }
                  className={`
                    w-full
                    rounded-xl
                    border
                    bg-[var(--bg-primary)]/40
                    px-4
                    py-3
                    text-sm
                    text-[var(--text-primary)]
                    outline-none
                    transition-all
                    duration-300
                    ${
                      isFocused === "ville"
                        ? "border-[#1E88E5] shadow-[0_0_20px_rgba(30,136,229,0.08)]"
                        : "border-[var(--border)]"
                    }
                  `}
                  placeholder="Cotonou, Bénin"
                />
              </div>

              {/* Message */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--text-secondary)]
                  "
                >
                  Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() =>
                    setIsFocused("message")
                  }
                  onBlur={() =>
                    setIsFocused("")
                  }
                  className={`
                    w-full
                    resize-none
                    rounded-xl
                    border
                    bg-[var(--bg-primary)]/40
                    px-4
                    py-3
                    text-sm
                    text-[var(--text-primary)]
                    outline-none
                    transition-all
                    duration-300
                    ${
                      isFocused === "message"
                        ? "border-[#1E88E5] shadow-[0_0_20px_rgba(30,136,229,0.08)]"
                        : "border-[var(--border)]"
                    }
                  `}
                  placeholder="Bonjour José..."
                />
              </div>

            </div>

            {/* ==================================================
                BOUTON
                ================================================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
              "
            >
              <p
                className="
                  max-w-xs
                  text-[9px]
                  leading-5
                  text-[var(--text-secondary)]
                "
              >
                Votre message ouvrira votre messagerie
                afin de finaliser l'envoi.
              </p>

              <button
                type="submit"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[var(--accent)]
                  px-6
                  py-3.5
                  text-xs
                  font-bold
                  text-white
                  shadow-[0_12px_35px_rgba(30,136,229,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_18px_45px_rgba(30,136,229,0.28)]
                "
              >
                Envoyer le message

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  ↗
                </span>
              </button>
            </div>

            {/* ==================================================
                RETOUR VISUEL
                ================================================== */}

            {submitted && (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-[#1E88E5]/25
                  bg-[#1E88E5]/5
                  px-4
                  py-3
                  text-[10px]
                  font-semibold
                  text-[var(--accent)]
                "
              >
                Votre messagerie va s'ouvrir pour
                finaliser l'envoi.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;