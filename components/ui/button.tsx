"use client";

import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import { m } from "framer-motion";
import styles from './button.module.scss';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
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
 */
export function getButtonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonClassOptions): string {
  return [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');
}

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
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className
    ].filter(Boolean).join(' ');

    return (
      <m.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={classNames}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        <span className={loading ? styles.loadingContent : undefined}>
          {children}
        </span>
      </m.button>
    );
  }
);
