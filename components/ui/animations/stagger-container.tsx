"use client";

import { motion, Variants, Transition } from "framer-motion";
import { Box, BoxProps } from "@mui/material";
import { ReactNode, Children, isValidElement } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const MotionBox = motion.create(Box);

// Omit conflicting event handlers between MUI and Framer Motion
type SafeBoxProps = Omit<BoxProps, "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd" | "children">;

type StaggerPattern = "sequential" | "wave" | "random" | "center-out" | "edges-in";
type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur" | "rotate";

interface StaggerContainerProps extends SafeBoxProps {
  children: ReactNode;
  pattern?: StaggerPattern;
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

const getItemVariants = (animation: AnimationType): Variants => {
  const baseTransition: Transition = {
    duration: 0.5,
    ease: [0.33, 1, 0.68, 1],
  };

  const animations: Record<AnimationType, Variants> = {
    "fade-up": {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: baseTransition },
    },
    "fade-down": {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0, transition: baseTransition },
    },
    "fade-left": {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0, transition: baseTransition },
    },
    "fade-right": {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0, transition: baseTransition },
    },
    "scale": {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: baseTransition },
    },
    "blur": {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)", transition: baseTransition },
    },
    "rotate": {
      hidden: { opacity: 0, rotate: -10, scale: 0.9 },
      visible: { opacity: 1, rotate: 0, scale: 1, transition: baseTransition },
    },
  };

  return animations[animation];
};

const calculateStaggerDelays = (
  count: number,
  pattern: StaggerPattern,
  baseDelay: number
): number[] => {
  const delays: number[] = [];

  switch (pattern) {
    case "sequential":
      for (let i = 0; i < count; i++) {
        delays.push(i * baseDelay);
      }
      break;

    case "wave":
      // Sine wave pattern for organic feel
      for (let i = 0; i < count; i++) {
        const waveOffset = Math.sin((i / count) * Math.PI) * baseDelay;
        delays.push(i * baseDelay * 0.7 + waveOffset);
      }
      break;

    case "random":
      // Pseudo-random but deterministic delays
      for (let i = 0; i < count; i++) {
        const seed = (i * 7919) % 100; // Prime number for better distribution
        delays.push((seed / 100) * baseDelay * count * 0.5);
      }
      break;

    case "center-out":
      // Start from center and expand outward
      const center = Math.floor(count / 2);
      for (let i = 0; i < count; i++) {
        delays.push(Math.abs(i - center) * baseDelay);
      }
      break;

    case "edges-in":
      // Start from edges and converge to center
      const mid = Math.floor(count / 2);
      for (let i = 0; i < count; i++) {
        const distFromEdge = Math.min(i, count - 1 - i);
        delays.push((mid - distFromEdge) * baseDelay);
      }
      break;

    default:
      for (let i = 0; i < count; i++) {
        delays.push(i * baseDelay);
      }
  }

  return delays;
};

export function StaggerContainer({
  children,
  pattern = "sequential",
  animation = "fade-up",
  staggerDelay = 0.1,
  duration = 0.5,
  delay = 0,
  once = true,
  threshold = 0.1,
  ...boxProps
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();
  const childArray = Children.toArray(children);
  const delays = calculateStaggerDelays(childArray.length, pattern, staggerDelay);
  const itemVariants = getItemVariants(animation);

  if (prefersReducedMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
          },
        },
      }}
      {...boxProps}
    >
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;

        return (
          <MotionBox
            key={index}
            variants={{
              hidden: itemVariants.hidden,
              visible: {
                ...itemVariants.visible,
                transition: {
                  ...((itemVariants.visible as { transition?: Transition }).transition || {}),
                  duration,
                  delay: delays[index],
                },
              },
            }}
          >
            {child}
          </MotionBox>
        );
      })}
    </MotionBox>
  );
}

// Individual stagger item for manual control
interface StaggerItemProps extends SafeBoxProps {
  children: ReactNode;
  index?: number;
  animation?: AnimationType;
  duration?: number;
}

export function StaggerItem({
  children,
  index = 0,
  animation = "fade-up",
  duration = 0.5,
  ...boxProps
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = getItemVariants(animation);

  if (prefersReducedMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  return (
    <MotionBox
      variants={{
        hidden: itemVariants.hidden,
        visible: {
          ...itemVariants.visible,
          transition: {
            ...((itemVariants.visible as { transition?: Transition }).transition || {}),
            duration,
          },
        },
      }}
      {...boxProps}
    >
      {children}
    </MotionBox>
  );
}

// Container that enables stagger for children
interface StaggerWrapperProps extends SafeBoxProps {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
  once?: boolean;
}

export function StaggerWrapper({
  children,
  staggerDelay = 0.1,
  delay = 0,
  once = true,
  ...boxProps
}: StaggerWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      {...boxProps}
    >
      {children}
    </MotionBox>
  );
}
