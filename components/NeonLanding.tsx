"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LinkButton } from "@/sanity/lib/types";
import { Backdrop } from "./Backdrop";
import { playSmoke } from "./smoke";

type Phase = "intro" | "igniting" | "done";

const HOLD = 450; // smoke sits still
const CLEAR = 1500; // smoke rolls out
const IGNITE_AT = HOLD + CLEAR * 0.55; // logo flickers on as the smoke thins
const STEP_BACK = 1300; // logo holds full glow, then dims and the buttons drop in

export function NeonLanding({
  businessName,
  logoUrl,
  links,
  showIntro,
}: {
  businessName: string;
  logoUrl: string;
  links: LinkButton[];
  showIntro: boolean;
}) {
  const [phase, setPhase] = useState<Phase>(showIntro ? "intro" : "done");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!showIntro) return;

    // Once per visit, and never for people who've asked for less motion.
    // "Seen" is only saved once the intro ends, so React's double-run of effects in dev doesn't skip it.
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {}
    const markSeen = () => {
      try {
        sessionStorage.setItem("introSeen", "1");
      } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce || !canvasRef.current) {
      setPhase("done");
      return;
    }

    const stopSmoke = playSmoke(canvasRef.current, HOLD, CLEAR);
    const timers = [
      setTimeout(() => setPhase("igniting"), IGNITE_AT),
      setTimeout(() => {
        setPhase("done");
        markSeen();
      }, IGNITE_AT + STEP_BACK),
    ];

    const skip = () => {
      timers.forEach(clearTimeout);
      stopSmoke();
      setPhase("done");
      markSeen();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["Enter", " ", "Escape"].includes(e.key)) skip();
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach(clearTimeout);
      stopSmoke();
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, [showIntro]);

  return (
    <div className={`landing phase-${phase}`}>
      <Backdrop logoUrl={logoUrl} alt="" />
      <canvas ref={canvasRef} className="smoke" aria-hidden="true" />
      <div className="skip-hint" aria-hidden="true">
        Tap to skip
      </div>

      <main className="page">
        <h1 className="sr-only">{businessName}</h1>
        <ul className="links">
          {links.map((link, i) => (
            <li key={link._key} style={{ "--i": i } as React.CSSProperties}>
              <LinkButtonView link={link} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

const PAGE_PATHS: Record<string, string> = {
  menu: "/menu",
  food: "/food",
  drinks: "/drinks",
  promotions: "/promotions",
};

function LinkButtonView({ link }: { link: LinkButton }) {
  const className = link.featured ? "btn featured" : "btn";

  if (link.kind in PAGE_PATHS) {
    return (
      <Link className={className} href={PAGE_PATHS[link.kind]}>
        {link.label}
      </Link>
    );
  }

  if (link.kind === "email" && link.email) {
    const subject = link.emailSubject ? `?subject=${encodeURIComponent(link.emailSubject)}` : "";
    return (
      <a className={className} href={`mailto:${link.email}${subject}`}>
        {link.label}
      </a>
    );
  }

  return (
    <a className={className} href={link.url} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  );
}
