// useCountUp.ts
import { useEffect, useState } from 'react';

interface UseCountUpProps {
  start: number;
  end: number;
  duration: number; // duration in milliseconds
}

export function useCountUp({ start, end, duration }: UseCountUpProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let frameId: number;
    const startTime = performance.now();
    const frameRate = 1000 / 60;
    const totalFrame = Math.round(duration / frameRate);

    function update() {
      const elapsedTime = performance.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(start + (end - start) * easedProgress);
      setCount(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    }

    update();

    return () => cancelAnimationFrame(frameId);
  }, [start, end, duration]);

  function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  return count;
}
