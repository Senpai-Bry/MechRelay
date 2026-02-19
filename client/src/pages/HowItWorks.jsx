import React from "react";

const steps = [
  {
    number: "01",
    title: "Ask for Help Fast",
    description:
      "Post a question, a photo, or a short video about a repair you're working on. No long forms, no waiting — just describe the problem and post it.",
  },
  {
    number: "02",
    title: "Get Answers from Real Mechanics",
    description:
      "Other techs jump in with tips, steps, or things to check. Real-world advice from people who've actually done the job — not forum guesswork.",
  },
  {
    number: "03",
    title: "Share Your Knowledge",
    description:
      "Upload solutions, tricks, or walkthroughs so others can learn from your experience. Every post you make helps the next mechanic down the line.",
  },
  {
    number: "04",
    title: "Cut Down on Guesswork",
    description:
      "Instead of trial-and-error, get guidance from mechanics who've already solved the same issue. Save time, save parts, do better work.",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-16 px-6 md:px-10 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        How It Works
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
        MechRelay is built around one idea — mechanics helping mechanics.
        Here's how it comes together.
      </p>

      <div className="space-y-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 w-12 shrink-0">
              {step.number}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-md">
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          Most mechanics learn from experience, not textbooks. MechRelay turns
          that experience into something they can share instantly — saving time,
          reducing frustration, and helping mechanics do better work for their customers.
        </p>
      </div>
    </div>
  );
}