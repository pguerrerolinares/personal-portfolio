"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

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
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    overflow: 'hidden',
                }}
            >
                {/* Static gradients only when reduced motion is preferred */}
                <Box sx={{ ...orbStyles, top: '10%', left: '10%', width: '500px', height: '500px', bgcolor: 'primary.main', opacity: 0.15 }} />
                <Box sx={{ ...orbStyles, top: '60%', right: '10%', width: '400px', height: '400px', bgcolor: 'secondary.main', opacity: 0.12 }} />
                <Box sx={{ ...orbStyles, bottom: '20%', left: '30%', width: '300px', height: '300px', bgcolor: '#a855f7', opacity: 0.1 }} />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'linear-gradient(rgba(128, 128, 128, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                        pointerEvents: 'none',
                    }}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                overflow: 'hidden',
            }}
        >
            {/* Animated gradient orbs */}
            <Box
                component={m.div}
                animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                sx={{ ...orbStyles, top: '10%', left: '10%', width: '500px', height: '500px', bgcolor: 'primary.main', opacity: 0.15 }}
            />
            <Box
                component={m.div}
                animate={{
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                sx={{ ...orbStyles, top: '60%', right: '10%', width: '400px', height: '400px', bgcolor: 'secondary.main', opacity: 0.12 }}
            />

            {/* Third orb for depth */}
            <Box
                component={m.div}
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                sx={{ ...orbStyles, bottom: '20%', left: '30%', width: '300px', height: '300px', bgcolor: '#a855f7' }}
            />

            {/* Floating particles */}
            {particles.map((particle) => (
                <Box
                    key={particle.id}
                    component={m.div}
                    sx={{
                        position: 'absolute',
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Grid pattern overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(128, 128, 128, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    pointerEvents: 'none',
                }}
            />
        </Box>
    );
}
