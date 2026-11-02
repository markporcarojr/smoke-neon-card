export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-11-01";

/** False until the Sanity env vars are filled in. The site falls back to sample content. */
export const isSanityConfigured = projectId.length > 0;
