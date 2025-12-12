'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
    const reducedMotion = useReducedMotion();

    return (
        <LazyMotion features={domAnimation}>
            <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
                {children}
            </MotionConfig>
        </LazyMotion>
    );
}
