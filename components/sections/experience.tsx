"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { experiences } from "@/lib/constants/portfolio-data";
import { ExperienceCard } from "@/components/widgets";
import { FileDownIcon } from "@/components/ui/icon";

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Download resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">{t("cta.text")}</p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <FileDownIcon size={20} />
            {t("cta.button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
