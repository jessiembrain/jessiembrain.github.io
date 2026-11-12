/* =========================================================
   GIS Portfolio — generative map art + small interactions
   Thumbnails are drawn from code so the site looks finished
   before you add screenshots. To use a real image, replace a
   card's <div class="thumb" data-art="..."> contents with
   <img src="images/your-map.jpg" alt=""> and remove data-art.
   ========================================================= */

const NS = "http://www.w3.org/2000/svg";
const C = { accent: "#ff6b35", teal: "#2a9d8f", butter: "#f4c95d", plum: "#7b5ea7", ink: "#1b2433" };

// Tiny seeded RNG so art is the same on every load
function rng(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}
function el(tag, attrs = {}, parent) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}
function svg(w, h) {
  return el("svg", { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: "xMidYMid slice" });
}
// Closed wobbly loop around (cx, cy)
function blob(cx, cy, r, phase, wob = 0.18, n = 90) {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const k = 1 + wob * Math.sin(3 * t + phase) + wob * 0.6 * Math.sin(5 * t - phase * 1.7) + wob * 0.3 * Math.cos(7 * t + phase);
    d += (i ? "L" : "M") + (cx + Math.cos(t) * r * k).toFixed(1) + " " + (cy + Math.sin(t) * r * k * 0.8).toFixed(1);
  }
  return d + "Z";
}

/* ---------- Hero contour background ---------- */
function drawHero() {
  const s = document.getElementById("contours");
  if (!s) return;
  s.innerHTML = "";
  const w = s.clientWidth, h = s.clientHeight;
  s.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const peaks = [
    { x: w * 0.82, y: h * 0.32, n: 22, p: 0.4 },
    { x: w * 0.62, y: h * 0.95, n: 16, p: 2.1 },
    { x: w * 0.05, y: h * 0.1, n: 10, p: 4.0 },
  ];
  peaks.forEach((pk) => {
    for (let i = 1; i <= pk.n; i++) {
      el("path", { d: blob(pk.x, pk.y, i * 26, pk.p + i * 0.22, 0.12 + i * 0.006), class: i % 5 === 0 ? "index" : "" }, s);
    }
  });
  el("circle", { cx: peaks[0].x, cy: peaks[0].y, r: 5 }, s);
}

