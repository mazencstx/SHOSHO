(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const C = window.SHOSHO;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const A = (n) => `assets/cut/${n}.webp`, P = (n) => `assets/panel/${n}.webp`;

  // ---------------- gifts ----------------
  const GIFTS = [
    { id: "ring", no: 1, t: "الخاتم", sub: "الهدية الأولى", short: "خاتم فضة عيار 925 مرصّع بفصوص من الزركون.", pic: "ring12", char: "ring18", gal: ["ring01", "ring02", "ring03", "ring04", "ring06", "ring08", "ring09", "ring10", "ring12", "ring14", "ring16", "ring18", "ring19", "ring20"],
      kick: "حاجة صغيرة على إيدك، ومعناها كبير.", body: ["خاتم من <b>الفضة عيار 925</b>، مرصّع بفصوص من <b>الزركون</b> اللامعة.", "اتصمّم عشان يفضل معاكي، ويفكّرك بيوم ما لبستيه."], chips: ["فضة عيار 925", "فصوص زركون", "هدية 1"] },
    { id: "perf", no: 2, t: "العطر", sub: "الهدية التانية", short: "أروقيت بينك. عطر يتقدم المشهد بثقة.", pic: "perf02", char: "ring14", gal: ["perf00", "perf01", "perf02", "all02"],
      kick: "عطر يتقدم المشهد بثقة.", body: ["لا تكتفي كل عطور النساء بأن تكون جميلة، فبعضها يترك انطباعًا منذ اللحظة الأولى، وبعضها يتحول إلى جزء من حضورك أينما ذهبتِ. <b>أروقيت بينك</b> يتقدم المشهد بثقة، ولا يمر مرورًا عابرًا، بل يفرض وجوده منذ أول رشة. إنه عطر نسائي فخم صُمم لمن تبحث عن حضور قوي، وفوحان ملحوظ، وثبات طويل يدوم لساعات.", "<b>تركيبة تليق بكِ.</b> تبدأ تركيبة أروقيت بينك بإحساس مشرق يملؤه الانتعاش والنعومة، ثم تتطور تدريجيًا إلى قلب زهري غني يمنح الرائحة طابعًا أنثويًا راقيًا، قبل أن تستقر على قاعدة دافئة وناعمة تضيف للعطر ثباتًا وأثرًا يدومان. هذا التدرج يجعل الرائحة تبدو أكثر انسجامًا مع مرور الوقت، لتمنحك تجربة متكاملة من أول رشة وحتى نهاية اليوم.", "صُمم أروقيت بينك على يد غيوم فيلاني، ليقدم تجربة متوازنة تجمع بين الفوحان والثبات والأناقة، وهو ما يجعله خيارًا مناسبًا لكل من تبحث عن أفضل عطر نسائي يجمع بين الأداء والشخصية."], chips: ["أروقيت بينك", "فوحان", "ثبات لساعات", "هدية 2"] },
    { id: "nfc", no: 3, t: "كارت الذكريات", sub: "الهدية التالتة · NFC", short: "كارت NFC فيه كل صورنا. قرّبيه من التليفون وشوفي.", pic: "card04", char: "ring20", gal: ["card00", "card01", "card02", "card03", "card04"],
      kick: "كل صورنا وفيديوهاتنا في كارت.", body: ["كارت <b>NFC</b> عليه كل صورنا والداتا بتاعتنا. بمجرد ما <b>تلمسيه بالتليفون</b> أو تقرّبيه منه، بيفتحلك لينك فيه كل الصور والفيديوهات بتاعتنا."], chips: ["NFC", "لمسة واحدة", "كل صورنا", "هدية 3"], action: "nfc" },
    { id: "qr", no: 4, t: "الملاهي", sub: "الهدية الرابعة · QR", short: "QR كود للملاهي، عشان كان نفسك تروحي.", pic: "qr05", char: "ring16", gal: ["qr04", "qr05", "qr06", "qr00", "qr01", "qr02", "qr03"],
      kick: "كان نفسك تروحي… وخلاص، هنروح.", body: ["<b>QR كود</b> للملاهي، عشان كان نفسك تروحي من زمان. امسحيه وهتلاقي مفاجأة الخروجة مستنياكي.", "استعدّي للألعاب والضحك والصوت العالي 🎢"], chips: ["QR كود", "الملاهي", "خروجة", "هدية 4"], action: "qr" },
    { id: "roses", no: 5, t: "بوكيه الورد", sub: "الهدية الأخيرة · كل الهدايا", short: "21 وردة بعدد سنينك، ومعاها كل الهدايا.", pic: "all07", char: "ring17", gal: ["all06", "all07", "all08", "sc3", "sd3", "se3", "all02", "ring22"],
      kick: "21 وردة. 21 سنة.", body: ["<b>بوكيه من 21 وردة</b>، عدد الورد زي عمرك بالظبط: 21 سنة.", "وجوّاه كل الهدايا مع بعض: الخاتم والعطر وكارت الذكريات وتذكرة الملاهي."], chips: ["21 وردة", "21 سنة", "كل الهدايا", "هدية 5"] },
  ];

  const grid = $("#gifts-grid");
  grid.innerHTML = GIFTS.map((g, i) => `<article class="gift reveal d${(i % 3) + 1} ${i % 2 ? "tr" : "tl"}" data-3d="0.7" data-i="${i}" tabindex="0" role="button" aria-label="افتحي ${g.t}">
    <span class="no">${g.no}</span>
    <div class="pic"><img src="${A(g.pic)}" alt="" loading="lazy"></div>
    <h3>${g.t}</h3><p>${g.short}</p><span class="open">افتحي الهدية ›</span>
    <img class="peek" src="${A(g.char)}" alt="" loading="lazy"></article>`).join("");

  // ---------------- modal ----------------
  const modal = $("#modal"), stage = $("#mstage"), dots = $("#mdots"), info = $("#minfo"), mchar = $("#mchar");
  let cur = 0, gi = 0, timer = 0, sx = 0;
  function show(i) {
    const imgs = [...stage.children]; if (!imgs.length) return;
    imgs.forEach((im, k) => { im.classList.toggle("on", k === i); im.classList.toggle("out", k < i); });
    [...dots.children].forEach((d, k) => d.classList.toggle("on", k === i)); gi = i;
  }
  const step = (d) => { const n = stage.children.length; show((gi + d + n) % n); resetAuto(); };
  const resetAuto = () => { clearInterval(timer); timer = setInterval(() => step(1), 4200); };
  function openGift(i) {
    cur = i; const g = GIFTS[i];
    stage.innerHTML = g.gal.map((n) => `<img src="${P(n)}" alt="" loading="eager">`).join("");
    dots.innerHTML = g.gal.map((_, k) => `<i data-k="${k}"></i>`).join("");
    let extra = "";
    if (g.action === "nfc") extra = `<button class="btn b" id="tap">📱 جرّبي المسة</button>`;
    if (g.action === "qr") extra = C.qrImage ? `<div class="qrbox"><img src="${C.qrImage}" alt="QR"></div>` : "";
    info.innerHTML = `<span class="pill b">${g.sub}</span><h3>${g.t}</h3><div class="kick">${g.kick}</div>${g.body.map((b) => `<p>${b}</p>`).join("")}<div class="chips">${g.chips.map((c, k) => `<span class="chip ${k === 0 ? "b" : ""}">${c}</span>`).join("")}</div><div class="mact">${extra}<button class="btn" id="nextGift">الهدية اللي بعدها ›</button></div>`;
    mchar.src = A(g.char);
    modal.classList.add("show"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("lock");
    show(0); resetAuto(); burst(0.5, 0.4, 60); $("#mbox").scrollTop = 0; info.scrollTop = 0;
    const tap = $("#tap"); if (tap) tap.onclick = () => nfcTap();
    $("#nextGift").onclick = () => openGift((cur + 1) % GIFTS.length);
    if (g.id === "roses") setTimeout(() => burst(0.5, 0.5, 140), 500);
  }
  function closeModal() { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); clearInterval(timer); }
  function nfcTap() {
    const b = document.createElement("div"); b.className = "beep"; b.textContent = "BEEP!"; document.body.appendChild(b); setTimeout(() => b.remove(), 1200); burst(0.5, 0.5, 120);
    if (C.nfcUrl) setTimeout(() => window.open(C.nfcUrl, "_blank", "noopener"), 900);
  }
  grid.addEventListener("click", (e) => { const a = e.target.closest(".gift"); if (a) openGift(+a.dataset.i); });
  grid.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.closest(".gift")) { e.preventDefault(); openGift(+e.target.closest(".gift").dataset.i); } });
  $("#mclose").onclick = closeModal; modal.addEventListener("pointerdown", (e) => { if (e.target === modal) closeModal(); });
  $("#mprev").onclick = () => step(1); $("#mnext").onclick = () => step(-1);   // RTL: ‹ goes forward
  dots.addEventListener("click", (e) => { const k = e.target.dataset.k; if (k != null) { show(+k); resetAuto(); } });
  addEventListener("keydown", (e) => { if (!modal.classList.contains("show")) return; if (e.key === "Escape") closeModal(); if (e.key === "ArrowLeft") step(1); if (e.key === "ArrowRight") step(-1); });
  stage.addEventListener("pointerdown", (e) => { sx = e.clientX; });
  stage.addEventListener("pointerup", (e) => { const dx = e.clientX - sx; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); });

  // ---------------- confetti ----------------
  const cv = $("#confetti"), cx = cv.getContext("2d"); let parts = [], raf = 0;
  const COL = ["#0010F0", "#8EC6E9", "#B4E3FD", "#ffffff", "#0A0A14", "#3a55ff"];
  const size = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
  size(); addEventListener("resize", size);
  function burst(fx, fy, n = 90) {
    if (reduce) return;
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, s = 4 + Math.random() * 11; parts.push({ x: fx * innerWidth, y: fy * innerHeight, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6, r: 5 + Math.random() * 7, c: COL[i % COL.length], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, life: 1, sh: Math.random() < 0.3 ? 1 : 0 }); }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach((p) => { p.vy += 0.28; p.vx *= 0.992; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.006; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4)); cx.fillStyle = p.c; if (p.sh) { cx.beginPath(); cx.arc(0, 0, p.r * 0.7, 0, 7); cx.fill(); } else cx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r); cx.restore(); });
    parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 30);
    raf = parts.length ? requestAnimationFrame(tick) : 0;
    if (!raf) cx.clearRect(0, 0, innerWidth, innerHeight);
  }
  window.SHOSHO_BURST = burst;
  function rain() { if (reduce) return; for (let i = 0; i < 4; i++) setTimeout(() => burst(0.15 + Math.random() * 0.7, 0.2 + Math.random() * 0.2, 60), i * 260); }
  $("#party").onclick = () => { rain(); floaters(24); };
  function floaters(n) { if (reduce) return; const E = ["💙", "🎈", "✨", "🎂", "🌹", "💍", "🎁"]; for (let i = 0; i < n; i++) { const f = document.createElement("span"); f.className = "floaty"; f.textContent = E[i % E.length]; f.style.left = Math.random() * 100 + "vw"; f.style.animationDuration = 4 + Math.random() * 4 + "s"; f.style.fontSize = 20 + Math.random() * 26 + "px"; document.body.appendChild(f); setTimeout(() => f.remove(), 8500); } }

  // ---------------- gate ----------------
  const gate = $("#gate");
  $("#openGate").onclick = () => { gate.classList.add("open"); document.body.classList.remove("lock"); setTimeout(() => { rain(); floaters(18); }, 500); setTimeout(() => (gate.style.display = "none"), 1100); };
  gate.addEventListener("keydown", (e) => { if (e.key === "Enter") $("#openGate").click(); });

  // ---------------- countdown ----------------
  const b = C.birthday, target = new Date(b.year, b.month, b.day, 0, 0, 0);
  const cd = $("#cd"), pad = (n) => String(n).padStart(2, "0");
  function tickCd() {
    const now = new Date(), d = target - now;
    if (d <= 0) {
      const same = now.toDateString() === target.toDateString();
      cd.classList.add("done"); $("#cdMsg").textContent = same ? "النهارده عيد ميلادك 🎂 كل سنة وانتي طيبة!" : "كل سنة وانتي طيبة يا شوشو 💙"; return;
    }
    $("#cdD").textContent = Math.floor(d / 864e5); $("#cdH").textContent = pad(Math.floor(d / 36e5) % 24); $("#cdM").textContent = pad(Math.floor(d / 6e4) % 60); $("#cdS").textContent = pad(Math.floor(d / 1e3) % 60);
  }
  tickCd(); setInterval(tickCd, 1000);

  // ---------------- marquee ----------------
  const words = ["HAPPY BIRTHDAY", "SHOSHO", "21 YEARS", "22.09.2005", "MAKE A WISH"];
  const run = `<div class="run">${words.map((w) => `<span>${w}</span><em></em>`).join("")}</div>`; $("#track").innerHTML = run + run;

  // ---------------- message (typewriter) ----------------
  $("#msgTitle").textContent = C.messageTitle; const body = $("#msgBody"); $("#msgSig").textContent = "";
  body.innerHTML = C.message.map(() => "<p></p>").join("");
  let started = false;
  async function type() {
    if (started) return; started = true; const ps = [...body.children];
    const total = C.message.join('').length, delay = Math.max(6, Math.min(32, 26000 / total));
    for (let i = 0; i < ps.length; i++) {
      ps[i].classList.add("caret"); const txt = C.message[i];
      if (reduce) ps[i].textContent = txt; else for (let k = 0; k < txt.length; k++) { ps[i].textContent = txt.slice(0, k + 1); await new Promise((r) => setTimeout(r, delay)); }
      ps[i].classList.remove("caret");
    }
    $("#msgSig").textContent = C.signature ? "— " + C.signature : ""; burst(0.5, 0.5, 80);
  }

  // ---------------- reveal + counters ----------------
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); if (e.target.classList.contains("msg-card")) type(); } }), { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal,.pop").forEach((el) => io.observe(el));
  const co = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; co.unobserve(e.target); const n = +e.target.dataset.count, t0 = performance.now(); if (reduce) return;
    const f = (t) => { const p = Math.min(1, (t - t0) / 1200); e.target.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }; e.target.textContent = 0; requestAnimationFrame(f);
  }), { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => co.observe(el));

  // ---------------- hero: pose swap + sparks ----------------
  const poses = ["ring18", "ring17", "ring16", "ring20", "ring15", "ring14", "ring21"]; let pi = 0; poses.forEach((p) => { const i = new Image(); i.src = A(p); });
  const hc = $("#heroChar");
  const swap = () => { pi = (pi + 1) % poses.length; hc.src = A(poses[pi]); hc.classList.add("hop3d"); setTimeout(() => hc.classList.remove("hop3d"), 750); burst(0.7, 0.45, 30); };
  hc.addEventListener("click", swap); document.querySelector(".poke").addEventListener("click", swap);
  if (!reduce && matchMedia("(pointer:fine)").matches) {
    let last = 0; addEventListener("pointermove", (e) => { const t = performance.now(); if (t - last < 90) return; last = t; const s = document.createElement("i"); s.className = "spark"; s.style.left = e.clientX - 8 + "px"; s.style.top = e.clientY - 8 + "px"; document.body.appendChild(s); setTimeout(() => s.remove(), 800); });
  }
})();
