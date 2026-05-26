import React, { useState, useEffect, useCallback } from "react";

// ── AI Answer Panel ──────────────────────────────────────────────────────────
function AIAnswerPanel({ question }) {
  const [state, setState] = useState("idle");
  const [answer, setAnswer] = useState("");

  const fetchAnswer = useCallback(async () => {
    setState("loading");
    setAnswer("");
    try {
      const response = await fetch("http://localhost:5000/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setAnswer(data.answer || "");
      setState("done");
    } catch (err) {
      console.error("AI Assist error:", err);
      setState("error");
    }
  }, [question]);

  useEffect(() => { fetchAnswer(); }, [fetchAnswer]);

  return (
    <div className="mb-8 rounded overflow-hidden border border-garage-border" style={{ backgroundColor: '#1A2535' }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-garage-border" style={{ backgroundColor: '#0F1923' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-condensed font-bold tracking-widest"
            style={{ backgroundColor: '#C9A84C22', border: '1px solid #C9A84C66', color: '#C9A84C' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="#C9A84C" strokeWidth="1.2"/>
              <path d="M3 5h4M5 3v4" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            AI ASSIST
          </div>
          <span className="text-xs text-garage-muted font-medium">Instant diagnostic from MechRelay AI</span>
        </div>
        {(state === "done" || state === "error") && (
          <button onClick={fetchAnswer} className="text-xs text-garage-muted hover:text-garage-gold transition font-condensed tracking-wider">
            ↺ RETRY
          </button>
        )}
      </div>
      <div className="px-5 py-5">
        {state === "loading" && (
          <div className="flex items-center gap-3">
            <LoadingDots />
            <span className="text-xs text-garage-muted">Analyzing the issue...</span>
          </div>
        )}
        {state === "done" && answer && <AIAnswerText text={answer} />}
        {state === "error" && (
          <p className="text-xs text-red-400 font-condensed tracking-wider">
            Couldn't reach AI — check your connection and retry.
          </p>
        )}
      </div>
      <div className="px-5 py-2 border-t border-garage-border">
        <p className="text-xs" style={{ color: '#8A95A355' }}>
          AI advice is a starting point — always verify with your own inspection and judgment.
        </p>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-garage-gold"
          style={{ animation: `aiPulse 1.2s ease-in-out ${i * 0.2}s infinite`, display: 'inline-block' }}
        />
      ))}
      <style>{`
        @keyframes aiPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function AIAnswerText({ text }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const isStep = /^\d+\./.test(line.trim());
        return (
          <p
            key={i}
            className={`text-sm leading-relaxed ${isStep ? "text-garage-text font-medium" : i === 0 ? "text-garage-text font-semibold" : "text-garage-muted"}`}
            style={isStep ? { paddingLeft: '0.5rem', borderLeft: '2px solid #C9A84C55' } : {}}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ── Main Community Component ─────────────────────────────────────────────────
export default function Community({ posts, activePostId, setActivePostId, onNewPost, onAddReply, onViewUser }) {

  const [replyText, setReplyText] = useState('');
  const [replyError, setReplyError] = useState('');

  const activePost = posts.find((p) => p.id === activePostId);

  const handleReply = () => {
    if (!replyText.trim()) { setReplyError('Reply cannot be empty.'); return; }
    if (replyText.length < 5) { setReplyError('Please add a bit more detail.'); return; }
    onAddReply(activePostId, { user: 'You', time: 'Just now', text: replyText.trim() });
    setReplyText('');
    setReplyError('');
  };

  const handleUsernameClick = (e, username) => {
    e.stopPropagation(); // prevent opening the thread
    if (onViewUser) onViewUser(username);
  };

  // ── THREAD VIEW ──
  if (activePost) {
    return (
      <div className="min-h-screen bg-garage-bg">
        <div className="max-w-3xl mx-auto px-6 py-10">

          <button
            onClick={() => setActivePostId(null)}
            className="flex items-center gap-2 text-garage-muted hover:text-garage-text transition text-sm mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Community
          </button>

          {/* Original post */}
          <div className="p-6 bg-garage-surface border-l-4 border-garage-gold border rounded mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-sm shrink-0">
                  {activePost.user[0]}
                </div>
                <div>
                  <button
                    onClick={(e) => handleUsernameClick(e, activePost.user)}
                    className="text-sm font-semibold text-garage-text hover:text-garage-gold transition block text-left"
                  >
                    {activePost.user}
                  </button>
                  <span className="text-xs text-garage-muted">{activePost.time}</span>
                </div>
              </div>
              <span className="text-xs px-2 py-1 border border-garage-border text-garage-muted rounded font-medium uppercase tracking-wider">
                {activePost.tag}
              </span>
            </div>
            <p className="text-garage-text leading-relaxed">{activePost.question}</p>
          </div>

          <AIAnswerPanel question={activePost.question} />

          <div className="mb-2">
            <span className="font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold">
              {activePost.replies.length} {activePost.replies.length === 1 ? 'Reply' : 'Replies'}
            </span>
          </div>

          <div className="space-y-3 mb-8">
            {activePost.replies.length === 0 && (
              <p className="text-garage-muted text-sm py-6 text-center">No replies yet — be the first to help.</p>
            )}
            {activePost.replies.map((reply, i) => (
              <div key={i} className="p-5 bg-garage-surface border border-garage-border rounded">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-garage-surface2 border border-garage-border flex items-center justify-center text-garage-gold font-condensed font-extrabold text-xs shrink-0">
                    {reply.user[0]}
                  </div>
                  <button
                    onClick={(e) => handleUsernameClick(e, reply.user)}
                    className="text-sm font-semibold text-garage-text hover:text-garage-gold transition"
                  >
                    {reply.user}
                  </button>
                  <span className="text-xs text-garage-muted">· {reply.time}</span>
                </div>
                <p className="text-garage-muted text-sm leading-relaxed">{reply.text}</p>
              </div>
            ))}
          </div>

          {/* Reply box */}
          <div className="p-6 bg-garage-surface border border-garage-border rounded">
            <label className="block font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold mb-3">
              Add Your Reply
            </label>
            <textarea
              value={replyText}
              onChange={(e) => { setReplyText(e.target.value); setReplyError(''); }}
              placeholder="Share what you know — even a partial answer helps..."
              className="w-full h-28 px-4 py-3 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition resize-none text-sm bg-garage-bg"
            />
            {replyError && <p className="text-red-400 text-xs mt-1">{replyError}</p>}
            <button
              onClick={handleReply}
              className="mt-3 px-6 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition"
            >
              POST REPLY
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ── FEED VIEW ──
  return (
    <div className="min-h-screen bg-garage-bg">

      <section className="relative overflow-hidden py-20 text-center border-b border-garage-border">
        <div className="absolute inset-0 hero-grid pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1
            className="font-condensed font-extrabold text-garage-text leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            The <span className="text-garage-gold">Community.</span>
          </h1>
          <p className="mt-4 text-garage-muted text-lg leading-relaxed max-w-xl mx-auto">
            Real questions from real mechanics. Jump in, share what you know.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold">
              {posts.length} Posts
            </span>
            <div className="h-px w-24 bg-garage-border" />
          </div>
          <button
            onClick={onNewPost}
            className="px-4 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition"
          >
            + NEW POST
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePostId(post.id)}
              className="p-6 bg-garage-surface border-l-4 border-garage-gold border rounded hover:bg-garage-surface2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-sm shrink-0">
                    {post.user[0]}
                  </div>
                  <button
                    onClick={(e) => handleUsernameClick(e, post.user)}
                    className="text-sm font-semibold text-garage-text hover:text-garage-gold transition"
                  >
                    {post.user}
                  </button>
                  <span className="text-xs text-garage-muted">· {post.time}</span>
                </div>
                <span className="text-xs px-2 py-1 border border-garage-border text-garage-muted rounded font-medium uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              <p className="text-garage-text leading-relaxed text-sm mb-4">{post.question}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-garage-muted">
                    💬 {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                  </span>
                  <span className="text-xs font-condensed tracking-wider" style={{ color: '#C9A84C88' }}>
                    ✦ AI ASSIST
                  </span>
                </div>
                <span className="text-xs text-garage-gold opacity-0 group-hover:opacity-100 transition-opacity font-condensed font-bold tracking-wider">
                  VIEW THREAD →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}