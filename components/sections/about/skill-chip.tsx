"use client";

import { Box, Typography } from "@mui/material";
import type { Skill } from "@/types";

interface SkillChipProps {
  skill: Skill;
}

export function SkillChip({ skill }: SkillChipProps) {
  const isExpert = skill.level === "expert";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2.5,
        py: 1,
        borderRadius: "20px",
        bgcolor: isExpert ? "primary.main" : "background.paper",
        color: isExpert ? "primary.contrastText" : "text.primary",
        border: 1,
        borderColor: isExpert ? "primary.main" : "divider",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: isExpert ? 600 : 500,
        }}
      >
        {skill.name}
      </Typography>
    </Box>
  );
}
