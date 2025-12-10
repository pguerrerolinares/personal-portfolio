"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from './animated-background.module.scss';

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
        <div className={styles.background}>
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
                className={`${styles.orb} ${styles.orb1}`}
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
                className={`${styles.orb} ${styles.orb2}`}
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
                className={`${styles.orb} ${styles.orb3}`}
            />

            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={styles.particle}
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
            <div className={styles.grid} />
        </div>
    );
}
