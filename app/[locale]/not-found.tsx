"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { HomeIcon, ArrowLeftIcon } from "@/components/ui/icon";
import styles from './not-found.module.scss';

export default function NotFound() {
    return (
        <div className={styles.container}>
            {/* Background */}
            <div className={styles.background}>
                <div className={styles.orb1} />
                <div className={styles.orb2} />
            </div>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.content}
            >
                {/* 404 Number */}
                <m.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={styles.number}
                >
                    <span className={styles.numberText}>404</span>
                </m.div>

                {/* Message */}
                <m.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={styles.title}
                >
                    Page Not Found
                </m.h1>

                <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={styles.message}
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </m.p>

                {/* Actions */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={styles.actions}
                >
                    <Link href="/" className={styles.homeLink}>
                        <HomeIcon size={16} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className={styles.backButton}
                    >
                        <ArrowLeftIcon size={16} />
                        Go Back
                    </button>
                </m.div>

                {/* Decorative element */}
                <m.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={styles.accent}
                >
                    <div className={styles.accentLine} />
                </m.div>
            </m.div>
        </div>
    );
}
