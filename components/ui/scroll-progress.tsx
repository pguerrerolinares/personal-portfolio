"use client";

import { m, useScroll, useSpring } from 'framer-motion';
import { Box } from '@mui/material';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Box
      component={m.div}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        bgcolor: 'primary.main',
        transformOrigin: '0%',
        zIndex: 9999,
      }}
      style={{ scaleX }}
    />
  );
}
