// Прототип навигации «Сокола» (без логики пульта): дерево разделов, площадки, поиск Ctrl+K, роли, таб-бар.
// Один файл на оба варианта: body[data-variant="a"] — рейка слева, "b" — разделы вкладками в шапке.
const $ = (s, r = document) => r.querySelector(s);
const h = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (k === "html") n.innerHTML = v;
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
  return n;
};

const I = {
  home: '<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
  cam: '<rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 11l5-3v8l-5-3"/>',
  truck: '<path d="M3 7h10v9H3zM13 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-5M12 16V8M16 16v-3"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  theme: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>',
  chev: '<path d="M7 10l5 5 5-5"/>',
};
const icon = (name, cls = "ic") => { const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", cls); s.setAttribute("aria-hidden", "true"); s.innerHTML = I[name]; return s; };

// Площадки — как в пульте сейчас (config/sites: кампус + 8 ракурсов).
export const SITES = [
  { id: "kampus", name: "Кампус в Перми", sub: "3 камеры · запись 22.10", img: "kampus", star: true },
  { id: "r-auburn", name: "Оберн, США", sub: "общежитие · 1 камера", img: "oburn" },
  { id: "r-zilart", name: "Москва · ЖК ЗИЛАРТ", sub: "1 камера" },
  { id: "r-usu", name: "Логан, США · корпус USU", sub: "1 камера" },
  { id: "r-florida", name: "Форт-Лодердейл · башни", sub: "1 камера" },
  { id: "r-crane-day", name: "Стройка с крана · день", sub: "1 камера" },
  { id: "r-crane-night", name: "Стройка с крана · ночь", sub: "1 камера · ИК" },
  { id: "r-waco", name: "Уэйко · шоссе у стройки", sub: "поток машин · 1 камера", img: "waco" },
  { id: "r-starbase", name: "Техас · проезд Starbase", sub: "поток машин · 1 камера" },
];

// Дерево разделов: 7 верхних пунктов, под каждым — вкладки. now — где это в пульте сейчас.
// st: live — данные записи; mix — записи + вставки «пример»; sample — пример целиком; plan — прототип, в пульте нет.
export const TREE = [
  { id: "home", word: "Обзор", ic: "home", tabs: [
    { id: "shift", word: "Смена", now: "/?v=c2 «Пульт»", st: "live", img: "cams" },
    { id: "summary", word: "Сводка дня", now: "/?v=c6 «Сводка»", st: "live", img: "svodka" },
    { id: "sites", word: "Все площадки", now: "objects.html «Мои объекты»", st: "mix", img: "obekty" },
  ] },
  { id: "cams", word: "Камеры", ic: "cam", tabs: [
    { id: "wall", word: "Стена", now: "/?v=c3 «Камеры»", st: "live", img: "cams" },
    { id: "one", word: "Одна камера", now: "/?v=c1 «Кино»", st: "live", img: "cams" },
    { id: "plan", word: "План", now: "/?v=c4 «План»", st: "live", img: "cams" },
    { id: "3d", word: "3D", now: "/?v=c5 «3D»", st: "live", img: "cams" },
  ] },
  { id: "tech", word: "Техника", ic: "truck", tabs: [
    { id: "log", word: "Журнал машин", now: "/?v=c7 «Журнал» и /?mode=log", st: "live", img: "reisy" },
    { id: "idle", word: "Простой в ₽", now: "money.html", st: "mix", img: "svodka" },
  ] },
  { id: "events", word: "События", ic: "bell", badge: 2, tabs: [
    { id: "ask", word: "Вопросы", now: "кнопка «Ответить · 2» в шапке", st: "live", img: "cams", badge: 2 },
    { id: "inc", word: "Инциденты", now: "incidents.html", st: "live" },
    { id: "zones", word: "Опасные зоны", now: "safety.html", st: "mix" },
    { id: "people", word: "Люди", now: "site.html «Объект: люди»", st: "mix" },
  ] },
  { id: "reports", word: "Отчёты", ic: "chart", tabs: [
    { id: "raport", word: "Рапорт смены", now: "report.html", st: "live", img: "reisy" },
    { id: "daily", word: "Ежедневный", now: "daily.html", st: "live" },
    { id: "tabel", word: "Табель", now: "tabel.html", st: "mix", img: "tabel" },
    { id: "stats", word: "Статистика", now: "stats.html", st: "live", img: "svodka" },
    { id: "calc", word: "Калькулятор потерь", now: "calc.html", st: "mix" },
    { id: "pilot", word: "День кампуса", now: "pilot.html", st: "mix" },
  ] },
  { id: "tz", word: "Задачи ТЗ", ic: "list", tabs: [
    { id: "tasks", word: "По пунктам ТЗ", now: "нет — новое", st: "plan" },
    { id: "extra", word: "Сверх ТЗ · примеры", now: "12 страниц ex-*, ppe, volume, kpp", st: "sample" },
    { id: "next", word: "Что дальше", now: "next.html — ссылок нет", st: "sample" },
  ] },
  { id: "settings", word: "Настройки", ic: "gear", tabs: [
    { id: "profile", word: "Профиль и роли", now: "profile.html", st: "live" },
    { id: "bot", word: "Бот в Telegram", now: "bot.html", st: "live" },
    { id: "accuracy", word: "Насколько точно", now: "вкладка старого вида ?mode=cams", st: "live" },
    { id: "objects", word: "Площадки и камеры", now: "objects.html (правка)", st: "mix" },
  ] },
];

// Пункты ТЗ заказчика → куда показать на панели (формулировки — по разбору КП, без названий сторон).
export const TZ = [
  ["Шесть типов техники: экскаватор, погрузчик, миниэкскаватор, самосвал, бульдозер, кран", "cams", "wall", "рамки с типом на видео"],
  ["Номер борта или маркер", "tech", "log", "номер табличкой в журнале"],
  ["Состояние «работает · простаивает · перемещается»", "cams", "wall", "легенда точка · кольцо · пунктир"],
  ["Зоны на карте, их рисует прораб", "cams", "plan", "план площадки"],
  ["Лента событий и уведомления", "events", "ask", "вопросы и бот в Telegram"],
  ["Клип 30 с на каждый длительный простой", "tech", "log", "карточка машины → клип"],
  ["Отчёт за смену и неделю, CSV и PDF", "reports", "raport", "рапорт, табель, статистика"],
  ["Телефон прорабу и руководству, кабинет офису", "home", "sites", "этот же пульт на телефоне"],
];

const ST = { live: ["данные записи", "ok"], mix: ["записи + пример", "mix"], sample: ["пример", "smp"], plan: ["прототип", "smp"] };
const ROLES = {
  prorab: { word: "Прораб", tabs: ["cams", "tech", "events", "home"], home: ["cams", "wall"] },
  boss: { word: "Руководитель", tabs: ["home", "reports", "events", "cams"], home: ["home", "sites"] },
};

const state = { sec: "cams", tab: "wall", site: SITES[0], role: "prorab", sheet: false };
const secOf = (id) => TREE.find((s) => s.id === id);
const tabOf = () => secOf(state.sec).tabs.find((t) => t.id === state.tab) ?? secOf(state.sec).tabs[0];
const dark = () => (document.documentElement.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";

export function go(sec, tab = null) {
  state.sec = sec;
  state.tab = tab ?? secOf(sec).tabs[0].id;
  state.sheet = false;
  closePalette();
  render();
}

function siteMenu() {
  const box = h("div", { class: "sitepick", role: "listbox", "aria-label": "Площадки" },
    h("div", { class: "sitepick__head" }, h("b", {}, `Площадок ${SITES.length}`), h("a", { href: "#", onclick: (e) => { e.preventDefault(); go("home", "sites"); } }, "все карточками →")),
    SITES.map((s) => h("button", { class: "sitepick__row", type: "button", "aria-selected": s === state.site ? "true" : "false", onclick: () => { state.site = s; render(); } },
      h("span", {}, s.name, s.star ? h("em", {}, " · главная") : null), h("small", {}, s.sub))));
  return box;
}

function siteButton() {
  return h("details", { class: "site" },
    h("summary", {}, icon("pin"), h("span", { class: "site__txt" }, h("small", {}, `Площадка · 1 из ${SITES.length}`), h("b", {}, state.site.name)), icon("chev", "ic ic--s")),
    siteMenu());
}

function searchButton() {
  return h("button", { class: "find", type: "button", onclick: openPalette, "aria-label": "Найти раздел, машину, площадку" },
    icon("search"), h("span", { class: "find__w" }, "Раздел, машина, номер…"), h("kbd", {}, "Ctrl K"));
}

function railNode() {
  return h("nav", { class: "rail", "aria-label": "Разделы" },
    h("a", { class: "rail__brand", href: "#", onclick: (e) => { e.preventDefault(); go(...ROLES[state.role].home); }, "aria-label": "Сокол — домой" }, brand()),
    TREE.map((s) => h("div", { class: "rail__it" },
      h("button", { class: "rail__btn", type: "button", "aria-current": s.id === state.sec ? "page" : null, onclick: () => go(s.id) },
        icon(s.ic), h("span", {}, s.word), s.badge ? h("i", { class: "badge" }, String(s.badge)) : null),
      h("div", { class: "fly", role: "menu" }, h("b", {}, s.word), s.tabs.map((t) => h("button", { type: "button", role: "menuitem", onclick: () => go(s.id, t.id) }, t.word, stTag(t.st, true)))))),
    h("div", { class: "rail__end" }, h("button", { class: "rail__btn", type: "button", onclick: toggleTheme }, icon("theme"), h("span", {}, "Тема"))));
}

function brand() {
  return h("span", { class: "brand", html: '<svg viewBox="0 0 24 24" class="ic" aria-hidden="true"><path d="M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4"/><rect x="8" y="9" width="8" height="6" rx="1"/></svg><span class="brand__w">Сокол</span>' });
}

const stTag = (st, small = false) => h("span", { class: `st st--${ST[st][1]}${small ? " st--sm" : ""}` }, ST[st][0]);

function topNode() {
  const v = document.body.dataset.variant;
  return h("header", { class: "top" },
    v === "b" ? h("a", { class: "top__brand", href: "#", onclick: (e) => { e.preventDefault(); go(...ROLES[state.role].home); } }, brand()) : null,
    siteButton(),
    v === "b" ? h("nav", { class: "secs", "aria-label": "Разделы" }, TREE.map((s) => h("button", { type: "button", "aria-current": s.id === state.sec ? "page" : null, onclick: () => go(s.id) }, s.word, s.badge ? h("i", { class: "badge" }, String(s.badge)) : null))) : null,
    searchButton(),
    v === "b" ? h("button", { class: "allbtn", type: "button", onclick: () => { state.sheet = true; render(); } }, icon("grid"), h("span", {}, "Все разделы")) : null,
    h("button", { class: "answer", type: "button", onclick: () => go("events", "ask") }, h("i", { class: "dia" }), h("span", { class: "answer__w" }, "Ответить · "), "2"),
    h("div", { class: "role", role: "group", "aria-label": "Роль (для показа)" }, Object.entries(ROLES).map(([k, r]) => h("button", { type: "button", "aria-pressed": String(k === state.role), onclick: () => { state.role = k; go(...r.home); } }, r.word))),
    v === "b" ? h("button", { class: "iconbtn", type: "button", onclick: toggleTheme, "aria-label": "Тема" }, icon("theme")) : null);
}

function subNode() {
  const s = secOf(state.sec), t = tabOf();
  return h("div", { class: "sub" },
    h("p", { class: "crumbs" }, h("span", {}, state.site.name), " › ", h("span", {}, s.word), " › ", h("b", {}, t.word)),
    h("nav", { class: "tabs", "aria-label": `Вкладки раздела ${s.word}` }, s.tabs.map((x) => h("button", { type: "button", "aria-current": x.id === t.id ? "page" : null, onclick: () => go(s.id, x.id) }, x.word, x.badge ? h("i", { class: "badge" }, String(x.badge)) : null, x.st === "sample" || x.st === "plan" ? stTag(x.st, true) : null))));
}

function imgFor(t) {
  if (!t.img) return null;
  const key = t.img === "cams" ? `cams-${state.site.img ?? "none"}` : `${t.img}-${dark() ? "dark" : "light"}`;
  if (key === "cams-none") return null;
  return `img/${key}.jpg`;
}

function contentNode() {
  const s = secOf(state.sec), t = tabOf();
  if (s.id === "tz" && t.id === "tasks") return tzNode();
  if (s.id === "tz" && t.id === "extra") return extraNode();
  const src = imgFor(t);
  const note = h("div", { class: "where" }, stTag(t.st), h("span", {}, "В пульте сейчас: ", h("code", {}, t.now)));
  const phone = matchMedia("(max-width: 700px)").matches;
  if (phone && t.img === "cams" && state.site.id === "kampus") return h("div", { class: "page" }, note, phoneCams());
  if (phone && src && t.img !== "cams") return h("div", { class: "page" }, note, h("img", { class: "shot", src: `img/m-${t.img}.jpg`, alt: `${s.word} · ${t.word} — снимок на телефоне` }));
  if (src) return h("div", { class: "page" }, note, h("img", { class: "shot", src, alt: `${s.word} · ${t.word} — снимок пульта`, loading: "lazy" }));
  return h("div", { class: "page" }, note, h("div", { class: "empty" }, h("b", {}, `${s.word} · ${t.word}`),
    h("p", {}, t.img === "cams" ? "У этой площадки снимка в прототипе нет — в пульте здесь её камеры." : "Здесь откроется страница раздела. В прототипе — только место в меню: проверяем, как до неё дойти.")));
}

// Телефон: кадр камеры 1 и короткая сводка — как пульт на 390 (раскладка своя, не ужатый компьютер).
function phoneCams() {
  const row = (mark, name, sub, time) => h("li", {}, h("span", { class: `mk mk--${mark}` }), h("span", { class: "pr__w" }, h("b", {}, name), h("small", {}, sub)), h("span", { class: "pr__t" }, time));
  return h("div", { class: "phone" },
    h("ul", { class: "pcnt" }, h("li", {}, h("b", {}, "7"), " на площадке"), h("li", { class: "is-warn" }, h("b", {}, "4"), " не видно"), h("li", { class: "is-warn" }, h("b", {}, "2"), " вопроса")),
    h("img", { class: "shot", src: "img/cam1.jpg", alt: "Камера 1 · въезд, кампус" }),
    h("p", { class: "pcap" }, "Камера 1 · въезд — ещё 2 камеры листаются вбок"),
    h("ul", { class: "prows" }, row("dot", "Бетоновоз 3", "едет · камера 1", "1:12"), row("ring", "Фура 1", "стоит · камера 1", "56 с"), row("dash", "Самосвал 6", "не видно · камера 7", "2:31"), row("dot", "Погрузчик 4", "едет · камера 6", "0:48")));
}

function tzNode() {
  return h("div", { class: "page" }, h("div", { class: "where" }, stTag("plan"), h("span", {}, "Режим показа: пункт ТЗ → «Показать на панели» открывает нужный раздел")),
    h("ol", { class: "tz" }, TZ.map(([what, sec, tab, how], i) => h("li", {}, h("span", { class: "tz__n" }, String(i + 1)), h("span", { class: "tz__w" }, h("b", {}, what), h("small", {}, `${secOf(sec).word} › ${secOf(sec).tabs.find((x) => x.id === tab).word} — ${how}`)),
      h("button", { type: "button", class: "tz__go", onclick: () => go(sec, tab) }, "Показать на панели →")))));
}

const EXTRA = ["План и прогресс", "Техника и документы", "Как устроено", "Госзаказ и доверие", "Жилой комплекс", "Магазин", "Цех", "Офис", "Как начать", "Каски и жилеты", "Объём здания", "Номер на КПП"];
function extraNode() {
  return h("div", { class: "page" }, h("div", { class: "where" }, stTag("sample"), h("span", {}, "Всё, чего нет в ТЗ, — одной полкой с меткой «пример», не в главном меню")),
    h("ul", { class: "extra" }, EXTRA.map((w) => h("li", {}, h("span", {}, w), stTag("sample", true)))));
}

function barNode() {
  const r = ROLES[state.role];
  return h("nav", { class: "bar", "aria-label": "Разделы, нижнее меню" },
    r.tabs.map((id) => { const s = secOf(id); return h("button", { type: "button", "aria-current": id === state.sec ? "page" : null, onclick: () => go(id) }, icon(s.ic), h("span", {}, s.word), s.badge ? h("i", { class: "badge" }, String(s.badge)) : null); }),
    h("button", { type: "button", "aria-current": r.tabs.includes(state.sec) ? null : "page", onclick: () => { state.sheet = true; render(); } }, icon("more"), h("span", {}, "Ещё")));
}

function sheetNode() {
  if (!state.sheet) return null;
  return h("div", { class: "sheet", onclick: (e) => { if (e.target.classList.contains("sheet")) { state.sheet = false; render(); } } },
    h("div", { class: "sheet__box", role: "dialog", "aria-label": "Все разделы" },
      h("div", { class: "sheet__head" }, h("b", {}, "Все разделы"), h("button", { type: "button", class: "iconbtn", onclick: () => { state.sheet = false; render(); }, "aria-label": "Закрыть" }, "✕")),
      h("div", { class: "sheet__grid" }, TREE.map((s) => h("section", {}, h("h3", {}, icon(s.ic), s.word), s.tabs.map((t) => h("button", { type: "button", onclick: () => go(s.id, t.id) }, t.word, t.st === "sample" || t.st === "plan" ? stTag(t.st, true) : null))))),
      h("div", { class: "sheet__foot" }, h("button", { type: "button", class: "iconbtn", onclick: toggleTheme }, icon("theme"), " Тема"),
        h("div", { class: "role", role: "group", "aria-label": "Роль" }, Object.entries(ROLES).map(([k, r]) => h("button", { type: "button", "aria-pressed": String(k === state.role), onclick: () => { state.role = k; go(...r.home); } }, r.word))))));
}

// Ctrl+K — командная палитра: разделы, вкладки, площадки, пункты ТЗ.
let pal = null;
function items() {
  const out = [];
  for (const s of TREE) for (const t of s.tabs) out.push({ w: `${s.word} › ${t.word}`, k: "раздел", run: () => go(s.id, t.id) });
  for (const x of SITES) out.push({ w: x.name, k: "площадка", run: () => { state.site = x; closePalette(); render(); } });
  for (const [w, sec, tab] of TZ) out.push({ w, k: "пункт ТЗ", run: () => go(sec, tab) });
  out.push({ w: "Самосвал 7 · Камера 7 · выезд", k: "машина", run: () => go("tech", "log") });
  out.push({ w: "Бортовой 8 — это Самосвал 7?", k: "вопрос", run: () => go("events", "ask") });
  return out;
}
function openPalette() {
  closePalette();
  const list = h("ul", { class: "pal__list", role: "listbox" });
  const input = h("input", { class: "pal__in", type: "search", placeholder: "Табель, Оберн, самосвал, номер…", "aria-label": "Поиск по пульту" });
  const draw = () => {
    const q = input.value.trim().toLowerCase();
    const hit = items().filter((i) => !q || i.w.toLowerCase().includes(q) || i.k.includes(q)).slice(0, 9);
    list.replaceChildren(...hit.map((i, n) => h("li", {}, h("button", { type: "button", class: n === 0 ? "is-first" : null, onclick: i.run }, h("span", {}, i.w), h("small", {}, i.k)))));
  };
  input.addEventListener("input", draw);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") list.querySelector("button")?.click(); if (e.key === "Escape") closePalette(); });
  pal = h("div", { class: "pal", onclick: (e) => { if (e.target === pal) closePalette(); } }, h("div", { class: "pal__box" }, h("div", { class: "pal__row" }, icon("search"), input, h("kbd", {}, "Esc")), list,
    h("p", { class: "pal__foot" }, "Enter — открыть · один поиск на разделы, площадки, машины и пункты ТЗ")));
  document.body.append(pal);
  draw();
  input.focus();
}
function closePalette() { pal?.remove(); pal = null; }

function toggleTheme() {
  document.documentElement.dataset.theme = dark() ? "light" : "dark";
  render();
}

export function render() {
  const app = $("#app");
  const v = document.body.dataset.variant;
  app.replaceChildren(...[
    v === "a" ? railNode() : null,
    h("div", { class: "main" }, topNode(), subNode(), h("main", { class: "content" }, contentNode())),
    barNode(), sheetNode()].filter(Boolean));
}

export function boot() {
  const q = new URLSearchParams(location.search);
  if (q.get("theme")) document.documentElement.dataset.theme = q.get("theme");
  if (q.get("role") && ROLES[q.get("role")]) state.role = q.get("role");
  if (q.get("sec") && secOf(q.get("sec"))) { state.sec = q.get("sec"); state.tab = q.get("tab") ?? secOf(state.sec).tabs[0].id; }
  if (q.get("site")) state.site = SITES.find((s) => s.id === q.get("site")) ?? state.site;
  document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); } if (e.key === "/" && !pal && document.activeElement === document.body) { e.preventDefault(); openPalette(); } });
  render();
  if (q.get("pal")) { openPalette(); const i = $(".pal__in"); i.value = q.get("pal"); i.dispatchEvent(new Event("input")); }
  if (q.get("sheet")) { state.sheet = true; render(); }
  if (q.get("sites")) $(".site")?.setAttribute("open", "");
}
