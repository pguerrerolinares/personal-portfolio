"use client";

import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMagnetic<T extends HTMLElement = HTMLElement>(strength: number = 0.15) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<T>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x: xSpring,
    y: ySpring,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
