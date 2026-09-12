import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

function Contact() {
  const phoneNumber = "2290151370949";

  const whatsappMessage = encodeURIComponent(
    "Bonjour José, je viens de découvrir votre portfolio et j'aimerais échanger avec vous concernant un projet."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  return (
    <section
      id="contact"
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-[var(--border)]
            bg-[var(--bg-secondary)]
            p-6
            md:p-10
            lg:p-14
          "
        >
          {/* Halo */}
          <div
            className="
              pointer-events-none
              absolute
              right-[-10%]
              top-[-20%]
              h-[350px]
              w-[350px]
              rounded-full
              bg-[var(--accent)]/10
              blur-[100px]
            "
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* =========================
                TEXTE
            ========================== */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                Contact
              </p>

              <h2
                className="
                  max-w-2xl
                  text-4xl
                  font-extrabold
                  tracking-tight
                  md:text-6xl
                "
              >
                Parlons de votre prochain projet.
              </h2>

              <p
                className="
                  mt-6
                  max-w-xl
                  text-sm
                  leading-8
                  text-[var(--text-secondary)]
                  md:text-base
                "
              >
                Une identité visuelle, un site web, une interface ou une
                expérience digitale à concevoir ? Présentez-moi votre idée et
                échangeons.
              </p>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[var(--accent)]
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_15px_40px_rgba(30,136,229,0.25)]
                "
              >
                Discuter sur WhatsApp

                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            </div>

            {/* =========================
                INFORMATIONS
            ========================== */}
            <div className="grid gap-4">

              {/* Email */}
              <a
                href="mailto:josenahounme@gmail.com"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[var(--border)]
                  p-5
                  transition-all
                  duration-300
                  hover:border-[var(--accent)]
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--accent)]/10
                    text-[var(--accent)]
                  "
                >
                  <Mail size={19} />
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    josenahounme@gmail.com
                  </p>
                </div>
              </a>

              {/* Téléphone */}
              <a
                href="tel:+2290151370949"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[var(--border)]
                  p-5
                  transition-all
                  duration-300
                  hover:border-[var(--accent)]
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--accent)]/10
                    text-[var(--accent)]
                  "
                >
                  <Phone size={19} />
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Téléphone
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    +229 01 51 37 09 49
                  </p>
                </div>
              </a>

              {/* Localisation */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[var(--border)]
                  p-5
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--accent)]/10
                    text-[var(--accent)]
                  "
                >
                  <MapPin size={19} />
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Localisation
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    Cotonou, Bénin
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;