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
    <div className="min-h-screen bg-garage-bg">

      {/* PAGE HEADER — matches hero style */}
      <section className="relative overflow-hidden py-20 text-center border-b border-garage-border">
        <div className="absolute inset-0 hero-grid pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="font-condensed font-extrabold text-garage-text leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            How It <span className="text-garage-gold">Works.</span>
          </h1>
          <p className="mt-4 text-garage-muted text-lg leading-relaxed max-w-xl mx-auto">
            MechRelay is built around one idea — mechanics helping mechanics.
            Here's how it comes together.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-6 p-6 bg-garage-surface border-l-4 border-garage-gold border border-garage-border rounded hover:bg-garage-surface2 transition-colors"
          >
            <div className="font-condensed font-extrabold text-4xl text-garage-gold w-14 shrink-0 leading-none pt-1">
              {step.number}
            </div>
            <div>
              <h2 className="font-condensed font-bold text-xl tracking-wide text-garage-text mb-2">
                {step.title}
              </h2>
              <p className="text-garage-muted leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          </div>
        ))}

        {/* CALLOUT BLOCK */}
        <div className="p-6 bg-garage-surface border-l-4 border-garage-gold border border-garage-border rounded mt-6">
          <p className="text-garage-text leading-relaxed text-sm">
            Most mechanics learn from experience, not textbooks. MechRelay turns
            that experience into something they can share instantly — saving time,
            reducing frustration, and helping mechanics do better work for their customers.
          </p>
        </div>
      </div>

    </div>
  );
}