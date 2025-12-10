"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    index?: number;
}

const typeColors = {
    primary: "bg-accent/20 text-accent border-accent/30",
    secondary: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    tertiary: "bg-purple-500/20 text-purple-500 border-purple-500/30",
};

export function ContactCard({
    icon: Icon,
    label,
    value,
    href,
    external = false,
    index = 0,
}: ContactCardProps) {
    const content = (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative pl-8 pb-8 last:pb-0 group"
        >
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10" />

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-2 h-2 -translate-x-1/2 rounded-full bg-accent group-hover:scale-125 transition-transform" />

            {/* Content */}
            <div className="bg-foreground/[0.02] border border-foreground/10 rounded-xl p-5 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="font-medium truncate group-hover:text-accent transition-colors">
                            {value}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="block"
            >
                {content}
            </a>
        );
    }

    return content;
}
