"use client";

import { Box, CardContent, Typography, Stack } from "@mui/material";
import { HoverCard, TimelineItem } from "@/components/ui";
import type { IconProps } from "@/components/ui/icon";
import { h, when } from "@/lib/react-helpers";

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
    const cardContent = h(HoverCard, {
        tabIndex: href ? undefined : 0,
        role: href ? undefined : "article",
        'aria-label': `Contact: ${label}`,
        hoverShadow: !!href,
        'data-component': "ContactCard"
    }, h(CardContent, {
        children:
        h(Stack, {
            direction: "row",
            spacing: 2,
            alignItems: "center",
            children: [
                h(Box, {
                    key: 'icon',
                    sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                    }
                }, h(Icon, { size: 20 })),
                h(Box, {
                    key: 'content',
                    sx: { flex: 1 },
                    children: [
                        h(Typography, {
                            key: 'label',
                            variant: "body2",
                            color: "text.secondary"
                        }, label),
                        h(Typography, {
                            key: 'value',
                            variant: "body1",
                            sx: { fontWeight: 500 }
                        }, value)
                    ]
                })
            ]
        })
    }));

    const content = h(TimelineItem, { index },
        href
            ? h(Box, {
                component: "a",
                href,
                target: external ? "_blank" : undefined,
                rel: external ? "noopener noreferrer" : undefined,
                'aria-label': `${label}: ${value}`,
                sx: {
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                }
            }, cardContent)
            : cardContent
    );

    return content;
}
