"use client";

import { Box, Container, ContainerProps } from "@mui/material";

interface SectionContainerProps extends Omit<ContainerProps, 'component'> {
  children: React.ReactNode;
  id?: string;
  bgcolor?: 'default' | 'paper';
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingMap = {
  sm: { xs: 6, md: 8 },
  md: { xs: 8, md: 12 },
  lg: { xs: 10, md: 16 },
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
