import type { SanityImageSource } from "@sanity/image-url";

export type LinkButton = {
  _key: string;
  label: string;
  kind: "url" | "email" | "menu" | "food" | "drinks" | "promotions";
  url?: string;
  email?: string;
  emailSubject?: string;
  featured?: boolean;
};

export type SiteSettings = {
  businessName: string;
  logo?: SanityImageSource;
  glowColor?: string;
  showIntro?: boolean;
  links?: LinkButton[];
};

export type MenuSection = {
  _id: string;
  title: string;
  note?: string;
  items: { _id: string; name: string; description?: string; price?: number }[];
};

export type MenuKind = "food" | "drinks";

export type Promotion = {
  _id: string;
  title: string;
  when?: string;
  details?: string;
  image?: SanityImageSource;
  startDate?: string;
  endDate?: string;
};
