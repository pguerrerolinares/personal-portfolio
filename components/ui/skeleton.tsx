import { type HTMLAttributes } from "react";

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

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            style={computedStyle}
            {...props}
        />
    );
}

// Pre-built skeleton layouts
export function CardSkeleton() {
    return (
        <div className="bg-foreground/[0.02] border border-foreground/10 rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <Skeleton width={150} height={24} variant="rectangular" />
                    <Skeleton width={100} height={16} />
                </div>
                <Skeleton width={80} height={28} variant="rectangular" />
            </div>
            <Skeleton width="100%" height={16} />
            <Skeleton width="80%" height={16} />
            <div className="flex gap-2 pt-4 border-t border-foreground/5">
                <Skeleton width={60} height={24} variant="rectangular" />
                <Skeleton width={60} height={24} variant="rectangular" />
                <Skeleton width={60} height={24} variant="rectangular" />
            </div>
        </div>
    );
}

export function SectionSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-16">
                <Skeleton width={200} height={36} className="mx-auto mb-4" variant="rectangular" />
                <Skeleton width={400} height={20} className="mx-auto" />
                <Skeleton width={80} height={4} className="mx-auto mt-4" variant="rectangular" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
