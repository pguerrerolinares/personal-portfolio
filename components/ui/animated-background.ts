"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { h, map, when } from "@/lib/react-helpers";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

const orbStyles = {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
};

export function AnimatedBackground() {
    const reducedMotion = useReducedMotion();
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (reducedMotion) return; // Skip particles when reduced motion is preferred

        const generateParticles = () => {
            const count = isMobile ? 15 : 30; // Reduced from 50
            const newParticles: Particle[] = [];
            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 4 + 1,
                    duration: Math.random() * 20 + 10,
                    delay: Math.random() * 5,
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
    }, [reducedMotion, isMobile]);

    if (reducedMotion) {
        return h(Box, {
            sx: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                overflow: 'hidden',
            },
            children: [
                // Static gradients only when reduced motion is preferred
                h(Box, {
                    key: 'orb-1',
                    sx: { ...orbStyles, top: '10%', left: '10%', width: '500px', height: '500px', bgcolor: 'primary.main', opacity: 0.15 }
                }),
                h(Box, {
                    key: 'orb-2',
                    sx: { ...orbStyles, top: '60%', right: '10%', width: '400px', height: '400px', bgcolor: 'accent.cyan', opacity: 0.12 }
                }),
                h(Box, {
                    key: 'orb-3',
                    sx: { ...orbStyles, bottom: '20%', left: '30%', width: '300px', height: '300px', bgcolor: 'accent.purple', opacity: 0.1 }
                }),
                h(Box, {
                    key: 'grid',
                    sx: {
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'linear-gradient(rgba(128, 128, 128, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                        pointerEvents: 'none',
                    }
                })
            ]
        });
    }

    return h(Box, {
        sx: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: 'hidden',
        },
        children: [
            // Animated gradient orbs
            h(Box, {
                key: 'animated-orb-1',
                component: motion.div,
                animate: {
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                },
                transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                sx: { ...orbStyles, top: '10%', left: '10%', width: '500px', height: '500px', bgcolor: 'primary.main', opacity: 0.15 }
            }),
            h(Box, {
                key: 'animated-orb-2',
                component: motion.div,
                animate: {
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.15, 1],
                },
                transition: {
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                sx: { ...orbStyles, top: '60%', right: '10%', width: '400px', height: '400px', bgcolor: 'accent.cyan', opacity: 0.12 }
            }),

            // Third orb for depth
            h(Box, {
                key: 'animated-orb-3',
                component: motion.div,
                animate: {
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                    opacity: [0.1, 0.15, 0.1],
                },
                transition: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                sx: { ...orbStyles, bottom: '20%', left: '30%', width: '300px', height: '300px', bgcolor: 'accent.purple' }
            }),

            // Floating particles
            ...map(particles, (particle) =>
                h(Box, {
                    key: particle.id,
                    component: motion.div,
                    sx: {
                        position: 'absolute',
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                    },
                    animate: {
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    },
                    transition: {
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }
                })
            ),

            // Grid pattern overlay
            h(Box, {
                key: 'grid-pattern',
                sx: {
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(128, 128, 128, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    pointerEvents: 'none',
                }
            })
        ]
    });
}
