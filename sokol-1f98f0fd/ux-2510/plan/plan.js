// «Сокол» · блок «План» — прототип без логики (25.10). Всё в пикселях снимка 1600×1260:
// Esri World Imagery, съёмка WorldView-3 12.09.2025, 0,31 м (в файле — ~0,70 м/px), кампус «Будущее Пармы», Камская долина.
// Камеры — поза и зона счёта из config/sites/kampus.yaml и tests/fixtures/box3d/cameras-kampus.json (метры, x — восток, y — север).
// Привязка метров к снимку — НА ГЛАЗ (сдвиг, масштаб 0,70 м/px, поворот 0): в продукте — две точки «здесь на снимке = здесь на кадре».
// Машины и люди — расстановка по снимку пульта 13:51 (kamery-plan-i-lyudi-t15s.jpg), статусы — пример языка рамок.

export const SAT = { src: "img/sat-kampus-2025-09-12.jpg", w: 1600, h: 1260, mpp: 0.70, date: "12.09.2025", credit: "Esri, Maxar (WorldView-3)" };
const A = { ox: 262.9, oy: 818.6, k: 1 / 0.70 };
const m2p = ([x, y]) => [A.ox + A.k * x, A.oy - A.k * y];

export const CAMS = [
  { id: 1, role: "въезд", pos: m2p([26, -15]), yaw: 49, hfov: 56.1, quad: [[59.2, 55.01], [99.41, 8.75], [74.86, 0.34], [47.63, 31.66]].map(m2p) },
  { id: 6, role: "погрузка", pos: m2p([-15, 145]), yaw: 165.8, hfov: 58.2, quad: [[42.61, 66.04], [-26.88, 48.39], [-22.89, 88.9], [19.36, 99.63]].map(m2p) },
  { id: 7, role: "выезд", pos: m2p([-21, 165]), yaw: 129.3, hfov: 59.5, quad: [[165.93, 105.42], [75.74, -4.77], [19.96, 92.28], [58.98, 139.96]].map(m2p) },
];

// статус — как у рамок: цвет + значок + слово (ux-2510/ramki/palette.js)
export const ST = {
  work: { w: "работает", icon: "i-work" }, move: { w: "едет", icon: "i-move" }, idle: { w: "стоит", icon: "i-idle" },
  ask: { w: "ждёт ответа", icon: "i-ask" }, unseen: { w: "не видно", icon: "i-unseen" },
};
export const MACH = [
  { n: 1, st: "idle", xy: [348, 795], cam: 1, t: "стоит 56 с" },
  { n: 2, st: "idle", xy: [390, 776], cam: 1, t: "стоит 56 с" },
  { n: 4, st: "unseen", xy: [262, 714], cam: 6, t: "не видно 24 с" },
  { n: 5, st: "idle", xy: [302, 690], cam: 6, t: "стоит 56 с" },
  { n: 6, st: "move", xy: [420, 703], cam: 7, trail: [[360, 776], [380, 752], [400, 726], [420, 703]] },
  { n: 7, st: "move", xy: [458, 684], cam: 7, trail: [[520, 660], [500, 668], [478, 676], [458, 684]] },
  { n: 8, st: "ask", xy: [492, 642], cam: 7, link: 7, t: "это Машина 7?" },
];
export const PEOPLE = [[318, 760], [326, 772], [271, 700], [283, 718], [296, 726], [246, 692], [410, 742], [431, 752], [446, 741]];
const HAZ = [[312, 806], [348, 790], [362, 816], [326, 832]];
const GATES = [{ a: [208, 507], b: [244, 499], at: [206, 472], name: "въезд · КПП", inN: 1, outN: 0 }];

