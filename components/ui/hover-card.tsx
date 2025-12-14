"use client";

import { Card, CardProps } from "@mui/material";
import { ReactNode } from "react";

interface HoverCardProps extends CardProps {
    children: ReactNode;
    hoverScale?: boolean;
    hoverShadow?: boolean;
    hoverTranslateY?: number;
}

export function HoverCard({
    children,
    hoverScale = false,
    hoverShadow = true,
    hoverTranslateY = -4,
    sx,
    ...props
}: HoverCardProps) {
    return (
        <Card
            sx={{
                transition: 'all 0.3s',
                '&:hover': {
                    transform: `translateY(${hoverTranslateY}px)${hoverScale ? ' scale(1.02)' : ''}`,
                    boxShadow: hoverShadow ? 4 : 1,
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </Card>
    );
}
