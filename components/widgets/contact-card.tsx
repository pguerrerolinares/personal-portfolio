"use client";

import { m } from "framer-motion";
import { Box, Card, CardActionArea, CardContent, Typography, Stack } from "@mui/material";
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
    const content = (
        <Box
            component={m.div}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            sx={{ position: 'relative', pl: { xs: 2, md: 4 }, pb: 3 }}
        >
            {/* Timeline line */}
            <Box
                sx={{
                    position: 'absolute',
                    left: { xs: 4, md: 12 },
                    top: 0,
                    bottom: -12,
                    width: 2,
                    bgcolor: 'divider',
                }}
            />

            {/* Timeline dot */}
            <Box
                sx={{
                    position: 'absolute',
                    left: { xs: 0, md: 8 },
                    top: 12,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    border: 3,
                    borderColor: 'background.default',
                }}
            />

            <Card
                tabIndex={href ? undefined : 0}
                role={href ? undefined : "article"}
                aria-label={`Contact: ${label}`}
                sx={{
                    ml: { xs: 2, md: 4 },
                    transition: 'all 0.3s',
                    '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: href ? 3 : 1,
                    },
                }}
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
            </Card>
        </Box>
    );

    if (href) {
        return (
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
                {content}
            </Box>
        );
    }

    return content;
}
