"use client";

import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const MotionBox = motion.create(Box);

interface GradientMeshProps {
  variant?: "hero" | "section" | "subtle";
  animated?: boolean;
}

export function GradientMesh({ variant = "hero", animated = true }: GradientMeshProps) {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme.palette.mode === "dark";
  const shouldAnimate = animated && !prefersReducedMotion;

  // Different gradient configurations for each variant
  const gradientConfigs = {
    hero: {
      blobs: [
        {
          color: isDark ? "rgba(99, 102, 241, 0.25)" : "rgba(99, 102, 241, 0.15)", // Indigo
          size: "60%",
          position: { top: "-20%", left: "10%" },
          blur: "80px",
        },
        {
          color: isDark ? "rgba(14, 165, 233, 0.20)" : "rgba(14, 165, 233, 0.12)", // Sky
          size: "50%",
          position: { top: "30%", right: "-10%" },
          blur: "100px",
        },
        {
          color: isDark ? "rgba(13, 148, 136, 0.18)" : "rgba(13, 148, 136, 0.10)", // Teal
          size: "45%",
          position: { bottom: "-10%", left: "30%" },
          blur: "90px",
        },
      ],
    },
    section: {
      blobs: [
        {
          color: isDark ? "rgba(0, 113, 227, 0.08)" : "rgba(0, 113, 227, 0.04)",
          size: "40%",
          position: { top: "10%", right: "10%" },
          blur: "60px",
        },
      ],
    },
    subtle: {
      blobs: [
        {
          color: isDark ? "rgba(99, 102, 241, 0.05)" : "rgba(99, 102, 241, 0.03)",
          size: "50%",
          position: { top: "20%", left: "20%" },
          blur: "80px",
        },
      ],
    },
  };

  const config = gradientConfigs[variant];

  // Animation variants for each blob
  const blobAnimations = [
    {
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.95, 1],
    },
    {
      x: [0, -40, 30, 0],
      y: [0, 20, -30, 0],
      scale: [1, 0.9, 1.15, 1],
    },
    {
      x: [0, 20, -30, 0],
      y: [0, 30, -20, 0],
      scale: [1, 1.05, 0.9, 1],
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* Base noise texture overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: isDark ? 0.03 : 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Gradient blobs */}
      {config.blobs.map((blob, index) => (
        <MotionBox
          key={index}
          sx={{
            position: "absolute",
            width: blob.size,
            aspectRatio: "1",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: `blur(${blob.blur})`,
            ...blob.position,
          }}
          animate={
            shouldAnimate
              ? blobAnimations[index % blobAnimations.length]
              : undefined
          }
          transition={
            shouldAnimate
              ? {
                  duration: 20 + index * 5,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      ))}

      {/* Grid overlay for hero */}
      {variant === "hero" && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px),
                              linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
      )}

      {/* Vignette effect */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, ${isDark ? "rgba(0,0,0,0.4)" : "rgba(245,245,247,0.6)"} 100%)`,
        }}
      />
    </Box>
  );
}

// Animated gradient border for cards
interface GradientBorderProps {
  children: React.ReactNode;
  borderRadius?: string | number;
  borderWidth?: number;
  animated?: boolean;
}

export function GradientBorder({
  children,
  borderRadius = "1rem",
  borderWidth = 1,
  animated = true,
}: GradientBorderProps) {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme.palette.mode === "dark";
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius,
        padding: `${borderWidth}px`,
        background: isDark
          ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 100%)"
          : "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.05) 100%)",
        "&::before": shouldAnimate
          ? {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius,
              padding: `${borderWidth}px`,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, transparent 50%, ${theme.palette.accent.cyan}20 100%)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }
          : undefined,
        "&:hover::before": shouldAnimate
          ? {
              opacity: 1,
            }
          : undefined,
      }}
    >
      <Box
        sx={{
          borderRadius: `calc(${typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius} - ${borderWidth}px)`,
          background: theme.palette.background.paper,
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
