"use client";

import { Box, Container, ContainerProps } from "@mui/material";
import { LAYOUT } from "@/lib/theme/layout";

interface SectionContainerProps extends Omit<ContainerProps, 'component'> {
  children: React.ReactNode;
  id?: string;
  bgcolor?: 'default' | 'paper';
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingMap = {
  sm: { xs: 6, md: 10 },
  md: LAYOUT.spacing.section, // { xs: 10, md: 16 }
  lg: { xs: 12, md: 24 },
};

export function SectionContainer({
  children,
  id,
  bgcolor = 'default',
  spacing = 'md',
  ...props
}: SectionContainerProps) {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      sx={{
        py: spacingMap[spacing],
        bgcolor: bgcolor === 'paper' ? 'background.paper' : 'background.default',
      }}
    >
      <Container {...props}>
        {children}
      </Container>
    </Box>
  );
}
