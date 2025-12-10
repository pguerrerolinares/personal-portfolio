import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://paulgl.dev";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/es`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
