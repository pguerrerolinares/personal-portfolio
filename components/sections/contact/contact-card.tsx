"use client";

import { Box, CardContent, Typography, Stack } from "@mui/material";
import { HoverCard, TimelineItem } from "@/components/ui";
import type { IconProps } from "@/components/ui/icon";

interface ContactCardProps {
    icon: React.ComponentType<IconProps>;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    index?: number;
}

export function ContactCard({
    icon: Icon,
    label,
    value,
    href,
    external = false,
    index = 0,
}: ContactCardProps) {
    const cardContent = (
        <HoverCard
            // Only make it interactive/focusable if it has a link or is meant to be
            tabIndex={href ? undefined : 0}
            role={href ? undefined : "article"}
            aria-label={`Contact: ${label}`}
            hoverShadow={!!href}
            data-component="ContactCard"
        >
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                        }}
                    >
                        <Icon size={20} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </HoverCard>
    );

    const content = (
        <TimelineItem index={index}>
            {href ? (
                <Box
                    component="a"
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={`${label}: ${value}`}
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                    }}
                >
                    {cardContent}
                </Box>
            ) : cardContent}
        </TimelineItem>
    );

    // TimelineItem handles the FadeIn wrapper logic
    return content;
}
