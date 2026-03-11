import { useState } from "react";

const SPECIALTIES = [
  "Engine",
  "Transmission",
  "Brakes",
  "Electrical",
  "Diagnostics",
  "Suspension",
  "Hybrid / EV",
  "AC & Heating",
  "Exhaust",
  "Bodywork",
];

// ── Avatar initials ───────────────────────────────────────────────────────────
function Avatar({ username, photo, size = 96 }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={username}
        className="rounded-full object-cover border-4 border-garage-gold"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center border-4 border-garage-gold font-condensed font-extrabold text-garage-bg"
      style={{
        width: size,
        height: size,
        backgroundColor: "#C9A84C",
        fontSize: size * 0.38,
      }}
    >
      {username?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

// ── Specialty badge ───────────────────────────────────────────────────────────
function SpecialtyBadge({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded text-xs font-condensed font-bold tracking-widest uppercase border transition ${
        active
          ? "bg-garage-gold text-garage-bg border-garage-gold"
          : "bg-transparent text-garage-muted border-garage-border hover:border-garage-gold hover:text-garage-text"
      }`}
    >
      {label}
    </button>
  );
}

// ── Main Profile Component ────────────────────────────────────────────────────
export default function Profile({ currentUser, posts = [] }) {
  const isOwnProfile = true; // For now always own profile; extend later for public views

  // Profile state — in a real app this would load from/save to the API
  const [editing, setEditing]           = useState(false);
  const [username, setUsername]         = useState(currentUser?.username ?? "");
  const [location, setLocation]         = useState("");
  const [yearsExp, setYearsExp]         = useState("");
  const [specialties, setSpecialties]   = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [saved, setSaved]               = useState(false);

  // Saved (display) values
  const [displayName, setDisplayName]         = useState(currentUser?.username ?? "");
  const [displayLocation, setDisplayLocation] = useState("");
  const [displayYears, setDisplayYears]       = useState("");
  const [displaySpec, setDisplaySpec]         = useState([]);
  const [displayPhoto, setDisplayPhoto]       = useState(null);

  const userPosts = posts.filter(
    (p) => p.user === (displayName || currentUser?.username)
  );

  const toggleSpecialty = (s) => {
    setSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handleSave = () => {
    setDisplayName(username);
    setDisplayLocation(location);
    setDisplayYears(yearsExp);
    setDisplaySpec([...specialties]);
    setDisplayPhoto(photoPreview);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setUsername(displayName);
    setLocation(displayLocation);
    setYearsExp(displayYears);
    setSpecialties([...displaySpec]);
    setPhotoPreview(displayPhoto);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-garage-bg">

      {/* ── Hero banner ── */}
      <div
        className="relative h-36 border-b border-garage-border overflow-hidden"
        style={{ backgroundColor: "#0F1923" }}
      >
        {/* grid texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#2A3A50 1px, transparent 1px), linear-gradient(90deg, #2A3A50 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-garage-gold opacity-40" />
      </div>

      <div className="max-w-3xl mx-auto px-6">

        {/* ── Avatar row ── */}
        <div className="flex items-end justify-between -mt-12 mb-6">
          <div className="relative">
            <Avatar username={displayName} photo={displayPhoto} size={96} />
            {editing && (
              <label
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-garage-gold flex items-center justify-center cursor-pointer border-2 border-garage-bg"
                title="Change photo"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M9 2L11 4L4.5 10.5H2.5V8.5L9 2Z" stroke="#0F1923" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            )}
          </div>

          {isOwnProfile && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 border border-garage-border rounded text-sm font-condensed font-bold tracking-widest text-garage-muted hover:text-garage-text hover:border-garage-gold transition"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M9 2L11 4L4.5 10.5H2.5V8.5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
              EDIT PROFILE
            </button>
          )}

          {editing && (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-garage-border rounded text-sm font-condensed font-bold tracking-widest text-garage-muted hover:text-garage-text transition"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-garage-gold text-garage-bg rounded text-sm font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition"
              >
                SAVE
              </button>
            </div>
          )}
        </div>

        {/* ── Saved confirmation ── */}
        {saved && (
          <div className="mb-4 px-4 py-2 rounded border border-green-700 bg-green-900/30 text-green-400 text-sm font-condensed font-bold tracking-widest">
            ✓ PROFILE SAVED
          </div>
        )}

        {/* ── Profile info ── */}
        <div
          className="p-6 rounded border border-garage-border mb-6"
          style={{ backgroundColor: "#1A2535" }}
        >
          {editing ? (
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                  style={{ backgroundColor: "#0F1923" }}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">
                  Location <span className="text-garage-muted normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Houston, TX"
                  className="w-full px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                  style={{ backgroundColor: "#0F1923" }}
                />
              </div>

              {/* Years of experience */}
              <div>
                <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-1">
                  Years of Experience
                </label>
                <select
                  value={yearsExp}
                  onChange={(e) => setYearsExp(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-garage-border text-garage-text outline-none focus:border-garage-gold transition text-sm"
                  style={{ backgroundColor: "#0F1923" }}
                >
                  <option value="">Select…</option>
                  {["Under 1 year", "1–2 years", "3–5 years", "6–10 years", "11–20 years", "20+ years"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold mb-2">
                  Primary Specialties
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((s) => (
                    <SpecialtyBadge
                      key={s}
                      label={s}
                      active={specialties.includes(s)}
                      onClick={() => toggleSpecialty(s)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Display name */}
              <h1 className="font-condensed font-extrabold text-3xl text-garage-text tracking-tight">
                @{displayName || currentUser?.username}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                {displayLocation && (
                  <span className="flex items-center gap-1.5 text-sm text-garage-muted">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11C6 11 9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1ZM6 6C5.17 6 4.5 5.33 4.5 4.5C4.5 3.67 5.17 3 6 3C6.83 3 7.5 3.67 7.5 4.5C7.5 5.33 6.83 6 6 6Z" fill="currentColor"/>
                    </svg>
                    {displayLocation}
                  </span>
                )}
                {displayYears && (
                  <span className="flex items-center gap-1.5 text-sm text-garage-muted">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M6 3.5V6.5L8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    {displayYears} experience
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-garage-muted">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1.5" y="2.5" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M4 2.5V4M8 2.5V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    <path d="M1.5 5.5h9" stroke="currentColor" strokeWidth="1.3"/>
                  </svg>
                  {userPosts.length} {userPosts.length === 1 ? "post" : "posts"}
                </span>
              </div>

              {/* Specialties display */}
              {displaySpec.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {displaySpec.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded text-xs font-condensed font-bold tracking-widest uppercase border border-garage-gold text-garage-gold"
                      style={{ backgroundColor: "#C9A84C18" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Empty state nudge */}
              {!displayLocation && !displayYears && displaySpec.length === 0 && (
                <p className="mt-3 text-sm text-garage-muted italic">
                  No profile info yet —{" "}
                  <button
                    onClick={() => setEditing(true)}
                    className="text-garage-gold hover:underline not-italic"
                  >
                    fill it in
                  </button>
                  .
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Posts section ── */}
        <div className="mb-12">
          <h2 className="font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold mb-4">
            Questions Posted
          </h2>

          {userPosts.length === 0 ? (
            <div
              className="p-8 rounded border border-garage-border text-center"
              style={{ backgroundColor: "#1A2535" }}
            >
              <p className="text-garage-muted text-sm">No posts yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded border border-garage-border hover:border-garage-gold transition cursor-pointer"
                  style={{ backgroundColor: "#1A2535" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-condensed font-bold tracking-widest uppercase text-garage-gold border border-garage-gold px-2 py-0.5 rounded" style={{ backgroundColor: "#C9A84C18" }}>
                      {post.tag}
                    </span>
                    <span className="text-xs text-garage-muted">{post.time}</span>
                  </div>
                  <p className="text-garage-text text-sm leading-relaxed line-clamp-2">
                    {post.question}
                  </p>
                  <p className="text-garage-muted text-xs mt-2">
                    {post.reply_count ?? post.replies?.length ?? 0}{" "}
                    {(post.reply_count ?? post.replies?.length ?? 0) === 1 ? "reply" : "replies"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}