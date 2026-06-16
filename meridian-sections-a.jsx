/* meridian-sections-a.jsx — Nav + Hero (3 directions) */
const { Emblem, ICONS, BENEFITS } = window;

/* ---------------- NAV ---------------- */
function Nav() {
  const links = ["Cards", "Travel", "Rewards", "Experiences", "Business", "Support"];
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <a className="brand" href="#top" aria-label="Meridian — home">
        <span className="brand-mark"><img src={(window.__resources && window.__resources.amexLogo) || "assets/amex-logo.png"} alt="AMEX" /></span>
        <span className="brand-name">American Express</span>
      </a>
      <div className="nav-links">
        {links.map((l) => <a key={l} className="nav-link" href="#">{l}</a>)}
      </div>
      <div className="nav-right">
        <a className="nav-login" href="#">Log In</a>
        <button className="btn btn-solid">Apply <span className="arr">→</span></button>
      </div>
    </nav>
  );
}

/* ---------------- shared hero pieces ---------------- */
function HeroCopy({ variant }) {
  return (
    <div className={"hero-copy reveal v-" + variant}>
      <h1 className="hero-h1">The Platinum<br />Card<span className="reg">®</span></h1>
      <p className="lede">
        A higher standard of service — measured access, considered rewards,
        and a team that anticipates the request before it is made.
      </p>
      <div className="hero-actions">
        <button className="btn btn-ghost">Explore the Card <span className="arr">→</span></button>
        <button className="btn btn-text"><span className="ul">View benefits</span></button>
      </div>
      <div className="watch">
        <span className="watch-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--ivory)"><path d="M8 5v14l11-7z" /></svg>
        </span>
        <span className="watch-meta"><b>Watch the film</b><br />1:15</span>
      </div>
    </div>
  );
}

function CardStage() {
  return (
    <div className="card-stage">
      <div className="pedestal" />
      <div className="pedestal-glow" />
      <div className="card-float reveal has-model" style={{ "--rd": "240ms" }}>
        <model-viewer
          class="hero-model"
          src={(window.__resources && window.__resources.cardModel) || "uploads/metal_credit_card.glb"}
          alt="The Meridian Card — metal platinum card render"
          camera-controls=""
          auto-rotate=""
          auto-rotate-delay="0"
          rotation-per-second="16deg"
          interaction-prompt="none"
          camera-orbit="-22deg 76deg 105%"
          min-camera-orbit="auto 58deg auto"
          max-camera-orbit="auto 104deg auto"
          field-of-view="26deg"
          shadow-intensity="0.85"
          shadow-softness="1"
          exposure="1.08"
          environment-image="neutral"
          disable-zoom=""
          loading="eager"
          reveal="auto"
        ></model-viewer>
        <span className="card-shadow" />
      </div>
    </div>
  );
}

/* arc around the pedestal (right-biased) so benefits clear the copy column */
const ORBIT_POS = [
  { left: "42%", top: "32%" },
  { left: "53%", top: "54%" },
  { left: "64%", top: "64%" },
  { left: "75%", top: "54%" },
  { left: "86%", top: "32%" },
];

function BenefitOrbit() {
  return (
    <div className="orbit">
      <div className="orbit-ring" />
      {BENEFITS.map((b, i) => (
        <div className="benefit reveal" key={b.title}
          style={{ ...ORBIT_POS[i], "--rd": 300 + i * 90 + "ms" }}>
          <span className="benefit-ic">{ICONS[b.icon]}</span>
          <span className="benefit-title">{b.title}</span>
          <span className="benefit-desc">{b.desc}</span>
        </div>
      ))}
    </div>
  );
}

function BenefitStrip() {
  return (
    <div className="benefit-strip reveal">
      {BENEFITS.map((b) => (
        <div className="bstrip-item" key={b.title}>
          <span className="bstrip-ic">{ICONS[b.icon]}</span>
          <span className="bstrip-label">{b.title}</span>
        </div>
      ))}
    </div>
  );
}

function ScrollRail() {
  return (
    <div className="scroll-rail">
      <span className="rail-num">01</span>
      <div className="rail-track">
        <span className="rail-fill" id="rail-fill" />
        <span className="rail-dot" id="rail-dot" style={{ top: "0%" }} />
      </div>
      <span className="rail-num">06</span>
      <span className="scroll-cue">Scroll</span>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ direction }) {
  return (
    <section className="hero-scroll" id="top">
      <div className={"hero-stage dir-" + direction}>
        <div className="layer layer-arch" data-depth="0.06" />
        <div className="spotlight" id="spotlight" />
        <div className="beam" id="beam" data-depth="0.1" />

        {direction === "spotlight" ? (
          <div className="hero-grid">
            <CardStage />
            <HeroCopy variant="spotlight" />
          </div>
        ) : (
          <div className="hero-grid">
            <HeroCopy variant={direction} />
            <CardStage />
          </div>
        )}

        {direction === "vault" && <BenefitOrbit />}
        {direction === "editorial" && <BenefitStrip />}
        {direction === "spotlight" && (
          <div className="spot-privileges reveal">
            <span>Lounge Access</span><i>·</i><span>Hotel Collection</span><i>·</i>
            <span>Concierge</span><i>·</i><span>Rewards</span><i>·</i>
            <span>Travel Protections</span>
          </div>
        )}

        <ScrollRail />
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero });
