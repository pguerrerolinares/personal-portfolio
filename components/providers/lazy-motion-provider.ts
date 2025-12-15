'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { h } from "@/lib/react-helpers";

export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
    const reducedMotion = useReducedMotion();

    return h(LazyMotion, {
        features: domAnimation,
        children: h(MotionConfig, {
            reducedMotion: reducedMotion ? "always" : "never"
        }, children)
    });
}
