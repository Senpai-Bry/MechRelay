import { useEffect, useState } from "react";

// Mock data lookup — in production this would be a fetch to /api/users/:username
const MOCK_USER_DATA = {
  TorqueWrench_T: {
    specialties: ["Engine", "Diagnostics"],
    yearsExp: "11–20 years",
    location: "Dallas, TX",
    endorsements: 31,
    helpfulVotes: 18,
    postCount: 12,
    badges: [
      { id: "wrench-master", name: "Wrench Master", tier: "gold" },
      { id: "old-school",    name: "Old School",    tier: "silver" },
    ],
  },
  ShopFloor_Sal: {
    specialties: ["Brakes", "Suspension"],
    yearsExp: "6–10 years",
    location: "Phoenix, AZ",
    endorsements: 19,
    helpfulVotes: 11,
    postCount: 8,
    badges: [
      { id: "first-post", name: "First Post", tier: "bronze" },
    ],
  },
  GarageKing_88: {
    specialties: ["Electrical", "Hybrid / EV"],
    yearsExp: "6–10 years",
    location: "Austin, TX",
    endorsements: 14,
    helpfulVotes: 9,
    postCount: 6,
    badges: [
      { id: "diagnostic-pro", name: "Diagnostic Pro", tier: "gold" },
    ],
  },
  MechDave_99: {
    specialties: ["Transmission", "Engine"],
    yearsExp: "3–5 years",
    location: "Denver, CO",
    endorsements: 7,
    helpfulVotes: 5,
    postCount: 4,
    badges: [],
  },
};

const TIER_COLORS = {
  platinum: "#C0C0E0",
  gold:     "#C9A84C",
  silver:   "#8A95A3",
  bronze:   "#CD7F32",
};

function MiniAvatar({ username, size = 56 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center border-2 border-garage-gold font-condensed font-extrabold text-garage-bg shrink-0 select-none"
      style={{ width: size, height: size, backgroundColor: "#C9A84C", fontSize: size * 0.38 }}
    >
      {username?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

export default function UserPanel({ username, onClose, onViewFullProfile, savedTechs, onToggleSave }) {
  const [visible, setVisible] = useState(false);
  const data = MOCK_USER_DATA[username] ?? {
    specialties: [],
    yearsExp: "Unknown",
    location: null,
    endorsements: 0,
    helpfulVotes: 0,
    postCount: 0,
    badges: [],
  };

  const isSaved = savedTechs?.includes(username);

  // Animate in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.28s ease" }}
        onClick={handleClose}
      />

      {/* Slide-in panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col border-l border-garage-border"
        style={{
          width: "clamp(300px, 90vw, 360px)",
          backgroundColor: "#1A2535",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-garage-border" style={{ backgroundColor: "#0F1923" }}>
          <span className="text-xs font-condensed font-bold tracking-widest uppercase text-garage-muted">Mechanic Profile</span>
          <button onClick={handleClose} className="w-7 h-7 flex items-center justify-center rounded hover:bg-garage-surface transition text-garage-muted hover:text-garage-text">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">

          {/* Identity */}
          <div className="flex items-center gap-4">
            <MiniAvatar username={username} size={56} />
            <div className="flex-1 min-w-0">
              <p className="font-condensed font-extrabold text-xl text-garage-text leading-tight">@{username}</p>
              {data.location && (
                <p className="flex items-center gap-1 text-xs text-garage-muted mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11S9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1ZM6 6C5.17 6 4.5 5.33 4.5 4.5S5.17 3 6 3 7.5 3.67 7.5 4.5 6.83 6 6 6Z" fill="currentColor"/></svg>
                  {data.location}
                </p>
              )}
              <p className="text-xs text-garage-muted mt-0.5">{data.yearsExp} experience</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Endorsed",  value: data.endorsements },
              { label: "Helpful",   value: data.helpfulVotes },
              { label: "Posts",     value: data.postCount    },
            ].map(s => (
              <div key={s.label} className="text-center py-3 rounded border border-garage-border" style={{ backgroundColor: "#0F1923" }}>
                <p className="font-condensed font-extrabold text-xl text-garage-gold">{s.value}</p>
                <p className="text-[10px] font-condensed tracking-widest uppercase text-garage-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Specialties */}
          {data.specialties.length > 0 && (
            <div>
              <p className="text-[10px] font-condensed font-bold tracking-widest uppercase text-garage-gold mb-2">Specialties</p>
              <div className="flex flex-wrap gap-1.5">
                {data.specialties.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded text-xs font-condensed font-bold tracking-widest uppercase border border-garage-gold text-garage-gold" style={{ backgroundColor: "#C9A84C15" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          {data.badges.length > 0 && (
            <div>
              <p className="text-[10px] font-condensed font-bold tracking-widest uppercase text-garage-gold mb-2">Badges</p>
              <div className="flex flex-wrap gap-2">
                {data.badges.map(b => (
                  <div key={b.id} className="flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-condensed font-bold" style={{ borderColor: TIER_COLORS[b.tier], backgroundColor: TIER_COLORS[b.tier] + "18", color: TIER_COLORS[b.tier] }}>
                    <span className="uppercase tracking-widest">{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Endorsement bar */}
          {data.endorsements > 0 && (
            <div>
              <p className="text-[10px] font-condensed font-bold tracking-widest uppercase text-garage-gold mb-2">Community Standing</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-garage-border overflow-hidden">
                  <div className="h-full rounded-full bg-garage-gold transition-all" style={{ width: `${Math.min(data.endorsements * 2.5, 100)}%` }} />
                </div>
                <span className="text-xs font-condensed font-bold text-garage-gold shrink-0">{data.endorsements} endorsements</span>
              </div>
            </div>
          )}

        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 border-t border-garage-border space-y-2" style={{ backgroundColor: "#0F1923" }}>
          {/* Save tech toggle */}
          <button
            onClick={() => onToggleSave?.(username)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded border text-sm font-condensed font-bold tracking-widest transition ${
              isSaved
                ? "bg-garage-gold text-garage-bg border-garage-gold"
                : "border-garage-border text-garage-muted hover:border-garage-gold hover:text-garage-text"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.8 5.2H13.5L9.5 7.9L11 12.5L7 9.8L3 12.5L4.5 7.9L0.5 5.2H5.2Z"
                fill={isSaved ? "#0F1923" : "none"}
                stroke={isSaved ? "#0F1923" : "currentColor"}
                strokeWidth="1.2" strokeLinejoin="round"
              />
            </svg>
            {isSaved ? "SAVED TECH" : "SAVE THIS TECH"}
          </button>

          {/* View full profile */}
          <button
            onClick={() => { onViewFullProfile?.(username); handleClose(); }}
            className="w-full py-2.5 bg-garage-gold text-garage-bg rounded text-sm font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition"
          >
            VIEW FULL PROFILE →
          </button>
        </div>
      </div>
    </>
  );
}