"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HomeIcon, ArrowLeftIcon } from "@/components/ui/icon";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-1/4 h-1/4 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <span className="text-[120px] sm:text-[160px] font-bold leading-none bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                        404
                    </span>
                </motion.div>

                {/* Message */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl sm:text-3xl font-semibold mb-4"
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-muted-foreground mb-8"
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </motion.p>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                        <HomeIcon size={16} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 font-medium rounded-lg hover:bg-foreground/5 transition-colors"
                    >
                        <ArrowLeftIcon size={16} />
                        Go Back
                    </button>
                </motion.div>

                {/* Decorative element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="w-20 h-1 bg-accent rounded-full" />
                </motion.div>
            </motion.div>
        </div>
    );
}
