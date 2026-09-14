import { useEffect, useMemo, useState } from "react";

function ProjectModal({ project, onClose }) {
  const [activeMedia, setActiveMedia] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isChanging, setIsChanging] = useState(false);

  const [touchStartY, setTouchStartY] = useState(null);

  /* ========================================================
     MÉDIAS
     ======================================================== */

  const media = useMemo(() => {
    if (!project) {
      return [];
    }

    const images = Array.isArray(project.images)
      ? project.images.map((src) => ({
          type: "image",
          src,
        }))
      : [];

    const videos = Array.isArray(project.videos)
      ? project.videos.map((src) => ({
          type: "video",
          src,
        }))
      : [];

    return [
      {
        type: "image",
        src: project.cover,
      },
      ...images,
      ...videos,
    ];
  }, [project]);

  /* ========================================================
     RESET QUAND LE PROJET CHANGE
     ======================================================== */

  useEffect(() => {
    setActiveMedia(0);
    setDirection(1);
  }, [project]);

  /* ========================================================
     BLOQUER LE SCROLL
     ======================================================== */

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  /* ========================================================
     CLAVIER
     ======================================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        goNext();
        return;
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
     CHANGEMENT DE MÉDIA
     ======================================================== */

  const changeMedia = (index, nextDirection) => {
    if (
      index < 0 ||
      index >= media.length ||
      index === activeMedia ||
      isChanging
    ) {
      return;
    }

    setDirection(nextDirection);
    setIsChanging(true);

    window.setTimeout(() => {
      setActiveMedia(index);
      setIsChanging(false);
    }, 180);
  };

  const goNext = () => {
    if (media.length <= 1) return;

    const next =
      activeMedia + 1 >= media.length
        ? 0
        : activeMedia + 1;

    changeMedia(next, 1);
  };

  const goPrevious = () => {
    if (media.length <= 1) return;

    const previous =
      activeMedia - 1 < 0
        ? media.length - 1
        : activeMedia - 1;

    changeMedia(previous, -1);
  };

  /* ========================================================
     CLIC EN DEHORS
     ======================================================== */

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      onClose();
    }
  };

  /* ========================================================
     SWIPE MOBILE
     ======================================================== */

  const handleTouchStart = (event) => {
    setTouchStartY(
      event.touches[0].clientY
    );
  };

  const handleTouchEnd = (event) => {
    if (touchStartY === null) return;

    const endY =
      event.changedTouches[0].clientY;

    const distance =
      endY - touchStartY;

    if (
      Math.abs(distance) > 90
    ) {
      if (distance > 0) {
        onClose();
      } else {
        goNext();
      }
    }

    setTouchStartY(null);
  };

  /* ========================================================
     SÉCURITÉ
     ======================================================== */

  if (!project) {
    return null;
  }

  const currentMedia =
    media[activeMedia];

  return (
    <div
      className="
        fixed
        inset-0
        z-[500]
        flex
        items-center
        justify-center
        bg-black/75
        p-3
        backdrop-blur-xl
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-label={`Projet ${project.name}`}
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ==================================================
          FOND DÉCORATIF
          ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[50vh]
          w-[50vh]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#1E88E5]/10
          blur-[110px]
        "
      />

      {/* ==================================================
          FENÊTRE
          ================================================== */}

      <div
        className="
          relative
          flex
          h-[94vh]
          w-full
          max-w-6xl
          flex-col
          overflow-hidden
          rounded-[2rem]
          border
          border-white/10
          bg-[var(--bg-primary)]
          shadow-[0_30px_100px_rgba(0,0,0,0.45)]
          animate-[projectOpen_0.5s_ease_both]
        "
      >
        {/* ==================================================
            BARRE SUPÉRIEURE
            ================================================== */}

        <header
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-4
            border-b
            border-[var(--border)]
            px-4
            py-3
            sm:px-6
            sm:py-4
          "
        >
          {/* Projet */}

          <div className="min-w-0">
            <p
              className="
                truncate
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[var(--accent)]
                sm:text-[10px]
              "
            >
              {project.category}
            </p>

            <h2
              className="
                mt-1
                truncate
                text-lg
                font-extrabold
                tracking-tight
                sm:text-2xl
              "
            >
              {project.name}
            </h2>
          </div>

          {/* Fermer */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le projet"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--bg-secondary)]
              text-lg
              text-[var(--text-secondary)]
              transition-all
              duration-300
              hover:border-[var(--accent)]
              hover:bg-[var(--accent)]
              hover:text-white
            "
          >
            ×
          </button>
        </header>

        {/* ==================================================
            CONTENU
            ================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
          "
        >
          <div
            className="
              grid
              min-h-full
              lg:grid-cols-[1.25fr_0.75fr]
            "
          >
            {/* ==================================================
                GALERIE
                ================================================== */}

            <div
              className="
                flex
                min-h-[55vh]
                flex-col
                border-b
                border-[var(--border)]
                lg:min-h-0
                lg:border-b-0
                lg:border-r
              "
            >
              {/* Média principal */}

              <div
                className="
                  relative
                  flex
                  min-h-[50vh]
                  flex-1
                  items-center
                  justify-center
                  overflow-hidden
                  bg-[#0b0b0b]
                  p-4
                  sm:p-8
                "
              >
                {/* Ligne décorative */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-5
                    h-px
                    w-16
                    bg-[#1E88E5]/50
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-5
                    right-5
                    h-px
                    w-16
                    bg-white/10
                  "
                />

                <div
                  className={`
                    relative
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    transition-all
                    duration-200
                    ${
                      isChanging
                        ? "scale-[0.98] opacity-0"
                        : "scale-100 opacity-100"
                    }
                  `}
                >
                  {currentMedia?.type ===
                    "video" ? (
                    <video
                      key={
                        currentMedia.src
                      }
                      src={
                        currentMedia.src
                      }
                      controls
                      playsInline
                      className="
                        max-h-full
                        max-w-full
                        rounded-xl
                        object-contain
                        shadow-2xl
                      "
                    />
                  ) : (
                    <img
                      key={
                        currentMedia?.src
                      }
                      src={
                        currentMedia?.src
                      }
                      alt={`${project.name} — média ${
                        activeMedia + 1
                      }`}
                      className="
                        max-h-full
                        max-w-full
                        rounded-xl
                        object-contain
                        shadow-2xl
                        transition-transform
                        duration-700
                        ease-out
                        hover:scale-[1.01]
                      "
                    />
                  )}
                </div>

                {/* ==================================================
                    NAVIGATION MÉDIA
                    ================================================== */}

                {media.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrevious}
                      aria-label="Média précédent"
                      className="
                        absolute
                        left-4
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-black/40
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-[#1E88E5]
                        hover:bg-[#1E88E5]
                      "
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Média suivant"
                      className="
                        absolute
                        right-4
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-black/40
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-[#1E88E5]
                        hover:bg-[#1E88E5]
                      "
                    >
                      →
                    </button>

                    {/* Compteur */}

                    <div
                      className="
                        absolute
                        bottom-4
                        right-4
                        rounded-full
                        border
                        border-white/10
                        bg-black/45
                        px-3
                        py-1.5
                        text-[9px]
                        font-semibold
                        tracking-[0.12em]
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {String(
                        activeMedia + 1
                      ).padStart(2, "0")}
                      {" / "}
                      {String(
                        media.length
                      ).padStart(2, "0")}
                    </div>
                  </>
                )}
              </div>

              {/* ==================================================
                  MINIATURES
                  ================================================== */}

              {media.length > 1 && (
                <div
                  className="
                    flex
                    shrink-0
                    gap-2
                    overflow-x-auto
                    border-t
                    border-[var(--border)]
                    p-3
                    sm:p-4
                  "
                >
                  {media.map(
                    (item, index) => (
                      <button
                        type="button"
                        key={`${item.src}-${index}`}
                        onClick={() =>
                          changeMedia(
                            index,
                            index >
                              activeMedia
                              ? 1
                              : -1
                          )
                        }
                        aria-label={`Afficher le média ${
                          index + 1
                        }`}
                        className={`
                          relative
                          h-16
                          w-20
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          border
                          transition-all
                          duration-300
                          sm:h-20
                          sm:w-24
                          ${
                            index ===
                            activeMedia
                              ? "border-[#1E88E5] shadow-[0_0_20px_rgba(30,136,229,0.18)]"
                              : "border-[var(--border)] opacity-55 hover:opacity-100"
                          }
                        `}
                      >
                        {item.type ===
                        "video" ? (
                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              bg-[#181818]
                              text-xs
                              font-bold
                              text-[#1E88E5]
                            "
                          >
                            VIDEO
                          </div>
                        ) : (
                          <img
                            src={item.src}
                            alt=""
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        )}

                        <span
                          className="
                            absolute
                            bottom-1
                            left-1
                            rounded-full
                            bg-black/55
                            px-1.5
                            py-0.5
                            text-[7px]
                            font-semibold
                            text-white
                          "
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* ==================================================
                INFORMATIONS
                ================================================== */}

            <aside
              className="
                flex
                flex-col
                p-5
                sm:p-7
                lg:p-8
              "
            >
              {/* Description */}

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[var(--accent)]
                  "
                >
                  À propos du projet
                </p>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-[var(--text-secondary)]
                  "
                >
                  {project.description}
                </p>
              </div>

              {/* ==================================================
                  TECHNOLOGIES
                  ================================================== */}

              {Array.isArray(
                project.tools
              ) &&
                project.tools.length > 0 && (
                  <div className="mt-8">
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-[var(--accent)]
                      "
                    >
                      Technologies
                    </p>

                    <div
                      className="
                        mt-4
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {project.tools.map(
                        (tool) => (
                          <span
                            key={tool}
                            className="
                              rounded-full
                              border
                              border-[var(--border)]
                              bg-[var(--bg-secondary)]
                              px-3
                              py-1.5
                              text-[9px]
                              font-semibold
                              text-[var(--text-primary)]
                            "
                          >
                            {tool}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* ==================================================
                  META
                  ================================================== */}

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--bg-secondary)]
                    p-4
                  "
                >
                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[var(--text-secondary)]
                    "
                  >
                    Médias
                  </span>

                  <strong
                    className="
                      mt-1
                      block
                      text-xl
                      font-extrabold
                    "
                  >
                    {media.length}
                  </strong>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--bg-secondary)]
                    p-4
                  "
                >
                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[var(--text-secondary)]
                    "
                  >
                    Type
                  </span>

                  <strong
                    className="
                      mt-1
                      block
                      text-sm
                      font-extrabold
                    "
                  >
                    {project.category}
                  </strong>
                </div>
              </div>

              {/* ==================================================
                  LIEN DU PROJET
                  ================================================== */}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[var(--accent)]
                    px-5
                    py-3
                    text-xs
                    font-bold
                    text-white
                    shadow-[0_12px_30px_rgba(30,136,229,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_18px_40px_rgba(30,136,229,0.28)]
                  "
                >
                  Visiter le projet
                  <span>↗</span>
                </a>
              )}

              {/* ==================================================
                  INDICATION
                  ================================================== */}

              <div
                className="
                  mt-auto
                  hidden
                  pt-8
                  lg:block
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
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

                  ← → Naviguer

                  <span
                    className="
                      h-px
                      flex-1
                      bg-[var(--border)]
                    "
                  />

                  ESC Fermer
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;