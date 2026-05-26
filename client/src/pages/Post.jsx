import React, { useState } from "react";
import { Camera } from "lucide-react";

const tags = ["Engine", "Brakes", "Diesel", "Electrical", "Transmission", "Suspension", "Tips & Tricks", "Other"];

export default function Post({ onSubmit, currentUser }) {
  const [selectedTag, setSelectedTag] = useState('');
  const [postText, setPostText]       = useState('');
  const [postError, setPostError]     = useState('');
  const [submitted, setSubmitted]     = useState(false);
  const [photoFile, setPhotoFile]     = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!postText.trim()) { setPostError('Please describe the issue.'); return; }
    if (postText.length < 10) { setPostError('Please provide more detail (10+ characters).'); return; }

    let photoUrl = null;

    // Upload photo first if one was selected
    if (photoFile) {
      const formData = new FormData();
      formData.append('photo', photoFile);
      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        photoUrl = data.url;
      } catch (err) {
        setPostError('Photo upload failed. Try again.');
        return;
      }
    }

    // Submit the post with the photo URL
    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: currentUser?.username || 'Anonymous',
          question: postText.trim(),
          tag: selectedTag || 'Other',
          photo: photoUrl,
        }),
      });
      const newPost = await res.json();

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setPostText('');
        setSelectedTag('');
        setPhotoFile(null);
        setPhotoPreview(null);
        if (onSubmit) onSubmit(newPost);
      }, 1800);
    } catch (err) {
      setPostError('Failed to submit post. Try again.');
    }
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
          Taking you to the community feed...
        </p>
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
            <span className="text-sm text-garage-muted group-hover:text-garage-text transition">
              {photoFile ? photoFile.name : 'Click to upload a photo'}
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
          {photoPreview && (
            <img src={photoPreview} alt="Preview" className="mt-3 rounded border border-garage-border max-h-48 object-cover" />
          )}
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