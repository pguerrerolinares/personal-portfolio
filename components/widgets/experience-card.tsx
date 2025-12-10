"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { BriefcaseIcon, CodeIcon, CalendarIcon, Building2Icon } from "@/components/ui/icon";
import type { Experience } from "@/lib/constants/portfolio-data";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

const typeIcons = {
  fulltime: BriefcaseIcon,
  freelance: CodeIcon,
  personal: CodeIcon,
};

const typeColors = {
  fulltime: "bg-accent/20 text-accent border-accent/30",
  freelance: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  personal: "bg-purple-500/20 text-purple-500 border-purple-500/30",
};

const typeGradients = {
  fulltime: "from-accent/20 to-accent/5",
  freelance: "from-blue-500/20 to-blue-500/5",
  personal: "from-purple-500/20 to-purple-500/5",
};

function formatDate(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

// Get company initials for logo placeholder
function getCompanyInitials(company: string): string {
  const words = company.split(/[\s–-]+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const Icon = typeIcons[experience.type];
  const initials = getCompanyInitials(experience.company);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-foreground/10 to-transparent" />

      {/* Timeline dot with pulse effect */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
        className="absolute left-0 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/30"
      />

      {/* Content */}
      <div className="bg-foreground/[0.02] border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300">
        {/* Header with gradient and logo */}
        <div className={`relative px-6 py-4 bg-gradient-to-r ${typeGradients[experience.type]}`}>
          <div className="flex items-start gap-4">
            {/* Company logo placeholder */}
            <div className="w-12 h-12 rounded-lg bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center flex-shrink-0">
              {experience.type === "personal" ? (
                <Building2Icon size={24} className="text-muted-foreground" />
              ) : (
                <span className="text-sm font-bold text-foreground">{initials}</span>
              )}
            </div>

            {/* Title and company */}
            <div className="flex-grow min-w-0">
              <h3 className="text-lg font-semibold truncate">{experience.role}</h3>
              <p className="text-accent font-medium text-sm">{experience.company}</p>
            </div>

            {/* Type badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${typeColors[experience.type]}`}
            >
              <Icon size={12} />
              {experience.type === "fulltime"
                ? "Full-time"
                : experience.type === "freelance"
                  ? "Freelance"
                  : "Personal"}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <CalendarIcon size={16} />
            <span>
              {formatDate(experience.startDate, locale)} —{" "}
              {experience.endDate ? formatDate(experience.endDate, locale) : t("present")}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
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
                  <span className="text-accent mt-1 text-lg leading-none">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-foreground/5">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-foreground/5 text-muted-foreground rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
