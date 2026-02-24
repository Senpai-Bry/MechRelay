import React from "react";

export default function WhyMechRelay() {
  return (
    <div className="min-h-screen bg-garage-bg">

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden py-20 text-center border-b border-garage-border">
        <div className="absolute inset-0 hero-grid pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="font-condensed font-extrabold text-garage-text leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Why <span className="text-garage-gold">MechRelay.</span>
          </h1>
          <p className="mt-4 text-garage-muted text-lg leading-relaxed max-w-xl mx-auto">
            A platform built from real shop‑floor experience — not theory, not corporate guesswork.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">

        {/* MISSION BLOCK */}
        <section className="p-6 bg-garage-surface border-l-4 border-garage-gold border border-garage-border rounded">
          <p className="font-condensed font-bold text-2xl text-garage-text mb-2">
            Built by a mechanic, for mechanics.
          </p>
          <p className="text-garage-muted leading-relaxed text-sm">
            Not in a boardroom. Not in a meeting.
            On the shop floor — where the real problems live.
          </p>
        </section>

        {/* ORIGIN STORY */}
        <section>
          <h2 className="font-condensed font-extrabold text-3xl text-garage-text mb-6 tracking-tight">
            Where It <span className="text-garage-gold">Started.</span>
          </h2>
          <div className="border-l-4 border-garage-gold pl-6">
            <p className="text-garage-muted leading-relaxed text-sm">
              My dad handed me a flashlight when I was 9 and said, "hold this."
              I didn't know it then, but that moment started everything.
              I spent 13 years learning the trade the real way — through grease, mistakes,
              long days, and the guy next to me who'd seen it all before.
            </p>
          </div>
        </section>

        {/* PROBLEM GRID */}
        <section>
          <h2 className="font-condensed font-extrabold text-3xl text-garage-text mb-8 tracking-tight">
            The Problem Mechanics <span className="text-garage-gold">Face.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Scattered Knowledge",
                body: "Answers live in a hundred places — forums, old notes, random videos, or the memory of one tech who might not be there tomorrow.",
              },
              {
                title: "No Mentorship Pipeline",
                body: "Not every shop has that experienced tech to turn to. New mechanics are often left to figure it out alone.",
              },
              {
                title: "Outdated Forums",
                body: "Dead threads from 2011 don't help when the customer is waiting and the clock is running.",
              },
              {
                title: "Lost Experience",
                body: "The knowledge passed bay‑to‑bay is priceless — but it disappears when it stays inside one shop.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-garage-surface border-l-4 border-garage-gold border border-garage-border rounded hover:bg-garage-surface2 transition-colors"
              >
                <h3 className="font-condensed font-bold text-lg text-garage-text mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-garage-muted leading-relaxed text-sm">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PERSONAL WHY */}
        <section>
          <h2 className="font-condensed font-extrabold text-3xl text-garage-text mb-6 tracking-tight">
            The Personal <span className="text-garage-gold">Why.</span>
          </h2>
          <p className="text-garage-muted leading-relaxed text-sm mb-4">
            The knowledge shared between mechanics is worth more than any manual ever written.
            I wanted something that felt like turning to the guy next to you and saying,
            "hey, you ever seen this before?" — and actually getting an answer.
          </p>
          <p className="text-garage-muted leading-relaxed text-sm">
            That knowledge shouldn't stay in one shop.
            It should travel — mechanic to mechanic, coast to coast —
            just like my dad passing it to me.
          </p>
        </section>

        {/* CLOSING CTA */}
        <section className="text-center p-10 bg-garage-surface border border-garage-border rounded">
          <h3 className="font-condensed font-extrabold text-3xl text-garage-text mb-3 tracking-tight">
            That's <span className="text-garage-gold">MechRelay.</span>
          </h3>
          <p className="text-garage-muted text-sm mb-8">
            Because no mechanic should have to figure it out alone.
          </p>
          <button className="px-8 py-3 bg-garage-gold text-garage-bg font-condensed font-bold tracking-widest text-sm rounded hover:bg-garage-gold-hover transition">
            EXPLORE THE PLATFORM
          </button>
        </section>

      </div>
    </div>
  );
}