// Схема — обведена по снимку (контуры, дороги, корпуса); имена корпусов не известны — «корпус А…», зоны — по ролям камер.
export const SCHEME = {
  site: [[205, 497], [610, 410], [738, 980], [335, 1000]],
  site2: [[618, 405], [1215, 272], [1368, 945], [782, 1088]],
  roads: [
    { w: 26, p: [[0, 505], [160, 470], [600, 392], [1000, 300], [1600, 150]], main: true },
    { w: 13, p: [[226, 500], [258, 690], [300, 850], [335, 998]] },
    { w: 11, p: [[300, 834], [520, 818], [700, 806]] },
    { w: 10, p: [[650, 548], [1085, 515]] }, { w: 10, p: [[1085, 300], [1140, 800]] }, { w: 10, p: [[870, 862], [1345, 776]] }, { w: 10, p: [[690, 560], [785, 1080]] },
  ],
  blocks: [
    { p: [[350, 590], [548, 560], [560, 800], [370, 808]], l: "корпус А", strong: true },
    { p: [[305, 505], [445, 500], [452, 582], [308, 586]], l: "ангар" },
    { p: [[560, 430], [598, 430], [600, 530], [565, 535]], l: "башня" },
    { p: [[945, 365], [990, 362], [992, 468], [948, 470]], l: "корпус Б" },
    { p: [[1060, 310], [1230, 285], [1238, 470], [1068, 480]], l: "фундамент В", hatch: true },
    { p: [[1120, 505], [1290, 495], [1300, 790], [1135, 800]], l: "фундамент Г", hatch: true },
    { p: [[760, 885], [890, 870], [895, 1060], [770, 1070]], l: "корпус Д" },
    { p: [[920, 872], [1132, 860], [1138, 1015], [928, 1025]], l: "корпус Е" },
  ],
  zones: [
    { p: [[322, 840], [522, 828], [530, 932], [334, 944]], l: "склад" },
    { p: [[900, 585], [1018, 575], [1022, 670], [905, 680]], l: "бытовки" },
  ],
};

// ---------- рисование ----------
const f1 = (n) => +n.toFixed(1);
const pts = (p) => p.map((q) => q.map(f1).join(",")).join(" ");
const hull = (P) => { const p = [...P].sort((a, b) => a[0] - b[0] || a[1] - b[1]); const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); const lo = [], up = []; for (const q of p) { while (lo.length > 1 && cr(lo.at(-2), lo.at(-1), q) <= 0) lo.pop(); lo.push(q); } for (const q of p.reverse()) { while (up.length > 1 && cr(up.at(-2), up.at(-1), q) <= 0) up.pop(); up.push(q); } return lo.slice(0, -1).concat(up.slice(0, -1)); };
const coneD = (c, R) => { const a0 = ((c.yaw - c.hfov / 2) * Math.PI) / 180, a1 = ((c.yaw + c.hfov / 2) * Math.PI) / 180; const P = (a) => [c.pos[0] + R * Math.sin(a), c.pos[1] - R * Math.cos(a)].map(f1); return `M${c.pos.map(f1)}L${P(a0)}A${f1(R)},${f1(R)} 0 0 1 ${P(a1)}Z`; };
const far = (c) => Math.max(...c.quad.map((q) => Math.hypot(q[0] - c.pos[0], q[1] - c.pos[1])));

