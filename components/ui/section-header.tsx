"use client";

import { m } from "framer-motion";
import { type ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
    centered?: boolean;
    showAccent?: boolean;
}

export function SectionHeader({
    title,
    subtitle,
    children,
    centered = true,
    showAccent = true,
}: SectionHeaderProps) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`mb-16 ${centered ? "text-center" : ""}`}
        >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
                <p className={`text-muted-foreground ${centered ? "max-w-2xl mx-auto" : ""}`}>
                    {subtitle}
                </p>
            )}
            {showAccent && (
                <div className={`w-20 h-1 bg-accent rounded-full mt-4 ${centered ? "mx-auto" : ""}`} />
            )}
            {children}
        </m.div>
    );
}
