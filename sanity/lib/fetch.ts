import { cacheLife, cacheTag } from "next/cache";
import { client } from "./client";
import { MENU_QUERY, PROMOTIONS_QUERY, SETTINGS_QUERY } from "./queries";
import { sampleMenu, samplePromotions, sampleSettings } from "./sample";
import type { MenuKind, MenuSection, Promotion, SiteSettings } from "./types";

// Cached until Sanity's webhook hits /api/revalidate with the matching document type.

export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("max");
  cacheTag("siteSettings");
  if (!client) return sampleSettings;
  const settings = await client.fetch<SiteSettings | null>(SETTINGS_QUERY);
  return settings ?? sampleSettings;
}

export async function getMenu(menu: MenuKind): Promise<MenuSection[]> {
  "use cache";
  cacheLife("max");
  cacheTag("menuCategory", "menuItem");
  if (!client) return sampleMenu[menu];
  return client.fetch<MenuSection[]>(MENU_QUERY, { menu });
}

// Promotions start and stop by date, so this also refreshes every hour on its own.
export async function getPromotions(): Promise<Promotion[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("promotion");
  const all = client ? await client.fetch<Promotion[]>(PROMOTIONS_QUERY) : samplePromotions;
  const today = todayInMichigan();
  return all.filter((p) => (!p.startDate || p.startDate <= today) && (!p.endDate || p.endDate >= today));
}

// YYYY-MM-DD in the bar's time zone, to compare with Sanity's date fields
function todayInMichigan() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Detroit" }).format(new Date());
}