export const SYMBOLS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-work" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M8 1.8v2.1M8 12.1v2.1M1.8 8h2.1M12.1 8h2.1M3.6 3.6l1.5 1.5M10.9 10.9l1.5 1.5M3.6 12.4l1.5-1.5M10.9 5.1l1.5-1.5"/><circle cx="8" cy="8" r="2.6" fill="currentColor"/></symbol>
<symbol id="i-move" viewBox="0 0 16 16"><path fill="currentColor" d="M2 6.6h7.2V3.4L14.6 8l-5.4 4.6V9.4H2z"/></symbol>
<symbol id="i-idle" viewBox="0 0 16 16"><rect x="3.3" y="2.8" width="3.3" height="10.4" rx="1" fill="currentColor"/><rect x="9.4" y="2.8" width="3.3" height="10.4" rx="1" fill="currentColor"/></symbol>
<symbol id="i-ask" viewBox="0 0 16 16"><path fill="currentColor" d="M7.2 10.3h1.6v1.6H7.2zM8 3.9c1.5 0 2.5.9 2.5 2.1 0 1-.6 1.5-1.2 1.9-.4.3-.5.5-.5.9v.3H7.3v-.4c0-.9.4-1.3 1-1.7.4-.3.6-.5.6-.9s-.4-.8-.9-.8c-.6 0-1 .4-1 1H5.5c0-1.4 1-2.4 2.5-2.4z"/></symbol>
<symbol id="i-unseen" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M1.5 8s2.4-4.3 6.5-4.3S14.5 8 14.5 8 12.1 12.3 8 12.3 1.5 8 1.5 8z"/><circle cx="8" cy="8" r="1.9" fill="currentColor"/><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M2.6 13.6 13.4 2.4"/></symbol>
<symbol id="i-person" viewBox="0 0 16 16"><circle cx="8" cy="3.6" r="2.3" fill="currentColor"/><path fill="currentColor" d="M4.2 14.6V9.2c0-2 1.6-3.3 3.8-3.3s3.8 1.3 3.8 3.3v5.4z"/></symbol>
<symbol id="i-truck" viewBox="0 0 16 16"><path fill="currentColor" d="M1 4h8.5v6.5H1zM10.3 6.2h2.6l2.1 2.6v1.7h-4.7zM3.6 13.4a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zm8.8 0a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z"/></symbol>
<symbol id="i-cam" viewBox="0 0 16 16"><path fill="currentColor" d="M1.5 4.5h9v7h-9zM11.3 7l3.2-2v6l-3.2-2z"/></symbol>
<symbol id="i-layers" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M8 1.8 14.5 5 8 8.2 1.5 5zM1.5 8 8 11.2 14.5 8M1.5 11 8 14.2 14.5 11"/></symbol>
<symbol id="i-expand" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"/></symbol>
<symbol id="i-edit" viewBox="0 0 16 16"><path fill="currentColor" d="M2 11.6V14h2.4l7.1-7.1-2.4-2.4zM13.3 5.1a.7.7 0 0 0 0-1L11.9 2.7a.7.7 0 0 0-1 0l-1.1 1.1 2.4 2.4z"/></symbol>
<symbol id="i-pin" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"/></symbol>
<pattern id="hz" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="8" fill="#E2452F" opacity=".55"/></pattern>
<pattern id="fd" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 0H10M0 0V10" stroke="currentColor" stroke-width="1" opacity=".35"/></pattern>
</defs></svg>`;

export const badge = (st) => `<i class="bdg ${st}" style="background:var(--st-${st})"><svg><use href="#${ST[st].icon}"/></svg></i>`;

// opts: under — sat | scheme | hybrid | none; view — [x, y, w, h] в пикселях снимка; L — слои; active — камера в большом окне; edit — ручки правки
export function drawPlan(host, o) {
  const L = { cones: true, quads: true, mach: true, people: true, trails: true, gates: true, labels: true, hazard: true, grid: false, ...o.L };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "pl");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  host.prepend(svg);
  const render = () => {
    const r = host.getBoundingClientRect();
    const [vx, vy, vw, vh] = (r.width < 520 && o.viewN) || o.view;
    svg.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
    const u = Math.max(vw / r.width, vh / r.height); // единиц снимка на экранный пиксель (slice)
    const dark = document.documentElement.dataset.theme === "dark";
    let s = "";
    const sat = o.under === "sat" || o.under === "hybrid";
    const sch = o.under === "scheme" || o.under === "hybrid";
    if (sat) s += `<image class="sat" href="${SAT.src}" x="0" y="0" width="${SAT.w}" height="${SAT.h}" opacity="${o.under === "hybrid" ? (o.satOp ?? 0.55) : 1}"/>`;
    else s += `<rect x="-2000" y="-2000" width="6000" height="6000" fill="var(--ground)"/>`;
    if (sch) {
      const hy = o.under === "hybrid";
      for (const site of [SCHEME.site, SCHEME.site2]) s += `<polygon points="${pts(site)}" fill="${hy ? "none" : "var(--site)"}" stroke="${hy ? "#ffffffcc" : "var(--line-2)"}" stroke-width="${1.5 * u}" stroke-dasharray="${6 * u} ${4 * u}"/>`;
      for (const rd of SCHEME.roads) { const d = `M${rd.p.map((q) => q.join(",")).join("L")}`; if (!hy) s += `<path d="${d}" fill="none" stroke="var(--road-edge)" stroke-width="${rd.w + 2 * u}" stroke-linecap="round" stroke-linejoin="round"/>`; s += `<path d="${d}" fill="none" stroke="${hy ? "#ffffff40" : "var(--road)"}" stroke-width="${rd.w}" stroke-linecap="round" stroke-linejoin="round"/>`; }
      for (const z of SCHEME.zones) s += `<polygon points="${pts(z.p)}" fill="var(--zone)" stroke="${hy ? "#ffffff99" : "var(--line-2)"}" stroke-width="${u}" stroke-dasharray="${3 * u} ${3 * u}"/>`;
      for (const b of SCHEME.blocks) s += `<polygon points="${pts(b.p)}" fill="${hy ? "#0B0C0E33" : b.hatch ? "url(#fd)" : b.strong ? "var(--block-2)" : "var(--block)"}" style="color:var(--block-ink)" stroke="${hy ? "#ffffffd0" : "var(--line-2)"}" stroke-width="${(b.strong ? 1.6 : 1.1) * u}"/>`;
      if (L.labels) for (const b of [...SCHEME.blocks, ...SCHEME.zones]) { const c = b.p.reduce((a, q) => [a[0] + q[0] / b.p.length, a[1] + q[1] / b.p.length], [0, 0]); s += `<text x="${f1(c[0])}" y="${f1(c[1])}" text-anchor="middle" dominant-baseline="central" font-size="${11 * u}" fill="${hy ? "#fff" : "var(--block-ink)"}" ${hy ? `paint-order="stroke" stroke="#0B0C0E" stroke-width="${3 * u}"` : ""} font-weight="500">${b.l}</text>`; }
      if (!hy && L.labels) s += `<text x="900" y="${f1(296 + 14)}" font-size="${11 * u}" fill="var(--faint)" transform="rotate(-13 900 310)" text-anchor="middle">ул. Маршала Жукова</text>`;
    }
    if (L.grid) { const st = 10 / SAT.mpp; let g = ""; for (let x = Math.floor(vx / st) * st; x < vx + vw; x += st) g += `M${f1(x)} ${vy}V${vy + vh}`; for (let y = Math.floor(vy / st) * st; y < vy + vh; y += st) g += `M${vx} ${f1(y)}H${vx + vw}`; s += `<path d="${g}" stroke="var(--line)" stroke-width="${0.6 * u}" opacity=".7"/>`; }
    // камеры: конус обзора (поле зрения по позе) и зона счёта (размеченная земля)
    const camCol = sat && o.under !== "hybrid" ? "#FFFFFF" : sat ? "#FFFFFF" : dark ? "#ECEEF1" : "#14171A";
    if (L.cones) for (const c of [...CAMS].sort((a) => (a.id === o.active ? 1 : -1))) {
      const on = c.id === o.active;
      const R = far(c) * 1.35;
      s += `<defs><radialGradient id="g${c.id}" gradientUnits="userSpaceOnUse" cx="${f1(c.pos[0])}" cy="${f1(c.pos[1])}" r="${f1(R)}"><stop offset="0" stop-color="${camCol}" stop-opacity="${sat ? (on ? 0.42 : 0.2) : (on ? 0.2 : 0.08)}"/><stop offset="1" stop-color="${camCol}" stop-opacity="0"/></radialGradient></defs>`;
      s += `<path d="${coneD(c, R)}" fill="url(#g${c.id})" stroke="${camCol}" stroke-opacity="${on ? 0.8 : 0.3}" stroke-width="${(on ? 1.4 : 1) * u}"/>`;
      if (L.quads) s += `<polygon points="${pts(hull(c.quad))}" fill="${camCol}" fill-opacity="${on ? 0.16 : 0.07}" stroke="${camCol}" stroke-opacity="${on ? 0.9 : 0.4}" stroke-width="${u}" stroke-dasharray="${4 * u} ${3 * u}"/>`;
    }
    if (L.hazard) s += `<polygon points="${pts(HAZ)}" fill="url(#hz)" stroke="#E2452F" stroke-width="${1.2 * u}"/>`;
    if (L.trails) for (const m of MACH) if (m.trail) s += `<polyline class="trail" points="${pts(m.trail)}" fill="none" stroke="var(--st-${m.st})" stroke-width="${2.4 * u}" stroke-linecap="round" stroke-dasharray="${2 * u} ${4 * u}" opacity=".95"/>`;
    if (L.gates) for (const g of GATES) {
      s += `<line x1="${g.a[0]}" y1="${g.a[1]}" x2="${g.b[0]}" y2="${g.b[1]}" stroke="#0B0C0E" stroke-width="${6 * u}" stroke-linecap="round"/><line x1="${g.a[0]}" y1="${g.a[1]}" x2="${g.b[0]}" y2="${g.b[1]}" stroke="#fff" stroke-width="${3 * u}" stroke-linecap="round" stroke-dasharray="${4 * u} ${3 * u}"/>`;
      if (o.gateCount) { const tx = `${g.name} · ↓ ${g.inN}  ↑ ${g.outN}`; const w = tx.length * 6.3 * u + 14 * u; s += `<g transform="translate(${g.at[0]} ${g.at[1]})"><rect x="0" y="${-11 * u}" width="${f1(w)}" height="${22 * u}" rx="${6 * u}" fill="#0B0C0EE6" stroke="#ffffff55" stroke-width="${u}"/><text x="${7 * u}" y="0" dominant-baseline="central" fill="#fff" font-size="${11.5 * u}" font-weight="600">${tx}</text></g>`; }
    }
    if (L.people) for (const p of PEOPLE) s += `<circle cx="${p[0]}" cy="${p[1]}" r="${3.6 * u}" fill="var(--st-person)" stroke="#0B0C0E" stroke-width="${1.2 * u}"/>`;
    // камеры-значки
    for (const c of CAMS) {
      const on = c.id === o.active;
      const a = (c.yaw * Math.PI) / 180, R = 12 * u;
      const tip = [c.pos[0] + Math.sin(a) * R * 1.7, c.pos[1] - Math.cos(a) * R * 1.7];
      s += `<g><path d="M${f1(c.pos[0] + Math.sin(a - 0.5) * R)} ${f1(c.pos[1] - Math.cos(a - 0.5) * R)}L${f1(tip[0])} ${f1(tip[1])}L${f1(c.pos[0] + Math.sin(a + 0.5) * R)} ${f1(c.pos[1] - Math.cos(a + 0.5) * R)}Z" fill="${on ? "#fff" : "#0B0C0E"}" stroke="${on ? "#0B0C0E" : "#fff"}" stroke-width="${u}"/><circle cx="${f1(c.pos[0])}" cy="${f1(c.pos[1])}" r="${R}" fill="${on ? "#fff" : "#0B0C0E"}" stroke="${on ? "#0B0C0E" : "#fff"}" stroke-width="${1.5 * u}"/><text x="${f1(c.pos[0])}" y="${f1(c.pos[1])}" text-anchor="middle" dominant-baseline="central" font-size="${11.5 * u}" font-weight="700" fill="${on ? "#0B0C0E" : "#fff"}">${c.id}</text></g>`;
      if (on && L.labels) { const lf = c.pos[0] - vx > 130 * u; s += `<text x="${f1(c.pos[0] + (lf ? -16 : 16) * u)}" y="${f1(c.pos[1] + (lf ? 4 : 22) * u)}" text-anchor="${lf ? "end" : "start"}" font-size="${11.5 * u}" font-weight="600" fill="#fff" paint-order="stroke" stroke="#0B0C0E" stroke-width="${3.2 * u}">кам. ${c.id} · ${c.role}</text>`; }
    }
    // связь «8 — это 7?»
    for (const m of MACH) if (m.link) { const t = MACH.find((q) => q.n === m.link); s += `<line x1="${m.xy[0]}" y1="${m.xy[1]}" x2="${t.xy[0]}" y2="${t.xy[1]}" stroke="var(--st-ask)" stroke-width="${1.8 * u}" stroke-dasharray="${3 * u} ${3 * u}"/>`; }
    // техника: значок статуса + номер (+ тип), тёмная подложка — как подпись рамки
    if (L.mach) for (const m of MACH) {
      const lab = `${m.n}${m.st === "ask" ? "?" : ""}`;
      const tw = lab.length * 7.4 * u + (o.typeGlyph ? 17 * u : 0);
      const h = 22 * u, bx = -h / 2, w = h + tw + 8 * u;
      const sel = o.sel === m.n;
      const dash = m.st === "unseen" ? `stroke-dasharray="${3 * u} ${2.5 * u}"` : "";
      s += `<g transform="translate(${f1(m.xy[0])} ${f1(m.xy[1])})" opacity="${m.st === "unseen" ? 0.85 : 1}">`;
      if (m.st === "ask") s += `<rect class="m-ask-ring" x="${f1(bx - 4 * u)}" y="${f1(-h / 2 - 4 * u)}" width="${f1(w + 8 * u)}" height="${f1(h + 8 * u)}" rx="${f1(h / 2 + 4 * u)}" fill="none" stroke="var(--st-ask)" stroke-width="${2 * u}"/>`;
      if (sel) s += `<rect x="${f1(bx - 3.5 * u)}" y="${f1(-h / 2 - 3.5 * u)}" width="${f1(w + 7 * u)}" height="${f1(h + 7 * u)}" rx="${f1(h / 2 + 3.5 * u)}" fill="none" stroke="#fff" stroke-width="${2.4 * u}"/>`;
      s += `<rect x="${f1(bx)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="#0B0C0EE8" stroke="var(--st-${m.st})" stroke-width="${1.6 * u}" ${dash}/>`;
      s += m.st === "unseen" ? `<circle cx="0" cy="0" r="${f1(h / 2 - 2.5 * u)}" fill="none" stroke="var(--st-unseen)" stroke-width="${1.5 * u}" stroke-dasharray="${2.5 * u} ${2 * u}"/>` : m.st === "ask" ? `<rect x="${f1(-6.5 * u)}" y="${f1(-6.5 * u)}" width="${f1(13 * u)}" height="${f1(13 * u)}" rx="${f1(2 * u)}" transform="rotate(45)" fill="var(--st-ask)"/>` : `<circle cx="0" cy="0" r="${f1(h / 2 - 2.5 * u)}" fill="var(--st-${m.st})"/>`;
      s += `<use href="#${ST[m.st].icon}" x="${f1(-6 * u)}" y="${f1(-6 * u)}" width="${f1(12 * u)}" height="${f1(12 * u)}" style="color:${m.st === "unseen" ? "var(--st-unseen)" : "#0B0C0E"}"/>`;
      s += `<text x="${f1(h / 2 + 4 * u)}" y="${f1(0.5 * u)}" dominant-baseline="central" font-size="${12.5 * u}" font-weight="700" fill="#fff">${lab}</text>`;
      if (o.typeGlyph) s += `<use href="#i-truck" x="${f1(h / 2 + 4 * u + lab.length * 7.4 * u + 3 * u)}" y="${f1(-6.5 * u)}" width="${f1(13 * u)}" height="${f1(13 * u)}" style="color:#C3C9D1"/>`;
      s += `</g>`;
    }
    // правка: ручки зон, ворот, камеры и две точки привязки
    if (o.edit) {
      const hd = (x, y, c = "#fff") => `<rect x="${f1(x - 5 * u)}" y="${f1(y - 5 * u)}" width="${f1(10 * u)}" height="${f1(10 * u)}" fill="${c}" stroke="#0B0C0E" stroke-width="${1.4 * u}"/>`;
      for (const z of SCHEME.zones.slice(0, 1)) { s += `<polygon points="${pts(z.p)}" fill="#F0B45122" stroke="#F0B451" stroke-width="${2 * u}"/>`; for (const q of z.p) s += hd(q[0], q[1], "#F0B451"); }
      for (const q of HAZ) s += hd(q[0], q[1], "#E2452F");
      for (const g of GATES) { s += hd(g.a[0], g.a[1]); s += hd(g.b[0], g.b[1]); }
      const c = CAMS.find((q) => q.id === o.active); const R = far(c) * 1.35; const a = (c.yaw * Math.PI) / 180;
      s += `<path d="M${f1(c.pos[0])} ${f1(c.pos[1])}L${f1(c.pos[0] + Math.sin(a) * R * 0.98)} ${f1(c.pos[1] - Math.cos(a) * R * 0.98)}" stroke="#fff" stroke-width="${1.6 * u}" stroke-dasharray="${3 * u} ${3 * u}"/><circle cx="${f1(c.pos[0] + Math.sin(a) * R * 0.98)}" cy="${f1(c.pos[1] - Math.cos(a) * R * 0.98)}" r="${7 * u}" fill="#fff" stroke="#0B0C0E" stroke-width="${1.5 * u}"/><text x="${f1(c.pos[0] + Math.sin(a) * R * 0.98 + 11 * u)}" y="${f1(c.pos[1] - Math.cos(a) * R * 0.98)}" dominant-baseline="central" font-size="${11 * u}" fill="#fff" paint-order="stroke" stroke="#0B0C0E" stroke-width="${3 * u}" font-weight="600">повернуть · ${c.yaw}°</text>`;
      for (const [k, p] of [["A", [214, 503]], ["B", [610, 412]]]) s += `<g transform="translate(${p[0]} ${p[1]})"><circle r="${16 * u}" fill="none" stroke="#6EA8FF" stroke-width="${1.6 * u}"/><path d="M${-22 * u} 0H${22 * u}M0 ${-22 * u}V${22 * u}" stroke="#6EA8FF" stroke-width="${1.4 * u}"/><rect x="${10 * u}" y="${-28 * u}" width="${f1(20 * u)}" height="${f1(18 * u)}" rx="${4 * u}" fill="#6EA8FF"/><text x="${20 * u}" y="${-19 * u}" text-anchor="middle" dominant-baseline="central" font-size="${11.5 * u}" font-weight="700" fill="#0B0C0E">${k}</text></g>`;
    }
    svg.innerHTML = s;
    // шкала: 50 м в экранных пикселях
    const sc = host.querySelector(".scale i"); if (sc) sc.style.width = `${f1(50 / SAT.mpp / u)}px`;
  };
  render();
  new ResizeObserver(render).observe(host);
  addEventListener("sokol-theme", render);
}

