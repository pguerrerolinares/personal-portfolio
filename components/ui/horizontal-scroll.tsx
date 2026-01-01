"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for one complete cycle
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  gap?: number;
}

export function Marquee({
  children,
  speed = 30,
  pauseOnHover = true,
  direction = "left",
  gap = 32,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: `${gap}px`,
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    );
  }

  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        [`@keyframes marquee-left`]: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        [`@keyframes marquee-right`]: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: `${gap}px`,
          width: "fit-content",
          animation: `${animationName} ${speed}s linear infinite`,
          ...(pauseOnHover && {
            "&:hover": {
              animationPlayState: "paused",
            },
          }),
        }}
      >
        {/* Duplicate content for seamless loop */}
        <Box sx={{ display: "flex", gap: `${gap}px`, flexShrink: 0 }}>
          {children}
        </Box>
        <Box sx={{ display: "flex", gap: `${gap}px`, flexShrink: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
