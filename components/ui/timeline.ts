"use client";

import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { FadeIn } from "./fade-in";
import { h, when } from "@/lib/react-helpers";

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
    return h(FadeIn, {
        'data-component': "TimelineItem",
        delay: index * 0.1,
        direction: "right",
        sx: { position: 'relative', pl: { xs: 0, md: 4 }, pb: isLast ? 0 : 3, ...sx },
        ...(props as any),
        children: [
            // Timeline line
            when(!isLast, () =>
                h(Box, {
                    key: 'timeline-line',
                    sx: {
                        position: 'absolute',
                        left: { xs: 5, md: 12 },
                        top: 0,
                        bottom: 0,
                        width: 2,
                        display: { xs: 'none', md: 'block' },
                        bgcolor: lineColor,
                    }
                })
            ),

            // Timeline dot
            h(FadeIn, {
                key: 'timeline-dot',
                delay: index * 0.1 + 0.2,
                direction: "none",
                initial: { scale: 0 },
                whileInView: { scale: 1 },
                style: {
                    position: 'absolute',
                    left: 0,
                    top: 12,
                    zIndex: 1,
                },
                sx: {
                    left: { xs: 0, md: 8 },
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    display: { xs: 'none', md: 'block' },
                    bgcolor: dotColor,
                    border: 3,
                    borderColor: 'background.default',
                }
            }),

            h(Box, {
                key: 'content',
                sx: { ml: { xs: 0, md: 4 } }
            }, children)
        ]
    });
}
