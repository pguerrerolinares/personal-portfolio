import { CircularProgress, Box } from "@mui/material";
import { h } from "@/lib/react-helpers";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string; // Kept for compatibility but unused
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const muiSize = size === "sm" ? 20 : size === "md" ? 40 : 60;

  return h(Box, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    className,
    role: "status",
    'aria-label': "Loading"
  }, h(CircularProgress, { size: muiSize }));
}
