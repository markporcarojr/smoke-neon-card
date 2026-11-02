import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

export function logoUrl(settings: SiteSettings) {
  return settings.logo ? urlFor(settings.logo).width(900).auto("format").url() : "/logo.jpg";
}
