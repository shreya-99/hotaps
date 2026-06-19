'use client'

import { useEffect, useRef } from 'react'

const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add .revealed to trigger the CSS transition
            entry.target.classList.add('revealed');
            // Once revealed, stop observing (animation plays once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,   // Trigger when 10% visible
        rootMargin: options.rootMargin || '0px 0px -60px 0px', // Slightly earlier trigger
      }
    );

    observer.observe(element);

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
};

export default useScrollAnimation;
