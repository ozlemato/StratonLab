const SVG_NS = 'http://www.w3.org/2000/svg';

/** Une séquence par étape : arrivée du connecteur, puis tour lumineux du ticket. */
export function mountWorkflowMotion(visual: HTMLElement, track: HTMLElement, steps: HTMLElement[], nodes: HTMLElement[]) {
  const back = track.querySelector<SVGSVGElement>('.workflow-wires');
  const front = track.querySelector<SVGSVGElement>('.workflow-line');
  if (!back || !front) return () => {};
  const wires = back;
  const overlay = front;
  const frames = new Set<number>();
  const seen = new Set<number>();
  let current = 0;
  let disposed = false;
  let dimensions = '';
  const oldTransform = track.style.transform;
  const oldTransition = track.style.transition;
  visual.dataset.animated = 'true';
  track.style.transition = 'transform .65s cubic-bezier(.4,0,.2,1)';

  const schedule = (callback: FrameRequestCallback) => {
    const id = requestAnimationFrame(time => { frames.delete(id); if (!disposed) callback(time); });
    frames.add(id);
  };
  // Coordonnées de layout, indépendantes des transforms de la piste et des cartes.
  const box = (element: HTMLElement) => {
    let x = 0, y = 0;
    let item: HTMLElement | null = element;
    while (item && item !== track) {
      x += item.offsetLeft; y += item.offsetTop; item = item.offsetParent as HTMLElement | null;
    }
    return { x, y, w: element.offsetWidth, h: element.offsetHeight };
  };
  const geometry = (index: number) => {
    const card = nodes[index].querySelector<HTMLElement>('.flow-ticket');
    const previous = index ? nodes[index - 1] : nodes[0].querySelector<HTMLElement>('.source-pills > span:nth-child(2)');
    if (!card || !previous) return null;
    const b = box(card), source = box(previous);
    const x = b.x - 1, y = b.y - 1, w = b.w + 2, h = b.h + 2;
    const r = Math.min(parseFloat(getComputedStyle(card).borderTopLeftRadius) + 1, w / 2, h / 2);
    const mid = x + w / 2;
    const connector = `M ${source.x + source.w / 2} ${source.y + source.h} L ${mid} ${y}`;
    const border = `M ${mid} ${y} H ${x+w-r} A ${r} ${r} 0 0 1 ${x+w} ${y+r} V ${y+h-r} A ${r} ${r} 0 0 1 ${x+w-r} ${y+h} H ${x+r} A ${r} ${r} 0 0 1 ${x} ${y+h-r} V ${y+r} A ${r} ${r} 0 0 1 ${x+r} ${y} H ${mid}`;
    const branches: string[] = [];
    if (index === 0) {
      const joinY = y - 14;
      nodes[0].querySelectorAll<HTMLElement>('.source-pills > span').forEach((pill, i) => {
        if (i === 1) return;
        const p = box(pill), sx = p.x + p.w / 2, sy = p.y + p.h;
        const direction = i === 0 ? 1 : -1;
        const radius = Math.min(14, (joinY - sy) / 2, Math.abs(mid - sx) / 2);
        branches.push(`M ${sx} ${sy} V ${joinY-radius} Q ${sx} ${joinY} ${sx+direction*radius} ${joinY} H ${mid}`);
      });
    }
    return { connector, border, branches };
  };
  const path = (parent: SVGSVGElement, d: string, className: string) => {
    const element = document.createElementNS(SVG_NS, 'path');
    element.setAttribute('d', d); element.setAttribute('class', className); parent.appendChild(element);
    return element;
  };
  function trace(d: string, duration: number, delay: number, persistent: boolean) {
    const trail = persistent ? path(wires, d, 'workflow-wire') : null;
    const tail = path(overlay, d, 'workflow-comet-tail');
    const tip = path(overlay, d, 'workflow-comet-tip');
    const length = tip.getTotalLength();
    const tailSize = Math.max(40, Math.min(length * .42, 150));
    const tipSize = Math.max(12, Math.min(length * .12, 38));
    for (const [element, size] of [[tail, tailSize], [tip, tipSize]] as const) {
      element.style.strokeDasharray = `${size} ${length + size + 2}`;
      element.style.strokeDashoffset = String(size);
    }
    if (trail) { trail.style.strokeDasharray = `${length} ${length}`; trail.style.strokeDashoffset = String(length); }
    const start = performance.now() + delay;
    const draw = (now: number) => {
      const raw = Math.max(0, Math.min(1, (now - start) / duration));
      const progress = (1 - Math.cos(Math.PI * raw)) / 2;
      tail.style.strokeDashoffset = String(tailSize - progress * (length + tailSize));
      tip.style.strokeDashoffset = String(tipSize - progress * (length + tipSize));
      const opacity = raw > .82 ? (1 - raw) / .18 : 1;
      tail.style.opacity = tip.style.opacity = String(opacity);
      if (trail) trail.style.strokeDashoffset = String(length - Math.max(0, Math.min(length, progress * (length + tipSize) - tipSize)));
      if (raw < 1) schedule(draw);
      else { tail.remove(); tip.remove(); if (trail) trail.style.strokeDashoffset = '0'; }
    };
    schedule(draw);
  }
  function run(index: number, delay = 0) {
    if (seen.has(index)) return;
    const paths = geometry(index);
    if (!paths) return;
    seen.add(index);
    paths.branches.forEach(branch => trace(branch, 620, delay, true));
    trace(paths.connector, 620, delay, true);
    trace(paths.border, 1600, delay + 440, false);
  }
  function position() {
    const node = nodes[current];
    const center = visual.clientHeight * (current === 3 ? .55 : .42);
    track.style.transform = `translateY(${center - node.offsetTop - node.offsetHeight / 2}px)`;
  }
  function activate(index: number) {
    current = index;
    visual.dataset.stage = String(index);
    nodes.forEach((node, i) => {
      const revealed = i <= index || seen.has(i);
      node.dataset.active = String(revealed);
      node.dataset.past = String(revealed && i !== index);
    });
    position();
    let pending = 0;
    for (let i = 0; i <= index; i++) if (!seen.has(i)) run(i, pending++ * 380);
  }
  function resize() {
    const key = `${track.clientWidth}/${track.clientHeight}/${visual.clientHeight}`;
    if (dimensions === key) return;
    dimensions = key;
    frames.forEach(cancelAnimationFrame); frames.clear();
    overlay.replaceChildren(); wires.replaceChildren();
    for (const svg of [overlay, wires]) {
      svg.setAttribute('viewBox', `0 0 ${track.clientWidth} ${track.clientHeight}`);
      svg.setAttribute('width', String(track.clientWidth));
      svg.setAttribute('height', String(track.clientHeight));
    }
    seen.forEach(index => {
      const paths = geometry(index);
      if (paths) [paths.connector, ...paths.branches].forEach(d => path(wires, d, 'workflow-wire'));
    });
    position();
  }
  resize();
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      const index = steps.indexOf(entry.target as HTMLElement);
      if (index >= 0) activate(index);
    });
  }, { rootMargin: '-10% 0px -75% 0px', threshold: 0 });
  steps.forEach(step => observer.observe(step));
  const sizing = new ResizeObserver(resize);
  sizing.observe(track); sizing.observe(visual);
  return () => {
    disposed = true;
    observer.disconnect(); sizing.disconnect();
    frames.forEach(cancelAnimationFrame); frames.clear();
    wires.replaceChildren(); overlay.replaceChildren();
    track.style.transform = oldTransform; track.style.transition = oldTransition;
    delete visual.dataset.animated; visual.dataset.stage = '0';
    nodes.forEach((node, i) => { node.dataset.active = String(i === 0); delete node.dataset.past; });
  };
}
