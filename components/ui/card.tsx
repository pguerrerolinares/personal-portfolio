"use client";

import { type ReactNode } from "react";
import { m, type HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    variant?: "default" | "ghost" | "outline";
    hover?: boolean;
    index?: number;
}

const variants = {
    default: "bg-foreground/[0.02] border border-foreground/10",
    ghost: "bg-transparent",
    outline: "bg-transparent border border-foreground/10",
};

const hoverStyles = "hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all duration-300";

export function Card({
    children,
    variant = "default",
    hover = true,
    index = 0,
    className = "",
    ...props
}: CardProps) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-xl p-6 ${variants[variant]} ${hover ? hoverStyles : ""} ${className}`}
            {...props}
        >
            {children}
        </m.div>
    );
}
