// Canvas smoke: soft puffs cover the screen, hold for a beat, then roll outward and fade.
// Returns a function that stops the animation and clears the canvas.
export function playSmoke(canvas: HTMLCanvasElement, hold: number, clear: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // One lumpy smoke sprite, reused for every puff
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 256;
  const s = sprite.getContext("2d")!;
  for (let i = 0; i < 26; i++) {
    const x = 128 + (Math.random() - 0.5) * 110;
    const y = 128 + (Math.random() - 0.5) * 110;
    const r = 40 + Math.random() * 60;
    const g = s.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(214,206,196,0.22)");
    g.addColorStop(1, "rgba(214,206,196,0)");
    s.fillStyle = g;
    s.beginPath();
    s.arc(x, y, r, 0, Math.PI * 2);
    s.fill();
  }

  const cx = W / 2;
  const cy = H * 0.45;
  const count = Math.round(Math.min(90, 40 + (W * H) / 9000));
  const puffs = Array.from({ length: count }, () => {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.hypot(dx, dy) || 1;
    const speed = 70 + Math.random() * 120;
    return {
      x,
      y,
      vx: (dx / d) * speed + (Math.random() - 0.5) * 40,
      vy: (dy / d) * speed - 30 - Math.random() * 40,
      size: Math.max(W, H) * (0.35 + Math.random() * 0.35),
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.6,
      alpha: 0.75 + Math.random() * 0.25,
    };
  });

  let raf = 0;
  let start = 0;
  const dt = 1 / 60;

  const frame = (t: number) => {
    if (!start) start = t;
    const elapsed = t - start;
    const k = Math.max(0, (elapsed - hold) / clear);
    const ease = 1 - Math.pow(1 - Math.min(k, 1), 2);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = `rgba(5,4,5,${Math.max(0, 0.85 - ease * 1.6)})`;
    ctx.fillRect(0, 0, W, H);

    const drift = elapsed > hold ? 1 : 0.12;
    for (const p of puffs) {
      p.x += p.vx * dt * drift * (1 + ease * 1.5);
      p.y += p.vy * dt * drift * (1 + ease * 1.5);
      p.rot += p.vr * dt;
      const a = p.alpha * (1 - ease);
      if (a <= 0.003) continue;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      const size = p.size * (1 + ease * 0.4);
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    if (k < 1) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, W, H);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, W, H);
  };
}
