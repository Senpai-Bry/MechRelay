import React, { useState } from "react";
import { Camera } from "lucide-react";

const tags = ["Engine", "Brakes", "Diesel", "Electrical", "Transmission", "Suspension", "Tips & Tricks", "Other"];

export default function Post() {
  const [selectedTag, setSelectedTag] = useState('');
  const [postText, setPostText] = useState('');
  const [postError, setPostError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!postText.trim()) { setPostError('Please describe the issue.'); return; }
    if (postText.length < 10) { setPostError('Please provide more detail (10+ characters).'); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-garage-bg flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="w-16 h-16 rounded-full bg-garage-surface border border-garage-gold flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14 L11 20 L23 8" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="font-condensed font-extrabold text-3xl tracking-wide text-garage-text mb-2">
          Post <span className="text-garage-gold">Submitted.</span>
        </h2>
        <p className="text-garage-muted text-sm max-w-xs leading-relaxed">
          Other mechanics will be able to see and reply to your post.
        </p>
        <button
          onClick={() => { setSubmitted(false); setPostText(''); setSelectedTag(''); }}
          className="mt-8 px-6 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition"
        >
          POST ANOTHER
        </button>
      </div>
    );
  }

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
            Post a <span className="text-garage-gold">Question.</span>
          </h1>
          <p className="mt-4 text-garage-muted text-lg leading-relaxed max-w-xl mx-auto">
            Describe what you're working on. The more detail you give, the faster you'll get a solid answer.
          </p>
        </div>
      </section>

      {/* FORM */}
      <div className="max-w-2xl mx-auto px-6 py-14 space-y-6">

        {/* Tag Selector */}
        <div>
          <label className="block font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold mb-3">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded text-xs font-condensed font-bold tracking-wider uppercase border transition ${
                  selectedTag === tag
                    ? 'bg-garage-gold text-garage-bg border-garage-gold'
                    : 'bg-transparent text-garage-muted border-garage-border hover:border-garage-gold hover:text-garage-text'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Question Input */}
        <div>
          <label className="block font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold mb-3">
            Describe the Issue
          </label>
          <textarea
            value={postText}
            onChange={(e) => { setPostText(e.target.value); setPostError(''); }}
            placeholder="e.g. 2019 RAM 1500 — rough idle at cold start, clears up after 10 minutes. Already checked MAF and IAC..."
            className="w-full h-40 px-4 py-3 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition resize-none text-sm bg-garage-surface"
          />
          {postError && (
            <p className="text-red-400 text-xs mt-2 font-condensed tracking-wider">{postError}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block font-condensed font-bold text-xs tracking-widest uppercase text-garage-gold mb-3">
            Attach a Photo <span className="text-garage-muted normal-case font-normal tracking-normal">(optional)</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-4 rounded border border-dashed border-garage-border bg-garage-surface cursor-pointer hover:border-garage-gold transition group">
            <Camera className="w-5 h-5 text-garage-muted group-hover:text-garage-gold transition" />
            <span className="text-sm text-garage-muted group-hover:text-garage-text transition">Click to upload a photo</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-garage-gold text-garage-bg font-condensed font-bold text-base tracking-widest rounded hover:bg-garage-gold-hover transition"
        >
          SUBMIT POST
        </button>

      </div>
    </div>
  );
}
