import React, { useState } from "react";

export default function Community({ posts, activePostId, setActivePostId, onNewPost, onAddReply }) {

  const [replyText, setReplyText] = useState('');
  const [replyError, setReplyError] = useState('');

  const activePost = posts.find((p) => p.id === activePostId);

  const handleReply = () => {
    if (!replyText.trim()) { setReplyError('Reply cannot be empty.'); return; }
    if (replyText.length < 5) { setReplyError('Please add a bit more detail.'); return; }
    onAddReply(activePostId, {
      user: 'You',
      time: 'Just now',
      text: replyText.trim(),
    });
    setReplyText('');
    setReplyError('');
  };

  // ── THREAD VIEW ──
  if (activePost) {
    return (
      <div className="min-h-screen bg-garage-bg">
        <div className="max-w-3xl mx-auto px-6 py-10">

          {/* Back button */}
          <button
            onClick={() => setActivePostId(null)}
            className="flex items-center gap-2 text-garage-muted hover:text-garage-text transition text-sm mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Community
          </button>

          {/* Original post */}
          <div className="p-6 bg-garage-surface border-l-4 border-garage-gold border border-garage-border rounded mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-sm shrink-0">
                  {activePost.user[0]}
                </div>
                <div>
                  <span className="text-sm font-semibold text-garage-text block">{activePost.user}</span>
                  <span className="text-xs text-garage-muted">{activePost.time}</span>
                </div>
              </div>
              <span className="text-xs px-2 py-1 border border-garage-border text-garage-muted rounded font-medium uppercase tracking-wider">
                {activePost.tag}
              </span>
            </div>
            <p className="text-garage-text leading-relaxed">{activePost.question}</p>
          </div>

          {/* Replies */}
          <div className="mb-2">
            <span className="font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold">
              {activePost.replies.length} {activePost.replies.length === 1 ? 'Reply' : 'Replies'}
            </span>
          </div>

          <div className="space-y-3 mb-8">
            {activePost.replies.length === 0 && (
              <p className="text-garage-muted text-sm py-6 text-center">
                No replies yet — be the first to help.
              </p>
            )}
            {activePost.replies.map((reply, i) => (
              <div key={i} className="p-5 bg-garage-surface border border-garage-border rounded">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-garage-surface2 border border-garage-border flex items-center justify-center text-garage-gold font-condensed font-extrabold text-xs shrink-0">
                    {reply.user[0]}
                  </div>
                  <span className="text-sm font-semibold text-garage-text">{reply.user}</span>
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

      {/* PAGE HEADER */}
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

      {/* POSTS FEED */}
      <div className="max-w-3xl mx-auto px-6 py-14">

        {/* Section header */}
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

        {/* Post Cards */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePostId(post.id)}
              className="p-6 bg-garage-surface border-l-4 border-garage-gold border border-garage-border rounded hover:bg-garage-surface2 transition-colors cursor-pointer group"
            >
              {/* Meta row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-sm shrink-0">
                    {post.user[0]}
                  </div>
                  <span className="text-sm font-semibold text-garage-text">{post.user}</span>
                  <span className="text-xs text-garage-muted">· {post.time}</span>
                </div>
                <span className="text-xs px-2 py-1 border border-garage-border text-garage-muted rounded font-medium uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              {/* Question */}
              <p className="text-garage-text leading-relaxed text-sm mb-4">
                {post.question}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-garage-muted">
                  💬 {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                </span>
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