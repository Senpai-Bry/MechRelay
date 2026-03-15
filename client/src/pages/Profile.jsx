import { useState } from "react";

// ─────────────────────────────────────────────
// CUSTOM SVG MEDAL ICONS
// ─────────────────────────────────────────────

function MedalWrenchMaster({ size = 144, owned = true }) {
  const c = owned ? "#C9A84C" : "#3A4A5A";
  const shine = owned ? "#FFE08A" : "#4A5A6A";
  const dark = owned ? "#8A6A20" : "#2A3A4A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon */}
      <rect x="28" y="4" width="16" height="18" rx="2" fill={owned ? "#B8860B" : "#2A3A4A"} />
      <rect x="28" y="4" width="7" height="18" rx="2" fill={owned ? "#DAA520" : "#3A4A5A"} />
      {/* Medal body - hexagon */}
      <polygon points="36,20 52,29 52,47 36,56 20,47 20,29" fill={c} />
      <polygon points="36,23 49,31 49,45 36,53 23,45 23,31" fill={dark} />
      <polygon points="36,26 46,33 46,43 36,50 26,43 26,33" fill={c} />
      {/* Wrench icon inside */}
      <path d="M32 38 Q30 34 33 31 L35 33 L37 31 Q40 28 42 30 Q44 32 42 35 L38 39 L40 41 L37 44 L35 42 L31 46 L29 44 Z" fill={shine} strokeWidth="0" />
      {/* Star accents */}
      <polygon points="36,28 37,31 40,31 38,33 39,36 36,34 33,36 34,33 32,31 35,31" fill={shine} opacity="0.9" />
    </svg>
  );
}

function MedalDiagnosticPro({ size = 144, owned = true }) {
  const c = owned ? "#C9A84C" : "#3A4A5A";
  const shine = owned ? "#FFE08A" : "#4A5A6A";
  const dark = owned ? "#8A6A20" : "#2A3A4A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon */}
      <rect x="28" y="4" width="7" height="18" rx="2" fill={owned ? "#4169E1" : "#2A3A4A"} />
      <rect x="35" y="4" width="9" height="18" rx="2" fill={owned ? "#1E90FF" : "#3A4A5A"} />
      {/* Medal - circle with rays */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
        <line key={i}
          x1={36 + 18 * Math.cos(deg * Math.PI / 180)}
          y1={38 + 18 * Math.sin(deg * Math.PI / 180)}
          x2={36 + 23 * Math.cos(deg * Math.PI / 180)}
          y2={38 + 23 * Math.sin(deg * Math.PI / 180)}
          stroke={shine} strokeWidth="2" strokeLinecap="round" opacity={owned ? 0.8 : 0.3}
        />
      ))}
      <circle cx="36" cy="38" r="17" fill={dark} />
      <circle cx="36" cy="38" r="14" fill={c} />
      <circle cx="36" cy="38" r="11" fill={dark} />
      {/* Circuit / diagnostic lines */}
      <path d="M29 38 H33 M33 38 V34 H39 V42 H33 M39 38 H43" stroke={shine} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="38" r="1.5" fill={shine} />
    </svg>
  );
}

function MedalCommunityHero({ size = 144, owned = true }) {
  const c = owned ? "#E8E8FF" : "#3A4A5A";
  const shine = owned ? "#FFFFFF" : "#4A5A6A";
  const dark = owned ? "#9090C0" : "#2A3A4A";
  const ribbon = owned ? "#7B68EE" : "#2A3A4A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon */}
      <rect x="29" y="4" width="8" height="8" rx="1" fill={ribbon} />
      <polygon points="29,12 37,12 40,20 26,20" fill={ribbon} opacity="0.8" />
      {/* Trophy shape */}
      <rect x="30" y="52" width="12" height="4" rx="1" fill={c} opacity="0.9" />
      <rect x="27" y="55" width="18" height="3" rx="1.5" fill={c} />
      {/* Cup */}
      <path d="M24 22 Q22 30 24 36 Q27 42 36 44 Q45 42 48 36 Q50 30 48 22 Z" fill={dark} />
      <path d="M26 22 Q24 30 26 36 Q29 41 36 43 Q43 41 46 36 Q48 30 46 22 Z" fill={c} />
      {/* Handles */}
      <path d="M24 26 Q18 26 18 32 Q18 38 24 38" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M48 26 Q54 26 54 32 Q54 38 48 38" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Star */}
      <polygon points="36,27 37.5,31.5 42,31.5 38.5,34 40,38.5 36,36 32,38.5 33.5,34 30,31.5 34.5,31.5" fill={owned ? "#7B68EE" : "#2A3A4A"} />
      <polygon points="36,28 37.2,31.8 41,31.8 38,33.8 39.2,37.5 36,35.5 32.8,37.5 34,33.8 31,31.8 34.8,31.8" fill={shine} />
    </svg>
  );
}

