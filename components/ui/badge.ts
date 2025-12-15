import { type ReactNode } from "react";
import { Chip, alpha, useTheme } from "@mui/material";
import { h } from "@/lib/react-helpers";

export interface BadgeProps extends Omit<React.ComponentProps<typeof Chip>, 'color' | 'variant' | 'children' | 'size'> {
  children: ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  sx,
  ...props
}: BadgeProps) {
  const theme = useTheme();
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

  // Resolve color token from theme based on variant
  const getThemeColor = () => {
    switch (variant) {
      case "accent": return theme.palette.primary.main;
      case "success": return theme.palette.success.main;
      case "warning": return theme.palette.warning.main;
      case "error": return theme.palette.error.main;
      case "info": return theme.palette.info.main;
      default: return theme.palette.text.secondary;
    }
  };

  const colorHex = getThemeColor();

  return h(Chip, {
    label: children,
    size: muiSize,
    className,
    sx: {
      fontWeight: 500,
      height: size === "sm" ? 24 : 32,
      color: colorHex,
      bgcolor: alpha(colorHex, 0.1),
      border: `1px solid ${alpha(colorHex, 0.2)}`,
      ...(variant === "default" && {
        bgcolor: 'action.selected',
        color: 'text.primary',
        border: `1px solid ${theme.palette.divider}`,
      }),
      ...sx,
    },
    ...props
  });
}
