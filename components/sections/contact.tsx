"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { ContactCard } from "@/components/widgets";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
} from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactItems = [
    {
      icon: Mail,
      label: t("info.email"),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      external: false,
    },
    {
      icon: MapPin,
      label: t("info.location"),
      value: personalInfo.location,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@pguerrerolinares",
      href: personalInfo.social.github,
      external: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Paul Guerrero Linares",
      href: personalInfo.social.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground/[0.02]">
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

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info with timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{t("info.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("info.description")}</p>
            </div>

            {/* Timeline of contact methods */}
            <div className="relative">
              {contactItems.map((item, index) => (
                <ContactCard
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  href={item.href}
                  external={item.external}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-foreground/10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder={t("form.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-foreground/10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-foreground/10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formStatus === "loading" ? (
                  <span className="animate-pulse">{t("form.sending")}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t("form.submit")}
                  </>
                )}
              </button>

              {/* Status messages */}
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-500 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  {t("form.success")}
                </motion.div>
              )}

              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-500 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {t("form.error")}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
