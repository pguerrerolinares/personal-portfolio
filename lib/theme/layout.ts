
export const LAYOUT = {
    // Spacing factors to be used with theme.spacing()
    // 1 unit = 0.25rem (4px)
    spacing: {
        section: { xs: 14, md: 20 }, // 3.5rem / 5rem (56px / 80px) -> Airy vertical rhythm
        container: { xs: 4, md: 6 }, // 1rem / 1.5rem
        component: 4, // 1rem
        text: 2, // 0.5rem
        grid: { xs: 4, md: 6 }, // 1rem / 1.5rem -> More space between cards
    },
    // Border radius in rem
    borderRadius: {
        sm: '0.5rem',   // 8px
        md: '1rem',     // 16px - Standard Card
        lg: '1.5rem',   // 24px - Large Container
        pill: '9999px',
    },
    // Container max-widths (if needed, usually handled by MuiContainer)
    maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    }
} as const;
