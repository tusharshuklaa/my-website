export type ConfettiTypes = "basic" | "fireworks" | "emoji";

export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fireWorks = (confetti: typeof import("canvas-confetti")) => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      shapes: ["star"],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      shapes: ["star"],
    });
  }, 250);
};

export const shootConfetti = (type: ConfettiTypes): void => {
  import("canvas-confetti")
    .then(confetti => {
      switch (type) {
        case "basic":
          confetti.default({
            angle: randomInRange(45, 135),
            spread: randomInRange(50, 190),
            particleCount: randomInRange(50, 150),
            origin: { y: 0.7 },
          });
          break;
        case "fireworks":
          fireWorks(confetti.default);
          break;
        case "emoji":
          confetti.default({
            particleCount: 100,
            spread: 150,
            shapes: [confetti.default.shapeFromText("🥳")],
            scalar: 3,
            origin: { y: 0.7 },
          });
          break;
        default:
          console.warn(`Unknown confetti type: ${type}`);
      }
    })
    .catch(err => console.error("Confetti failed to load:", err));
};

export const openWebsite = (url: string, callbackFn?: () => void): void => {
  const isExternal = url.startsWith("http") || url.startsWith("mailto:");
  const target = isExternal ? "_blank" : "_self";

  window.open(url, target, "noopener,noreferrer");
  callbackFn?.();
};
