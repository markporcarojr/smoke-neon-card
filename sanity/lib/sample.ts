import type { MenuSection, SiteSettings } from "./types";

// Shown until the Sanity env vars are set, so the site runs right after `npm install`.
export const sampleSettings: SiteSettings = {
  businessName: "Sample Bar",
  glowColor: "#e9b14c",
  showIntro: true,
  links: [
    { _key: "1", label: "Website", kind: "url", url: "https://example.com" },
    { _key: "2", label: "OpenTable", kind: "url", url: "https://www.opentable.com" },
    { _key: "3", label: "Book Your Event!", kind: "email", email: "events@example.com", emailSubject: "Event inquiry", featured: true },
    { _key: "4", label: "Instagram", kind: "url", url: "https://instagram.com" },
    { _key: "5", label: "Food & Drink", kind: "menu" },
    { _key: "6", label: "Apple Maps", kind: "url", url: "https://maps.apple.com" },
    { _key: "7", label: "Google Maps", kind: "url", url: "https://maps.google.com" },
  ],
};

export const sampleMenu: MenuSection[] = [
  {
    _id: "s1",
    title: "Cocktails",
    note: "Sample items until the menu is filled in",
    items: [
      { _id: "i1", name: "Old Fashioned", description: "Bourbon, demerara, aromatic bitters, orange peel", price: 13 },
      { _id: "i2", name: "Lime Gimlet", description: "Gin, fresh lime, a little sugar", price: 12 },
    ],
  },
  {
    _id: "s2",
    title: "Small Plates",
    items: [
      { _id: "i3", name: "Soft Pretzel", description: "Beer cheese, grain mustard", price: 9 },
      { _id: "i4", name: "Fried Pickles", description: "Ranch for dipping", price: 8 },
    ],
  },
];
