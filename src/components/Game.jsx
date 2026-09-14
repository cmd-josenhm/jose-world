import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GAME_DURATION = 20;

const STARTING_TARGET_SIZE = 58;

function Game({ onBack }) {
  const boardRef = useRef(null);
  const targetRef = useRef(null);
  const scoreRef = useRef(null);

  const timerRef = useRef(null);
  const animationRef = useRef(null);

  const [gameState, setGameState] = useState("idle");

  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] =
    useState(GAME_DURATION);

  const [combo, setCombo] = useState(0);

  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "jose-world-best-score"
      );

      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [target, setTarget] = useState({
    x: 50,
    y: 50,
    size: STARTING_TARGET_SIZE,
  });

  const [particles, setParticles] = useState([]);

  /* ========================================================
     NETTOYAGE
     ======================================================== */

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (animationRef.current) {
      window.clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  /* ========================================================
     POSITION ALÉATOIRE
     ======================================================== */

  const moveTarget = useCallback(
    (currentScore = score) => {
      const difficulty = Math.min(
        currentScore * 0.7,
        14
      );

      const padding = 10 + difficulty;

      const x =
        padding +
        Math.random() *
          (100 - padding * 2);

      const y =
        padding +
        Math.random() *
          (100 - padding * 2);

      const size = Math.max(
        36,
        STARTING_TARGET_SIZE -
          currentScore * 1.2
      );

      setTarget({
        x,
        y,
        size,
      });
    },
    [score]
  );

  /* ========================================================
     PARTICULES
     ======================================================== */

  const createParticles = (x, y) => {
    const burst = Array.from(
      { length: 12 },
      (_, index) => ({
        id:
          Date.now() +
          index +
          Math.random(),
        x,
        y,
        angle:
          (index / 12) *
          Math.PI *
          2,
        distance:
          35 +
          Math.random() * 50,
      })
    );

    setParticles(burst);

    window.setTimeout(() => {
      setParticles([]);
    }, 650);
  };

  /* ========================================================
     FIN DE PARTIE
     ======================================================== */

  const finishGame = useCallback(() => {
    clearTimers();

    setGameState("finished");
    setTimeLeft(0);

    setBestScore((currentBest) => {
      if (score <= currentBest) {
        return currentBest;
      }

      try {
        localStorage.setItem(
          "jose-world-best-score",
          String(score)
        );
      } catch {
        // localStorage indisponible
      }

      return score;
    });
  }, [clearTimers, score]);

  /* ========================================================
     DÉMARRAGE
     ======================================================== */

  const startGame = () => {
    clearTimers();

    setScore(0);
    setCombo(0);
    setTimeLeft(GAME_DURATION);
    setParticles([]);
    setTarget({
      x: 50,
      y: 50,
      size: STARTING_TARGET_SIZE,
    });

    setGameState("countdown");
  };

  /* ========================================================
     COMPTE À REBOURS
     ======================================================== */

  useEffect(() => {
    if (gameState !== "countdown") {
      return;
    }

    let count = 3;

    const countdown = window.setInterval(() => {
      count -= 1;

      if (count <= 0) {
        window.clearInterval(countdown);
        setGameState("playing");
      }
    }, 750);

    return () => {
      window.clearInterval(countdown);
    };
  }, [gameState]);

  /* ========================================================
     TIMER
     ======================================================== */

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }

    timerRef.current =
      window.setInterval(() => {
        setTimeLeft((current) => {
          if (current <= 1) {
            window.clearInterval(
              timerRef.current
            );

            timerRef.current = null;

            setGameState("finished");

            return 0;
          }

          return current - 1;
        });
      }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(
          timerRef.current
        );

        timerRef.current = null;
      }
    };
  }, [gameState]);

  /* ========================================================
     ANIMATION DE LA CIBLE
     ======================================================== */

  useEffect(() => {
    if (
      gameState !== "playing" ||
      !targetRef.current
    ) {
      return;
    }

    gsap.fromTo(
      targetRef.current,
      {
        scale: 0.65,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "back.out(2)",
      }
    );
  }, [target, gameState]);

  /* ========================================================
     CLIC SUR LA CIBLE
     ======================================================== */

  const handleTargetClick = (event) => {
    if (gameState !== "playing") {
      return;
    }

    event.stopPropagation();

    const nextScore = score + 1;

    setScore(nextScore);
    setCombo((current) => current + 1);

    if (scoreRef.current) {
      gsap.fromTo(
        scoreRef.current,
        {
          scale: 1.35,
        },
        {
          scale: 1,
          duration: 0.35,
          ease: "back.out(2)",
        }
      );
    }

    const board =
      boardRef.current;

    if (board) {
      const rect =
        board.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) /
          rect.width) *
        100;

      const y =
        ((event.clientY - rect.top) /
          rect.height) *
        100;

      createParticles(x, y);
    }

    moveTarget(nextScore);
  };

  /* ========================================================
     CLIC EN DEHORS
     ======================================================== */

  const handleBoardClick = () => {
    if (gameState !== "playing") {
      return;
    }

    setCombo(0);
  };

  /* ========================================================
     RETOUR
     ======================================================== */

  const handleBack = () => {
    clearTimers();

    if (typeof onBack === "function") {
      onBack();
      return;
    }

    window.history.back();
  };

  /* ========================================================
     NIVEAU
     ======================================================== */

  const level =
    score < 5
      ? "Débutant"
      : score < 10
        ? "Rapide"
        : score < 15
          ? "Expert"
          : "Pro";

  const countdownNumber =
    gameState === "countdown"
      ? Math.ceil(
          timeLeft / GAME_DURATION * 3
        )
      : null;

  return (
    <section className="game-page">
      <div
        className="game-page-background"
        aria-hidden="true"
      />

      <div className="game-container">

        {/* ==================================================
            RETOUR
            ================================================== */}

        <button
          type="button"
          className="game-back-button"
          onClick={handleBack}
        >
          ← Retour à Jose World
        </button>

        {/* ==================================================
            HEADER
            ================================================== */}

        <div className="game-header">
          <p className="game-kicker">
            JOSE WORLD · EXPÉRIENCE INTERACTIVE
          </p>

          <h1 className="game-title">
            BLUE{" "}
            <span>HUNT</span>
          </h1>

          <p className="game-description">
            Attrape le cercle bleu le plus vite
            possible. Tu as {GAME_DURATION} secondes.
          </p>
        </div>

        {/* ==================================================
            STATS
            ================================================== */}

        <div className="game-stats">

          <div className="game-stat">
            <span>Score</span>

            <strong ref={scoreRef}>
              {score}
            </strong>
          </div>

          <div className="game-stat">
            <span>Temps</span>

            <strong
              className={
                timeLeft <= 5 &&
                gameState === "playing"
                  ? "game-time-danger"
                  : ""
              }
            >
              {timeLeft}s
            </strong>
          </div>

          <div className="game-stat">
            <span>Record</span>

            <strong>
              {bestScore}
            </strong>
          </div>

        </div>

        {/* ==================================================
            INFOS JEU
            ================================================== */}

        {gameState === "playing" && (
          <div className="game-live-info">

            <span>
              Niveau : <strong>{level}</strong>
            </span>

            <span>
              Combo :{" "}
              <strong>
                x{combo}
              </strong>
            </span>

          </div>
        )}

        {/* ==================================================
            ZONE DE JEU
            ================================================== */}

        <div
          ref={boardRef}
          className={`
            game-board
            ${
              gameState === "playing"
                ? "game-board-playing"
                : ""
            }
          `}
          onClick={handleBoardClick}
        >

          {/* ==================================================
              ÉCRAN INITIAL
              ================================================== */}

          {gameState === "idle" && (
            <div className="game-overlay">
              <div className="game-overlay-content">

                <div className="game-logo-mark">
                  J
                </div>

                <p className="game-overlay-kicker">
                  MINI GAME
                </p>

                <h2>
                  Prêt à jouer ?
                </h2>

                <p>
                  Clique sur le cercle bleu autant
                  de fois que possible avant la fin
                  du chrono.
                </p>

                <button
                  type="button"
                  className="game-start-button"
                  onClick={startGame}
                >
                  COMMENCER

                  <span>
                    ↗
                  </span>
                </button>

              </div>
            </div>
          )}

          {/* ==================================================
              COMPTE À REBOURS
              ================================================== */}

          {gameState === "countdown" && (
            <div className="game-countdown">

              <p>
                PRÉPARE-TOI
              </p>

              <strong>
                {countdownNumber}
              </strong>

            </div>
          )}

          {/* ==================================================
              FIN
              ================================================== */}

          {gameState === "finished" && (
            <div className="game-overlay">
              <div className="game-overlay-content">

                <p className="game-finished-label">
                  TEMPS ÉCOULÉ
                </p>

                <div className="game-final-score">
                  {score}
                </div>

                <p className="game-result">

                  {score > bestScore
                    ? "Nouveau record !"
                    : score >= 15
                      ? "Excellent."
                      : score >= 8
                        ? "Bien joué."
                        : "Encore un effort."}

                </p>

                <div className="game-result-meta">
                  <span>
                    Niveau : {level}
                  </span>

                  <span>
                    Meilleur score :{" "}
                    {Math.max(
                      score,
                      bestScore
                    )}
                  </span>
                </div>

                <button
                  type="button"
                  className="game-start-button"
                  onClick={startGame}
                >
                  REJOUER

                  <span>
                    ↗
                  </span>
                </button>

              </div>
            </div>
          )}

          {/* ==================================================
              CIBLE
              ================================================== */}

          {gameState === "playing" && (
            <button
              ref={targetRef}
              type="button"
              className="game-target"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                width: `${target.size}px`,
                height: `${target.size}px`,
              }}
              onClick={handleTargetClick}
              aria-label="Cible bleue"
            >
              <span />

              <span className="game-target-ring" />
            </button>
          )}

          {/* ==================================================
              PARTICULES
              ================================================== */}

          {particles.map((particle) => (
            <span
              key={particle.id}
              className="game-particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                "--angle": `${particle.angle}rad`,
                "--distance": `${particle.distance}px`,
              }}
            />
          ))}

        </div>

        {/* ==================================================
            NOTE BASSE
            ================================================== */}

        <div className="game-footer-note">
          <span />

          Créé en JavaScript & React pour Jose World

          <span />
        </div>

      </div>
    </section>
  );
}

export default Game;