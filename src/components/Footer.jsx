import { ArrowUp } from "lucide-react";

function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://web.facebook.com/people/Fr%C3%A9jus-Jos%C3%A9/100093818179725/",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/iam_frejusjose",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jos%C3%A9-nahounme-5a7955280/",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="
        border-t
        border-[var(--border)]
        px-6
        py-16
        md:px-10
        md:py-20
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Grande phrase */}
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Construisons quelque chose de remarquable
          </p>

          <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Une idée ?
            <br />
            <span className="text-[var(--accent)]">
              Parlons-en.
            </span>
          </h2>
        </div>

        {/* Email */}
        <div className="mt-10">
          <a
            href="mailto:josenahounme@gmail.com"
            className="
              text-sm
              font-semibold
              transition-colors
              duration-300
              hover:text-[var(--accent)]
              md:text-base
            "
          >
            josenahounme@gmail.com
          </a>
        </div>

        {/* Partie basse */}
        <div
          className="
            mt-16
            flex
            flex-col
            gap-8
            border-t
            border-[var(--border)]
            pt-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* Logo + copyright */}
          <div>
            <img
              src="/images/logo.png"
              alt="Logo José Nahounmé"
              className="h-8 w-auto object-contain"
            />

            <p className="mt-3 text-xs text-[var(--text-secondary)]">
              © {new Date().getFullYear()} José Nahounmé. Tous droits réservés.
            </p>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="
                  rounded-full
                  border border-[var(--border)]
                  px-4 py-2
                  text-xs
                  font-semibold
                  text-[var(--text-secondary)]
                  transition-all
                  duration-300
                  hover:border-[var(--accent)]
                  hover:text-[var(--accent)]
                  hover:-translate-y-0.5
                "
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Retour en haut */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Retour en haut"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[var(--border)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[var(--accent)]
              hover:text-[var(--accent)]
            "
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;