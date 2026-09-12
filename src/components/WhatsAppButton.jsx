import { MessageCircle } from "lucide-react";

function WhatsAppButton() {
  const phoneNumber = "2290151370949";

  const message = encodeURIComponent(
    "Bonjour José, je viens de découvrir votre portfolio et j'aimerais échanger avec vous concernant un projet."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter José sur WhatsApp"
      className="
        fixed
        bottom-20
        right-5
        z-50
        flex
        h-13
        w-13
        items-center
        justify-center
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--accent)]
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-105
        md:bottom-6
        md:right-6
      "
    >
      <MessageCircle
        size={23}
        strokeWidth={2}
      />

      {/* Halo animé */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          rounded-full
          bg-[var(--accent)]
          opacity-30
          animate-ping
        "
      />
    </a>
  );
}

export default WhatsAppButton;