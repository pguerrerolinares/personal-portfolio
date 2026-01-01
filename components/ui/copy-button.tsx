"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
  children: React.ReactNode;
  successMessage?: string;
  sx?: object;
}

const MotionBox = motion.create(Box);

export function CopyButton({
  text,
  children,
  successMessage,
  sx,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("common");

  const message = successMessage ?? t("copiedToClipboard");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(message);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("failedToCopy"));
    }
  }, [text, message, t]);

  return (
    <Box
      component="button"
      onClick={handleCopy}
      sx={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        color: "inherit",
        font: "inherit",
        ...sx,
      }}
    >
      {children}
      <AnimatePresence mode="wait">
        {copied && (
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: "4px",
              bgcolor: "success.main",
              color: "success.contrastText",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.6rem" }}>
              ✓
            </Typography>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
