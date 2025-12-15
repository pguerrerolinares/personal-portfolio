import { type HTMLAttributes } from "react";
import { h, div, map } from "@/lib/react-helpers";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
}

export function Skeleton({
    variant = "text",
    width,
    height,
    className = "",
    style,
    ...props
}: SkeletonProps) {
    const baseStyles = "animate-pulse bg-foreground/10";

    const variantStyles = {
        text: "rounded h-4",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    const computedStyle = {
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
        ...style,
    };

    return h('div', {
        className: `${baseStyles} ${variantStyles[variant]} ${className}`,
        style: computedStyle,
        ...props
    });
}

// Pre-built skeleton layouts
export function CardSkeleton() {
    return div({
        className: "bg-foreground/[0.02] border border-foreground/10 rounded-xl p-6 space-y-4",
        children: [
            div({
                key: 'header',
                className: "flex items-start justify-between",
                children: [
                    div({
                        key: 'title-section',
                        className: "space-y-2",
                        children: [
                            h(Skeleton, { key: 'title', width: 150, height: 24, variant: "rectangular" }),
                            h(Skeleton, { key: 'subtitle', width: 100, height: 16 })
                        ]
                    }),
                    h(Skeleton, { key: 'badge', width: 80, height: 28, variant: "rectangular" })
                ]
            }),
            h(Skeleton, { key: 'line-1', width: "100%", height: 16 }),
            h(Skeleton, { key: 'line-2', width: "80%", height: 16 }),
            div({
                key: 'footer',
                className: "flex gap-2 pt-4 border-t border-foreground/5",
                children: [
                    h(Skeleton, { key: 'tag-1', width: 60, height: 24, variant: "rectangular" }),
                    h(Skeleton, { key: 'tag-2', width: 60, height: 24, variant: "rectangular" }),
                    h(Skeleton, { key: 'tag-3', width: 60, height: 24, variant: "rectangular" })
                ]
            })
        ]
    });
}

export function SectionSkeleton({ count = 3 }: { count?: number }) {
    return div({
        className: "space-y-6",
        children: [
            div({
                key: 'header',
                className: "text-center mb-16",
                children: [
                    h(Skeleton, { key: 'title', width: 200, height: 36, className: "mx-auto mb-4", variant: "rectangular" }),
                    h(Skeleton, { key: 'subtitle', width: 400, height: 20, className: "mx-auto" }),
                    h(Skeleton, { key: 'divider', width: 80, height: 4, className: "mx-auto mt-4", variant: "rectangular" })
                ]
            }),
            div({
                key: 'grid',
                className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: map(Array.from({ length: count }), (_, i) =>
                    h(CardSkeleton, { key: i })
                )
            })
        ]
    });
}
