"use client";

import { type ReactNode, forwardRef } from "react";
import { Button as MuiButton, CircularProgress, type ButtonProps as MuiButtonProps } from "@mui/material";
import { motion } from "framer-motion";
import { h } from "@/lib/react-helpers";


export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const MotionButton = motion.create(MuiButton);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    className = "",
    ...props
  }, ref) {
    // Map custom variants to MUI variants
    const muiVariant = variant === "primary" || variant === "secondary" ? "contained" :
      variant === "outline" ? "outlined" : "text";

    // Map custom sizes to MUI sizes
    const muiSize = size === "sm" ? "small" : size === "lg" ? "large" : "medium";

    return h(MotionButton, {
      ref,
      variant: muiVariant,
      size: muiSize,
      disabled: disabled || loading,
      whileHover: { scale: disabled || loading ? 1 : 1.02 },
      whileTap: { scale: disabled || loading ? 1 : 0.98 },
      sx: {
        textTransform: 'none',
        fontWeight: 500,
        ...(variant === "primary" && {
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            bgcolor: 'primary.main',
            opacity: 0.9,
          },
        }),
        ...(variant === "secondary" && {
          bgcolor: 'grey.200',
          color: 'text.primary',
          '&:hover': {
            bgcolor: 'grey.300',
          },
        }),
        ...(variant === "ghost" && {
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }),
      },
      startIcon: loading ? h(CircularProgress, { size: 16, color: "inherit" }) : undefined,
      className,
      ...props
    }, children);
  }
);
