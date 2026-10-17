/** Fond radial calculé une fois par taille ; aucun flou recalculé pendant l’introduction. */
export function paintHeroEclipse(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const cx = width / 2;
  const base = Math.min(width, height) * 1.25;
  const cy = height + base * .9;
  const radius = base * 1.6;
  const gold = (alpha: number) => `rgba(253,211,60,${alpha})`;
  const dark = (alpha: number) => `rgba(8,9,8,${alpha})`;
  const disk = (r: number, stops: [number, string][], blur = 0, inner = .15) => {
    ctx.save();
    if (blur) ctx.filter = `blur(${blur}px)`;
    const gradient = ctx.createRadialGradient(cx, cy, radius * inner, cx, cy, r);
    stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  ctx.clearRect(0, 0, width, height);
  const atmosphere = ctx.createRadialGradient(cx, height * .95, base * .05, cx, height * .95, base * 1.1);
  [[0, .35], [.3, .2], [.6, .08], [1, 0]].forEach(([at, alpha]) => atmosphere.addColorStop(at, gold(alpha)));
  ctx.fillStyle = atmosphere;
  ctx.fillRect(0, 0, width, height);
  disk(radius, [[0,gold(.7)],[.6,gold(.7)],[.72,gold(.5)],[.82,gold(.25)],[.9,gold(.07)],[.96,gold(.01)],[1,gold(0)]],40);
  for (const [scale, red, green, blue, alpha] of [[.65,.5,.5,.71,.55],[.52,.39,.25,.63,.7],[.4,.29,.12,.55,.85]]) {
    ctx.save();
    ctx.filter = 'blur(100px)';
    ctx.fillStyle = `rgba(${Math.round(253*red)},${Math.round(211*green)},${Math.round(60*blue)},${alpha})`;
    ctx.beginPath();ctx.arc(cx,cy,radius*scale,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  disk(radius * .7, [[0,dark(1)],[.8,dark(1)],[1,dark(0)]]);
  disk(radius, [[0,dark(1)],[.6,dark(1)],[.72,'rgba(96,59,36,.7)'],[.82,gold(.32)],[.9,gold(.12)],[.96,gold(.03)],[1,gold(0)]],40);
  disk(radius * 1.08, [[0,'rgba(255,255,255,0)'],[.35,'rgba(255,255,255,.55)'],[.65,'rgba(255,255,255,.3)'],[1,'rgba(255,255,255,0)']],70,.68);
  // Le voile appartient au fond pour préserver la lisibilité des repères du cercle.
  const bottom = ctx.createLinearGradient(0, height * .55, 0, height);
  [[0, 0], [.25, .15], [.55, .45], [.85, .85], [1, 1]].forEach(([at, alpha]) => bottom.addColorStop(at, dark(alpha)));
  ctx.fillStyle = bottom;
  ctx.fillRect(0, height * .55, width, height * .45);
}
