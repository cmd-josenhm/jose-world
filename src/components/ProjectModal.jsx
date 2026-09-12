import { useEffect, useState } from "react";
import { X, ExternalLink, Play } from "lucide-react";

function ProjectModal({ project, onClose }) {
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientY);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const touchEnd = event.changedTouches[0].clientY;
    const distance = touchEnd - touchStart;

    if (distance > 100) {
      onClose();
    }

    setTouchStart(null);
  };

  const images = project.images || [];
  const videos = project.videos || [];
  const tools = project.tools || [];

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-end justify-center
        bg-black/80
        backdrop-blur-md
        md:items-center
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="
          relative
          max-h-[94vh]
          w-full
          overflow-y-auto
          rounded-t-[2rem]
          bg-[var(--bg-primary)]
          text-[var(--text-primary)]
          shadow-2xl
          animate-[projectOpen_0.5s_ease-out]

          md:max-h-[90vh]
          md:max-w-6xl
          md:rounded-[2rem]
        "
      >
        {/* Indicateur mobile */}
        <div className="sticky top-0 z-20 flex justify-center pt-3 md:hidden">
          <div className="h-1.5 w-12 rounded-full bg-[var(--text-secondary)]/30" />
        </div>

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le projet"
          className="
            sticky top-4 z-30
            ml-auto mr-4
            flex h-11 w-11
            items-center justify-center
            rounded-full
            border border-[var(--border)]
            bg-[var(--bg-secondary)]/80
            backdrop-blur-md
            transition-all duration-300
            hover:scale-105
            hover:border-[var(--accent)]
            hover:text-[var(--accent)]
          "
        >
          <X size={20} />
        </button>

        <article className="px-5 pb-10 md:px-10 md:pb-14">

          {/* Informations principales */}
          <div className="mb-8 max-w-4xl">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {project.category || "Projet"}
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight md:text-7xl">
              {project.name}
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
              {project.description}
            </p>

            {/* Outils / technologies */}
            {tools.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  Outils & technologies
                </p>

                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="
                        rounded-full
                        border border-[var(--border)]
                        bg-[var(--bg-secondary)]
                        px-4 py-2
                        text-xs font-semibold
                        transition-all duration-300
                        hover:border-[var(--accent)]
                        hover:text-[var(--accent)]
                      "
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lien */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-7 inline-flex items-center gap-2
                  rounded-full
                  bg-[var(--accent)]
                  px-5 py-3
                  text-sm font-semibold text-white
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                Voir le projet
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          {/* Image principale */}
          <div className="overflow-hidden rounded-2xl bg-[var(--bg-secondary)]">
            <img
              src={project.cover}
              alt={project.name}
              className="w-full object-cover"
            />
          </div>

          {/* Galerie photos */}
          {images.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-5 text-xl font-extrabold">
                Galerie
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="overflow-hidden rounded-2xl bg-[var(--bg-secondary)]"
                  >
                    <img
                      src={image}
                      alt={`${project.name} — aperçu ${index + 1}`}
                      loading="lazy"
                      className="
                        w-full object-cover
                        transition-transform duration-700
                        hover:scale-[1.02]
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vidéos */}
          {videos.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-5 text-xl font-extrabold">
                Vidéos
              </h3>

              <div className="space-y-5">
                {videos.map((video, index) => (
                  <div
                    key={`${video}-${index}`}
                    className="
                      relative overflow-hidden
                      rounded-2xl
                      bg-[var(--bg-secondary)]
                    "
                  >
                    <video
                      src={video}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full"
                    />

                    <div className="pointer-events-none absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md">
                      <Play size={17} fill="currentColor" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fermeture mobile */}
          <p className="mt-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] md:hidden">
            Balayez vers le bas pour fermer
          </p>

        </article>
      </div>
    </div>
  );
}

export default ProjectModal;