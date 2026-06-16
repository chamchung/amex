/* meridian-app.jsx — composition, scroll engine, tweaks, mount */
const { Nav, Hero, Showcase, Experiences, Collection, Statement, Footer } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio, TweakToggle } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroDirection": "Vault",
  "motion": 3,
  "accent": "Platinum",
  "grain": true
}/*EDITMODE-END*/;

const ACCENTS = {
  Platinum: { a: "#d9dde2", soft: "rgba(217,221,226,.55)", line: "rgba(217,221,226,.22)" },
  Gold:     { a: "#c9a24b", soft: "rgba(201,162,75,.6)",   line: "rgba(201,162,75,.26)" },
  Both:     { a: "#c9a24b", soft: "rgba(201,162,75,.6)",   line: "rgba(217,221,226,.22)" },
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const direction = (t.heroDirection || "Vault").toLowerCase();
  const motionRef = React.useRef(t.motion);
  React.useEffect(() => { motionRef.current = t.motion; }, [t.motion]);

  /* safety net: if the JS reveal engine never ran (catastrophic JS failure),
     drop reveal-armed after a few seconds so content can never stay hidden. */
  React.useEffect(() => {
    const id = setTimeout(() => {
      const el = document.querySelector(".reveal");
      if (el && el.dataset.revStart === undefined && el.dataset.revDone === undefined) {
        document.documentElement.classList.remove("reveal-armed");
      }
    }, 3500);
    return () => clearTimeout(id);
  }, []);

  /* accent + motion CSS vars */
  React.useEffect(() => {
    const r = document.documentElement.style;
    const ac = ACCENTS[t.accent] || ACCENTS.Platinum;
    r.setProperty("--accent", ac.a);
    r.setProperty("--accent-soft", ac.soft);
    r.setProperty("--accent-line", ac.line);
  }, [t.accent]);
  React.useEffect(() => {
    document.documentElement.style.setProperty("--motion", String(clamp(t.motion / 3, 0, 3)));
  }, [t.motion]);

  /* cinematic engine: scroll camera-orbit + mouse parallax + reveals
     Driven by setInterval + scroll/resize (requestAnimationFrame is paused
     in background/preview contexts; an interval ticks reliably everywhere). */
  React.useEffect(() => {
    let mx = 0, my = 0, cmx = 0, cmy = 0;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const frame = () => {
      cmx += (mx - cmx) * 0.08;
      cmy += (my - cmy) * 0.08;
      const m = clamp(motionRef.current / 3, 0, 3);

      const hs = document.querySelector(".hero-scroll");
      let p = 0;
      if (hs) {
        const total = hs.offsetHeight - window.innerHeight;
        p = clamp(-hs.getBoundingClientRect().top / Math.max(total, 1), 0, 1);
      }

      const card = document.querySelector(".card-float");
      if (card) {
        const ty = (p - 0.5) * -18 * m;            // vertical float on scroll
        if (card.classList.contains("has-model")) {
          // real 3D model handles its own rotation — only float it, never CSS-tilt
          card.style.transform = `translateY(${ty}px)`;
        } else {
          const orbit = (p - 0.5) * 16 * m;        // scroll camera arc
          const ry = orbit + cmx * 2.4;             // + 1–3° mouse parallax
          const rx = -cmy * 1.8;
          card.style.transform =
            `translateY(${ty}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`;
        }
      }
      const sheen = document.querySelector(".card-sheen");
      if (sheen) sheen.style.setProperty("--sheen", (120 - p * 210 - cmx * 40).toFixed(1) + "%");

      const spot = document.getElementById("spotlight");
      if (spot) spot.style.setProperty("--spin", ((p - 0.5) * 9 * m + cmx * 1.5).toFixed(2) + "deg");
      const beam = document.getElementById("beam");
      if (beam) beam.style.transform = `translateX(-50%) rotate(${(cmx * 3 + (p - .5) * 6 * m).toFixed(2)}deg)`;

      document.querySelectorAll("[data-depth]").forEach((el) => {
        if (el.id === "beam") return;
        const d = parseFloat(el.getAttribute("data-depth")) || 0;
        el.style.transform = `translate3d(${(cmx * d * -30).toFixed(1)}px, ${(p * d * 120 + cmy * d * -20).toFixed(1)}px, 0)`;
      });

      const fill = document.getElementById("rail-fill");
      const dot = document.getElementById("rail-dot");
      if (fill) fill.style.height = (p * 100).toFixed(1) + "%";
      if (dot) dot.style.top = (p * 100).toFixed(1) + "%";

      /* reveal-from-darkness — JS-driven tween (reliable where CSS
         transitions freeze): inline styles override the .reveal-armed
         hidden state and animate to the visible end-state. */
      const now = performance.now();
      const trig = window.innerHeight * 0.92;
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.dataset.revDone) return;
        if (el.dataset.revStart === undefined) {
          const r = el.getBoundingClientRect();
          if (r.top >= trig || r.bottom <= -60) return;
          const d = parseFloat(getComputedStyle(el).getPropertyValue("--rd")) || 0;
          el.dataset.revStart = String(now + d);
          el.style.transition = "none";
        }
        const start = Number(el.dataset.revStart);
        if (now < start) return;
        const isCard = el.classList.contains("card-float");
        const pr = Math.min(1, (now - start) / 1300);
        const e = 1 - Math.pow(1 - pr, 3);     // easeOutCubic
        el.style.opacity = String(e);
        el.style.filter = `brightness(${(0.25 + 0.75 * e).toFixed(3)}) blur(${((1 - e) * 6).toFixed(2)}px)`;
        if (!isCard) el.style.transform = `translateY(${((1 - e) * 10 * m).toFixed(2)}px)`;
        if (pr >= 1) {
          el.dataset.revDone = "1";
          el.style.filter = "none";
          if (!isCard) el.style.transform = "none";
        }
      });
    };

    frame();
    const id = setInterval(frame, 33);
    window.addEventListener("scroll", frame, { passive: true });
    window.addEventListener("resize", frame, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", frame);
      window.removeEventListener("resize", frame);
    };
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero direction={direction} />
        <Showcase />
        <Experiences />
        <Collection />
        <Statement />
      </main>
      <Footer />
      <div className={"grain" + (t.grain ? "" : " off")} />

      <TweaksPanel>
        <TweakSection label="Hero direction" />
        <TweakRadio label="Composition" value={t.heroDirection}
          options={["Vault", "Editorial", "Spotlight"]}
          onChange={(v) => setTweak("heroDirection", v)} />
        <TweakSection label="Atmosphere" />
        <TweakSlider label="Motion" value={t.motion} min={0} max={10} step={1}
          onChange={(v) => setTweak("motion", v)} />
        <TweakRadio label="Accent" value={t.accent}
          options={["Platinum", "Gold", "Both"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle label="Film grain" value={t.grain}
          onChange={(v) => setTweak("grain", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
