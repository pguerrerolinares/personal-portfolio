"use client";

import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import { m } from "framer-motion";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'color'
> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export interface ButtonClassOptions {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

/**
 * Generate button class names for use with Link or other elements
 * Maps custom variants to MUI-compatible styles
 */
export function getButtonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonClassOptions): string {
  // Map custom variants to inline styles for Link usage
  const variantStyles: Record<string, string> = {
    primary: 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors bg-[var(--accent)] text-white hover:opacity-90',
    secondary: 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors bg-[var(--muted)] text-[var(--foreground)] hover:opacity-90',
    outline: 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors border border-[var(--border)] hover:bg-[var(--foreground)]/5',
    ghost: 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors hover:bg-[var(--foreground)]/5',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return [
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  ].filter(Boolean).join(' ');
}

const MotionButton = m(MuiButton);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    disabled,
    className = "",
    ...props
  }, ref) {
    // Map custom variants to MUI variants
    const muiVariant = variant === "primary" || variant === "secondary" ? "contained" :
                       variant === "outline" ? "outlined" : "text";

    // Map custom sizes to MUI sizes
    const muiSize = size === "sm" ? "small" : size === "lg" ? "large" : "medium";

    return (
      <MotionButton
        ref={ref}
        variant={muiVariant}
        size={muiSize}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        sx={{
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
        }}
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
        className={className}
        {...props}
      >
        {children}
      </MotionButton>
    );
  }
);
