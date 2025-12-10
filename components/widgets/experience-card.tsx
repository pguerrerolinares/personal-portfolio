"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Briefcase, Code, Calendar } from "lucide-react";
import type { Experience } from "@/lib/constants/portfolio-data";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

const typeIcons = {
  fulltime: Briefcase,
  freelance: Code,
  personal: Code,
};

const typeColors = {
  fulltime: "bg-accent/20 text-accent border-accent/30",
  freelance: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  personal: "bg-purple-500/20 text-purple-500 border-purple-500/30",
};

function formatDate(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const Icon = typeIcons[experience.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-2 h-2 -translate-x-1/2 rounded-full bg-accent" />

      {/* Content */}
      <div className="bg-foreground/[0.02] border border-foreground/10 rounded-xl p-6 hover:border-foreground/20 transition-colors">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-semibold">{experience.role}</h3>
            <p className="text-accent font-medium">{experience.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${typeColors[experience.type]}`}
            >
              <Icon className="w-3 h-3" />
              {experience.type === "fulltime"
                ? "Full-time"
                : experience.type === "freelance"
                  ? "Freelance"
                  : "Personal"}
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDate(experience.startDate, locale)} —{" "}
            {experience.endDate ? formatDate(experience.endDate, locale) : t("present")}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4">
          {experience.description}
        </p>

        {/* Highlights */}
        {experience.highlights.length > 0 && (
          <ul className="space-y-2 mb-4">
            {experience.highlights.map((highlight, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-accent mt-1.5">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-foreground/5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-foreground/5 text-muted-foreground rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
