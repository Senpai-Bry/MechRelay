import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// MILITARY-STYLE MEDAL SVGs
// ─────────────────────────────────────────────────────────────────────────────

function Medal({ size = 220, owned = true, g, children }) {
  const dim      = !owned;
  const face     = dim ? "#2E3D4E" : g.face;
  const faceMid  = dim ? "#253040" : g.faceMid;
  const faceEdge = dim ? "#1A2530" : g.faceEdge;
  const shine    = dim ? "#3A4A5A" : g.shine;
  const shadow   = dim ? "#101820" : g.shadow;
  const stripe   = dim ? "#2A3A4A" : g.stripe;
  const navy     = dim ? "#1A2535" : "#1C2333";
  const id       = g.id;

  return (
    <svg width={size} height={Math.round(size * 1.25)} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`cg-${id}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor={shine}    stopOpacity={dim ? 0.4 : 0.9} />
          <stop offset="45%"  stopColor={face}     stopOpacity="1" />
          <stop offset="100%" stopColor={faceEdge} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`ig-${id}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor={faceMid} />
          <stop offset="100%" stopColor={faceEdge} />
        </radialGradient>
      </defs>
      <rect x="26" y="0" width="28" height="30" fill={navy} />
      <rect x="26" y="0" width="5"  height="30" fill={stripe} opacity={dim ? 0.3 : 0.55} />
      <rect x="49" y="0" width="5"  height="30" fill={stripe} opacity={dim ? 0.3 : 0.55} />
      <rect x="38" y="0" width="4"  height="30" fill={stripe} opacity={dim ? 0.2 : 0.35} />
      <rect x="26" y="0" width="28" height="2" rx="1" fill={navy} />
      <rect x="26" y="27" width="28" height="3" fill="#00000035" />
      <rect x="26" y="0" width="2"  height="30" fill="#00000025" />
      <rect x="52" y="0" width="2"  height="30" fill="#00000025" />
      <rect x="34" y="28" width="12" height="8" rx="4" fill={faceEdge} />
      <rect x="36" y="30" width="8"  height="5" rx="2.5" fill={shadow} />
      <circle cx="40" cy="69" r="27" fill="#00000050" />
      <circle cx="40" cy="67" r="27" fill={faceEdge} />
      <circle cx="40" cy="67" r="24.5" fill={`url(#cg-${id})`} />
      <circle cx="40" cy="67" r="21"   fill="none" stroke={shadow} strokeWidth="1.2" opacity="0.6" />
      <circle cx="40" cy="67" r="20"   fill="none" stroke={shine}  strokeWidth="0.5" opacity={dim ? 0.15 : 0.4} />
      <circle cx="40" cy="67" r="18.5" fill={`url(#ig-${id})`} />
      <circle cx="40" cy="67" r="18.5" fill="none" stroke={shadow} strokeWidth="0.8" opacity="0.5" />
      <circle cx="40" cy="67" r="17.5" fill="none" stroke={shine}  strokeWidth="0.4" opacity={dim ? 0.1 : 0.3} />
      <ellipse cx="32" cy="54" rx="9" ry="5" fill={shine} opacity={dim ? 0.04 : 0.22} transform="rotate(-25,32,54)" />
      <g stroke={shine} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={dim ? 0.3 : 0.85}>
        {children}
      </g>
    </svg>
  );
}

const PAL = {
  gold:   { id:"gld", face:"#D4AA50", faceMid:"#A87C28", faceEdge:"#6B4F10", shine:"#FFF0A0", shadow:"#3A2800", stripe:"#D4AA50" },
  silver: { id:"slv", face:"#C0CAD4", faceMid:"#8A96A4", faceEdge:"#525E68", shine:"#F0F4F8", shadow:"#202830", stripe:"#A0AABC" },
  bronze: { id:"brz", face:"#D08038", faceMid:"#9A5A18", faceEdge:"#5A3008", shine:"#F8C070", shadow:"#2A1400", stripe:"#D08038" },
  plat:   { id:"plt", face:"#C8D4E8", faceMid:"#8898B8", faceEdge:"#485878", shine:"#FFFFFF", shadow:"#182840", stripe:"#90A8CC" },
};

