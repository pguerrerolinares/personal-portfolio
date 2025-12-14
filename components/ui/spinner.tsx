import { CircularProgress, Box } from "@mui/material";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string; // Kept for compatibility but unused
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const muiSize = size === "sm" ? 20 : size === "md" ? 40 : 60;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={className}
      role="status"
      aria-label="Loading"
    >
      <CircularProgress size={muiSize} />
    </Box>
  );
}
