import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? "https://pguerrerolinares.github.io/personal-portfolio"
        : "http://localhost:3000";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