function MedalWrenchMaster({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.gold}>
      <g transform="translate(23.1, 50.1) scale(0.033)" fill="currentColor" stroke="none" opacity="0.9">
        <path d="M161.6 923.2c-15.2 0-30.4-6.4-40.8-17.6-22.4-22.4-22.4-60 0-82.4 11.2-11.2 25.6-17.6 40.8-17.6 15.2 0 30.4 6.4 40.8 17.6 22.4 22.4 22.4 60 0 82.4-10.4 12-24.8 17.6-40.8 17.6z m0-68c-2.4 0-4.8 0.8-6.4 2.4-4 4-4 10.4 0 14.4 1.6 1.6 4 2.4 6.4 2.4 2.4 0 4.8-0.8 6.4-2.4 4-4 4-10.4 0-14.4-1.6-1.6-4-2.4-6.4-2.4z" />
        <path d="M178.4 972c-24.8 0-47.2-9.6-64.8-27.2l-24-24c-35.2-36-35.2-94.4 0-130.4l1.6-1.6 423.2-362.4c-25.6-43.2-37.6-93.6-33.6-144 4-59.2 28.8-114.4 69.6-156 45.6-46.4 106.4-72 171.2-72 31.2 0 62.4 6.4 91.2 18.4 7.2 3.2 12.8 9.6 14.4 17.6 1.6 8-0.8 16-6.4 21.6L696.8 236.8l84 85.6L904 198.4c4.8-4.8 11.2-7.2 17.6-7.2 1.6 0 3.2 0 4.8 0.8 8 1.6 14.4 7.2 17.6 14.4 18.4 44 23.2 92.8 14.4 140-8.8 48.8-32 92.8-66.4 128-45.6 46.4-105.6 72-169.6 72-35.2 0-70.4-8-101.6-23.2l-377.6 421.6c-17.6 17.6-40.8 27.2-64.8 27.2z m-54.4-147.2c-16 17.6-16 44.8 0.8 61.6l24 24c8 8 18.4 12.8 29.6 12.8 11.2 0 21.6-4.8 29.6-12.8l388.8-434.4c4.8-4.8 11.2-8 18.4-8 4 0 8.8 0.8 12 3.2 28.8 16.8 61.6 25.6 95.2 25.6 51.2 0 98.4-20 134.4-56.8 45.6-47.2 65.6-113.6 52.8-178.4l-112 112.8c-4.8 4.8-11.2 7.2-17.6 7.2-6.4 0-12.8-2.4-17.6-7.2L645.6 253.6c-9.6-9.6-9.6-24.8 0-34.4l112-112.8c-12-2.4-24-3.2-36-3.2-51.2 0-100 20.8-136 57.6-68 68.8-75.2 176.8-18.4 256 7.2 10.4 5.6 24.8-4 32.8l-439.2 375.2z" />
        <path d="M405.6 522.4c-6.4 0-12.8-2.4-17.6-7.2L216 340h-58.4c-8.8 0-16.8-4.8-20.8-12L57.6 198.4c-5.6-9.6-4-22.4 4-30.4l64-64.8c4.8-4.8 11.2-7.2 17.6-7.2 4.8 0 8.8 1.6 12.8 4l130.4 81.6c7.2 4.8 11.2 12 11.2 20l0.8 58.4 176.8 181.6c4.8 4.8 7.2 11.2 7.2 17.6 0 6.4-2.4 12.8-7.2 16.8-4.8 4.8-10.4 7.2-16.8 7.2s-12.8-2.4-17.6-7.2L256 287.2c-4-4.8-7.2-10.4-7.2-16.8l-0.8-55.2-102.4-64-36.8 37.6 62.4 102.4h54.4c6.4 0 12.8 2.4 17.6 7.2l179.2 182.4c4.8 4.8 7.2 11.2 7.2 17.6 0 6.4-2.4 12.8-7.2 17.6-4 4-10.4 6.4-16.8 6.4zM768.8 979.2c-15.2 0-30.4-6.4-40.8-17.6L520.8 748c-22.4-22.4-22.4-59.2 0-82.4l6.4-6.4-7.2-7.2c-9.6-9.6-9.6-24.8 0.8-34.4 4.8-4.8 10.4-7.2 16.8-7.2s12.8 2.4 17.6 7.2l24 24c9.6 9.6 8.8 24.8 0 34.4l-23.2 24c-4 4-4 10.4 0 14.4L763.2 928c1.6 1.6 4 2.4 6.4 2.4 2.4 0 4.8-0.8 6.4-2.4l94.4-96.8c4-4 4-10.4 0-14.4l-208-213.6c-1.6-1.6-4-2.4-6.4-2.4-2.4 0-4.8 0.8-6.4 2.4L624 629.6c-4.8 4.8-11.2 7.2-17.6 7.2-6.4 0-12.8-2.4-17.6-7.2L568 606.4c-4.8-4.8-7.2-11.2-7.2-17.6 0-6.4 2.4-12.8 7.2-16.8 4.8-4.8 10.4-7.2 16.8-7.2s12.8 2.4 17.6 7.2l4.8 4.8 8-8c11.2-11.2 25.6-17.6 40.8-17.6 15.2 0 30.4 6.4 40.8 17.6L904 782.4c22.4 22.4 22.4 60 0 82.4l-94.4 96.8c-10.4 11.2-24.8 17.6-40.8 17.6z" />
      </g>
    </Medal>
  );
}
function MedalDiagnosticPro({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.silver}>
      <rect x="30" y="61" width="20" height="12" rx="1.5" strokeWidth="1.4" />
      <rect x="33" y="58" width="3.5" height="4" rx="1" strokeWidth="1.1" />
      <rect x="43" y="58" width="3.5" height="4" rx="1" strokeWidth="1.1" />
      <rect x="27" y="64" width="3.5" height="2.5" rx="0.8" strokeWidth="1" />
      <rect x="49.5" y="64" width="3.5" height="2.5" rx="0.8" strokeWidth="1" />
      <polyline points="29,77 33,77 35,73 37,81 39,74 41,77 51,77" strokeWidth="1.3" />
    </Medal>
  );
}

