import { cacheLife, cacheTag } from "next/cache";
import { client } from "./client";
import { MENU_QUERY, SETTINGS_QUERY } from "./queries";
import { sampleMenu, sampleSettings } from "./sample";
import type { MenuSection, SiteSettings } from "./types";

// Cached until Sanity's webhook hits /api/revalidate with the matching document type.

export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("max");
  cacheTag("siteSettings");
  if (!client) return sampleSettings;
  const settings = await client.fetch<SiteSettings | null>(SETTINGS_QUERY);
  return settings ?? sampleSettings;
}

export async function getMenu(): Promise<MenuSection[]> {
  "use cache";
  cacheLife("max");
  cacheTag("menuCategory", "menuItem");
  if (!client) return sampleMenu;
  return client.fetch<MenuSection[]>(MENU_QUERY);
}
