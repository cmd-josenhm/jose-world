import { useEffect, useState } from "react";

const notifications = [
  {
    name: "Emmanuel",
    action: "vient de commander un logo",
    time: "il y a 5 minutes",
  },
  {
    name: "Aïcha",
    action: "vient de demander un site web",
    time: "il y a 8 minutes",
  },
  {
    name: "David",
    action: "vient de visiter le portfolio",
    time: "il y a 12 minutes",
  },
  {
    name: "Mariam K.",
    action: "vient de découvrir un projet",
    time: "il y a 16 minutes",
  },
  {
    name: "Lionel T.",
    action: "vient d'envoyer un projet",
    time: "il y a 17 minutes",
  },
];

function LiveNotifications() {
  const [currentNotification, setCurrentNotification] =
    useState(null);

  useEffect(() => {
    let notificationIndex = 0;
    let showTimer;
    let hideTimer;
    let initialTimer;

    const showNextNotification = () => {
      const notification = notifications[notificationIndex];

      setCurrentNotification(notification);

      hideTimer = setTimeout(() => {
        setCurrentNotification(null);

        showTimer = setTimeout(() => {
          notificationIndex =
            (notificationIndex + 1) % notifications.length;

          showNextNotification();
        }, 2500);
      }, 4500);
    };

    initialTimer = setTimeout(() => {
      showNextNotification();
    }, 2500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!currentNotification) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-24
        left-4
        z-40
        max-w-[calc(100%-32px)]
        animate-[notificationIn_0.5s_ease-out]
        md:bottom-6
        md:left-6
      "
    >
      <div
        className="
          group
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--bg-primary)]/85
          px-4
          py-3
          shadow-2xl
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[var(--accent)]/30
          hover:shadow-[0_15px_45px_rgba(0,0,0,0.25)]
        "
      >
        {/* Indicateur */}
        <span
          className="
            relative
            h-2.5
            w-2.5
            shrink-0
            rounded-full
            bg-[var(--accent)]
            shadow-[0_0_12px_rgba(30,136,229,0.8)]
          "
        >
          <span
            className="
              absolute
              inset-0
              animate-ping
              rounded-full
              bg-[var(--accent)]
              opacity-40
            "
          />
        </span>

        {/* Contenu */}
        <div className="min-w-0">
          <p className="text-xs leading-5">
            <span className="font-extrabold text-[var(--text-primary)]">
              {currentNotification.name}
            </span>{" "}
            <span className="text-[var(--text-secondary)]">
              {currentNotification.action}
            </span>
          </p>

          <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
            {currentNotification.time}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LiveNotifications;