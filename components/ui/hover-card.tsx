"use client";

import { Card, CardProps } from "@mui/material";
import { ReactNode } from "react";

interface HoverCardProps extends CardProps {
    children: ReactNode;
    hoverShadow?: boolean;
}

export function HoverCard({
    children,
    hoverShadow = true,
    sx,
    ...props
}: HoverCardProps) {
    return (
        <Card
            sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
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
