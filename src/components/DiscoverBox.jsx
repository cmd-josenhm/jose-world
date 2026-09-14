import { useEffect, useRef, useState } from "react";

function DiscoverBox({ onOpen }) {
  const sceneRef = useRef(null);
  const frameRef = useRef(null);
  const openTimeoutRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  /* ========================================================
     INTERACTION SOURIS
     ======================================================== */

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const handleMouseMove = (event) => {
      const rect = scene.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (event.clientX - centerX) / rect.width;
      const y = (event.clientY - centerY) / rect.height;

      setMousePosition({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const handleMouseLeave = () => {
      setMousePosition({
        x: 0,
        y: 0,
      });

      setIsHovered(false);
    };

    scene.addEventListener(
      "mousemove",
      handleMouseMove
    );

    scene.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      scene.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      scene.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  /* ========================================================
     OUVERTURE
     ======================================================== */

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);

    openTimeoutRef.current = window.setTimeout(() => {
      onOpen();
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        window.clearTimeout(openTimeoutRef.current);
      }
    };
  }, []);

  /* ========================================================
     TRANSFORMATION DYNAMIQUE
     ======================================================== */

  const rotateX = mousePosition.y * -7;
  const rotateY = mousePosition.x * 9;

  const translateX = mousePosition.x * 5;
  const translateY = mousePosition.y * 4;

  return (
    <div className="discover-wrapper">

      {/* ====================================================
          HALO
      ==================================================== */}

      <div
        className={`discover-halo ${
          isHovered
            ? "discover-halo-active"
            : ""
        }`}
      />

      {/* ====================================================
          PETITES PARTICULES
      ==================================================== */}

      <div
        className="discover-floating-particles"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* ====================================================
          SCÈNE
      ==================================================== */}

      <div
        ref={sceneRef}
        className={`
          discover-scene
          ${isHovered ? "is-hovered" : ""}
          ${isOpening ? "is-opening" : ""}
        `}
        style={{
          "--rotate-x": `${rotateX}deg`,
          "--rotate-y": `${rotateY}deg`,
          "--translate-x": `${translateX}px`,
          "--translate-y": `${translateY}px`,
        }}
        onMouseEnter={() => setIsHovered(true)}
      >

        {/* ==================================================
            OMBRE
        ================================================== */}

        <div className="discover-shadow" />

        {/* ==================================================
            GLOW
        ================================================== */}

        <div className="box-glow" />

        {/* ==================================================
            BOX
        ================================================== */}

        <button
          type="button"
          className="discover-object"
          onClick={handleOpen}
          aria-label="Découvrir le portfolio"
          disabled={isOpening}
        >

          {/* Lumière interne */}

          <span className="box-light" />

          {/* Corps */}

          <span className="box-body">

            <span className="box-face" />

            <span className="box-band" />

            <span className="box-band-vertical" />

            <span className="box-highlight" />

          </span>

          {/* Couvercle */}

          <span className="box-lid">

            <span className="box-lid-top" />

            <span className="box-lid-edge" />

          </span>

        </button>

        {/* ==================================================
            EXPLOSION
        ================================================== */}

        <div
          className="discover-fireworks"
          aria-hidden="true"
        >
          {Array.from(
            { length: 14 },
            (_, index) => (
              <span
                key={index}
                style={{
                  "--firework-index": index,
                }}
              />
            )
          )}
        </div>

        {/* ==================================================
            FLARE CENTRAL
        ================================================== */}

        <div
          className="discover-flare"
          aria-hidden="true"
        />

      </div>

      {/* ====================================================
          CONTENU
      ==================================================== */}

      <div className="discover-content">

        <p className="discover-kicker">
          ENTRER DANS MON UNIVERS
        </p>

        <button
          type="button"
          className={`
            discover-button
            ${isOpening ? "is-loading" : ""}
          `}
          onClick={handleOpen}
          disabled={isOpening}
        >
          <span>
            {isOpening
              ? "OUVERTURE..."
              : "DÉCOUVRIR"}
          </span>

          <span className="discover-arrow">
            ↗
          </span>
        </button>

        <p className="discover-hint">
          {isOpening
            ? "Prépare-toi à entrer dans Jose World."
            : "Clique sur la boîte pour ouvrir"}
        </p>

      </div>
    </div>
  );
}

export default DiscoverBox;