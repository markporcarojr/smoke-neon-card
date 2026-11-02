import { NeonLanding } from "@/components/NeonLanding";
import { logoUrl } from "@/components/logo";
import { getSettings } from "@/sanity/lib/fetch";

export default async function Home() {
  const settings = await getSettings();
  return (
    <NeonLanding
      businessName={settings.businessName}
      logoUrl={logoUrl(settings)}
      links={settings.links ?? []}
      showIntro={settings.showIntro !== false}
    />
  );
}
