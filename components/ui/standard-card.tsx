"use client";

import { m } from "framer-motion";
import { Card, CardProps } from "@mui/material";

interface StandardCardProps {
  children: React.ReactNode;
  hover?: boolean;
  index?: number;
  sx?: CardProps['sx'];
}

const MotionCard = m(Card);

export function StandardCard({ children, hover = true, index = 0, sx }: StandardCardProps) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      sx={{
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: (theme) => theme.shadows[8],
          },
        }),
        ...sx,
      }}
    >
      {children}
    </MotionCard>
  );
}