function MedalCommunityHero({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.silver}>
      <path d="M40 55 L50 59 L50 68 Q50 75 40 79 Q30 75 30 68 L30 59 Z" strokeWidth="1.4" />
      <polygon points="40,61 41.8,66.5 47.5,66.5 43,69.8 44.8,75.3 40,72 35.2,75.3 37,69.8 32.5,66.5 38.2,66.5" strokeWidth="1" />
    </Medal>
  );
}

function MedalEVSpecialist({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.plat}>
      <polygon points="44,54 34,68 40,68 36,80 50,64 44,64" strokeWidth="1.3" />
      <rect x="46" y="55" width="6" height="4" rx="1" strokeWidth="1.1" />
      <line x1="48" y1="53" x2="48" y2="55.5" strokeWidth="1.2" />
      <line x1="51" y1="53" x2="51" y2="55.5" strokeWidth="1.2" />
    </Medal>
  );
}

function MedalOldSchool({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.bronze}>
      <path d="M27 70 Q27 65 32 63 L34 57 L46 57 L48 63 Q53 65 53 70 Z" strokeWidth="1.4" />
      <path d="M34 63 L35 58 L45 58 L46 63 Z" strokeWidth="1.1" />
      <circle cx="32" cy="70" r="3.5" strokeWidth="1.3" />
      <circle cx="48" cy="70" r="3.5" strokeWidth="1.3" />
      <circle cx="32" cy="70" r="1.2" strokeWidth="1" />
      <circle cx="48" cy="70" r="1.2" strokeWidth="1" />
      <line x1="27" y1="66" x2="53" y2="66" strokeWidth="0.9" />
    </Medal>
  );
}

