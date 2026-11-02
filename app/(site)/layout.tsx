import type { CSSProperties } from "react";
import { getSettings } from "@/sanity/lib/fetch";
import "./site.css";

export async function generateMetadata() {
  const settings = await getSettings();
  return { title: settings.businessName };
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const glow = settings.glowColor || "#e9b14c";
  return (
    <div className="site" style={{ "--glow": glow } as CSSProperties}>
      {children}
    </div>
  );
}