function MedalEVSpecialist({ size = 144, owned = true }) {
  const c = owned ? "#E8E8FF" : "#3A4A5A";
  const shine = owned ? "#A0F0FF" : "#4A5A6A";
  const dark = owned ? "#1A3A5A" : "#2A3A4A";
  const bolt = owned ? "#00CFFF" : "#3A4A5A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon */}
      <rect x="28" y="4" width="16" height="18" rx="2" fill={owned ? "#006080" : "#2A3A4A"} />
      <rect x="34" y="4" width="6" height="18" fill={owned ? "#00CFFF" : "#3A4A5A"} opacity="0.5" />
      {/* Octagon medal */}
      <polygon points="36,20 48,24 54,36 48,48 36,52 24,48 18,36 24,24" fill={dark} />
      <polygon points="36,22 47,26 52,36 47,46 36,50 25,46 20,36 25,26" fill={bolt} opacity="0.2" />
      <polygon points="36,24 46,28 51,36 46,44 36,48 26,44 21,36 26,28" fill={dark} />
      {/* Lightning bolt */}
      <polygon points="39,24 31,37 36,37 33,50 43,35 37,35" fill={shine} />
      <polygon points="39,26 33,37 37,37 34,48 42,36 37,36" fill={bolt} />
      {/* Glow ring */}
      <circle cx="36" cy="36" r="16" stroke={bolt} strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="3 3" />
    </svg>
  );
}

function MedalOldSchool({ size = 144, owned = true }) {
  const c = owned ? "#A8A8A8" : "#3A4A5A";
  const shine = owned ? "#E8E8E8" : "#4A5A6A";
  const dark = owned ? "#505050" : "#2A3A4A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon - classic red/white */}
      <rect x="28" y="4" width="8" height="18" rx="2" fill={owned ? "#8B0000" : "#2A3A4A"} />
      <rect x="36" y="4" width="8" height="18" rx="2" fill={owned ? "#CC0000" : "#3A4A5A"} />
      {/* Shield shape */}
      <path d="M20 24 L36 20 L52 24 L52 40 Q52 52 36 58 Q20 52 20 40 Z" fill={dark} />
      <path d="M22 25 L36 22 L50 25 L50 40 Q50 51 36 56 Q22 51 22 40 Z" fill={c} />
      <path d="M24 26 L36 24 L48 26 L48 40 Q48 50 36 54 Q24 50 24 40 Z" fill={dark} />
      {/* Crossed tools */}
      <path d="M28 30 L44 46 M28 32 L30 30" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 30 L28 46 M42 30 L44 32" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
      {/* Center bolt */}
      <circle cx="36" cy="38" r="4" fill={shine} />
      <circle cx="36" cy="38" r="2.5" fill={dark} />
    </svg>
  );
}

function MedalShopOwner({ size = 144, owned = true }) {
  const c = owned ? "#A8A8A8" : "#3A4A5A";
  const shine = owned ? "#E8E8E8" : "#4A5A6A";
  const dark = owned ? "#505050" : "#2A3A4A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon */}
      <rect x="30" y="4" width="12" height="18" rx="2" fill={owned ? "#2E4A1E" : "#2A3A4A"} />
      <rect x="34" y="4" width="4" height="18" fill={owned ? "#4A8A30" : "#3A4A5A"} />
      {/* Pentagon medal */}
      <polygon points="36,20 54,33 47,53 25,53 18,33" fill={dark} />
      <polygon points="36,22 52,34 46,52 26,52 20,34" fill={c} />
      <polygon points="36,24 50,35 45,51 27,51 22,35" fill={dark} />
      {/* Building / shop icon */}
      <rect x="29" y="38" width="14" height="10" fill={shine} rx="1" />
      <polygon points="29,38 36,29 43,38" fill={shine} />
      <rect x="33" y="40" width="6" height="8" fill={dark} rx="1" />
      <rect x="29" y="36" width="14" height="3" fill={c} rx="1" />
    </svg>
  );
}

function MedalPhotoPro({ size = 144, owned = true }) {
  const c = owned ? "#CD7F32" : "#3A4A5A";
  const shine = owned ? "#F4A460" : "#4A5A6A";
  const dark = owned ? "#7A4010" : "#2A3A4A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon */}
      <rect x="28" y="4" width="16" height="18" rx="2" fill={owned ? "#7A4010" : "#2A3A4A"} />
      {/* Circle medal with gear edge */}
      {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((deg, i) => (
        <rect key={i}
          x="34" y="18" width="4" height="5" rx="1"
          fill={c}
          transform={`rotate(${deg} 36 38)`}
          opacity={owned ? 1 : 0.4}
        />
      ))}
      <circle cx="36" cy="38" r="14" fill={dark} />
      <circle cx="36" cy="38" r="12" fill={c} />
      <circle cx="36" cy="38" r="9" fill={dark} />
      {/* Camera icon */}
      <rect x="29" y="33" width="14" height="10" rx="2" fill={shine} />
      <polygon points="29,33 33,29 36,33" fill={shine} />
      <circle cx="36" cy="38" r="3" fill={dark} />
      <circle cx="36" cy="38" r="1.5" fill={shine} opacity="0.5" />
    </svg>
  );
}

