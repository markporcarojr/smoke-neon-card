import Link from "next/link";
import { getMenu, getSettings } from "@/sanity/lib/fetch";
import type { MenuKind } from "@/sanity/lib/types";
import { Backdrop } from "./Backdrop";
import { logoUrl } from "./logo";

const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const TITLES: Record<MenuKind, string> = { food: "Food", drinks: "Drinks" };
const OTHER: Record<MenuKind, MenuKind> = { food: "drinks", drinks: "food" };

export async function MenuView({ menu }: { menu: MenuKind }) {
  const [settings, sections] = await Promise.all([getSettings(), getMenu(menu)]);
  const visible = sections.filter((s) => s.items.length > 0);
  const other = OTHER[menu];

  return (
    <div className="landing phase-done menu-page">
      <Backdrop logoUrl={logoUrl(settings)} alt="" />
      <main className="page page-top">
        <nav className="subnav">
          <Link href="/" className="back">
            ← Back
          </Link>
          <Link href={`/${other}`} className="back">
            {TITLES[other]} →
          </Link>
        </nav>
        <h1 className="menu-title">{TITLES[menu]}</h1>

        {visible.length === 0 ? (
          <p className="menu-empty">The {TITLES[menu].toLowerCase()} menu is being updated. Check back soon.</p>
        ) : (
          visible.map((section) => (
            <section key={section._id} className="menu-section">
              <h2>{section.title}</h2>
              {section.note ? <p className="menu-note">{section.note}</p> : null}
              <ul>
                {section.items.map((item) => (
                  <li key={item._id} className="menu-item">
                    <div className="menu-row">
                      <span className="menu-name">{item.name}</span>
                      <span className="menu-dots" aria-hidden="true" />
                      {typeof item.price === "number" ? (
                        <span className="menu-price">{price.format(item.price)}</span>
                      ) : null}
                    </div>
                    {item.description ? <p className="menu-desc">{item.description}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
