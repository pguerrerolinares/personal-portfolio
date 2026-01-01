"use client";

import { motion, Variants, MotionProps } from "framer-motion";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const MotionBox = motion.create(Box);

type MaskDirection = "left" | "right" | "up" | "down";

// Omit conflicting event handlers between MUI and Framer Motion
type SafeBoxProps = Omit<BoxProps, "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd">;

interface MaskRevealProps extends SafeBoxProps {
  children: ReactNode;
  direction?: MaskDirection;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
}

const getMaskVariants = (direction: MaskDirection): Variants => {
  const clipPaths = {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)",
    },
    up: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    down: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
  };

  return {
    hidden: {
      clipPath: clipPaths[direction].hidden,
    },
    visible: {
      clipPath: clipPaths[direction].visible,
    },
  };
};

export function MaskReveal({
  children,
  direction = "left",
  delay = 0,
  duration = 0.8,
  staggerChildren = 0.1,
  once = true,
  ...boxProps
}: MaskRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  const variants = getMaskVariants(direction);

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      {...boxProps}
    >
      <MotionBox
        variants={variants}
        transition={{
          duration,
          ease: [0.77, 0, 0.175, 1], // Custom easing for smooth reveal
        }}
      >
        {children}
      </MotionBox>
    </MotionBox>
  );
}

// Text variant that reveals each line
interface TextMaskRevealProps extends SafeBoxProps {
  text: string;
  direction?: MaskDirection;
  delay?: number;
  duration?: number;
  staggerLines?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function TextMaskReveal({
  text,
  direction = "left",
  delay = 0,
  duration = 0.6,
  staggerLines = 0.08,
  once = true,
  as = "div",
  ...boxProps
}: TextMaskRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const lines = text.split("\n");

  if (prefersReducedMotion) {
    return (
      <Box component={as} {...boxProps}>
        {text}
      </Box>
    );
  }

  const variants = getMaskVariants(direction);

  return (
    <MotionBox
      component={as}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerLines,
            delayChildren: delay,
          },
        },
      }}
      {...boxProps}
    >
      {lines.map((line, index) => (
        <Box
          key={index}
          sx={{ overflow: "hidden", display: "block" }}
        >
          <MotionBox
            variants={variants}
            transition={{
              duration,
              ease: [0.77, 0, 0.175, 1],
            }}
            sx={{ display: "block" }}
          >
            {line || "\u00A0"} {/* Non-breaking space for empty lines */}
          </MotionBox>
        </Box>
      ))}
    </MotionBox>
  );
}

// Character-by-character reveal
interface CharacterRevealProps extends SafeBoxProps {
  text: string;
  delay?: number;
  staggerChars?: number;
  once?: boolean;
}

export function CharacterReveal({
  text,
  delay = 0,
  staggerChars = 0.03,
  once = true,
  ...boxProps
}: CharacterRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const characters = text.split("");

  if (prefersReducedMotion) {
    return <Box {...boxProps}>{text}</Box>;
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
            staggerChildren: staggerChars,
            delayChildren: delay,
          },
        },
      }}
      sx={{ display: "inline-block" }}
      {...boxProps}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1],
              },
            },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </MotionBox>
  );
}
