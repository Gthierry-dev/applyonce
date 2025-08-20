import { useState, useEffect } from 'react';

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Check if window is available (for SSR)
    if (typeof window === 'undefined') return;

    const checkIsTablet = () => {
      // Tablet is typically between 768px and 1024px
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Initial check
    checkIsTablet();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsTablet);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsTablet);
  }, []);

  return isTablet;
};