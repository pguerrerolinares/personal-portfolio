"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Box, BoxProps } from "@mui/material";
import { ReactNode, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const MotionBox = motion.create(Box);

// Omit conflicting event handlers between MUI and Framer Motion
type SafeBoxProps = Omit<BoxProps, "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd">;

interface ScrollParallaxProps extends SafeBoxProps {
  children: ReactNode;
  speed?: number; // Parallax speed multiplier (-1 to 1, negative = opposite direction)
  direction?: "vertical" | "horizontal";
  offset?: [string, string]; // When to start/end the animation ["start end", "end start"]
  springConfig?: { stiffness?: number; damping?: number; mass?: number };
}

export function ScrollParallax({
  children,
  speed = 0.5,
  direction = "vertical",
  offset = ["start end", "end start"],
  springConfig = { stiffness: 100, damping: 30, mass: 1 },
  ...boxProps
}: ScrollParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  // Calculate movement range based on speed
  const range = 100 * speed;
  const rawValue = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const smoothValue = useSpring(rawValue, springConfig);

  if (prefersReducedMotion) {
    return <Box ref={ref} {...boxProps}>{children}</Box>;
  }

  const transform = direction === "vertical"
    ? { y: smoothValue }
    : { x: smoothValue };

  return (
    <Box ref={ref} {...boxProps}>
      <MotionBox style={transform}>
        {children}
      </MotionBox>
    </Box>
  );
}

// Fade on scroll component
interface ScrollFadeProps extends SafeBoxProps {
  children: ReactNode;
  direction?: "in" | "out" | "both";
  offset?: [string, string];
}

export function ScrollFade({
  children,
  direction = "in",
  offset = ["start end", "end start"],
  ...boxProps
}: ScrollFadeProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const opacityRange = direction === "in"
    ? [0, 1]
    : direction === "out"
    ? [1, 0]
    : [0, 1, 1, 0];

  const progressRange = direction === "both"
    ? [0, 0.3, 0.7, 1]
    : [0, 1];

  const opacity = useTransform(scrollYProgress, progressRange, opacityRange);

  if (prefersReducedMotion) {
    return <Box ref={ref} {...boxProps}>{children}</Box>;
  }

  return (
    <MotionBox ref={ref} style={{ opacity }} {...boxProps}>
      {children}
    </MotionBox>
  );
}

// Scale on scroll component
interface ScrollScaleProps extends SafeBoxProps {
  children: ReactNode;
  scaleRange?: [number, number];
  offset?: [string, string];
}

export function ScrollScale({
  children,
  scaleRange = [0.8, 1],
  offset = ["start end", "center center"],
  ...boxProps
}: ScrollScaleProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  if (prefersReducedMotion) {
    return <Box ref={ref} {...boxProps}>{children}</Box>;
  }

  return (
    <MotionBox ref={ref} style={{ scale: smoothScale }} {...boxProps}>
      {children}
    </MotionBox>
  );
}

// Rotate on scroll
interface ScrollRotateProps extends SafeBoxProps {
  children: ReactNode;
  rotateRange?: [number, number];
  offset?: [string, string];
}

export function ScrollRotate({
  children,
  rotateRange = [-5, 5],
  offset = ["start end", "end start"],
  ...boxProps
}: ScrollRotateProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  if (prefersReducedMotion) {
    return <Box ref={ref} {...boxProps}>{children}</Box>;
  }

  return (
    <MotionBox ref={ref} style={{ rotate: smoothRotate }} {...boxProps}>
      {children}
    </MotionBox>
  );
}

// Combined parallax with multiple effects
interface ScrollTransformProps extends SafeBoxProps {
  children: ReactNode;
  y?: [number, number];
  x?: [number, number];
  scale?: [number, number];
  rotate?: [number, number];
  opacity?: [number, number];
  offset?: [string, string];
}

export function ScrollTransform({
  children,
  y,
  x,
  scale,
  rotate,
  opacity,
  offset = ["start end", "end start"],
  ...boxProps
}: ScrollTransformProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const transforms: Record<string, MotionValue<number>> = {};

  if (y) transforms.y = useTransform(scrollYProgress, [0, 1], y);
  if (x) transforms.x = useTransform(scrollYProgress, [0, 1], x);
  if (scale) transforms.scale = useTransform(scrollYProgress, [0, 1], scale);
  if (rotate) transforms.rotate = useTransform(scrollYProgress, [0, 1], rotate);
  if (opacity) transforms.opacity = useTransform(scrollYProgress, [0, 1], opacity);

  if (prefersReducedMotion) {
    return <Box ref={ref} {...boxProps}>{children}</Box>;
  }

  return (
    <MotionBox ref={ref} style={transforms} {...boxProps}>
      {children}
    </MotionBox>
  );
}
