"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSyncExternalStore } from 'react';

interface ScrollVelocityState {
  velocity: number; // Current scroll velocity (px/ms)
  direction: 'up' | 'down' | 'none'; // Scroll direction
  isScrolling: boolean; // Whether user is actively scrolling
  scrollY: number; // Current scroll position
  progress: number; // Scroll progress (0-1)
}

// Global scroll state for useSyncExternalStore
let scrollState: ScrollVelocityState = {
  velocity: 0,
  direction: 'none',
  isScrolling: false,
  scrollY: 0,
  progress: 0,
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return scrollState;
}

function getServerSnapshot(): ScrollVelocityState {
  return {
    velocity: 0,
    direction: 'none',
    isScrolling: false,
    scrollY: 0,
    progress: 0,
  };
}

// Initialize scroll tracking on client
let isInitialized = false;
let lastScrollY = 0;
let lastTime = 0;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

function initScrollTracking() {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  const handleScroll = () => {
    const now = performance.now();
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY;
    const deltaTime = now - lastTime;

    // Calculate velocity (px/ms)
    const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0;

    // Calculate progress
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;

    // Determine direction
    let direction: 'up' | 'down' | 'none' = 'none';
    if (deltaY > 0) direction = 'down';
    else if (deltaY < 0) direction = 'up';

    scrollState = {
      velocity,
      direction,
      isScrolling: true,
      scrollY: currentScrollY,
      progress: Math.min(1, Math.max(0, progress)),
    };

    lastScrollY = currentScrollY;
    lastTime = now;

    emitChange();

    // Clear previous timeout
    if (scrollTimeout) clearTimeout(scrollTimeout);

    // Set scrolling to false after scroll stops
    scrollTimeout = setTimeout(() => {
      scrollState = { ...scrollState, isScrolling: false, velocity: 0 };
      emitChange();
    }, 150);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  lastScrollY = window.scrollY;
  lastTime = performance.now();
}

export function useScrollVelocity(): ScrollVelocityState {
  useEffect(() => {
    initScrollTracking();
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Hook for section-specific scroll progress
export function useSectionProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in view
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(inView);

      if (inView) {
        // Calculate progress through the section
        // 0 = section just entered viewport from bottom
        // 1 = section just left viewport from top
        const sectionProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setProgress(Math.min(1, Math.max(0, sectionProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  return { progress, isInView };
}