function MedalShopOwner({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.silver}>
      <rect x="31" y="64" width="18" height="14" rx="1" strokeWidth="1.4" />
      <path d="M29 64 L40 57 L51 64" strokeWidth="1.4" />
      <line x1="29" y1="64" x2="51" y2="64" strokeWidth="1" />
      <rect x="37" y="69" width="6" height="9" rx="0.5" strokeWidth="1.1" />
      <line x1="34" y1="60" x2="31" y2="64" strokeWidth="0.8" />
      <line x1="38" y1="58" x2="35" y2="64" strokeWidth="0.8" />
      <line x1="42" y1="57.5" x2="40" y2="64" strokeWidth="0.8" />
      <circle cx="50" cy="62" r="2.5" strokeWidth="1.1" />
      <line x1="52.5" y1="62" x2="57" y2="62" strokeWidth="1.1" />
      <line x1="55"   y1="62" x2="55" y2="64" strokeWidth="1.1" />
      <line x1="57"   y1="62" x2="57" y2="60" strokeWidth="1.1" />
    </Medal>
  );
}

function MedalPhotoPro({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.bronze}>
      <rect x="30" y="62" width="20" height="14" rx="2" strokeWidth="1.4" />
      <path d="M34 62 L36 57 L44 57 L46 62" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="40" cy="69" r="5"   strokeWidth="1.4" />
      <circle cx="40" cy="69" r="2.5" strokeWidth="1.1" />
      <circle cx="40" cy="69" r="0.8" fill="currentColor" strokeWidth="0" />
      <rect x="46" y="63" width="3.5" height="2.5" rx="0.5" strokeWidth="1" />
      <circle cx="34" cy="59" r="1.2" strokeWidth="0.9" />
    </Medal>
  );
}

function MedalFirstPost({ size = 220, owned = true }) {
  return (
    <Medal size={size} owned={owned} g={PAL.bronze}>
      <rect x="29" y="59" width="22" height="16" rx="2" strokeWidth="1.4" />
      <path d="M29 61 L40 70 L51 61" strokeWidth="1.3" />
      <line x1="29" y1="73" x2="36" y2="66" strokeWidth="0.9" />
      <line x1="51" y1="73" x2="44" y2="66" strokeWidth="0.9" />
    </Medal>
  );
}

const BADGE_ICONS = {
  "wrench-master":  (owned, size) => <MedalWrenchMaster  owned={owned} size={size} />,
  "diagnostic-pro": (owned, size) => <MedalDiagnosticPro owned={owned} size={size} />,
  "community-hero": (owned, size) => <MedalCommunityHero owned={owned} size={size} />,
  "ev-specialist":  (owned, size) => <MedalEVSpecialist  owned={owned} size={size} />,
  "old-school":     (owned, size) => <MedalOldSchool     owned={owned} size={size} />,
  "shop-owner":     (owned, size) => <MedalShopOwner     owned={owned} size={size} />,
  "photo-pro":      (owned, size) => <MedalPhotoPro      owned={owned} size={size} />,
  "first-post":     (owned, size) => <MedalFirstPost     owned={owned} size={size} />,
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
  { id: "wrench-master",  name: "Wrench Master",  desc: "Completed 50+ job log entries",             tier: "gold",     owned: true,  price: null    },
  { id: "diagnostic-pro", name: "Diagnostic Pro", desc: "Solved 20+ electrical & diagnostic issues", tier: "gold",     owned: true,  price: null    },
  { id: "community-hero", name: "Community Hero", desc: "Top responder in the community feed",        tier: "platinum", owned: false, price: "$4.99" },
  { id: "ev-specialist",  name: "EV Specialist",  desc: "Certified Hybrid & EV technician badge",     tier: "platinum", owned: false, price: "$4.99" },
  { id: "old-school",     name: "Old School",     desc: "10+ years in the trade",                    tier: "silver",   owned: true,  price: null    },
  { id: "shop-owner",     name: "Shop Owner",     desc: "Verified independent shop owner",           tier: "silver",   owned: false, price: "$2.99" },
  { id: "photo-pro",      name: "Photo Pro",      desc: "Uploaded 10+ showcase posts",               tier: "bronze",   owned: false, price: "$1.99" },
  { id: "first-post",     name: "First Post",     desc: "Posted your first community question",       tier: "bronze",   owned: true,  price: null    },
];

