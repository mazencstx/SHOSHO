/* الـ 21 وردة + مشاهد البوكيه + قسم "الموقع هيتطور" */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const C = window.SHOSHO, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";
  const INK = "#0A0A14";
  const COLORS = ["#E63946", "#FF7F50", "#FFB703", "#FFE066", "#B5E48C", "#52B788", "#2EC4B6", "#00B4D8", "#4361EE", "#7B2CBF", "#C77DFF", "#F72585", "#FF9EBB", "#FFC8DD", "#F4A261", "#FB8500", "#9D0208", "#8ECAE6", "#CDB4DB", "#E76F51"];
  const LIGHT = [2, 3, 4, 12, 13, 14, 17, 18];
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); const f = (v) => Math.max(0, Math.min(255, Math.round(v * k))); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; };

  // ---------- one rose, drawn in SVG (each one gets its own colour and its own petal shape) ----------
  function rose(color, i) {
    const svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "-50 -50 100 100"); svg.setAttribute("class", "rose-svg");
    const layers = 3 + (i % 3), rot0 = (i * 37) % 60, sq = 0.82 + (i % 4) * 0.07;
    let g = "";
    for (let l = 0; l < layers; l++) {
      const n = 5 + ((i + l) % 3), R = 42 - l * (34 / layers), pw = R * (0.62 + 0.06 * (i % 3)), ph = R * sq;
      const fill = shade(color, 1.16 - l * 0.13);
      for (let k = 0; k < n; k++) {
        const a = rot0 + l * 23 + (360 / n) * k;
        g += `<ellipse cx="0" cy="${-R * 0.5}" rx="${pw * 0.62}" ry="${ph * 0.62}" transform="rotate(${a})" fill="${fill}" stroke="${INK}" stroke-width="2.4"/>`;
      }
    }
    g += `<path d="M0 0 m-6 0 a6 6 0 1 1 6 6 a4 4 0 1 1 -4 -4 a2 2 0 1 1 2 2" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
    svg.innerHTML = g; return svg;
  }

  // ---------- bouquet ----------
  const bq = $("#bouquet"), tray = $("#roseTray"), words = C.roseWords.slice(0, 20);
  let leaves = "";
  for (let k = 0; k < 26; k++) { const a = (k / 26) * 360; leaves += `<ellipse cx="50" cy="54.5" rx="6.5" ry="2.6" transform="rotate(${a} 50 54.5) translate(43 0)" fill="#2f9e5a" stroke="${INK}" stroke-width=".5"/>`; }
  let stems = ""; for (let k = 0; k < 9; k++) { const x = 50 + (k - 4) * 3; stems += `<path d="M${x} 80 Q ${50 + (k - 4) * 1.5} 100 ${50 + (k - 4) * 0.8} 124" fill="none" stroke="#1f7a43" stroke-width="1.6" stroke-linecap="round"/>`; }
  bq.innerHTML = `<svg class="bq-back" viewBox="0 0 100 125" aria-hidden="true">${stems}${leaves}<rect x="36" y="111" width="28" height="9" rx="2" fill="#fff" stroke="${INK}" stroke-width=".8" transform="rotate(-4 50 115)"/><text x="50" y="117" text-anchor="middle" font-size="3.6" font-weight="900" fill="#0010F0" font-family="Cairo" transform="rotate(-4 50 115)">21 سنة · 21 وردة</text></svg>`;
  const pos = [];
  for (let k = 0; k < 8; k++) pos.push([27, (k / 8) * 360 + 11, 17.5]);
  for (let k = 0; k < 12; k++) pos.push([41, (k / 12) * 360 + 3, 15]);
  const state = { open: new Set() };
  const CY = 47 * 0.8 + 6;
  pos.forEach(([r, deg, size], i) => {
    const a = (deg - 90) * Math.PI / 180, x = 50 + r * Math.cos(a), y = CY + (r * Math.sin(a)) * 0.8;
    const b = document.createElement("button"); b.type = "button"; b.className = "rose"; b.dataset.i = i; b.setAttribute("aria-label", `وردة ${i + 1}`);
    b.style.cssText = `left:${x}%;top:${y}%;width:${size}%;--d:${(i * 0.09).toFixed(2)}s`;
    b.appendChild(rose(COLORS[i], i));
    bq.appendChild(b);
  });
  const big = document.createElement("button"); big.type = "button"; big.className = "rose big"; big.setAttribute("aria-label", "الوردة الكبيرة رقم 21");
  big.style.cssText = `left:50%;top:${CY}%;width:31%`; big.appendChild(rose("#F72585", 5)); big.insertAdjacentHTML("beforeend", `<span class="n21">21</span>`); bq.appendChild(big);

  const bubble = document.createElement("div"); bubble.className = "bubble"; bq.appendChild(bubble); let bt = 0;
  function say(el, txt) {
    const r = el.getBoundingClientRect(), b = bq.getBoundingClientRect();
    bubble.textContent = txt; bubble.style.left = ((r.left + r.width / 2 - b.left) / b.width * 100) + "%"; bubble.style.top = ((r.top - b.top) / b.height * 100) + "%";
    bubble.classList.remove("show"); void bubble.offsetWidth; bubble.classList.add("show"); clearTimeout(bt); bt = setTimeout(() => bubble.classList.remove("show"), 2300);
  }
  const hop = (el) => { el.classList.remove("hop3d"); void el.offsetWidth; el.classList.add("hop3d"); };
  const burst = (x, y, n) => window.SHOSHO_BURST && window.SHOSHO_BURST(x, y, n);
  const center = (el) => { const r = el.getBoundingClientRect(); return [(r.left + r.width / 2) / innerWidth, (r.top + r.height / 2) / innerHeight]; };
  const chip = (txt, i) => { const c = document.createElement("span"); c.className = "chip3"; c.textContent = txt; c.style.background = COLORS[i]; c.style.color = LIGHT.includes(i) ? INK : "#fff"; return c; };
  function openRose(el) {
    const i = +el.dataset.i; hop(el); say(el, words[i]); burst(...center(el), 26);
    if (!state.open.has(i)) {
      state.open.add(i); el.classList.add("opened"); $("#roseN").textContent = state.open.size; tray.appendChild(chip(words[i], i));
      if (state.open.size === 20) { big.classList.add("ready"); setTimeout(() => say(big, "دلوقتي الوردة الكبيرة 💙"), 900); }
    }
  }
  bq.addEventListener("click", (e) => { const rz = e.target.closest(".rose"); if (!rz) return; if (rz === big) bloom(); else openRose(rz); });

  const fin = $("#roseFinal"), all = $("#roseAll"); let bloomed = false;
  async function bloom() {
    hop(big); burst(...center(big), 90);
    if (bloomed) return; bloomed = true; big.classList.add("opened");
    fin.classList.add("show"); $("#roseGreet").textContent = C.roseGreeting;
    fin.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    for (let k = 0; k < words.length; k++) { const c = chip(words[k], k); c.classList.add("bigchip"); all.appendChild(c); if (!reduce) await new Promise((rz) => setTimeout(rz, 220)); }
    const h = document.createElement("div"); h.className = "heart-line"; h.textContent = "💙 ♾️"; all.appendChild(h); burst(0.5, 0.5, 140);
  }

  // ---------- scenes (cut-outs floating in 3D) ----------
  const S = (n) => `assets/scene/${n}.webp`, P = (n) => `assets/panel/${n}.webp`;
  const card = (src, cap, cls) => `<figure class="sc ${cls} reveal" data-3d="1"><div class="sc-disc"></div><img src="${src}" alt="${cap}" loading="lazy"></figure>`;
  $("#rowA").innerHTML = ["sc1", "sd1", "se1"].map((n, i) => card(S(n), "كشف البوكيه", i % 2 ? "tr" : "tl")).join("");
  $("#rowB").innerHTML = ["sd2", "se2", "sc2"].map((n, i) => card(S(n), "بيشمها وهي مبسوطة", i % 2 ? "tr" : "tl")).join("");
  $("#rowC").innerHTML = ["sc3", "sd3", "se3"].map((n, i) => `<figure class="sc panelc reveal ${i % 2 ? "tr" : "tl"}" data-3d="0.8"><img src="${P(n)}" alt="الهدايا كلها مع بعض" loading="lazy"></figure>`).join("");
  // the new blocks are created after main.js registered its observers, so reveal them here
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll("#scenes .reveal, #roses .reveal, #next .reveal, #next .pop").forEach((el) => io.observe(el));

  // ---------- next ----------
  $("#nextTitle").textContent = C.nextTitle; $("#nextText").textContent = C.nextText; $("#nextEnd").textContent = C.nextEnd;
})();
