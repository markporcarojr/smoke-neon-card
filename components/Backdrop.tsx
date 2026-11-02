// The logo, big and centered behind everything. Plain <img> so the CSS mask and glow filters apply directly.
export function Backdrop({ logoUrl, alt }: { logoUrl: string; alt: string }) {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="sign">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUrl} alt={alt} />
        <div className="bulb" />
      </div>
    </div>
  );
}
