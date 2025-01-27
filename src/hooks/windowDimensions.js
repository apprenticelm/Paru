import { useEffect, useState } from 'react';

// this will return us the active window width accroding to the viewport
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window?.innerWidth,
          height: window?.innerHeight,
        });
      }

      window?.addEventListener('resize', handleResize);
      handleResize();
      return () => window?.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowSize;
}