// ---------- оболочка экрана «Камеры» ----------
export function shell({ plan, wide = false, title }) {
  document.title = title;
  const theme = new URLSearchParams(location.search).get("theme") || "dark";
  document.documentElement.dataset.theme = theme;
  const big = wide ? "" : `<figure class="vid big" style="margin:0"><img src="img/cam1.jpg" alt="Камера 1, кадр записи 22.10"><span class="cap"><i></i>Камера 1 · въезд</span></figure>`;
  const sm = (n, role, hl) => `<figure class="vid sm${hl ? " is-hl" : ""}" style="margin:0"><img src="img/cam${n}.jpg" alt="Камера ${n}"><span class="cap"><i></i>Камера ${n} · ${role}</span></figure>`;
  document.body.innerHTML = `${SYMBOLS}
  <header class="top"><div class="brand"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>Сокол</div>
  <div class="site"><b>Кампус в Перми · открытые камеры</b><span>запись 22.10 · 3 камеры</span></div>
  <nav class="tabs"><a>Пульт</a><a class="on">Камеры</a><a>План</a><a>3D</a><a>Журнал</a><a>Сводка</a></nav><span class="sp"></span>
  <div class="kpi"><span><b>7</b>на площадке</span><span>${badge("unseen")} <b>1</b>не видно</span><span class="ask">${badge("ask")} <b>1</b>вопрос</span></div>
  <button class="theme" title="Тема" id="th">◐</button></header>
  <main class="scr${wide ? " wide" : ""}">
    ${wide ? `<section class="col" id="slot"></section><aside class="col"><div class="vstack">${`<figure class="vid sm" style="margin:0"><img src="img/cam1.jpg" alt=""><span class="cap"><i></i>Камера 1 · въезд</span></figure>`}${sm(6, "погрузка")}${sm(7, "выезд")}</div></aside>`
      : `<section class="vids">${big}${sm(6, "погрузка")}${sm(7, "выезд", plan.hlVid)}<p class="below">Камеры: 1 · въезд, 6 · погрузка, 7 · выезд · запись 13:43–13:51</p></section>
    <aside class="col"><div id="slot"></div>
    <section class="ev"><h3>События 4 <a>весь журнал</a></h3>
      <div class="row ask">${badge("ask")}<div>Машина 8 — это Машина 7?<small>камера 7 · 13:51</small></div><span class="tag">13:51</span></div>
      <div class="row">${badge("idle")}<div>Машина 1 · стоит 56 с<small>камера 1 · въезд</small></div></div>
      <div class="row">${badge("unseen")}<div>Машина 4 · не видно 24 с<small>камера 6 · последнее место на плане</small></div></div>
    </section></aside>`}
  </main>`;
  document.getElementById("slot").innerHTML = plan.html;
  document.getElementById("th").onclick = () => { const r = document.documentElement; r.dataset.theme = r.dataset.theme === "dark" ? "light" : "dark"; dispatchEvent(new Event("sokol-theme")); };
}

export const legend = () => `<div class="lg"><span>${badge("work")} работает <b>0</b></span><span>${badge("move")} едет <b>2</b></span><span>${badge("idle")} стоит <b>3</b></span><span>${badge("ask")} ждёт ответа <b>1</b></span><span>${badge("unseen")} не видно <b>1</b></span><span><i class="bdg" style="background:var(--st-person)"><svg><use href="#i-person"/></svg></i> люди <b>9</b></span></div>`;
export const mapOverlays = (light) => `<div class="ovl tr"><span class="north">С</span><span class="zoom"><b>+</b><b>−</b></span></div><div class="ovl bl"><span class="scale glass${light ? " l" : ""}"><i></i>50 м</span></div>`;
