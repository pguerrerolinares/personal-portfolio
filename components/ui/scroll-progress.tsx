"use client";

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Box } from '@mui/material';

const MotionBox = motion.create(Box);

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Gradient color transition based on scroll progress
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'rgb(0, 113, 227)',      // Primary blue (hero)
      'rgb(99, 102, 241)',     // Indigo (about)
      'rgb(20, 184, 166)',     // Teal (projects)
      'rgb(236, 72, 153)',     // Pink (experience)
      'rgb(16, 185, 129)',     // Green (contact)
    ]
  );

  return (
    <>
      {/* Track */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          bgcolor: 'divider',
          zIndex: 9998,
          opacity: 0.3,
        }}
      />
      {/* Progress bar */}
      <MotionBox
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
        style={{
          scaleX,
          backgroundColor,
        }}
      />
      {/* Glow effect */}
      <MotionBox
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          transformOrigin: '0%',
          zIndex: 9997,
          filter: 'blur(4px)',
          opacity: 0.5,
        }}
        style={{
          scaleX,
          backgroundColor,
        }}
      />
    </>
  );
}
