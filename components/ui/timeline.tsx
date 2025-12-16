"use client";

import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { FadeIn } from "./fade-in";

interface TimelineItemProps {
    children: ReactNode;
    index?: number;
    isLast?: boolean;
    lineColor?: string;
    dotColor?: string;
    sx?: SxProps<Theme>;
}

export function TimelineItem({
    children,
    index = 0,
    isLast = false,
    lineColor = 'divider',
    dotColor = 'primary.main',
    sx,
}: TimelineItemProps) {
    return (
        <FadeIn
            data-component="TimelineItem"
            delay={index * 0.1}
            direction="right"
            sx={{ position: 'relative', pl: { xs: 0, md: 4 }, pb: isLast ? 0 : 3, ...sx }}
        >
            {/* Timeline line */}
            {!isLast && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: 5, md: 12 },
                        top: 0,
                        bottom: 0,
                        width: 2,
                        display: { xs: 'none', md: 'block' },
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
                    display: { xs: 'none', md: 'block' },
                    bgcolor: dotColor,
                    border: 3,
                    borderColor: 'background.default',
                }}
            />

            <Box sx={{ ml: { xs: 0, md: 4 } }}>
                {children}
            </Box>
        </FadeIn>
    );
}
