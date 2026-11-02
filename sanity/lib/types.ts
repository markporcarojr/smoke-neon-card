import type { SanityImageSource } from "@sanity/image-url";

export type LinkButton = {
  _key: string;
  label: string;
  kind: "url" | "email" | "menu";
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
