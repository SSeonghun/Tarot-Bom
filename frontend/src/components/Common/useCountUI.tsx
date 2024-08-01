import { useEffect, useState } from "react";

interface UseCountUpProps {
  start: number;
  end: number;
  duration: number;
}

export const useCountUp = ({ start, end, duration }: UseCountUpProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(start + (end - start) * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      startTime = null;
    };
  }, [start, end, duration]);

  return count;
};
