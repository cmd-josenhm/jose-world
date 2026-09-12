import { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setVisible(true);
    };

    const handleMouseOver = (event) => {
      const interactiveElement = event.target.closest(
        "a, button, [role='button']"
      );

      setHovering(Boolean(interactiveElement));
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`
        pointer-events-none fixed left-0 top-0 z-[9999]
        hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2
        rounded-full border
        border-[var(--accent)]
        transition-[width,height,opacity,background-color]
        duration-200
        md:block
        ${visible ? "opacity-100" : "opacity-0"}
        ${
          hovering
            ? "h-12 w-12 bg-[var(--accent)]/15"
            : "bg-transparent"
        }
      `}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <span
        className={`
          absolute left-1/2 top-1/2
          h-1.5 w-1.5
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[var(--accent)]
          transition-transform duration-200
          ${hovering ? "scale-0" : "scale-100"}
        `}
      />
    </div>
  );
}

export default CustomCursor;