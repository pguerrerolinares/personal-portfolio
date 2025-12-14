"use client";

import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { FadeIn } from "./fade-in";

interface TimelineItemProps extends BoxProps {
    children: ReactNode;
    index?: number;
    isLast?: boolean;
    lineColor?: string;
    dotColor?: string;
}

export function TimelineItem({
    children,
    index = 0,
    isLast = false,
    lineColor = 'divider',
    dotColor = 'primary.main',
    sx,
    ...props
}: TimelineItemProps) {
    return (
        <FadeIn
            delay={index * 0.1}
            direction="right"
            sx={{ position: 'relative', pl: { xs: 2, md: 4 }, pb: isLast ? 0 : 3, ...sx }}
            {...(props as any)}
        >
            {/* Timeline line */}
            {!isLast && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: 4, md: 12 },
                        top: 0,
                        bottom: 0,
                        width: 2,
                        bgcolor: lineColor,
                    }}
                />
            )}

            {/* Timeline dot */}
            <FadeIn
                delay={index * 0.1 + 0.2}
                direction="none"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                style={{
                    position: 'absolute',
                    left: 0, // dynamic base handled in sx
                    top: 12, // Align with typical header height
                    zIndex: 1,
                }}
                sx={{
                    left: { xs: 0, md: 8 },
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: dotColor,
                    border: 3,
                    borderColor: 'background.default',
                }}
            />

            <Box sx={{ ml: { xs: 2, md: 4 } }}>
                {children}
            </Box>
        </FadeIn>
    );
}
