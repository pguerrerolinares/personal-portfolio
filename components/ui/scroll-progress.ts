"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import { Box } from '@mui/material';
import { h } from "@/lib/react-helpers";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return h(Box, {
    component: motion.div,
    sx: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      bgcolor: 'primary.main',
      transformOrigin: '0%',
      zIndex: 9999,
    },
    style: { scaleX }
  });
}
