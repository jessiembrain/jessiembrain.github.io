\/* =========================================================
   30 Day Map Challenge viewer
   - Starts on Day 1 (or the day in the URL, e.g. #day-12)
   - Prev / Next arrows, dropdown, day chips, ← → keys
   - Entries can span several days (dayEnd) and can embed
     an HTML map (embed) instead of an image.
   You shouldn't need to edit this file; edit challenge-data.js.
   ========================================================= */
(function () {
  const days = CHALLENGE;
  const total = days.length;
  const $ = (id) => document.getElementById(id);

  const pad = (n) => String(n).padStart(2, "0");
  const endDay = (d) => d.dayEnd || d.day;
  const label = (d) => pad(d.day) + (d.dayEnd ? "–" + pad(d.dayEnd) : "");
  const TOTAL_DAYS = endDay(days[days.length - 1]); // 30

  const select = $("daySelect"), chips = $("dayChips");
  const prev = $("prevDay"), next = $("nextDay");

  // Build dropdown + chips
  days.forEach((d, i) => {
    const num = label(d);
    select.add(new Option(`Day ${num} — ${d.theme}`, i));

    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (d.image || d.embed ? " has-map" : "") + (d.dayEnd ? " wide" : "");
    b.textContent = num;
    b.setAttribute("aria-label", `Day ${num}: ${d.theme}`);
    b.addEventListener("click", () => show(i));
    chips.appendChild(b);
  });

  function placeholder(d) {
    const pal = ["#ff6b35", "#2a9d8f", "#f4c95d", "#7b5ea7"];
    const c = pal[d.day % pal.length];
    let rings = "";
    for (let k = 1; k <= 9; k++) {
      rings += `<ellipse cx="${380 + Math.sin(d.day + k) * 14}" cy="250" rx="${k * 34}" ry="${k * 22}" fill="none" stroke="${c}" stroke-opacity="${0.15 + k * 0.05}" stroke-width="${k % 3 ? 1.2 : 2.4}"/>`;
    }
    return `<svg viewBox="0 0 760 500" class="placeholder" role="img" aria-label="Map coming soon">
      <rect width="760" height="500" fill="#1b2433"/>${rings}
      <text x="40" y="440" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="120" fill="${c}">${label(d)}</text>
      <text x="44" y="470" font-family="IBM Plex Mono, monospace" font-size="16" fill="#efe9dd" opacity=".7">map coming soon</text>
    </svg>`;
  }

  function stageHTML(d) {
    if (d.embed) {
      return `<iframe class="embed" src="${d.embed}" title="Day ${label(d)} — ${d.theme}: ${d.title}" loading="lazy"></iframe>`;
    }
    if (d.image) {
      return `<img src="${d.image}" alt="Day ${label(d)} — ${d.theme}: ${d.title}">`;
    }
    return placeholder(d);
  }

  let current = 0;
  function show(i, updateHash = true) {
    current = Math.max(0, Math.min(total - 1, i));
    const d = days[current];

    $("stage").innerHTML = stageHTML(d);

    $("dayNum").textContent = label(d);
    $("dayTheme").textContent = d.theme;
    $("dayTitle").textContent = d.title;
    $("dayDesc").textContent = d.description || "";
    $("dayTools").innerHTML = (d.tools || []).map((t) => `<li>${t}</li>`).join("");
    const link = $("dayLink");
    link.hidden = !d.link;
    if (d.link) link.href = d.link;
    $("counter").textContent = `${label(d)} / ${TOTAL_DAYS}`;
    $("progress").style.width = (endDay(d) / TOTAL_DAYS) * 100 + "%";

    select.value = current;
    prev.disabled = current === 0;
    next.disabled = current === total - 1;
    [...chips.children].forEach((c, k) => c.classList.toggle("active", k === current));
    chips.children[current].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });

    if (updateHash) history.replaceState(null, "", "#day-" + d.day);
  }

  prev.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  select.addEventListener("change", () => show(+select.value));
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "SELECT") return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Start on Day 1 unless the URL asks for another day (e.g. #day-12)
  function fromHash() {
    const m = location.hash.match(/day-(\d+)/);
    const idx = m ? days.findIndex((d) => +m[1] >= d.day && +m[1] <= endDay(d)) : -1;
    show(idx >= 0 ? idx : 0, idx >= 0);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
