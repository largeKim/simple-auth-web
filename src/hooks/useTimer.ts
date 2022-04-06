import { useRef, useState, useEffect } from 'react';

import { getCurrentTime, getDiffSecs } from '@utils/timeUtils';

export const useTimer = (startSec: number) => {
  const [timeRemain, setTimeRemain] = useState(startSec);
  const timeStampRef = useRef<any>();

  const animate = (start: number) => {
    const animateTimeRemain = (currentTimeStamp: number) => {
      cancelAnimationFrame(timeStampRef.current);
      const currentMs = getCurrentTime();
      const diffSec = getDiffSecs(start, currentMs);

      if (diffSec > 0) {
        setTimeRemain(diffSec);
        timeStampRef.current = requestAnimationFrame(animateTimeRemain);
      } else {
        setTimeRemain(0);
        cancelAnimationFrame(timeStampRef.current);
        cancelAnimationFrame(currentTimeStamp);
      }
    };
    timeStampRef.current = requestAnimationFrame(animateTimeRemain);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(timeStampRef.current);
    };
  }, []);

  return { timeRemain, animate };
};
