(() => {
  /* ZAMIJENI: email na koji stižu narudžbe (privremen, nije stvaran) */
  const ORDER_EMAIL = "narudzbe@medomed.ba";

  const HONEY = [
    { id:"bagrem",    name:"Bagremov",    label:"Bagrem",    color:"#ffc971", from:0, to:1, bloom:"april – maj", crys:"vrlo sporo",
      taste:"Blag i svijetao, skoro bez mirisa. Dugo ostaje tečan.", h:1.30, fill:.80 },
    { id:"suncokret", name:"Suncokretov", label:"Suncokret", color:"#ffb627", from:3, to:3, bloom:"jul", crys:"brzo",
      taste:"Jarko žut i blago kiselkast. Brzo postaje kremast.", h:1.10, fill:.86 },
    { id:"livadski",  name:"Livadski",    label:"Livada",    color:"#ff9505", from:1, to:3, bloom:"maj – jul", crys:"srednje",
      taste:"Mješavina livadskog cvijeća: pun i cvjetan, svake godine malo drugačiji.", h:1.42, fill:.76 },
    { id:"planinski", name:"Planinski",   label:"Planina",   color:"#e2711d", from:2, to:4, bloom:"jun – avgust", crys:"srednje",
      taste:"Sa viših pašnjaka. Aromatičan, sa notom bilja.", h:1.18, fill:.82 },
    { id:"sumski",    name:"Šumski",      label:"Šuma",      color:"#cc5803", from:3, to:5, bloom:"jul – septembar", crys:"vrlo sporo",
      taste:"Medljikovac: taman, manje sladak, gorko-sladak kraj.", h:1.34, fill:.78 },
  ];
  const SIZES = ["0,5 kg", "1 kg"];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";

  /* ---------- Tegla (SVG) ---------- */
  const shade = (hex, amt) => {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  function jarSVG(v, uid, opts = {}) {
    const W = 120, H = Math.round(120 * v.h);
    const lidY = 6, lidH = 20, neckY = lidY + lidH, neckH = 8;
    const bodyY = neckY + neckH, bodyH = H - bodyY - 2;
    const honeyTop = bodyY + bodyH * (1 - v.fill);
    const body = `M24 ${bodyY} H96 Q110 ${bodyY} 110 ${bodyY + 16} V${H - 18} Q110 ${H - 2} 94 ${H - 2} H26 Q10 ${H - 2} 10 ${H - 18} V${bodyY + 16} Q10 ${bodyY} 24 ${bodyY} Z`;
    const labelY = bodyY + bodyH * 0.40;
    return `
<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${v.name} med u tegli">
  <defs>
    <clipPath id="c-${uid}"><path d="${body}"/></clipPath>
    <linearGradient id="g-${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${shade(v.color, .38)}"/>
      <stop offset=".45" stop-color="${v.color}"/>
      <stop offset="1" stop-color="${shade(v.color, -.32)}"/>
    </linearGradient>
    <pattern id="k-${uid}" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#fff4e0"/><rect width="4" height="4" fill="#cc5803" opacity=".85"/><rect x="4" y="4" width="4" height="4" fill="#cc5803" opacity=".85"/>
      <rect x="4" width="4" height="4" fill="#cc5803" opacity=".35"/><rect y="4" width="4" height="4" fill="#cc5803" opacity=".35"/>
    </pattern>
    <pattern id="x-${uid}" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.1" fill="#fff8e6"/><circle cx="4.6" cy="4.2" r=".8" fill="#fff8e6"/>
    </pattern>
  </defs>
  <path d="${body}" fill="rgba(255,250,236,.28)"/>
  <g clip-path="url(#c-${uid})">
    <g class="honey" data-top="${honeyTop}" data-bottom="${H}">
      <rect x="0" y="${honeyTop}" width="${W}" height="${H - honeyTop}" fill="url(#g-${uid})"/>
      <ellipse cx="60" cy="${honeyTop}" rx="52" ry="3.2" fill="${shade(v.color, .5)}" opacity=".9"/>
      ${opts.crystal ? `<rect class="crystal" x="0" y="${honeyTop}" width="${W}" height="${H - honeyTop}" fill="url(#x-${uid})" opacity="0"/><rect class="cream" x="0" y="${honeyTop}" width="${W}" height="${H - honeyTop}" fill="#ffe9bf" opacity="0"/>` : ""}
    </g>
  </g>
  <path d="${body}" fill="none" stroke="rgba(90,52,22,.38)" stroke-width="1.6"/>
  <path class="glint" d="M19 ${bodyY + 20} V${H - 26}" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path class="glint" d="M100 ${bodyY + 22} V${bodyY + 40}" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/>
  <rect x="22" y="${neckY}" width="76" height="${neckH + 2}" rx="3" fill="rgba(255,250,236,.4)" stroke="rgba(90,52,22,.35)" stroke-width="1.4"/>
  <g>
    <path d="M12 ${lidY + 4} Q60 ${lidY - 6} 108 ${lidY + 4} L112 ${lidY + lidH + 2} Q104 ${lidY + lidH + 9} 96 ${lidY + lidH + 3} Q88 ${lidY + lidH + 10} 78 ${lidY + lidH + 3} Q69 ${lidY + lidH + 10} 60 ${lidY + lidH + 3} Q51 ${lidY + lidH + 10} 42 ${lidY + lidH + 3} Q32 ${lidY + lidH + 10} 24 ${lidY + lidH + 3} Q16 ${lidY + lidH + 9} 8 ${lidY + lidH + 2} Z" fill="url(#k-${uid})" stroke="rgba(90,40,10,.45)" stroke-width="1.2"/>
    <path d="M14 ${lidY + lidH - 3} Q60 ${lidY + lidH + 1} 106 ${lidY + lidH - 3}" stroke="#8d6a48" stroke-width="2" fill="none"/>
  </g>
  <g transform="rotate(-4 60 ${labelY})">
    <rect x="26" y="${labelY - 12}" width="68" height="24" rx="2" fill="#fffaf0" opacity=".96"/>
    <text x="60" y="${labelY + 6}" text-anchor="middle" font-family="Patrick Hand, cursive" font-size="17" fill="#2a1608">${v.label}</text>
  </g>
</svg>`;
  }

  /* ---------- Korpa (stanje) ---------- */
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("medomed-korpa") || "{}") || {}; } catch (e) { cart = {}; }
  // Zadrži samo vrste koje još postoje, sa ispravnom količinom i veličinom
  cart = Object.fromEntries(Object.entries(cart).filter(([id, l]) =>
    HONEY.some(v => v.id === id) && l && Number.isInteger(l.qty) && l.qty > 0 && SIZES.includes(l.size)));
  const save = () => { try { localStorage.setItem("medomed-korpa", JSON.stringify(cart)); } catch (e) {} };
  const totalJars = () => Object.values(cart).reduce((s, l) => s + l.qty, 0);
  const jarWord = n => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return "tegla";
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "tegle";
    return "tegli";
  };

  /* ---------- Medo: stidljivi medvjedić koji se krije po stranici ---------- */
  const MEDO_SVG = `<svg viewBox="0 0 64 60">
    <circle class="m-fur" cx="13" cy="14" r="10"/><circle class="m-ear" cx="13" cy="14" r="5"/>
    <circle class="m-fur" cx="51" cy="14" r="10"/><circle class="m-ear" cx="51" cy="14" r="5"/>
    <ellipse class="m-fur" cx="32" cy="35" rx="26" ry="24"/>
    <ellipse cx="32" cy="44" rx="11" ry="8.5" fill="#e8b27a"/>
    <ellipse cx="32" cy="39.5" rx="4.2" ry="3" fill="#2a1608"/>
    <path d="M32 42.5v3.2M28.5 46.5q3.5 2.4 7 0" stroke="#2a1608" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <g class="medo-eyes"><circle cx="22.5" cy="30" r="2.7" fill="#2a1608"/><circle cx="41.5" cy="30" r="2.7" fill="#2a1608"/>
    <circle cx="23.3" cy="29.1" r=".8" fill="#fff"/><circle cx="42.3" cy="29.1" r=".8" fill="#fff"/></g>
  </svg>`;
  // dir: "side" viri sa strane, "up" viri preko gornjeg ruba; delay: koliko čeka prije prvog izvirivanja
  const medo = (dir, cls = "", delay = .6) =>
    `<span class="medo ${cls}" data-dir="${dir}" data-delay="${delay}" aria-hidden="true">${MEDO_SVG}</span>`;
  const POSE = {
    side: { hide: { x: -64, y: 0, rotate: 0 }, peek: { x: -24, y: 0, rotate: 14 } },
    up:   { hide: { y: 0, yPercent: 100 },     peek: { y: 0, yPercent: 16 } },
  };
  // Bez GSAP-a ili uz smanjeno kretanje medo samo mirno viri (CSS)
  const medoIO = hasGsap && !reduce && "IntersectionObserver" in window && new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    medoIO.unobserve(en.target);
    gsap.to(en.target.firstElementChild, { ...POSE[en.target.dataset.dir].peek, duration: 1, delay: +en.target.dataset.delay, ease: "back.out(2.2)" });
  }), { threshold: 1 });
  function setupMedos(root = document) {
    if (!medoIO) return;
    root.querySelectorAll(".medo:not([data-ready])").forEach(m => {
      m.dataset.ready = "";
      const svg = m.firstElementChild, p = POSE[m.dataset.dir];
      gsap.set(svg, p.hide);
      medoIO.observe(m);
      let t;
      m.addEventListener("pointerenter", () => { // stidljiv: sakrije se, pa opet proviri
        clearTimeout(t);
        gsap.to(svg, { ...p.hide, duration: .35, ease: "power3.in", overwrite: true });
        t = setTimeout(() => gsap.to(svg, { ...p.peek, duration: .9, ease: "back.out(2.2)", overwrite: true }), 1800);
      });
    });
  }

  /* ---------- Polica ---------- */
  const jarsEl = document.getElementById("jars");
  const tagsEl = document.getElementById("tags");
  const tilts = [-2.5, 1.8, -1.2, 2.4, -1.8];
  HONEY.forEach((v, i) => {
    const b = document.createElement("button");
    b.className = "jar"; b.type = "button"; b.dataset.id = v.id;
    b.setAttribute("aria-label", `Dodaj ${v.name.toLowerCase()} med u korpu`);
    b.innerHTML = jarSVG(v, "j" + i);
    const slot = document.createElement("div");
    slot.className = "jar-slot";
    slot.appendChild(b);
    if (v.id === "sumski") slot.insertAdjacentHTML("beforeend", medo("side", "", 2.4));
    jarsEl.appendChild(slot);

    const t = document.createElement("div");
    t.className = "tag"; t.style.setProperty("--tilt", tilts[i] + "deg");
    t.innerHTML = `
      <div class="card">
        <h2 class="card-title"><span class="swatch" style="background:${v.color}"></span>${v.name}</h2>
        <dl><dt>Cvjeta</dt><dd>${v.bloom}</dd><dt>Kristal.</dt><dd>${v.crys}</dd></dl>
        <button class="add" type="button" data-id="${v.id}"><svg aria-hidden="true"><use href="#i-plus"/></svg>Dodaj</button>
        <span class="in-cart" data-for="${v.id}" aria-live="polite"></span>
      </div>`;
    tagsEl.appendChild(t);
  });

  /* ---------- Kalendar ---------- */
  const cal = document.getElementById("cal");
  HONEY.forEach((v, i) => {
    const row = document.createElement("div");
    row.className = "cal-row"; row.setAttribute("role", "row");
    let cells = `<div class="cal-name" role="rowheader"><span class="swatch" style="background:${v.color}"></span>${v.name}</div>`;
    for (let m = 0; m < 6; m++) cells += `<div class="cal-cell" role="cell" style="grid-column:${m + 2};grid-row:${i + 2}"><span class="sr">${m >= v.from && m <= v.to ? "cvjeta" : ""}</span></div>`;
    cells += `<div class="cal-bar" aria-hidden="true" style="grid-column:${v.from + 2} / ${v.to + 3};grid-row:${i + 2};background:${v.color}">${v.id === "sumski" ? medo("up") : ""}</div>`;
    cells += `<div class="cal-note" role="cell" style="grid-column:8;grid-row:${i + 2}">${v.taste}</div>`;
    row.innerHTML = cells;
    row.firstElementChild.style.gridRow = i + 2;
    cal.appendChild(row);
  });

  /* ---------- Kristalizacija ---------- */
  const crysV = { ...HONEY[2], h: 1.3, fill: .8 };
  document.getElementById("crysJar").innerHTML = jarSVG(crysV, "cx", { crystal: true }) + medo("side", "flip");
  document.querySelector(".foot").insertAdjacentHTML("beforeend", medo("up", "on-dark"));
  setupMedos();
  const range = document.getElementById("months"), out = document.getElementById("monthsOut");
  const STAGES = [
    ["Tek natočen", "Tečan i proziran."],
    ["1 mjesec", "Još tečan, tek se poneki kristal vidi."],
    ["2 mjeseca", "Počinje da se muti odozdo."],
    ["3 mjeseca", "Gust, zrnast, lijepo se maže."],
    ["4 mjeseca", "Kremast i svjetliji."],
    ["5 mjeseci", "Skoro potpuno kristalizirao."],
    ["6 mjeseci", "Čvrst. Topla kupka ga vraća u tečno stanje."],
  ];
  const crystal = document.querySelector("#crysJar .crystal"), cream = document.querySelector("#crysJar .cream");
  const setStage = () => {
    const s = +range.value;
    range.style.setProperty("--p", (s / 6 * 100) + "%");
    out.innerHTML = `${STAGES[s][0]}<small>${STAGES[s][1]}</small>`;
    const o1 = Math.min(1, s / 4), o2 = s / 6 * .55;
    if (hasGsap && !reduce) { gsap.to(crystal, { opacity: o1, duration: .5, ease: "expo.out" }); gsap.to(cream, { opacity: o2, duration: .5, ease: "expo.out" }); }
    else { crystal.setAttribute("opacity", o1); cream.setAttribute("opacity", o2); }
  };
  range.addEventListener("input", setStage); setStage();

  /* ---------- Narudžba ---------- */
  const linesEl = document.getElementById("lines");
  const countEl = document.getElementById("basketCount");
  const basketBtn = document.getElementById("basketBtn");
  const submitBtn = document.getElementById("submitBtn");
  const formNote = document.getElementById("formNote");

  function render() {
    const n = totalJars();
    // Korpa se promijenila: pripremljeni tekst više ne važi, vrati formu
    if (!done.hidden) { done.hidden = true; form.hidden = false; }
    countEl.textContent = n;
    countEl.setAttribute("aria-label", `${n} ${jarWord(n)} u korpi`);
    document.querySelectorAll(".in-cart").forEach(s => {
      const l = cart[s.dataset.for];
      s.textContent = l ? `${l.qty} u korpi` : "";
    });
    submitBtn.disabled = n === 0;
    formNote.textContent = n === 0 ? "Prvo dodaj bar jednu teglu." : "Plaćanje i dostavu dogovaramo nakon što primimo narudžbu.";

    const ids = HONEY.filter(v => cart[v.id]);
    if (!ids.length) {
      linesEl.innerHTML = `<div class="empty"><p>Korpa je prazna. Tegle čekaju na polici.</p>
        <a class="ghost" href="#polica"><svg aria-hidden="true"><use href="#i-up"/></svg>Nazad na policu</a></div>`;
      return;
    }
    linesEl.innerHTML = `<ul class="lines">${ids.map(v => {
      const l = cart[v.id];
      return `<li class="line">
        <span class="line-dot" style="background:${v.color}" aria-hidden="true"></span>
        <span class="line-name">${v.name}</span>
        <span></span>
        <div class="line-ctrl">
          <div class="sizes" role="group" aria-label="Veličina tegle za ${v.name}">
            ${SIZES.map(s => `<button type="button" data-size="${s}" data-id="${v.id}" aria-pressed="${l.size === s}">${s}</button>`).join("")}
          </div>
          <div class="qty" role="group" aria-label="Količina za ${v.name}">
            <button type="button" data-dec="${v.id}" aria-label="Jedna manje"><svg aria-hidden="true"><use href="#i-minus"/></svg></button>
            <output aria-live="polite">${l.qty}</output>
            <button type="button" data-inc="${v.id}" aria-label="Jedna više"><svg aria-hidden="true"><use href="#i-plus"/></svg></button>
          </div>
          <button type="button" class="remove" data-rm="${v.id}">Ukloni</button>
        </div>
      </li>`;
    }).join("")}</ul>
    <p class="total"><span>Ukupno</span><span>${n} ${jarWord(n)}</span></p>`;
  }

  function add(id, srcEl) {
    cart[id] = cart[id] ? { ...cart[id], qty: cart[id].qty + 1 } : { qty: 1, size: "1 kg" };
    save();
    if (srcEl) flyDrop(id, srcEl, () => { render(); bump(); });
    else { render(); bump(); }
  }
  function bump() {
    basketBtn.classList.remove("bump"); void basketBtn.offsetWidth; basketBtn.classList.add("bump");
  }

  /* Kapljica meda od tegle do korpe */
  function flyDrop(id, srcEl, done) {
    if (!hasGsap || reduce) { done(); return; }
    const v = HONEY.find(h => h.id === id);
    const jarBtn = jarsEl.querySelector(`[data-id="${id}"]`);
    const s = (jarBtn || srcEl).getBoundingClientRect();
    const t = countEl.getBoundingClientRect();
    const d = document.createElement("span");
    d.className = "drop"; d.style.background = v.color;
    document.body.appendChild(d);
    const x0 = s.left + s.width / 2 - 8, y0 = s.top + s.height * .45;
    const x1 = t.left + t.width / 2 - 8, y1 = t.top + t.height / 2 - 10;
    gsap.set(d, { x: x0, y: y0, scale: .4 });
    const tl = gsap.timeline({ onComplete: () => { d.remove(); done(); } });
    tl.to(d, { scale: 1.15, duration: .18, ease: "back.out(3)" })
      .to(d, { x: x1, duration: .7, ease: "power1.inOut" }, ">")
      .to(d, { y: Math.min(y0, y1) - 120, duration: .32, ease: "power2.out" }, "<")
      .to(d, { y: y1, duration: .38, ease: "power2.in" }, ">")
      .to(d, { scale: .3, opacity: 0, duration: .14 }, ">-.08");
  }

  document.addEventListener("click", e => {
    const a = e.target.closest(".add, .jar");
    if (a) { add(a.dataset.id, a); return; }
    const sz = e.target.closest("[data-size]");
    if (sz) { cart[sz.dataset.id].size = sz.dataset.size; save(); render(); linesEl.querySelector(`[data-size="${sz.dataset.size}"][data-id="${sz.dataset.id}"]`)?.focus(); return; }
    const inc = e.target.closest("[data-inc]");
    if (inc) { cart[inc.dataset.inc].qty++; save(); render(); bump(); linesEl.querySelector(`[data-inc="${inc.dataset.inc}"]`)?.focus(); return; }
    const dec = e.target.closest("[data-dec]");
    if (dec) {
      const id = dec.dataset.dec;
      if (cart[id].qty > 1) { cart[id].qty--; save(); render(); linesEl.querySelector(`[data-dec="${id}"]`)?.focus(); }
      else { delete cart[id]; save(); render(); linesTitle.focus(); }
      return;
    }
    const rm = e.target.closest("[data-rm]");
    if (rm) { delete cart[rm.dataset.rm]; save(); render(); linesTitle.focus(); }
  });

  /* Forma */
  const form = document.getElementById("orderForm");
  const done = document.getElementById("done");
  const rules = {
    name:  v => v.trim().length >= 2 || "Upiši ime i prezime da znamo kome šaljemo.",
    phone: v => v.replace(/[^\d+]/g, "").length >= 8 || "Broj telefona izgleda prekratko. Upiši ga sa pozivnim brojem.",
    city:  v => v.trim().length >= 2 || "Upiši mjesto, da dogovorimo preuzimanje ili dostavu.",
  };
  function check(field) {
    const input = form.elements[field];
    const res = rules[field](input.value);
    const wrap = document.getElementById("f-" + field), err = document.getElementById("e-" + field);
    if (res === true) { wrap.removeAttribute("data-invalid"); input.removeAttribute("aria-invalid"); err.textContent = ""; return true; }
    wrap.setAttribute("data-invalid", ""); input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", "e-" + field);
    err.textContent = res; return false;
  }
  Object.keys(rules).forEach(f => form.elements[f].addEventListener("blur", () => { if (form.elements[f].value) check(f); }));

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!totalJars()) return;
    const ok = Object.keys(rules).map(check);
    const firstBad = Object.keys(rules)[ok.indexOf(false)];
    if (firstBad) { form.elements[firstBad].focus(); return; }
    const L = HONEY.filter(v => cart[v.id]).map(v => `• ${v.name} med, ${cart[v.id].size} × ${cart[v.id].qty}`);
    const f = form.elements;
    const text = [
      "Narudžba za MedoMed", "", ...L, "",
      `Ime: ${f.name.value.trim()}`, `Telefon: ${f.phone.value.trim()}`, `Mjesto: ${f.city.value.trim()}`,
      f.note.value.trim() ? `Napomena: ${f.note.value.trim()}` : ""
    ].filter((x, i, a) => !(x === "" && i === a.length - 1)).join("\n");
    document.getElementById("msg").textContent = text;
    document.getElementById("mailBtn").href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Narudžba meda: " + f.name.value.trim())}&body=${encodeURIComponent(text)}`;
    form.hidden = true; done.hidden = false;
    done.querySelector("h3").setAttribute("tabindex", "-1"); done.querySelector("h3").focus();
  });
  document.getElementById("editBtn").addEventListener("click", () => { done.hidden = true; form.hidden = false; form.elements.name.focus(); });
  document.getElementById("copyBtn").addEventListener("click", async () => {
    const st = document.getElementById("copyStatus");
    try { await navigator.clipboard.writeText(document.getElementById("msg").textContent); st.textContent = "Kopirano. Zalijepi tekst u Viber, WhatsApp ili SMS."; }
    catch (e) {
      const r = document.createRange(); r.selectNodeContents(document.getElementById("msg"));
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      st.textContent = "Tekst je označen. Pritisni Ctrl+C (ili dugo pritisni na mobitelu) da ga kopiraš.";
    }
  });

  render();

  /* Glatko skrolanje samo za klik na link (fokus tastaturom skače odmah) */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    const t = document.querySelector(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (!t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1");
    t.focus({ preventScroll: true });
    history.replaceState(null, "", a.getAttribute("href"));
  });

  /* Navigacija označava sekciju u kojoj si */
  const navLinks = [...document.querySelectorAll(".nav a")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navLinks.forEach(l => l.getAttribute("href") === "#" + en.target.id ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(l => { const t = document.querySelector(l.getAttribute("href")); if (t) io.observe(t); });
  }

  /* Sjena zaglavlja */
  const top = document.getElementById("top");
  const onScroll = () => top.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Animacija ---------- */
  if (!hasGsap || reduce) return;
  gsap.registerPlugin(ScrollTrigger);

  // Jedan trenutak: med se toči u tegle na policu
  document.querySelectorAll(".jars .honey").forEach((g, i) => {
    const top = +g.dataset.top, bottom = +g.dataset.bottom;
    gsap.from(g, { y: bottom - top, duration: 1.6, delay: .25 + i * .12, ease: "expo.out" });
  });
  gsap.from(".tag", { rotate: (i) => [-8, 6, -5, 7, -6][i], duration: 1.8, delay: .5, ease: "elastic.out(1, .35)", stagger: .08 });

  // Pitanja: med se razlije ispod otvorenog odgovora
  document.querySelectorAll(".faq details").forEach(d => {
    const sum = d.querySelector("summary"), body = d.querySelector(".faq-body"), p = body.querySelector("p");
    d.insertAdjacentHTML("beforeend", '<span class="faq-drip" aria-hidden="true"></span>');
    const drip = d.querySelector(".faq-drip");
    let busy = false;
    sum.addEventListener("click", e => {
      e.preventDefault();
      if (busy) return;
      busy = true;
      if (!d.open) {
        d.open = true;
        gsap.timeline({ onComplete: () => { busy = false; gsap.set(body, { clearProps: "height,overflow" }); } })
          .fromTo(body, { height: 0, overflow: "hidden" }, { height: "auto", duration: .6, ease: "expo.out" })
          .fromTo(p, { y: -12, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: .55, ease: "power3.out" }, "<.06")
          .fromTo(drip, { scaleX: 0 }, { scaleX: 1, duration: .9, ease: "expo.out" }, "<");
      } else {
        gsap.timeline({ onComplete: () => { d.open = false; busy = false; gsap.set([body, p], { clearProps: "all" }); } })
          .to(p, { y: -8, opacity: 0, filter: "blur(4px)", duration: .2, ease: "power2.in" })
          .to(drip, { scaleX: 0, transformOrigin: "right center", duration: .4, ease: "power3.inOut" }, "<")
          .to(body, { height: 0, overflow: "hidden", duration: .38, ease: "power3.inOut" }, "<.06")
          .set(drip, { transformOrigin: "left center" });
      }
    });
  });

  // Svjetlo kroz prozor klizi kako se dan mijenja
  gsap.to("#light", {
    xPercent: -28, opacity: .35, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  // Paša se "rasteže" u kalendaru
  gsap.from(".cal-bar", {
    scaleX: 0, duration: 1.1, ease: "expo.out", stagger: .09,
    scrollTrigger: { trigger: "#cal", start: "top 85%", once: true }
  });
})();
