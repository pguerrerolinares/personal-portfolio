"use client";

import { type ReactNode } from "react";
import { Card as MuiCard } from "@mui/material";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    variant?: "default" | "ghost" | "outline";
    hover?: boolean;
    index?: number;
}

const MotionCard = motion.create(MuiCard);

export function Card({
    children,
    variant = "default",
    hover = true,
    index = 0,
    className = "",
    ...props
}: CardProps) {
    return (
        <MotionCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            elevation={variant === "default" ? 1 : 0}
            variant={variant === "outline" ? "outlined" : "elevation"}
            className={className}
            sx={{
                p: 3,
                borderRadius: 3,
                ...(variant === "ghost" && {
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                }),
                ...(hover && {
                    transition: 'all 0.3s',
                    '&:hover': {
                        borderColor: 'divider',
                        bgcolor: 'action.hover',
                    },
                }),
            }}
            {...props}
        >
            {children}
        </MotionCard>
    );
}
