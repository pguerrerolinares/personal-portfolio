"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Box, Typography, Button, Stack } from "@mui/material";
import { HomeIcon, ArrowLeftIcon } from "@/components/ui/icon";
import { h } from "@/lib/react-helpers";

export default function NotFound() {
  return h(Box, {
    sx: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 4, sm: 6, lg: 8 },
    },
    children: [
      // Background
      h(Box, {
        key: 'background',
        sx: {
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          overflow: 'hidden',
        },
        children: [
          h(Box, {
            key: 'blur1',
            sx: {
              position: 'absolute',
              top: '33%',
              left: '25%',
              width: '33%',
              height: '33%',
              bgcolor: 'primary.main',
              opacity: 0.1,
              borderRadius: '50%',
              filter: 'blur(48px)',
            }
          }),
          h(Box, {
            key: 'blur2',
            sx: {
              position: 'absolute',
              bottom: '33%',
              right: '25%',
              width: '25%',
              height: '25%',
              bgcolor: '#a855f7',
              opacity: 0.1,
              borderRadius: '50%',
              filter: 'blur(48px)',
            }
          })
        ]
      }),

      h(Box, {
        key: 'content',
        component: motion.div,
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        sx: { textAlign: 'center', maxWidth: '28rem' },
        children: [
          // 404 Number
          h(Box, {
            key: '404-number',
            component: motion.div,
            initial: { scale: 0.8 },
            animate: { scale: 1 },
            transition: { duration: 0.5, delay: 0.1 },
            sx: { mb: 8 }
          },
            h(Typography, {
              component: "span",
              sx: {
                fontSize: { xs: '7.5rem', sm: '10rem' },
                fontWeight: 700,
                lineHeight: 1,
                background: (theme: any) =>
                  `linear-gradient(to bottom right, ${theme.palette.text.primary}, ${theme.palette.text.primary}80)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }
            }, "404")
          ),

          // Message
          h(Typography, {
            key: 'message',
            component: motion.h1,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.2 },
            variant: "h4",
            sx: { fontWeight: 600, mb: 4 }
          }, "Page Not Found"),

          h(Typography, {
            key: 'description',
            component: motion.p,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.3 },
            variant: "body1",
            color: "text.secondary",
            sx: { mb: 8 }
          }, "The page you're looking for doesn't exist or has been moved."),

          // Actions
          h(Stack, {
            key: 'actions',
            component: motion.div,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.4 },
            direction: { xs: 'column', sm: 'row' },
            spacing: 2,
            justifyContent: "center",
            children: [
              h(Button, {
                key: 'home',
                component: Link,
                href: "/",
                variant: "contained",
                startIcon: h(HomeIcon, { size: 16 })
              }, "Go Home"),
              h(Button, {
                key: 'back',
                variant: "outlined",
                onClick: () => window.history.back(),
                startIcon: h(ArrowLeftIcon, { size: 16 })
              }, "Go Back")
            ]
          }),

          // Decorative element
          h(Box, {
            key: 'decorative',
            component: motion.div,
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.8, delay: 0.5 },
            sx: { mt: 16, display: 'flex', justifyContent: 'center' }
          },
            h(Box, {
              sx: {
                width: '5rem',
                height: '0.25rem',
                bgcolor: 'primary.main',
                borderRadius: '9999px',
              }
            })
          )
        ]
      })
    ]
  });
}
