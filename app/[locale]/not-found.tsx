"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { Box, Typography, Button, Stack } from "@mui/material";
import { HomeIcon, ArrowLeftIcon } from "@/components/ui/icon";

export default function NotFound() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 4, sm: 6, lg: 8 },
            }}
        >
            {/* Background */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '33%',
                        left: '25%',
                        width: '33%',
                        height: '33%',
                        bgcolor: 'primary.main',
                        opacity: 0.1,
                        borderRadius: '50%',
                        filter: 'blur(48px)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '33%',
                        right: '25%',
                        width: '25%',
                        height: '25%',
                        bgcolor: '#a855f7',
                        opacity: 0.1,
                        borderRadius: '50%',
                        filter: 'blur(48px)',
                    }}
                />
            </Box>

            <Box
                component={m.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{ textAlign: 'center', maxWidth: '28rem' }}
            >
                {/* 404 Number */}
                <Box
                    component={m.div}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    sx={{ mb: 8 }}
                >
                    <Typography
                        component="span"
                        sx={{
                            fontSize: { xs: '7.5rem', sm: '10rem' },
                            fontWeight: 700,
                            lineHeight: 1,
                            background: (theme) =>
                                `linear-gradient(to bottom right, ${theme.palette.text.primary}, ${theme.palette.text.primary}80)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        404
                    </Typography>
                </Box>

                {/* Message */}
                <Typography
                    component={m.h1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    variant="h4"
                    sx={{ fontWeight: 600, mb: 4 }}
                >
                    Page Not Found
                </Typography>

                <Typography
                    component={m.p}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 8 }}
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </Typography>

                {/* Actions */}
                <Stack
                    component={m.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        component={Link}
                        href="/"
                        variant="contained"
                        startIcon={<HomeIcon size={16} />}
                    >
                        Go Home
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => window.history.back()}
                        startIcon={<ArrowLeftIcon size={16} />}
                    >
                        Go Back
                    </Button>
                </Stack>

                {/* Decorative element */}
                <Box
                    component={m.div}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    sx={{ mt: 16, display: 'flex', justifyContent: 'center' }}
                >
                    <Box
                        sx={{
                            width: '5rem',
                            height: '0.25rem',
                            bgcolor: 'primary.main',
                            borderRadius: '9999px',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
