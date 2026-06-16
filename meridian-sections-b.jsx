/* meridian-sections-b.jsx — Showcase, Experiences, Collection, Statement, Footer */
const { Emblem: Em, ICONS: IC, FEATURES, SHOWCASE, EXPERIENCES, CARDS } = window;

/* ---------------- SECTION 2 — Showcase ---------------- */
const MACRO_VIEW = [
  { s: 1.0, x: 0, y: 0 },
  { s: 1.7, x: 18, y: -8 },
  { s: 2.1, x: -14, y: 10 },
  { s: 2.4, x: 22, y: 16 },
];
function Showcase() {
  const [v, setV] = React.useState(0);
  const t = MACRO_VIEW[v];
  return (
    <section className="showcase sec-pad reveal" id="card">
      <div className="wrap showcase-grid">
        <div className="macro">
          <div className="macro-inner" style={{
            transform: `scale(${t.s}) translate(${t.x}%, ${t.y}%)`,
            transition: "transform 1.2s var(--ease-lux)"
          }}>
            <image-slot id="macro-shot" shape="rect" fit="cover"
              placeholder="Drop a macro card shot"></image-slot>
          </div>
          <span className="macro-vig" />
          <div className="macro-idx">
            {SHOWCASE.map((m, i) => (
              <button key={m.k} className={i === v ? "on" : ""} onClick={() => setV(i)}>
                {m.label} <span style={{ marginLeft: 6, letterSpacing: ".1em" }}>{m.k}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="section-tag"><span className="ln" /><span className="eyebrow">Crafted with intent</span></div>
          <h2 className="showcase-h2">Every detail,<br />for a reason.</h2>
          <p className="lede">
            The Meridian Card is more than metal. It is milled, weighted, and
            finished so that the moment it leaves your hand, it is already understood.
          </p>
          <div className="feature-list">
            {FEATURES.map((f) => (
              <div className="feature" key={f.title}>
                <span className="feature-ic">{IC[f.icon]}</span>
                <div><h4>{f.title}</h4><p>{f.desc}</p></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 34 }}>
            <button className="btn btn-text"><span className="ul">Explore the craft</span> <span className="arr">→</span></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 3 — Experiences ---------------- */
function Experiences() {
  return (
    <section className="experiences sec-pad" id="experiences">
      <div className="wrap">
        <div className="exp-head reveal">
          <div>
            <div className="section-tag"><span className="ln" /><span className="eyebrow">Experiences that go further</span></div>
            <h2 className="exp-h2">Access is just<br />the beginning.</h2>
          </div>
          <div>
            <p className="lede" style={{ maxWidth: "38ch" }}>
              From the everyday to the once-in-a-lifetime, the Card opens doors
              that money, on its own, cannot.
            </p>
            <div style={{ marginTop: 22 }}>
              <button className="btn btn-text"><span className="ul">Explore experiences</span> <span className="arr">→</span></button>
            </div>
          </div>
        </div>
        <div className="exp-rail">
          {EXPERIENCES.map((e, i) => (
            <div className="exp-tile reveal" key={e.k} style={{ "--rd": i * 110 + "ms" }}>
              <image-slot id={"exp-" + e.k.toLowerCase()} shape="rect"
                placeholder={"Drop " + e.title.toLowerCase() + " imagery"}></image-slot>
              <span className="exp-tile-grad" />
              <div className="exp-cap">
                <span className="k">{e.k}</span>
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 4 — Card Collection ---------------- */
function CardFace({ card }) {
  return (
    <div className={"cardface " + card.face}>
      <div className="cf-row">
        <span className="cf-brand">{card.brand}</span>
        <span className="cf-emblem"><Em size={28} /></span>
      </div>
      <div className="cf-chip" />
      <div>
        <div className="cf-num">5197&nbsp;&nbsp;··· ····&nbsp;&nbsp;0942</div>
        <div className="cf-row" style={{ marginTop: 12, alignItems: "flex-end" }}>
          <span className="cf-name">A · Meridian<br /><span style={{ opacity: .6, fontSize: 9 }}>SINCE 2009</span></span>
          <span className="cf-tier">{card.tier}</span>
        </div>
      </div>
    </div>
  );
}

function Collection() {
  const [active, setActive] = React.useState(0);
  const card = CARDS[active];
  const cardTransform = (i) => {
    const off = i - active;
    const a = Math.abs(off);
    const x = off * 232;
    const z = -a * 130;
    const ry = off * -19;
    const s = 1 - a * 0.11;
    return `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${s})`;
  };
  const opacityFor = (i) => {
    const a = Math.abs(i - active);
    return a === 0 ? 1 : a === 1 ? 0.62 : a === 2 ? 0.26 : 0;
  };
  return (
    <section className="collection sec-pad" id="cards">
      <div className="wrap">
        <div className="coll-head reveal">
          <div>
            <div className="section-tag"><span className="ln" /><span className="eyebrow">Choose your card</span></div>
            <h2 className="coll-h2">Find the card that<br />fits your world.</h2>
          </div>
          <div className="coll-arrows">
            <button className="coll-arrow" onClick={() => setActive((a) => Math.max(0, a - 1))} aria-label="Previous">←</button>
            <button className="coll-arrow" onClick={() => setActive((a) => Math.min(CARDS.length - 1, a + 1))} aria-label="Next">→</button>
          </div>
        </div>

        <div className="coll-stage">
          <div className="deck">
            {CARDS.map((c, i) => (
              <div className="coll-card" key={c.id}
                style={{ transform: cardTransform(i), opacity: opacityFor(i), zIndex: 20 - Math.abs(i - active), filter: i === active ? "none" : "brightness(.7)" }}
                onClick={() => setActive(i)}>
                <CardFace card={c} />
              </div>
            ))}
          </div>
        </div>

        <div className="coll-meta">
          <div className="coll-name" key={card.id + "n"}>{card.name}</div>
          <div className="coll-tag" key={card.id + "t"}>{card.tag}</div>
          <div className="coll-dots">
            {CARDS.map((c, i) => (
              <button key={c.id} className={i === active ? "on" : ""} onClick={() => setActive(i)}>{c.tier}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 5 — Statement ---------------- */
function Statement() {
  return (
    <section className="statement" id="service">
      <div className="statement-bg">
        <image-slot id="statement-bg" shape="rect" placeholder="Drop architectural / engraving imagery"></image-slot>
      </div>
      <span className="statement-veil" />
      <div className="wrap">
        <div className="section-tag reveal"><span className="ln" /><span className="eyebrow">Backing you, always</span></div>
        <h2 className="statement-h2 reveal" style={{ "--rd": "120ms" }}>
          Powerful backing,
          <em>whenever you need it.</em>
        </h2>
        <p className="lede reveal" style={{ "--rd": "260ms" }}>
          Behind every Meridian Card is a team that anticipates the request,
          smooths the unexpected, and stays with you — from the everyday
          errand to the once-in-a-lifetime trip.
        </p>
        <div className="reveal" style={{ "--rd": "360ms", marginTop: 30 }}>
          <button className="btn btn-ghost">Discover the difference <span className="arr">→</span></button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 6 — Footer ---------------- */
function Footer() {
  const cols = [
    { h: "The Card", items: ["Platinum", "Gold", "Jade", "Cash", "Onyx — by invitation"] },
    { h: "Benefits", items: ["Rewards", "Travel", "Experiences", "Concierge"] },
    { h: "Meridian", items: ["About", "The Standard", "Careers", "Contact"] },
  ];
  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="brand foot-logo" href="#top" aria-label="AMEX — home">
              <span className="foot-logo-mark"><img src={(window.__resources && window.__resources.amexLogo) || "assets/amex-logo.png"} alt="AMEX" /></span>
            </a>
            <p className="foot-mission">The Card is only the beginning of what it opens.</p>
          </div>
          {cols.map((c) => (
            <div className="foot-col" key={c.h}>
              <h5>{c.h}</h5>
              <ul>{c.items.map((it) => <li key={it}><a href="#">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <p>© 2026 Meridian. A fictional brand created for design exploration.</p>
          <div className="foot-legal">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Showcase, Experiences, Collection, Statement, Footer });
