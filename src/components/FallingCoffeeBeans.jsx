
import { useEffect, useState } from "react";
import "./FallingCoffeeBeans.css";

const beans = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  delay: `${-((index * 1.7) % 12)}s`,
  duration: `${8 + ((index * 7) % 9)}s`,
  size: `${12 + ((index * 13) % 13)}px`,
  drift: `${((index * 17) % 100) - 50}px`,
  rotation: `${(index * 47) % 360}deg`,
}));

export default function FallingCoffeeBeans() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => setReducedMotion(media.matches);

    updateMotion();
    media.addEventListener("change", updateMotion);

    return () => {
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="falling-beans" aria-hidden="true">
      {beans.map((bean) => (
        <span
          key={bean.id}
          className="falling-bean"
          style={{
            "--bean-left": bean.left,
            "--bean-delay": bean.delay,
            "--bean-duration": bean.duration,
            "--bean-size": bean.size,
            "--bean-drift": bean.drift,
            "--bean-rotation": bean.rotation,
          }}
        />
      ))}
    </div>
  );
}
