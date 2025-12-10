"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export function AnimatedBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate random particles on mount
        const generateParticles = () => {
            const newParticles: Particle[] = [];
            for (let i = 0; i < 50; i++) {
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
    }, []);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Gradient orbs */}
            <motion.div
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
                className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl"
            />
            <motion.div
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
                className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl"
            />

            {/* Third orb for depth */}
            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl"
            />

            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-accent/20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
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
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
}