function MedalFirstPost({ size = 144, owned = true }) {
  const c = owned ? "#CD7F32" : "#3A4A5A";
  const shine = owned ? "#F4A460" : "#4A5A6A";
  const dark = owned ? "#7A4010" : "#2A3A4A";
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Ribbon */}
      <rect x="30" y="4" width="6" height="18" rx="2" fill={owned ? "#8B4513" : "#2A3A4A"} />
      <rect x="36" y="4" width="6" height="18" rx="2" fill={owned ? "#CD7F32" : "#3A4A5A"} />
      {/* Star medal */}
      <polygon points="36,20 40,31 52,31 43,38 46,50 36,43 26,50 29,38 20,31 32,31" fill={dark} />
      <polygon points="36,22 39.5,32 51,32 42,38.5 45,49 36,43 27,49 30,38.5 21,32 32.5,32" fill={c} />
      <polygon points="36,24 39,33 49,33 41.5,38 44,47.5 36,42.5 28,47.5 30.5,38 23,33 33,33" fill={dark} />
      {/* Number 1 */}
      <path d="M34 30 L36 28 L36 44" stroke={shine} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="44" x2="40" y2="44" stroke={shine} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const BADGE_ICONS = {
  "wrench-master":  (owned, size) => <MedalWrenchMaster owned={owned} size={size} />,
  "diagnostic-pro": (owned, size) => <MedalDiagnosticPro owned={owned} size={size} />,
  "community-hero": (owned, size) => <MedalCommunityHero owned={owned} size={size} />,
  "ev-specialist":  (owned, size) => <MedalEVSpecialist owned={owned} size={size} />,
  "old-school":     (owned, size) => <MedalOldSchool owned={owned} size={size} />,
  "shop-owner":     (owned, size) => <MedalShopOwner owned={owned} size={size} />,
  "photo-pro":      (owned, size) => <MedalPhotoPro owned={owned} size={size} />,
  "first-post":     (owned, size) => <MedalFirstPost owned={owned} size={size} />,
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const SPECIALTIES = [
  "Engine", "Transmission", "Brakes", "Electrical",
  "Diagnostics", "Suspension", "Hybrid / EV", "AC & Heating",
  "Exhaust", "Bodywork",
];

const BADGES = [
  { id: "wrench-master",   name: "Wrench Master",   desc: "Completed 50+ job log entries",               tier: "gold",     owned: true  },
  { id: "diagnostic-pro",  name: "Diagnostic Pro",  desc: "Solved 20+ electrical & diagnostic issues",    tier: "gold",     owned: true  },
  { id: "community-hero",  name: "Community Hero",  desc: "Top responder in the community feed",          tier: "platinum", owned: false, price: "$4.99" },
  { id: "ev-specialist",   name: "EV Specialist",   desc: "Certified Hybrid & EV technician badge",       tier: "platinum", owned: false, price: "$4.99" },
  { id: "old-school",      name: "Old School",      desc: "10+ years in the trade",                      tier: "silver",   owned: true  },
  { id: "shop-owner",      name: "Shop Owner",      desc: "Verified independent shop owner",             tier: "silver",   owned: false, price: "$2.99" },
  { id: "photo-pro",       name: "Photo Pro",       desc: "Uploaded 10+ showcase posts",                 tier: "bronze",   owned: false, price: "$1.99" },
  { id: "first-post",      name: "First Post",      desc: "Posted your first community question",         tier: "bronze",   owned: true  },
];

const TIER_STYLES = {
  platinum: { border: "#C0C0E0", bg: "#E8E8FF0D", label: "text-purple-300",  glow: "#A0A0FF" },
  gold:     { border: "#C9A84C", bg: "#C9A84C0D", label: "text-yellow-400",  glow: "#FFD700" },
  silver:   { border: "#8A95A3", bg: "#8A95A30D", label: "text-gray-300",    glow: "#C0C0C0" },
  bronze:   { border: "#CD7F32", bg: "#CD7F320D", label: "text-orange-400",  glow: "#CD7F32" },
};

const MOCK_JOB_LOG = [
  { id: 1, date: "Mar 8, 2025",  title: "Head Gasket Replacement",            vehicle: "2015 Subaru WRX",   tag: "Engine",       notes: "Full head gasket job, resurfaced head, replaced timing belt and water pump while in there. Customer had been running it hot for weeks.", tools: ["Torque wrench", "Angle gauge", "Head bolt kit", "Plastigage"], hours: 9.5, feedback: "Customer stoked — said it runs better than when they bought it." },
  { id: 2, date: "Feb 28, 2025", title: "ABS Module Diagnosis & Replacement", vehicle: "2018 Ford F-150",   tag: "Electrical",   notes: "C0031 and C0034 codes. Traced to failing ABS module. Replaced unit, bled brakes, confirmed all four wheel sensors reading correctly.", tools: ["PICO oscilloscope", "Autel MaxiSys", "Brake bleeder kit"], hours: 4.0, feedback: "Smooth — in and out same day." },
  { id: 3, date: "Feb 14, 2025", title: "Dual Clutch Transmission Service",   vehicle: "2020 VW Golf GTI",  tag: "Transmission", notes: "DSG fluid flush and filter. Customer had been skipping service intervals. Shift hesitation gone after job.", tools: ["VAG-COM", "DSG service kit", "Fluid extractor"], hours: 2.5, feedback: "Left a 5-star review on Google." },
];

const MOCK_SHOWCASE = [
  { id: 1, title: "LS Swap — 1972 Chevy C10",           tag: "Custom Build", placeholder: "🛻", description: "Full LS3 swap into a resto-mod C10. Custom mounts, E-rod harness, 4L65E trans. Took 3 weekends." },
  { id: 2, title: "Brake Caliper Rebuild — Porsche 911", tag: "Brakes",       placeholder: "🔴", description: "Factory Brembo 6-piston rebuild. New pistons, seals, stainless hardware. Painted Porsche red." },
  { id: 3, title: "Wiring Harness Repair — Boat Trailer",tag: "Electrical",   placeholder: "⚡", description: "Complete rewire of a 24ft trailer. Corrosion had taken out half the lights. New 7-pin harness." },
];

const MOCK_ENDORSEMENTS = [
  { id: 1, from: "TorqueWrench_T",  specialty: "Engine",       count: 14, avatar: "T" },
  { id: 2, from: "ShopFloor_Sal",   specialty: "Electrical",   count: 9,  avatar: "S" },
  { id: 3, from: "MechDave_99",     specialty: "Diagnostics",  count: 7,  avatar: "M" },
  { id: 4, from: "GarageKing_88",   specialty: "Transmission", count: 5,  avatar: "G" },
  { id: 5, from: "BoostMonkey_Ray", specialty: "Brakes",       count: 4,  avatar: "B" },
];

const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    author: "Carlos M.",
    role: "Shop Manager — Rivera Auto, Houston TX",
    avatar: "C",
    text: "One of the sharpest diagnosticians I've had in my shop. Never guesses — always traces the fault. Customers ask for him by name.",
    verified: true,
    date: "Feb 2025",
  },
  {
    id: 2,
    author: "James T.",
    role: "Owner — Turbo Tech Garage, Austin TX",
    avatar: "J",
    text: "Solid work ethic, clean bay, zero comebacks in 2 years. Would rehire without hesitation.",
    verified: true,
    date: "Jan 2025",
  },
];

