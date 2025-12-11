"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Link } from "@/i18n/routing";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GithubIcon, LinkedinIcon, ArrowDownIcon } from "@/components/ui/icon";
import styles from './hero.module.scss';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className={styles.hero}>
      <AnimatedBackground />

      <m.div
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.content}
      >
        <m.p variants={item} className={styles.greeting}>
          {t("greeting")}
        </m.p>

        <m.h1 variants={item} className={styles.name}>
          {t("name")}
        </m.h1>

        <m.h2 variants={item} className={styles.role}>
          {t("role")}
        </m.h2>

        <m.p variants={item} className={styles.description}>
          {t("description")}
        </m.p>

        <m.div variants={item} className={styles.ctaContainer}>
          <Link href="#projects" className={styles.ctaPrimary}>
            {t("cta.projects")}
          </Link>
          <Link href="#contact" className={styles.ctaSecondary}>
            {t("cta.contact")}
          </Link>
        </m.div>

        <m.div variants={item} className={styles.socialLinks}>
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <GithubIcon size={24} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={24} />
          </a>
        </m.div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className={styles.scrollIndicator}
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon size={24} />
        </m.div>
      </m.div>
    </section>
  );
}
