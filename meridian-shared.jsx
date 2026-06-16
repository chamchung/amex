/* meridian-shared.jsx — emblem, icons, content data (loaded first) */

/* ---- Meridian emblem: a meridian arc + equator + polestar ---- */
function Emblem({ size = 30, stroke = "currentColor", sw = 1.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
         stroke={stroke} strokeWidth={sw} aria-hidden="true">
      <circle cx="20" cy="20" r="14.5" />
      <ellipse cx="20" cy="20" rx="6.2" ry="14.5" />
      <line x1="5.6" y1="20" x2="34.4" y2="20" />
      <path d="M20 2.6 L21.5 6.4 L20 5.3 L18.5 6.4 Z" fill={stroke} stroke="none" />
    </svg>
  );
}

/* ---- simple line icons ---- */
const ICONS = {
  lounge: (
    <svg viewBox="0 0 24 24"><path d="M5 11V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 19 8.5V11"/><path d="M4 11h16a1 1 0 0 1 1 1v4H3v-4a1 1 0 0 1 1-1Z"/><path d="M5 16v2M19 16v2"/></svg>
  ),
  hotel: (
    <svg viewBox="0 0 24 24"><path d="M3 20V6l9-3 9 3v14"/><path d="M3 20h18"/><path d="M9 20v-4h6v4"/><path d="M8 9h1M11.5 9h1M15 9h1M8 13h1M15 13h1"/></svg>
  ),
  concierge: (
    <svg viewBox="0 0 24 24"><path d="M4 16a8 8 0 0 1 16 0"/><path d="M3 16h18"/><path d="M12 8V6"/><path d="M11 6h2"/><path d="M3 19h18"/></svg>
  ),
  rewards: (
    <svg viewBox="0 0 24 24"><path d="M12 3.5c.6 3.8 2.2 5.4 6 6-3.8.6-5.4 2.2-6 6-.6-3.8-2.2-5.4-6-6 3.8-.6 5.4-2.2 6-6Z"/></svg>
  ),
  protect: (
    <svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>
  ),
  metal: (
    <svg viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="M12 3v18M4 7.5l8 4.5 8-4.5"/></svg>
  ),
  design: (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.6" ry="8.5"/><line x1="3.5" y1="12" x2="20.5" y2="12"/></svg>
  ),
  security: (
    <svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="1.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/><circle cx="12" cy="15" r="1.3"/></svg>
  ),
};

/* ---- content ---- */
const BENEFITS = [
  { icon:"lounge",    title:"Lounge Access",      desc:"Arrive composed. Over 1,400 sanctuaries across the world's terminals." },
  { icon:"hotel",     title:"The Hotel Collection",desc:"Suite upgrades and late checkout at more than 1,000 considered properties." },
  { icon:"concierge", title:"Concierge",          desc:"A single line for the impossible request, answered around the clock." },
  { icon:"rewards",   title:"Rewards",            desc:"Points that move with intent — redeemed for the rare, not the routine." },
  { icon:"protect",   title:"Travel Protections", desc:"Quiet assurance the moment plans change, wherever the day finds you." },
];

const FEATURES = [
  { icon:"metal",    title:"Precision Metal",   desc:"Milled from a solid alloy billet. Weighted to remind you it is there." },
  { icon:"design",   title:"Considered Design", desc:"A meridian engraved edge to edge — a mark recognised before it is read." },
  { icon:"security", title:"Quiet Security",    desc:"Protection engineered to disappear, working long before you notice." },
];

const SHOWCASE = [
  { k:"Surface",  label:"01" },
  { k:"Edge",     label:"02" },
  { k:"Engraving",label:"03" },
  { k:"Chip",     label:"04" },
];

const EXPERIENCES = [
  { k:"Travel",        title:"Travel",        desc:"Go further, in quieter comfort — from the lounge to the last mile." },
  { k:"Dining",        title:"Dining",        desc:"The reservation that was full, held for you at the world's best tables." },
  { k:"Events",        title:"Events",        desc:"Closer to the artists, the openings, the nights that don't repeat." },
  { k:"Hotels",        title:"Hotels",        desc:"Rooms kept aside, arrivals anticipated, departures unhurried." },
];

const CARDS = [
  { id:"plat",  face:"cf-plat",  tier:"Platinum", name:"The Platinum Card", tag:"Unrivalled access. The fullest expression of the Card.", brand:"MERIDIAN" },
  { id:"gold",  face:"cf-gold",  tier:"Gold",     name:"The Gold Card",     tag:"For the table and the journey — dining and travel, elevated.", brand:"MERIDIAN" },
  { id:"jade",  face:"cf-jade",  tier:"Jade",     name:"The Jade Card",     tag:"Travel, dine, explore — the everyday, considered. No annual fee.", brand:"MERIDIAN" },
  { id:"steel", face:"cf-steel", tier:"Cash",     name:"The Cash Card",     tag:"Returns on the everyday, where it quietly matters most.", brand:"MERIDIAN" },
  { id:"onyx",  face:"cf-onyx",  tier:"Onyx",     name:"The Onyx Card",     tag:"By invitation. For those for whom the extraordinary is routine.", brand:"MERIDIAN" },
];

Object.assign(window, { Emblem, ICONS, BENEFITS, FEATURES, SHOWCASE, EXPERIENCES, CARDS });
