"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GithubIcon, LinkedinIcon, ArrowDownIcon } from "@/components/ui/icon";

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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center"
      >
        {/* Greeting */}
        <motion.p
          variants={item}
          className="text-muted-foreground text-lg sm:text-xl mb-4"
        >
          {t("greeting")}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          {t("name")}
        </motion.h1>

        {/* Role */}
        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-accent mb-6"
        >
          {t("role")}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          {t("description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="#projects"
            className="px-8 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {t("cta.projects")}
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 border border-foreground/20 font-medium rounded-lg hover:bg-foreground/5 transition-colors"
          >
            {t("cta.contact")}
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-6"
        >
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={24} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={24} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon size={24} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
