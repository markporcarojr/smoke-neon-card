import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";
import { logoUrl } from "@/components/logo";
import { getMenu, getSettings } from "@/sanity/lib/fetch";

export const metadata = { title: "Food & Drink" };

const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 });

export default async function MenuPage() {
  const [settings, sections] = await Promise.all([getSettings(), getMenu()]);
  const visible = sections.filter((s) => s.items.length > 0);

  return (
    <div className="landing phase-done menu-page">
      <Backdrop logoUrl={logoUrl(settings)} alt="" />
      <main className="page page-top">
        <Link href="/" className="back">
          ← Back
        </Link>
        <h1 className="menu-title">Food &amp; Drink</h1>

        {visible.length === 0 ? (
          <p className="menu-empty">The menu is being updated. Check back soon.</p>
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
                      {typeof item.price === "number" ? <span className="menu-price">{price.format(item.price)}</span> : null}
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
