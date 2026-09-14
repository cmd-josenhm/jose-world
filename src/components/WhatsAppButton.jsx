import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MessageCircle, ArrowUpRight } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/2290151370949?text=Bonjour%20José%2C%20je%20viens%20de%20visiter%20votre%20portfolio%20et%20j'aimerais%20échanger%20avec%20vous.";

function WhatsAppButton() {
  const buttonRef = useRef(null);
  const glowRef = useRef(null);
  const labelRef = useRef(null);
  const iconRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    const icon = iconRef.current;

    if (!button || !glow || !icon) return;

    const pulse = gsap.to(glow, {
      scale: 1.35,
      opacity: 0.18,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const float = gsap.to(button, {
      y: -3,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      pulse.kill();
      float.kill();
    };
  }, []);

  useEffect(() => {
    if (!buttonRef.current || !iconRef.current) return;

    gsap.to(iconRef.current, {
      rotate: isHovered ? 12 : 0,
      scale: isHovered ? 1.08 : 1,
      duration: 0.3,
      ease: "power2.out",
    });

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        x: isHovered ? 0 : 4,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  const handleMouseMove = (event) => {
    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    gsap.to(button, {
      rotateX,
      rotateY,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 600,
      transformOrigin: "center",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    gsap.to(buttonRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    gsap.timeline()
      .to(buttonRef.current, {
        scale: 0.94,
        duration: 0.08,
        ease: "power2.in",
      })
      .to(buttonRef.current, {
        scale: 1.05,
        duration: 0.18,
        ease: "back.out(2)",
      });

    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[90] md:bottom-7 md:right-7">
      <div className="relative">
        {/* Halo */}
        <span
          ref={glowRef}
          className="
            pointer-events-none
            absolute
            inset-[-7px]
            rounded-full
            bg-[var(--accent)]
            opacity-20
            blur-md
          "
        />

        {/* Bouton */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label="Contacter José sur WhatsApp"
          className="
            pointer-events-auto
            group
            relative
            flex
            items-center
            gap-2
            overflow-hidden
            rounded-full
            border
            border-white/10
            bg-[var(--accent)]
            px-4
            py-3
            text-white
            shadow-[0_14px_45px_rgba(30,136,229,0.30)]
            backdrop-blur-xl
            transition-[box-shadow]
            duration-300
            hover:shadow-[0_18px_60px_rgba(30,136,229,0.42)]
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--accent)]
            focus:ring-offset-2
            focus:ring-offset-[var(--bg-primary)]
            md:px-5
          "
        >
          {/* Reflet animé */}
          <span
            className="
              pointer-events-none
              absolute
              inset-y-0
              -left-10
              w-8
              rotate-12
              bg-white/30
              blur-md
              transition-all
              duration-700
              group-hover:left-[110%]
            "
          />

          {/* Icône */}
          <span
            ref={iconRef}
            className="
              relative
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/15
              ring-1
              ring-white/20
            "
          >
            <MessageCircle
              size={19}
              strokeWidth={2.2}
            />

            {/* Petit signal */}
            <span
              className="
                absolute
                right-0
                top-0
                h-2.5
                w-2.5
                rounded-full
                border-2
                border-[var(--accent)]
                bg-white
              "
            />
          </span>

          {/* Texte desktop */}
          <span
            ref={labelRef}
            className="
              relative
              hidden
              text-sm
              font-semibold
              tracking-wide
              md:block
            "
          >
            Discutons
          </span>

          {/* Flèche desktop */}
          <ArrowUpRight
            size={16}
            strokeWidth={2}
            className="
              relative
              hidden
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
              md:block
            "
          />
        </button>
      </div>
    </div>
  );
}

export default WhatsAppButton;