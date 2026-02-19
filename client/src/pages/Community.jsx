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
    <div className="py-16 px-6 md:px-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Community
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
          + New Post
        </button>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        Real questions from real mechanics. Jump in, share what you know.
      </p>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {post.user[0]}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.user}</span>
                <span className="text-xs text-gray-400">{post.time}</span>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                {post.tag}
              </span>
            </div>
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed mb-3">
              {post.question}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.replies} replies
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm">
          Load More Posts
        </button>
      </div>
    </div>
  );
}