const TIER_STYLES = {
  platinum: { border: "#C0C0E0", bg: "#E8E8FF0D", label: "text-purple-300", glow: "#A0A0FF" },
  gold:     { border: "#C9A84C", bg: "#C9A84C0D", label: "text-yellow-400", glow: "#FFD700" },
  silver:   { border: "#8A95A3", bg: "#8A95A30D", label: "text-gray-300",   glow: "#C0C0C0" },
  bronze:   { border: "#CD7F32", bg: "#CD7F320D", label: "text-orange-400", glow: "#CD7F32" },
};

const MOCK_JOB_LOG = [
  { id: 1, date: "Mar 8, 2025",  title: "Head Gasket Replacement",            vehicle: "2015 Subaru WRX",  tag: "Engine",       notes: "Full head gasket job, resurfaced head, replaced timing belt and water pump while in there. Customer had been running it hot for weeks.", tools: ["Torque wrench", "Angle gauge", "Head bolt kit", "Plastigage"], hours: 9.5, feedback: "Customer stoked — said it runs better than when they bought it." },
  { id: 2, date: "Feb 28, 2025", title: "ABS Module Diagnosis & Replacement", vehicle: "2018 Ford F-150",  tag: "Electrical",   notes: "C0031 and C0034 codes. Traced to failing ABS module. Replaced unit, bled brakes, confirmed all four wheel sensors reading correctly.", tools: ["PICO oscilloscope", "Autel MaxiSys", "Brake bleeder kit"], hours: 4.0, feedback: "Smooth — in and out same day." },
  { id: 3, date: "Feb 14, 2025", title: "Dual Clutch Transmission Service",   vehicle: "2020 VW Golf GTI", tag: "Transmission", notes: "DSG fluid flush and filter. Customer had been skipping service intervals. Shift hesitation gone after job.", tools: ["VAG-COM", "DSG service kit", "Fluid extractor"], hours: 2.5, feedback: "Left a 5-star review on Google." },
];

const MOCK_SHOWCASE = [
  { id: 1, title: "LS Swap — 1972 Chevy C10",            tag: "Custom Build", placeholder: "🛻", description: "Full LS3 swap into a resto-mod C10. Custom mounts, E-rod harness, 4L65E trans. Took 3 weekends." },
  { id: 2, title: "Brake Caliper Rebuild — Porsche 911",  tag: "Brakes",       placeholder: "🔴", description: "Factory Brembo 6-piston rebuild. New pistons, seals, stainless hardware. Painted Porsche red." },
  { id: 3, title: "Wiring Harness Repair — Boat Trailer", tag: "Electrical",   placeholder: "⚡", description: "Complete rewire of a 24ft trailer. Corrosion had taken out half the lights. New 7-pin harness." },
];

const MOCK_ENDORSEMENTS = [
  { id: 1, from: "TorqueWrench_T",  specialty: "Engine",       count: 14, avatar: "T" },
  { id: 2, from: "ShopFloor_Sal",   specialty: "Electrical",   count: 9,  avatar: "S" },
  { id: 3, from: "MechDave_99",     specialty: "Diagnostics",  count: 7,  avatar: "M" },
  { id: 4, from: "GarageKing_88",   specialty: "Transmission", count: 5,  avatar: "G" },
  { id: 5, from: "BoostMonkey_Ray", specialty: "Brakes",       count: 4,  avatar: "B" },
];

