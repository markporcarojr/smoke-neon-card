import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

// useCdn is off because Next.js caches the results itself ('use cache' + cacheTag),
// and the webhook clears that cache whenever something is published.
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null;