const MOCK_CERTIFICATIONS = [
  { id: 1, name: "ASE Master Technician",         issuer: "ASE",          year: 2021, verified: true  },
  { id: 2, name: "Toyota T-TEN Certified",         issuer: "Toyota",       year: 2019, verified: true  },
  { id: 3, name: "EV & Hybrid Safety Cert",        issuer: "NASTF",        year: 2023, verified: false },
  { id: 4, name: "Bosch Fuel Systems Specialist",  issuer: "Bosch",        year: 2022, verified: false },
];

const HELPFUL_REACTIONS = [
  { user: "TorqueWrench_T", post: "P0420 diagnosis tip", time: "Mar 8" },
  { user: "ShopFloor_Sal",  post: "ABS bleed procedure", time: "Mar 5" },
  { user: "MechDave_99",    post: "DSG service walkthrough", time: "Feb 28" },
  { user: "GarageKing_88",  post: "Subaru head gasket tips", time: "Feb 20" },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function Avatar({ username, photo, size = 96 }) {
  if (photo) return <img src={photo} alt={username} className="rounded-full object-cover border-4 border-garage-gold" style={{ width: size, height: size }} />;
  return (
    <div className="rounded-full flex items-center justify-center border-4 border-garage-gold font-condensed font-extrabold text-garage-bg select-none"
      style={{ width: size, height: size, backgroundColor: "#C9A84C", fontSize: size * 0.38 }}>
      {username?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

function SectionLabel({ children }) {
  return <h2 className="font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold mb-4">{children}</h2>;
}

function Card({ children, className = "", onClick }) {
  return (
    <div className={`rounded border border-garage-border ${className}`} style={{ backgroundColor: "#1A2535" }} onClick={onClick}>
      {children}
    </div>
  );
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex border-b border-garage-border mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button key={tab.key} onClick={() => onChange(tab.key)}
          className={`px-5 py-3 text-xs font-condensed font-bold tracking-widest uppercase whitespace-nowrap border-b-2 transition-all ${
            active === tab.key ? "border-garage-gold text-garage-gold" : "border-transparent text-garage-muted hover:text-garage-text"
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function BadgeCard({ badge, onBuy }) {
  const style = TIER_STYLES[badge.tier];
  const IconFn = BADGE_ICONS[badge.id];
  return (
    <div
      className={`relative p-5 rounded-lg border flex flex-col items-center text-center gap-3 transition-all duration-200 ${badge.owned ? "" : "opacity-50 hover:opacity-80"}`}
      style={{ borderColor: style.border, backgroundColor: style.bg, boxShadow: badge.owned ? `0 0 18px ${style.glow}22` : "none" }}
    >
      {/* Tier ribbon */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <span className={`text-[9px] font-condensed font-extrabold tracking-[0.2em] uppercase px-3 py-0.5 rounded-b ${style.label}`}
          style={{ backgroundColor: style.bg, borderLeft: `1px solid ${style.border}`, borderRight: `1px solid ${style.border}`, borderBottom: `1px solid ${style.border}` }}>
          {badge.tier}
        </span>
      </div>

      {/* Medal icon */}
      <div className="mt-4">
        {IconFn ? IconFn(badge.owned, 144) : <div className="w-[144px] h-[144px]" />}
      </div>

      <div>
        <p className="font-condensed font-extrabold text-sm text-garage-text leading-tight">{badge.name}</p>
        <p className="text-xs text-garage-muted leading-snug mt-1">{badge.desc}</p>
      </div>

      {badge.owned ? (
        <span className="text-xs font-condensed font-bold tracking-widest text-green-400 flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          OWNED
        </span>
      ) : (
        <button onClick={() => onBuy(badge)}
          className="px-4 py-1.5 bg-garage-gold text-garage-bg text-xs font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition w-full">
          BUY {badge.price}
        </button>
      )}
    </div>
  );
}

function JobEntry({ job }) {
  const [open, setOpen] = useState(false);
  const tagColor = { Engine: "#C9A84C", Electrical: "#60A5FA", Transmission: "#A78BFA", Brakes: "#F87171" };
  const color = tagColor[job.tag] || "#8A95A3";
  return (
    <div className="border border-garage-border rounded overflow-hidden hover:border-garage-gold cursor-pointer transition" style={{ backgroundColor: "#1A2535" }} onClick={() => setOpen(p => !p)}>
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <div>
            <p className="font-condensed font-bold text-garage-text text-sm">{job.title}</p>
            <p className="text-xs text-garage-muted mt-0.5">{job.vehicle} · {job.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-garage-muted hidden sm:block">{job.hours}h</span>
          <span className="text-xs font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded border" style={{ color, borderColor: color, backgroundColor: color + "18" }}>{job.tag}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M2 4l4 4 4-4" stroke="#8A95A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {open && (
        <div className="px-5 pb-5 border-t border-garage-border space-y-3" style={{ backgroundColor: "#0F1923" }}>
          <p className="text-sm text-garage-muted leading-relaxed pt-4">{job.notes}</p>
          <div>
            <p className="text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">Tools Used</p>
            <div className="flex flex-wrap gap-1.5">{job.tools.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded border border-garage-border text-garage-muted">{t}</span>)}</div>
          </div>
          {job.feedback && (
            <div>
              <p className="text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">Feedback</p>
              <p className="text-sm text-garage-text italic">"{job.feedback}"</p>
            </div>
          )}
          <p className="text-xs text-garage-muted">{job.hours} hours billed</p>
        </div>
      )}
    </div>
  );
}

function ShowcaseCard({ item }) {
  return (
    <div className="rounded border border-garage-border overflow-hidden hover:border-garage-gold transition" style={{ backgroundColor: "#1A2535" }}>
      <div className="h-40 flex items-center justify-center text-5xl border-b border-garage-border" style={{ backgroundColor: "#0F1923" }}>{item.placeholder}</div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="font-condensed font-bold text-garage-text text-sm leading-tight">{item.title}</p>
          <span className="shrink-0 text-xs font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-garage-border text-garage-muted">{item.tag}</span>
        </div>
        <p className="text-xs text-garage-muted leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

export default function Profile({ currentUser, posts = [] }) {
  const [activeTab, setActiveTab]       = useState("overview");
  const [editing, setEditing]           = useState(false);
  const [username, setUsername]         = useState(currentUser?.username ?? "");
  const [location, setLocation]         = useState("");
  const [yearsExp, setYearsExp]         = useState("");
  const [specialties, setSpecialties]   = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [display, setDisplay]           = useState({ username: currentUser?.username ?? "", location: "", yearsExp: "", specialties: [], photo: null });
  const [saved, setSaved]               = useState(false);
  const [buyModal, setBuyModal]         = useState(null);
  const [ownedBadges, setOwnedBadges]   = useState(BADGES.filter(b => b.owned).map(b => b.id));

  const userPosts = posts.filter(p => p.user === display.username);
  const toggleSpecialty = (s) => setSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSave = () => {
    setDisplay({ username, location, yearsExp, specialties: [...specialties], photo: photoPreview });
    setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  };
  const handleCancel = () => {
    setUsername(display.username); setLocation(display.location); setYearsExp(display.yearsExp);
    setSpecialties([...display.specialties]); setPhotoPreview(display.photo); setEditing(false);
  };
  const handleBuy = (badge) => { setOwnedBadges(prev => [...prev, badge.id]); setBuyModal(null); };

  const TABS = [
    { key: "overview",    label: "Overview"    },
    { key: "joblog",      label: "Job Log"     },
    { key: "showcase",    label: "Showcase"    },
    { key: "badges",      label: "Badges"      },
    { key: "reputation",  label: "Reputation"  },
    { key: "posts",       label: "Posts"       },
  ];

  return (
    <div className="min-h-screen bg-garage-bg">
      {/* Hero */}
      <div className="relative h-36 border-b border-garage-border overflow-hidden" style={{ backgroundColor: "#0F1923" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#2A3A50 1px, transparent 1px), linear-gradient(90deg, #2A3A50 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-garage-gold opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Avatar row */}
        <div className="flex items-end justify-between -mt-12 mb-6">
          <div className="relative">
            <Avatar username={display.username} photo={display.photo} size={96} />
            {editing && (
              <label className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-garage-gold flex items-center justify-center cursor-pointer border-2 border-garage-bg">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9 2L11 4L4.5 10.5H2.5V8.5L9 2Z" stroke="#0F1923" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) setPhotoPreview(URL.createObjectURL(f)); }} />
              </label>
            )}
          </div>
          <div className="flex gap-2 pb-1">
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 border border-garage-border rounded text-sm font-condensed font-bold tracking-widest text-garage-muted hover:text-garage-text hover:border-garage-gold transition">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9 2L11 4L4.5 10.5H2.5V8.5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                EDIT PROFILE
              </button>
            ) : (
              <>
                <button onClick={handleCancel} className="px-4 py-2 border border-garage-border rounded text-sm font-condensed font-bold tracking-widest text-garage-muted hover:text-garage-text transition">CANCEL</button>
                <button onClick={handleSave}   className="px-4 py-2 bg-garage-gold text-garage-bg rounded text-sm font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">SAVE</button>
              </>
            )}
          </div>
        </div>

        {saved && <div className="mb-4 px-4 py-2 rounded border border-green-700 bg-green-900/30 text-green-400 text-sm font-condensed font-bold tracking-widest">✓ PROFILE SAVED</div>}

        {/* Edit form */}
        {editing && (
          <Card className="p-6 mb-6 space-y-4">
            <div>
              <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 rounded border border-garage-border text-garage-text outline-none focus:border-garage-gold transition text-sm bg-garage-bg" />
            </div>
            <div>
              <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">Location <span className="text-garage-muted normal-case font-normal">(optional)</span></label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Houston, TX" className="w-full px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm bg-garage-bg" />
            </div>
            <div>
              <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">Years of Experience</label>
              <select value={yearsExp} onChange={e => setYearsExp(e.target.value)} className="w-full px-4 py-2 rounded border border-garage-border text-garage-text outline-none focus:border-garage-gold transition text-sm bg-garage-bg">
                <option value="">Select…</option>
                {["Under 1 year","1–2 years","3–5 years","6–10 years","11–20 years","20+ years"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-2">Primary Specialties</label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map(s => (
                  <button key={s} onClick={() => toggleSpecialty(s)}
                    className={`px-3 py-1.5 rounded text-xs font-condensed font-bold tracking-widest uppercase border transition ${specialties.includes(s) ? "bg-garage-gold text-garage-bg border-garage-gold" : "text-garage-muted border-garage-border hover:border-garage-gold hover:text-garage-text"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Identity display */}
        {!editing && (
          <div className="mb-6">
            <h1 className="font-condensed font-extrabold text-3xl text-garage-text tracking-tight">@{display.username || currentUser?.username}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {display.location && <span className="flex items-center gap-1.5 text-sm text-garage-muted"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11C6 11 9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1ZM6 6C5.17 6 4.5 5.33 4.5 4.5C4.5 3.67 5.17 3 6 3C6.83 3 7.5 3.67 7.5 4.5C7.5 5.33 6.83 6 6 6Z" fill="currentColor"/></svg>{display.location}</span>}
              {display.yearsExp && <span className="flex items-center gap-1.5 text-sm text-garage-muted"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 3.5V6.5L8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>{display.yearsExp} experience</span>}
              <span className="flex items-center gap-1.5 text-sm text-garage-muted"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1.5" y="2.5" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><path d="M1.5 5.5h9" stroke="currentColor" strokeWidth="1.3"/></svg>{userPosts.length} posts</span>
              {/* Mini medal row */}
              <div className="flex items-center gap-2">
                {BADGES.filter(b => ownedBadges.includes(b.id)).slice(0, 4).map(b => (
                  <div key={b.id} title={b.name} className="w-6 h-6">{BADGE_ICONS[b.id]?.(true, 24)}</div>
                ))}
              </div>
            </div>
            {display.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {display.specialties.map(s => <span key={s} className="px-3 py-1 rounded text-xs font-condensed font-bold tracking-widest uppercase border border-garage-gold text-garage-gold" style={{ backgroundColor: "#C9A84C18" }}>{s}</span>)}
              </div>
            )}
            {!display.location && !display.yearsExp && display.specialties.length === 0 && (
              <p className="mt-3 text-sm text-garage-muted italic">No profile info yet — <button onClick={() => setEditing(true)} className="text-garage-gold hover:underline not-italic">fill it in</button>.</p>
            )}
          </div>
        )}

        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 pb-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Jobs Logged",    value: MOCK_JOB_LOG.length },
                { label: "Hours Billed",   value: MOCK_JOB_LOG.reduce((a, j) => a + j.hours, 0) },
                { label: "Showcase Items", value: MOCK_SHOWCASE.length },
                { label: "Badges Earned",  value: ownedBadges.length },
              ].map(s => <Card key={s.label} className="p-5 text-center"><p className="font-condensed font-extrabold text-3xl text-garage-gold">{s.value}</p><p className="text-xs text-garage-muted mt-1 font-condensed tracking-widest uppercase">{s.label}</p></Card>)}
            </div>
            <div><SectionLabel>Recent Jobs</SectionLabel><div className="space-y-2">{MOCK_JOB_LOG.slice(0, 2).map(job => <JobEntry key={job.id} job={job} />)}</div></div>
            <div>
              <SectionLabel>Reputation Highlights</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_ENDORSEMENTS.slice(0, 3).map(e => (
                  <div key={e.id} className="flex items-center justify-between px-4 py-3 rounded border border-garage-border" style={{ backgroundColor: "#1A2535" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-xs shrink-0">{e.avatar}</div>
                      <p className="text-xs text-garage-muted">endorsed <span className="text-garage-gold font-bold">{e.specialty}</span></p>
                    </div>
                    <span className="text-sm font-condensed font-extrabold text-garage-gold">{e.count}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 px-4 py-3 rounded border border-garage-border" style={{ backgroundColor: "#1A2535" }}>
                  <div className="w-7 h-7 rounded-full bg-green-900 border border-green-700 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-xs text-garage-muted"><span className="text-garage-text font-semibold">{HELPFUL_REACTIONS.length}</span> helpful reactions from the community</p>
                </div>
              </div>
            </div>
            <div><SectionLabel>Recent Showcase</SectionLabel><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{MOCK_SHOWCASE.slice(0, 2).map(item => <ShowcaseCard key={item.id} item={item} />)}</div></div>
          </div>
        )}

        {/* JOB LOG */}
        {activeTab === "joblog" && (
          <div className="pb-16">
            <div className="flex items-center justify-between mb-4"><SectionLabel>Job Log</SectionLabel><button className="px-4 py-2 bg-garage-gold text-garage-bg text-xs font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition">+ ADD ENTRY</button></div>
            <div className="space-y-2">{MOCK_JOB_LOG.map(job => <JobEntry key={job.id} job={job} />)}</div>
          </div>
        )}

        {/* SHOWCASE */}
        {activeTab === "showcase" && (
          <div className="pb-16">
            <div className="flex items-center justify-between mb-4"><SectionLabel>Work Showcase</SectionLabel><button className="px-4 py-2 bg-garage-gold text-garage-bg text-xs font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition">+ ADD WORK</button></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK_SHOWCASE.map(item => <ShowcaseCard key={item.id} item={item} />)}</div>
          </div>
        )}

        {/* BADGES */}
        {activeTab === "badges" && (
          <div className="pb-16">
            <SectionLabel>Badges</SectionLabel>
            <p className="text-xs text-garage-muted -mt-3 mb-5">Earn or purchase badges to display on your profile.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {BADGES.map(badge => <BadgeCard key={badge.id} badge={{ ...badge, owned: ownedBadges.includes(badge.id) }} onBuy={setBuyModal} />)}
            </div>
          </div>
        )}

        {/* REPUTATION */}
        {activeTab === "reputation" && (
          <div className="pb-16 space-y-10">

            {/* ── Reputation score ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Endorsements",   value: MOCK_ENDORSEMENTS.reduce((a, e) => a + e.count, 0) },
                { label: "Helpful Votes",  value: HELPFUL_REACTIONS.length },
                { label: "Recommendations",value: MOCK_RECOMMENDATIONS.length },
                { label: "Certifications", value: MOCK_CERTIFICATIONS.length },
              ].map(s => (
                <Card key={s.label} className="p-5 text-center">
                  <p className="font-condensed font-extrabold text-3xl text-garage-gold">{s.value}</p>
                  <p className="text-xs text-garage-muted mt-1 font-condensed tracking-widest uppercase">{s.label}</p>
                </Card>
              ))}
            </div>

            {/* ── Skill endorsements ── */}
            <div>
              <SectionLabel>Skill Endorsements</SectionLabel>
              <div className="space-y-2">
                {MOCK_ENDORSEMENTS.map(e => (
                  <div key={e.id} className="flex items-center justify-between px-5 py-4 rounded border border-garage-border hover:border-garage-gold transition" style={{ backgroundColor: "#1A2535" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-sm shrink-0">
                        {e.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-garage-text">{e.from}</p>
                        <p className="text-xs text-garage-muted">endorsed you for <span className="text-garage-gold font-bold">{e.specialty}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* endorsement bar */}
                      <div className="hidden sm:flex items-center gap-1">
                        {Array.from({ length: Math.min(e.count, 15) }).map((_, i) => (
                          <div key={i} className="w-1.5 h-4 rounded-sm bg-garage-gold opacity-80" style={{ opacity: 0.4 + (i / 15) * 0.6 }} />
                        ))}
                      </div>
                      <span className="text-sm font-condensed font-extrabold text-garage-gold ml-1">{e.count}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full py-2 border border-dashed border-garage-border rounded text-xs font-condensed font-bold tracking-widest text-garage-muted hover:border-garage-gold hover:text-garage-text transition">
                + ENDORSE A SKILL
              </button>
            </div>

            {/* ── Shop manager recommendations ── */}
            <div>
              <SectionLabel>Shop Recommendations</SectionLabel>
              <div className="space-y-4">
                {MOCK_RECOMMENDATIONS.map(r => (
                  <div key={r.id} className="p-5 rounded border border-garage-border" style={{ backgroundColor: "#1A2535" }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-garage-surface2 border border-garage-border flex items-center justify-center text-garage-gold font-condensed font-extrabold shrink-0">
                        {r.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-sm text-garage-text">{r.author}</span>
                          {r.verified && (
                            <span className="flex items-center gap-1 text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-blue-500 text-blue-400" style={{ backgroundColor: "#1E40AF18" }}>
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              VERIFIED
                            </span>
                          )}
                          <span className="text-xs text-garage-muted ml-auto">{r.date}</span>
                        </div>
                        <p className="text-xs text-garage-gold mb-2">{r.role}</p>
                        <p className="text-sm text-garage-muted leading-relaxed italic">"{r.text}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full py-2 border border-dashed border-garage-border rounded text-xs font-condensed font-bold tracking-widest text-garage-muted hover:border-garage-gold hover:text-garage-text transition">
                + REQUEST RECOMMENDATION
              </button>
            </div>

            {/* ── Certifications ── */}
            <div>
              <SectionLabel>Certifications</SectionLabel>
              <div className="space-y-2">
                {MOCK_CERTIFICATIONS.map(cert => (
                  <div key={cert.id} className="flex items-center justify-between px-5 py-4 rounded border border-garage-border hover:border-garage-gold transition" style={{ backgroundColor: "#1A2535" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded border border-garage-border flex items-center justify-center shrink-0" style={{ backgroundColor: "#0F1923" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L9.5 5.5H14L10.5 8.5L11.5 13L8 10.5L4.5 13L5.5 8.5L2 5.5H6.5Z" fill={cert.verified ? "#C9A84C" : "#3A4A5A"} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-garage-text">{cert.name}</p>
                        <p className="text-xs text-garage-muted">{cert.issuer} · {cert.year}</p>
                      </div>
                    </div>
                    {cert.verified ? (
                      <span className="flex items-center gap-1 text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-blue-500 text-blue-400" style={{ backgroundColor: "#1E40AF18" }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        VERIFIED
                      </span>
                    ) : (
                      <span className="text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-garage-border text-garage-muted">PENDING</span>
                    )}
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full py-2 border border-dashed border-garage-border rounded text-xs font-condensed font-bold tracking-widest text-garage-muted hover:border-garage-gold hover:text-garage-text transition">
                + ADD CERTIFICATION
              </button>
            </div>

            {/* ── Helpful reactions ── */}
            <div>
              <SectionLabel>Helpful Reactions Received</SectionLabel>
              <div className="space-y-2">
                {HELPFUL_REACTIONS.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 rounded border border-garage-border" style={{ backgroundColor: "#1A2535" }}>
                    <div className="w-7 h-7 rounded-full bg-green-900 border border-green-700 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p className="text-sm text-garage-muted flex-1">
                      <span className="text-garage-text font-semibold">{r.user}</span> marked your reply helpful on <span className="text-garage-gold">"{r.post}"</span>
                    </p>
                    <span className="text-xs text-garage-muted shrink-0">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}


        {activeTab === "posts" && (
          <div className="pb-16">
            <SectionLabel>Questions Posted</SectionLabel>
            {userPosts.length === 0 ? (
              <Card className="p-8 text-center"><p className="text-garage-muted text-sm">No posts yet.</p></Card>
            ) : (
              <div className="space-y-3">{userPosts.map(post => (
                <Card key={post.id} className="p-5 hover:border-garage-gold transition cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold border border-garage-gold px-2 py-0.5 rounded" style={{ backgroundColor: "#C9A84C18" }}>{post.tag}</span>
                    <span className="text-xs text-garage-muted">{post.time}</span>
                  </div>
                  <p className="text-garage-text text-sm leading-relaxed line-clamp-2">{post.question}</p>
                  <p className="text-garage-muted text-xs mt-2">{post.reply_count ?? post.replies?.length ?? 0} replies</p>
                </Card>
              ))}</div>
            )}
          </div>
        )}
      </div>

      {/* Buy modal */}
      {buyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6" onClick={() => setBuyModal(null)}>
          <div className="w-full max-w-sm p-8 rounded border border-garage-border text-center" style={{ backgroundColor: "#1A2535" }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-center mb-4">{BADGE_ICONS[buyModal.id]?.(false, 144)}</div>
            <h3 className="font-condensed font-extrabold text-xl text-garage-text mb-1">{buyModal.name}</h3>
            <p className="text-sm text-garage-muted mb-6">{buyModal.desc}</p>
            <div className="flex gap-3">
              <button onClick={() => setBuyModal(null)} className="flex-1 py-2 border border-garage-border rounded text-sm font-condensed font-bold tracking-widest text-garage-muted hover:text-garage-text transition">CANCEL</button>
              <button onClick={() => handleBuy(buyModal)} className="flex-1 py-2 bg-garage-gold text-garage-bg rounded text-sm font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">BUY — {buyModal.price}</button>
            </div>
            <p className="text-xs text-garage-muted mt-4 italic">Mock checkout — no real payment in demo.</p>
          </div>
        </div>
      )}
    </div>
  );
}