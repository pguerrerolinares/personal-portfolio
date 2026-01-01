"use client";

import { useState, useEffect, useCallback, RefObject } from 'react';
import { useReducedMotion } from './use-reduced-motion';

interface MousePosition {
  x: number;
  y: number;
}

interface ParallaxValues {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
}

interface UseMouseParallaxOptions {
  strength?: number; // How much the element moves (default: 20)
  rotationStrength?: number; // How much the element rotates (default: 10)
  smoothing?: number; // Transition duration in ms (default: 150)
  resetOnLeave?: boolean; // Reset position when mouse leaves (default: true)
}

export function useMouseParallax(
  ref: RefObject<HTMLElement | null>,
  options: UseMouseParallaxOptions = {}
) {
  const {
    strength = 20,
    rotationStrength = 10,
    smoothing = 150,
    resetOnLeave = true,
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate normalized position (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    setMousePosition({
      x: Math.max(-1, Math.min(1, normalizedX)),
      y: Math.max(-1, Math.min(1, normalizedY)),
    });
  }, [ref, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (resetOnLeave) {
      setMousePosition({ x: 0, y: 0 });
    }
  }, [resetOnLeave]);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseEnter, handleMouseLeave, prefersReducedMotion]);

  // Calculate parallax values
  const parallaxValues: ParallaxValues = prefersReducedMotion
    ? { x: 0, y: 0, rotateX: 0, rotateY: 0 }
    : {
        x: mousePosition.x * strength,
        y: mousePosition.y * strength,
        rotateX: -mousePosition.y * rotationStrength,
        rotateY: mousePosition.x * rotationStrength,
      };

  // CSS transform string
  const transform = prefersReducedMotion
    ? 'none'
    : `perspective(1000px) translateX(${parallaxValues.x}px) translateY(${parallaxValues.y}px) rotateX(${parallaxValues.rotateX}deg) rotateY(${parallaxValues.rotateY}deg)`;

  // Transition style
  const transition = `transform ${smoothing}ms cubic-bezier(0.33, 1, 0.68, 1)`;

  return {
    mousePosition,
    isHovering,
    parallaxValues,
    style: {
      transform,
      transition,
    },
  };
}
