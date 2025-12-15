"use client";

import { motion, MotionProps } from "framer-motion";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { h } from "@/lib/react-helpers";

// Create a motion component from MUI Box
const MotionBox = motion.create(Box);

// Combine BoxProps and MotionProps.
// We use Omit to explicitly handle conflicts.
type FadeInProps = Omit<BoxProps, "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"> & MotionProps & {
    children?: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    duration?: number;
    viewportMargin?: string;
    fullWidth?: boolean;
};

export function FadeIn({
    children,
    delay = 0,
    direction = "up",
    duration = 0.5,
    viewportMargin = "0px",
    fullWidth = false,
    className = "",
    style,
    ...props
}: FadeInProps) {
    const getInitial = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 20 };
            case "down":
                return { opacity: 0, y: -20 };
            case "left":
                return { opacity: 0, x: 20 };
            case "right":
                return { opacity: 0, x: -20 };
            case "none":
            default:
                return { opacity: 0 };
        }
    };

    return h(MotionBox, {
        initial: getInitial(),
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: viewportMargin },
        transition: { duration, delay, ease: "easeOut" },
        className,
        style: style as any,
        width: fullWidth ? '100%' : undefined,
        ...props
    }, children);
}
