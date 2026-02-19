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
      <div className="py-20 flex flex-col items-center justify-center text-center px-6">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Post Submitted!</h2>
        <p className="text-gray-600 dark:text-gray-300">Other mechanics will be able to see and reply to your post.</p>
        <button
          onClick={() => { setSubmitted(false); setPostText(''); setSelectedTag(''); }}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Post Another
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 md:px-10 max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Post a Question
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Describe what you're working on. The more detail you give, the faster you'll get a solid answer.
      </p>

      {/* Tag Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Question Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Describe the Issue</label>
        <textarea
          value={postText}
          onChange={(e) => { setPostText(e.target.value); setPostError(''); }}
          placeholder="e.g. 2019 RAM 1500 — rough idle at cold start, clears up after 10 minutes. Already checked MAF and IAC..."
          className="w-full h-40 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition resize-none"
        />
        {postError && <p className="text-red-500 text-sm mt-1">{postError}</p>}
      </div>

      {/* Photo Upload */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Attach a Photo (optional)</label>
        <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 cursor-pointer hover:border-blue-400 transition">
          <Camera className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload a photo</span>
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
      >
        Submit Post
      </button>
    </div>
  );
}