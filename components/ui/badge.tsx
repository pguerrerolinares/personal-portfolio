import { type ReactNode } from "react";
import { Chip } from "@mui/material";

export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = ""
}: BadgeProps) {
  const muiSize = size === "sm" ? "small" : "medium";

  // Map custom variants to MUI Chip colors/variants
  const getColor = () => {
    switch (variant) {
      case "accent":
        return "primary";
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  const color = getColor();
  const chipVariant = variant === "outline" ? "outlined" : "filled";

  return (
    <Chip
      label={children}
      size={muiSize}
      color={color as any}
      variant={chipVariant}
      className={className}
      sx={{
        fontWeight: 500,
        height: size === "sm" ? 24 : 32,
        ...(variant === "default" && {
          bgcolor: 'action.selected',
          color: 'text.primary',
        }),
      }}
    />
  );
}
