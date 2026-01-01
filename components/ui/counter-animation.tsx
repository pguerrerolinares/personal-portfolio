"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Typography, TypographyProps } from "@mui/material";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface CounterAnimationProps extends Omit<TypographyProps, "children"> {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // in seconds
  delay?: number; // in seconds
}

export function CounterAnimation({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  delay = 0,
  ...typographyProps
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView || hasStarted) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      setHasStarted(true);
      return;
    }

    // Start after delay
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      const startTime = Date.now();
      const durationMs = duration * 1000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * value);

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [isInView, value, duration, delay, prefersReducedMotion, hasStarted]);

  return (
    <Typography ref={ref} component="span" {...typographyProps}>
      {prefix}
      <span>{displayValue}</span>
      {suffix}
    </Typography>
  );
}