const MOCK_RECOMMENDATIONS = [
  { id: 1, author: "Carlos M.", role: "Shop Manager — Rivera Auto, Houston TX", avatar: "C", text: "One of the sharpest diagnosticians I've had in my shop. Never guesses — always traces the fault. Customers ask for him by name.", verified: true, date: "Feb 2025" },
  { id: 2, author: "James T.",  role: "Owner — Turbo Tech Garage, Austin TX",   avatar: "J", text: "Solid work ethic, clean bay, zero comebacks in 2 years. Would rehire without hesitation.",                                      verified: true, date: "Jan 2025" },
];

const MOCK_CERTIFICATIONS = [
  { id: 1, name: "ASE Master Technician",        issuer: "ASE",    year: 2021, verified: true  },
  { id: 2, name: "Toyota T-TEN Certified",        issuer: "Toyota", year: 2019, verified: true  },
  { id: 3, name: "EV & Hybrid Safety Cert",       issuer: "NASTF",  year: 2023, verified: false },
  { id: 4, name: "Bosch Fuel Systems Specialist", issuer: "Bosch",  year: 2022, verified: false },
];

const HELPFUL_REACTIONS = [
  { user: "TorqueWrench_T", post: "P0420 diagnosis tip",     time: "Mar 8"  },
  { user: "ShopFloor_Sal",  post: "ABS bleed procedure",     time: "Mar 5"  },
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
      className={`relative pt-8 pb-6 px-6 rounded-lg border flex flex-col items-center text-center gap-4 transition-all duration-200 ${badge.owned ? "" : "opacity-50 hover:opacity-75"}`}
      style={{ borderColor: style.border, backgroundColor: style.bg, boxShadow: badge.owned ? `0 0 32px ${style.glow}30` : "none" }}
    >
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <span className={`text-[9px] font-condensed font-extrabold tracking-[0.2em] uppercase px-3 py-0.5 rounded-b ${style.label}`}
          style={{ backgroundColor: style.bg, borderLeft: `1px solid ${style.border}`, borderRight: `1px solid ${style.border}`, borderBottom: `1px solid ${style.border}` }}>
          {badge.tier}
        </span>
      </div>
      <div className="flex items-center justify-center" style={{ width: 220, height: 275 }}>
        {IconFn ? IconFn(badge.owned, 220) : <div style={{ width: 220, height: 275 }} />}
      </div>
      <div>
        <p className="font-condensed font-extrabold text-base text-garage-text leading-tight tracking-wide">{badge.name}</p>
        <p className="text-xs text-garage-muted leading-snug mt-1.5 max-w-[180px] mx-auto">{badge.desc}</p>
      </div>
      {badge.owned ? (
        <span className="text-xs font-condensed font-bold tracking-widest text-green-400 flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          OWNED
        </span>
      ) : (
        <button onClick={() => onBuy(badge)} className="px-6 py-2 bg-garage-gold text-garage-bg text-xs font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition w-full">
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

function VerifiedBadge() {
  return (
    <span className="flex items-center gap-1 text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-blue-500 text-blue-400" style={{ backgroundColor: "#1E40AF18" }}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      VERIFIED
    </span>
  );
}

// ─────────────────────────────────────────────
// MAIN PROFILE COMPONENT
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
    { key: "overview",   label: "Overview"   },
    { key: "joblog",     label: "Job Log"    },
    { key: "showcase",   label: "Showcase"   },
    { key: "badges",     label: "Badges"     },
    { key: "reputation", label: "Reputation" },
    { key: "posts",      label: "Posts"      },
  ];

  return (
    <div className="min-h-screen bg-garage-bg">

      {/* Hero banner */}
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
              {display.location && (
                <span className="flex items-center gap-1.5 text-sm text-garage-muted">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11S9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1ZM6 6C5.17 6 4.5 5.33 4.5 4.5S5.17 3 6 3 7.5 3.67 7.5 4.5 6.83 6 6 6Z" fill="currentColor"/></svg>
                  {display.location}
                </span>
              )}
              {display.yearsExp && (
                <span className="flex items-center gap-1.5 text-sm text-garage-muted">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 3.5V6.5L8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  {display.yearsExp} experience
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-garage-muted">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1.5" y="2.5" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><path d="M1.5 5.5h9" stroke="currentColor" strokeWidth="1.3"/></svg>
                {userPosts.length} posts
              </span>
            </div>
            {display.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {display.specialties.map(s => (
                  <span key={s} className="px-3 py-1 rounded text-xs font-condensed font-bold tracking-widest uppercase border border-garage-gold text-garage-gold" style={{ backgroundColor: "#C9A84C18" }}>{s}</span>
                ))}
              </div>
            )}
            {!display.location && !display.yearsExp && display.specialties.length === 0 && (
              <p className="mt-3 text-sm text-garage-muted italic">No profile info yet — <button onClick={() => setEditing(true)} className="text-garage-gold hover:underline not-italic">fill it in</button>.</p>
            )}
          </div>
        )}

        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-8 pb-16">

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Jobs Logged",    value: MOCK_JOB_LOG.length },
                { label: "Hours Billed",   value: MOCK_JOB_LOG.reduce((a, j) => a + j.hours, 0) },
                { label: "Showcase Items", value: MOCK_SHOWCASE.length },
                { label: "Badges Earned",  value: ownedBadges.length },
              ].map(s => (
                <Card key={s.label} className="p-5 text-center">
                  <p className="font-condensed font-extrabold text-3xl text-garage-gold">{s.value}</p>
                  <p className="text-xs text-garage-muted mt-1 font-condensed tracking-widest uppercase">{s.label}</p>
                </Card>
              ))}
            </div>

            {/* Badges earned */}
            {ownedBadges.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <SectionLabel>Badges Earned</SectionLabel>
                  <span className="text-xs text-garage-muted font-condensed tracking-widest">{ownedBadges.length} / {BADGES.length}</span>
                </div>
                <div className="flex flex-wrap gap-6 px-2">
                  {BADGES.filter(b => ownedBadges.includes(b.id)).map(b => {
                    const style = TIER_STYLES[b.tier];
                    return (
                      <div key={b.id} className="flex flex-col items-center gap-2" title={b.name}>
                        <div style={{ width: 80, height: 100 }}>
                          {BADGE_ICONS[b.id]?.(true, 80)}
                        </div>
                        <p className="text-[10px] font-condensed font-bold tracking-widest uppercase text-center" style={{ color: style.border }}>{b.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent jobs */}
            <div>
              <SectionLabel>Recent Jobs</SectionLabel>
              <div className="space-y-2">{MOCK_JOB_LOG.slice(0, 2).map(job => <JobEntry key={job.id} job={job} />)}</div>
            </div>

            {/* Reputation highlights */}
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

            {/* Recent showcase */}
            <div>
              <SectionLabel>Recent Showcase</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{MOCK_SHOWCASE.slice(0, 2).map(item => <ShowcaseCard key={item.id} item={item} />)}</div>
            </div>

          </div>
        )}

        {/* ── JOB LOG ── */}
        {activeTab === "joblog" && (
          <div className="pb-16">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Job Log</SectionLabel>
              <button className="px-4 py-2 bg-garage-gold text-garage-bg text-xs font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition">+ ADD ENTRY</button>
            </div>
            <div className="space-y-2">{MOCK_JOB_LOG.map(job => <JobEntry key={job.id} job={job} />)}</div>
          </div>
        )}

        {/* ── SHOWCASE ── */}
        {activeTab === "showcase" && (
          <div className="pb-16">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Work Showcase</SectionLabel>
              <button className="px-4 py-2 bg-garage-gold text-garage-bg text-xs font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition">+ ADD WORK</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK_SHOWCASE.map(item => <ShowcaseCard key={item.id} item={item} />)}</div>
          </div>
        )}

        {/* ── BADGES ── */}
        {activeTab === "badges" && (
          <div className="pb-16">
            <SectionLabel>Badges</SectionLabel>
            <p className="text-xs text-garage-muted -mt-3 mb-6">Earn or purchase badges to display on your profile.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BADGES.map(badge => (
                <BadgeCard key={badge.id} badge={{ ...badge, owned: ownedBadges.includes(badge.id) }} onBuy={setBuyModal} />
              ))}
            </div>
          </div>
        )}

        {/* ── REPUTATION ── */}
        {activeTab === "reputation" && (
          <div className="pb-16 space-y-10">

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Endorsements",    value: MOCK_ENDORSEMENTS.reduce((a, e) => a + e.count, 0) },
                { label: "Helpful Votes",   value: HELPFUL_REACTIONS.length },
                { label: "Recommendations", value: MOCK_RECOMMENDATIONS.length },
                { label: "Certifications",  value: MOCK_CERTIFICATIONS.length },
              ].map(s => (
                <Card key={s.label} className="p-5 text-center">
                  <p className="font-condensed font-extrabold text-3xl text-garage-gold">{s.value}</p>
                  <p className="text-xs text-garage-muted mt-1 font-condensed tracking-widest uppercase">{s.label}</p>
                </Card>
              ))}
            </div>

            <div>
              <SectionLabel>Skill Endorsements</SectionLabel>
              <div className="space-y-2">
                {MOCK_ENDORSEMENTS.map(e => (
                  <div key={e.id} className="flex items-center justify-between px-5 py-4 rounded border border-garage-border hover:border-garage-gold transition" style={{ backgroundColor: "#1A2535" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-sm shrink-0">{e.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-garage-text">{e.from}</p>
                        <p className="text-xs text-garage-muted">endorsed you for <span className="text-garage-gold font-bold">{e.specialty}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1">
                        {Array.from({ length: Math.min(e.count, 15) }).map((_, i) => (
                          <div key={i} className="w-1.5 h-4 rounded-sm bg-garage-gold" style={{ opacity: 0.4 + (i / 15) * 0.6 }} />
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

            <div>
              <SectionLabel>Shop Recommendations</SectionLabel>
              <div className="space-y-4">
                {MOCK_RECOMMENDATIONS.map(r => (
                  <div key={r.id} className="p-5 rounded border border-garage-border" style={{ backgroundColor: "#1A2535" }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-garage-surface2 border border-garage-border flex items-center justify-center text-garage-gold font-condensed font-extrabold shrink-0">{r.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-sm text-garage-text">{r.author}</span>
                          {r.verified && <VerifiedBadge />}
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
                    {cert.verified
                      ? <VerifiedBadge />
                      : <span className="text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-garage-border text-garage-muted">PENDING</span>
                    }
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full py-2 border border-dashed border-garage-border rounded text-xs font-condensed font-bold tracking-widest text-garage-muted hover:border-garage-gold hover:text-garage-text transition">
                + ADD CERTIFICATION
              </button>
            </div>

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

        {/* ── POSTS ── */}
        {activeTab === "posts" && (
          <div className="pb-16">
            <SectionLabel>Questions Posted</SectionLabel>
            {userPosts.length === 0 ? (
              <Card className="p-8 text-center"><p className="text-garage-muted text-sm">No posts yet.</p></Card>
            ) : (
              <div className="space-y-3">
                {userPosts.map(post => (
                  <Card key={post.id} className="p-5 hover:border-garage-gold transition cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold border border-garage-gold px-2 py-0.5 rounded" style={{ backgroundColor: "#C9A84C18" }}>{post.tag}</span>
                      <span className="text-xs text-garage-muted">{post.time}</span>
                    </div>
                    <p className="text-garage-text text-sm leading-relaxed line-clamp-2">{post.question}</p>
                    <p className="text-garage-muted text-xs mt-2">{post.reply_count ?? post.replies?.length ?? 0} replies</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Buy modal */}
      {buyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6" onClick={() => setBuyModal(null)}>
          <div className="w-full max-w-sm p-8 rounded border border-garage-border text-center" style={{ backgroundColor: "#1A2535" }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-center mb-4">{BADGE_ICONS[buyModal.id]?.(false, 220)}</div>
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
