import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";
import { logoUrl } from "@/components/logo";
import { getPromotions, getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const metadata = { title: "Promotions" };

export default async function PromotionsPage() {
  const [settings, promos] = await Promise.all([getSettings(), getPromotions()]);

  return (
    <div className="landing phase-done menu-page">
      <Backdrop logoUrl={logoUrl(settings)} alt="" />
      <main className="page page-top">
        <nav className="subnav">
          <Link href="/" className="back">
            ← Back
          </Link>
        </nav>
        <h1 className="menu-title">Promotions</h1>

        {promos.length === 0 ? (
          <p className="menu-empty">No specials running right now. Check back soon.</p>
        ) : (
          <ul className="promos">
            {promos.map((promo) => (
              <li key={promo._id} className="promo">
                {promo.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="promo-img"
                    src={urlFor(promo.image).width(1000).height(560).fit("crop").auto("format").url()}
                    alt=""
                  />
                ) : null}
                <div className="promo-body">
                  <h2>{promo.title}</h2>
                  {promo.when ? <p className="promo-when">{promo.when}</p> : null}
                  {promo.details ? <p className="menu-desc">{promo.details}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
