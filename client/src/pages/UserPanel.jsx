import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

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
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  const isSaved = savedTechs?.includes(username);

  // Animate in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Load real profile data for this user
  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetch(`${API}/users/${username}`)
      .then(res => res.ok ? res.json() : { username, postCount: 0, badges: [], memberSince: null })
      .then(json => setData(json))
      .catch(() => setData({ username, postCount: 0, badges: [], memberSince: null }))
      .finally(() => setLoading(false));
  }, [username]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  const memberSinceLabel = data?.memberSince
    ? new Date(data.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

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
              {memberSinceLabel && (
                <p className="text-xs text-garage-muted mt-0.5">Member since {memberSinceLabel}</p>
              )}
            </div>
          </div>

          {loading ? (
            <p className="text-xs text-garage-muted">Loading profile…</p>
          ) : (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Posts",  value: data?.postCount ?? 0 },
                  { label: "Badges", value: data?.badges?.length ?? 0 },
                ].map(s => (
                  <div key={s.label} className="text-center py-3 rounded border border-garage-border" style={{ backgroundColor: "#0F1923" }}>
                    <p className="font-condensed font-extrabold text-xl text-garage-gold">{s.value}</p>
                    <p className="text-[10px] font-condensed tracking-widest uppercase text-garage-muted mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Badges */}
              {data?.badges?.length > 0 && (
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
            </>
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