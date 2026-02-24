import React from "react";

const posts = [
  {
    user: "DieselTech_Ray",
    time: "2 hours ago",
    question: "2018 F-250 6.7 Power Stroke — injector tick at cold start, goes away after 5 min. Anyone seen this before?",
    replies: 7,
    tag: "Diesel",
  },
  {
    user: "ShopFloor_Mike",
    time: "5 hours ago",
    question: "Best way to bleed ABS module without a scan tool on a 2015 Silverado? Manual bleeding isn't clearing the pedal.",
    replies: 4,
    tag: "Brakes",
  },
  {
    user: "LiftBay_Sara",
    time: "Yesterday",
    question: "Anyone have a trick for pulling a rounded-off oil drain plug without destroying the pan? Already tried extractor sockets.",
    replies: 12,
    tag: "Tips & Tricks",
  },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-garage-bg">

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden py-20 text-center border-b border-garage-border">
        <div className="absolute inset-0 hero-grid pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="font-condensed font-extrabold text-garage-text leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            The <span className="text-garage-gold">Community.</span>
          </h1>
          <p className="mt-4 text-garage-muted text-lg leading-relaxed max-w-xl mx-auto">
            Real questions from real mechanics. Jump in, share what you know.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <div className="max-w-3xl mx-auto px-6 py-14">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold">
              Recent Posts
            </span>
            <div className="h-px w-24 bg-garage-border" />
          </div>
          <button className="px-4 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition">
            + NEW POST
          </button>
        </div>

        {/* Post Cards */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <div
              key={i}
              className="p-6 bg-garage-surface border-l-4 border-garage-gold border border-garage-border rounded hover:bg-garage-surface2 transition-colors cursor-pointer"
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
              <p className="text-garage-text leading-relaxed text-sm mb-3">
                {post.question}
              </p>

              {/* Replies */}
              <p className="text-xs text-garage-muted">
                💬 {post.replies} replies
              </p>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2 border border-garage-border text-garage-muted rounded hover:border-garage-muted hover:text-garage-text transition text-sm">
            Load More Posts
          </button>
        </div>

      </div>
    </div>
  );
}