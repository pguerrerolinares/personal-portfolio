"use client";

import { m } from "framer-motion";
import type { IconProps } from "@/components/ui/icon";
import styles from './contact-card.module.scss';

interface ContactCardProps {
    icon: React.ComponentType<IconProps>;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    index?: number;
}

export function ContactCard({
    icon: Icon,
    label,
    value,
    href,
    external = false,
    index = 0,
}: ContactCardProps) {
    const content = (
        <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={styles.container}
        >
            <div className={styles.timelineLine} />
            <div className={styles.timelineDot} />

            <div className={styles.card} tabIndex={href ? undefined : 0} role={href ? undefined : "article"} aria-label={`Contact: ${label}`}>
                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <Icon size={20} className={styles.icon} />
                    </div>
                    <div className={styles.info}>
                        <p className={styles.label}>{label}</p>
                        <p className={styles.value}>{value}</p>
                    </div>
                </div>
            </div>
        </m.div>
    );

    if (href) {
        return (
            <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={styles.link}
                aria-label={`${label}: ${value}`}
            >
                {content}
            </a>
        );
    }

    return content;
}
