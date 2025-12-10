"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  personalInfo,
  skills,
  skillCategories,
  type SkillCategory,
} from "@/lib/constants/portfolio-data";
import { SkillBadge } from "@/components/widgets";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function About() {
  const t = useTranslations("about");

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>
  );

  const displayCategories: SkillCategory[] = [
    "frontend",
    "backend",
    "ai-ml",
    "devops",
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio section */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3 variants={item} className="text-2xl font-semibold">
              {t("subtitle")}
            </motion.h3>

            <motion.p
              variants={item}
              className="text-muted-foreground leading-relaxed"
            >
              {t("bio.p1")}
            </motion.p>

            <motion.p
              variants={item}
              className="text-muted-foreground leading-relaxed"
            >
              {t("bio.p2")}
            </motion.p>

            <motion.p
              variants={item}
              className="text-muted-foreground leading-relaxed"
            >
              {t("bio.p3")}
            </motion.p>

            {/* Quick stats */}
            <motion.div
              variants={item}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4"
            >
              <div className="text-center p-4 rounded-lg bg-foreground/5">
                <div className="text-2xl font-bold text-accent">4+</div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.years")}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-foreground/5">
                <div className="text-2xl font-bold text-accent">
                  {skills.length}+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.technologies")}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-foreground/5 col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-accent">AI/ML</div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.focus")}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">{t("skills.title")}</h3>

            {displayCategories.map((category) => (
              <div key={category} className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {skillCategories[category]}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsByCategory[category]?.map((skill, index) => (
                    <SkillBadge key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}

            {/* Additional skills link */}
            <p className="text-sm text-muted-foreground pt-2">
              {t("skills.more")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