/* ---------- Thumbnail generators ---------- */
const art = {
  // 30 tiles = 30 days
  challenge(box) {
    const s = svg(600, 420), r = rng(30);
    s.setAttribute("preserveAspectRatio", "xMidYMid meet");
    el("rect", { width: 600, height: 420, fill: C.ink }, s);
    const cols = 6, rows = 5, g = 10, tw = (600 - g * (cols + 1)) / cols, th = (420 - g * (rows + 1)) / rows;
    const pal = [C.accent, C.teal, C.butter, C.plum, "#efe9dd"];
    for (let i = 0; i < 30; i++) {
      const x = g + (i % cols) * (tw + g), y = g + Math.floor(i / cols) * (th + g);
      const col = pal[Math.floor(r() * pal.length)];
      const grp = el("g", {}, s);
      el("rect", { x, y, width: tw, height: th, rx: 8, fill: col, opacity: 0.95 }, grp);
      const m = i % 4; // little motif per tile: points / lines / polygons / contours
      if (m === 0) for (let k = 0; k < 7; k++) el("circle", { cx: x + 12 + r() * (tw - 24), cy: y + 12 + r() * (th - 24), r: 2.5, fill: C.ink }, grp);
      if (m === 1) el("path", { d: `M${x + 8} ${y + th * 0.7} Q${x + tw * 0.4} ${y + 6} ${x + tw - 8} ${y + th * 0.55}`, stroke: C.ink, "stroke-width": 2.5, fill: "none" }, grp);
      if (m === 2) el("path", { d: `M${x + tw * 0.25} ${y + th * 0.2}L${x + tw * 0.8} ${y + th * 0.35}L${x + tw * 0.65} ${y + th * 0.8}L${x + tw * 0.2} ${y + th * 0.7}Z`, fill: C.ink, opacity: 0.25 }, grp);
      if (m === 3) for (let k = 1; k <= 3; k++) el("ellipse", { cx: x + tw / 2, cy: y + th / 2, rx: k * 9, ry: k * 6, fill: "none", stroke: C.ink, "stroke-width": 1.5, opacity: 0.6 }, grp);
      const t = el("text", { x: x + 8, y: y + th - 8, "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: C.ink }, grp);
      t.textContent = String(i + 1).padStart(2, "0");
    }
    box.appendChild(s);
  },

  // Hexbin choropleth
  choropleth(box) {
    const s = svg(600, 375);
    el("rect", { width: 600, height: 375, fill: "var(--paper)" }, s);
    const ramp = ["#fbe9b7", C.butter, "#f79a52", C.accent, "#c8401b", "#7a2410"];
    const R = 18, hw = Math.sqrt(3) * R;
    for (let row = -1; row < 16; row++) {
      for (let col = -1; col < 20; col++) {
        const cx = col * hw + (row % 2 ? hw / 2 : 0), cy = row * R * 1.5;
        const v = Math.sin(cx / 90) + Math.cos(cy / 70) + Math.sin((cx + cy) / 130) * 1.2;
        const idx = Math.max(0, Math.min(5, Math.floor((v + 3) / 1.1)));
        let d = "";
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k + Math.PI / 6;
          d += (k ? "L" : "M") + (cx + R * Math.cos(a)).toFixed(1) + " " + (cy + R * Math.sin(a)).toFixed(1);
        }
        el("path", { d: d + "Z", fill: ramp[idx], stroke: "var(--paper)", "stroke-width": 2 }, s);
      }
    }
    box.appendChild(s);
  },

  // Transit lines on a street grid
  network(box) {
    const s = svg(600, 375);
    el("rect", { width: 600, height: 375, fill: "var(--paper)" }, s);
    for (let x = 0; x < 600; x += 30) el("line", { x1: x, y1: 0, x2: x + 40, y2: 375, stroke: "var(--line)", "stroke-width": 1 }, s);
    for (let y = 0; y < 375; y += 30) el("line", { x1: 0, y1: y, x2: 600, y2: y - 20, stroke: "var(--line)", "stroke-width": 1 }, s);
    const lines = [
      { c: C.accent, p: [[-10, 120], [180, 120], [260, 200], [610, 200]] },
      { c: C.teal, p: [[300, -10], [300, 150], [380, 230], [380, 385]] },
      { c: C.plum, p: [[-10, 300], [150, 300], [230, 220], [450, 220], [540, 130], [610, 130]] },
    ];
    lines.forEach((l) => {
      el("circle", { cx: 300, cy: 190, r: 70, fill: l.c, opacity: 0.08 }, s);
      el("path", { d: "M" + l.p.map((q) => q.join(" ")).join("L"), stroke: l.c, "stroke-width": 9, fill: "none", "stroke-linejoin": "round", "stroke-linecap": "round" }, s);
      l.p.slice(1, -1).forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 8, fill: "var(--paper)", stroke: "var(--ink)", "stroke-width": 3 }, s));
    });
    box.appendChild(s);
  },

  // Hypsometric contour map
  topo(box) {
    const s = svg(600, 375);
    const tints = ["#d9e8d2", "#b9d6b0", "#e9dfb0", "#e8c48f", "#d79c6c", "#b5714c", "#8b4f36", "#f4efe6"];
    el("rect", { width: 600, height: 375, fill: "#cfe3dc" }, s);
    for (let i = 13; i >= 1; i--) {
      el("path", { d: blob(360, 190, i * 24, 1.3 + i * 0.15, 0.2), fill: tints[Math.min(7, Math.floor((13 - i) / 1.7))], stroke: "#5b3a29", "stroke-width": i % 4 === 0 ? 1.6 : 0.6, "stroke-opacity": 0.6 }, s);
    }
    el("path", { d: "M-10 340 C120 300 160 360 260 320 S420 250 610 280", stroke: "#3e7cb1", "stroke-width": 4, fill: "none" }, s);
    box.appendChild(s);
  },

  // Dot density
  dots(box) {
    const s = svg(600, 375), r = rng(7);
    el("rect", { width: 600, height: 375, fill: C.ink }, s);
    const hubs = [[180, 160, C.butter], [420, 230, C.accent], [330, 110, C.teal]];
    for (let i = 0; i < 1400; i++) {
      const [hx, hy, col] = hubs[i % 3];
      const a = r() * Math.PI * 2, d = Math.pow(r(), 1.8) * 170;
      el("circle", { cx: hx + Math.cos(a) * d * 1.3, cy: hy + Math.sin(a) * d * 0.8, r: 1.6, fill: col, opacity: 0.85 }, s);
    }
    box.appendChild(s);
  },

  // Parcels becoming gardens
  parcels(box) {
    const s = svg(600, 375), r = rng(42);
    el("rect", { width: 600, height: 375, fill: "var(--ink)" }, s);
    for (let by = 0; by < 375; by += 95) {
      for (let bx = 0; bx < 600; bx += 150) {
        const cols = 5, rows = 2, pw = (150 - 18) / cols, ph = (95 - 18) / rows;
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
          const v = r();
          const fill = v > 0.82 ? C.teal : v > 0.7 ? C.butter : "var(--paper)";
          el("rect", { x: bx + 9 + i * pw, y: by + 9 + j * ph, width: pw - 2, height: ph - 2, fill, opacity: fill === "var(--paper)" ? 0.9 : 1 }, s);
        }
      }
    }
    box.appendChild(s);
  },
};

document.querySelectorAll(".thumb[data-art]").forEach((box) => {
  if (box.querySelector("img")) return; // real image wins
  art[box.dataset.art]?.(box);
});

/* ---------- Hero contours + live coordinate readout ---------- */
drawHero();
let resizeTimer;
window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawHero, 150); });

const hero = document.querySelector(".hero");
const lat = document.getElementById("lat"), lon = document.getElementById("lon");
hero?.addEventListener("mousemove", (e) => {
  const b = hero.getBoundingClientRect();
  const fx = (e.clientX - b.left) / b.width, fy = (e.clientY - b.top) / b.height;
  lat.textContent = (39.98 - fy * 0.06).toFixed(4) + "° N";   // centered on Philadelphia
  lon.textContent = (75.20 - fx * 0.08).toFixed(4) + "° W";
});

document.getElementById("year").textContent = new Date().getFullYear();
