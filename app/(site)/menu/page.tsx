import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";
import { logoUrl } from "@/components/logo";
import { getSettings } from "@/sanity/lib/fetch";

export const metadata = { title: "Menu" };

// Picker page, so old "Food & Drink" buttons and printed links to /menu keep working.
export default async function MenuPicker() {
  const settings = await getSettings();
  return (
    <div className="landing phase-done">
      <Backdrop logoUrl={logoUrl(settings)} alt="" />
      <main className="page">
        <h1 className="sr-only">Menu</h1>
        <ul className="links">
          <li style={{ "--i": 0 } as React.CSSProperties}>
            <Link className="btn" href="/food">
              Food
            </Link>
          </li>
          <li style={{ "--i": 1 } as React.CSSProperties}>
            <Link className="btn" href="/drinks">
              Drinks
            </Link>
          </li>
        </ul>
        <Link href="/" className="back">
          ← Back
        </Link>
      </main>
    </div>
  );
}
