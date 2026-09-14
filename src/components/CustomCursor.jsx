import { useEffect, useRef, useState } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  const [cursorType, setCursorType] = useState("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;

    let animationFrame;

    const animate = () => {
      followerX += (mouseX - followerX) * 0.14;
      followerY += (mouseY - followerY) * 0.14;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      setVisible(true);

      const target = event.target.closest(
        "a, button, [role='button'], img, input, textarea"
      );

      if (!target) {
        setCursorType("default");
        return;
      }

      if (
        target.matches(
          "input, textarea"
        )
      ) {
        setCursorType("text");
        return;
      }

      if (target.matches("img")) {
        setCursorType("image");
        return;
      }

      if (
        target.matches(
          ".discover-object, .discover-button"
        )
      ) {
        setCursorType("discover");
        return;
      }

      if (
        target.matches(
          ".game-entry-button, .game-start-button"
        )
      ) {
        setCursorType("play");
        return;
      }

      if (
        target.matches(
          ".game-target"
        )
      ) {
        setCursorType("target");
        return;
      }

      if (
        target.matches(
          ".project-card, [data-project-card]"
        )
      ) {
        setCursorType("project");
        return;
      }

      if (target.matches("a")) {
        setCursorType("link");
        return;
      }

      setCursorType("button");
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    document.documentElement.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const getLabel = () => {
    switch (cursorType) {
      case "project":
        return "VIEW";

      case "image":
        return "+";

      case "link":
        return "OPEN";

      case "discover":
        return "ENTER";

      case "play":
        return "PLAY";

      case "target":
        return "+";

      default:
        return "";
    }
  };

  return (
    <>
      {/* ================================================
          POINT CENTRAL
      ================================================= */}

      <div
        ref={cursorRef}
        className={`
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#1E88E5]
          shadow-[0_0_15px_rgba(30,136,229,0.7)]
          md:block
          transition-[width,height,opacity]
          duration-200
          ease-out
          ${visible ? "opacity-100" : "opacity-0"}
          ${
            cursorType === "text"
              ? "h-[2px] w-[2px]"
              : ""
          }
        `}
      />

      {/* ================================================
          CERCLE PRINCIPAL
      ================================================= */}

      <div
        ref={followerRef}
        className={`
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9998]
          hidden
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          md:flex
          transition-[width,height,background-color,border-color,box-shadow,opacity]
          duration-300
          ease-out
          ${visible ? "opacity-100" : "opacity-0"}

          /* État normal */
          ${
            cursorType === "default"
              ? "h-8 w-8 border-white/20 bg-white/[0.02]"
              : ""
          }

          /* Lien */
          ${
            cursorType === "link"
              ? "h-11 w-11 border-[#1E88E5]/60 bg-[#1E88E5]/10"
              : ""
          }

          /* Bouton */
          ${
            cursorType === "button"
              ? "h-12 w-12 border-[#1E88E5]/70 bg-[#1E88E5]/10"
              : ""
          }

          /* Projet */
          ${
            cursorType === "project"
              ? "h-20 w-20 border-[#1E88E5]/70 bg-[#1E88E5]/10 shadow-[0_0_35px_rgba(30,136,229,0.22)]"
              : ""
          }

          /* Image */
          ${
            cursorType === "image"
              ? "h-14 w-14 border-[#1E88E5]/70 bg-[#1E88E5]/15"
              : ""
          }

          /* Discover */
          ${
            cursorType === "discover"
              ? "h-16 w-16 border-[#1E88E5]/80 bg-[#1E88E5]/12 shadow-[0_0_40px_rgba(30,136,229,0.25)]"
              : ""
          }

          /* Jeu */
          ${
            cursorType === "play"
              ? "h-16 w-16 border-[#1E88E5]/80 bg-[#1E88E5]/15 shadow-[0_0_40px_rgba(30,136,229,0.25)]"
              : ""
          }

          /* Cible */
          ${
            cursorType === "target"
              ? "h-14 w-14 border-[#1E88E5] bg-transparent"
              : ""
          }

          /* Texte */
          ${
            cursorType === "text"
              ? "h-1 w-1 border-[#1E88E5] bg-[#1E88E5]"
              : ""
          }
        `}
      >
        {getLabel() && (
          <span
            className="
              font-sans
              text-[8px]
              font-bold
              tracking-[0.12em]
              text-white
            "
          >
            {getLabel()}
          </span>
        )}
      </div>
    </>
  );
}

export default CustomCursor;