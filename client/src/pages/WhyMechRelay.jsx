import React from "react";

export default function WhyMechRelay() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">

      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Why MechRelay Exists
      </h1>

      {/* Highlight Box */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded-md mb-10">
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          <span className="font-bold">Built by a mechanic, for mechanics.</span>{' '}
          Not in a boardroom. On the shop floor — where the real problems are.
        </p>
      </div>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Where It Started
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        My dad handed me a flashlight when I was 9 years old and said "hold this." 
        I didn't know it then, but that moment started everything. I spent 13 years 
        on the shop floor learning the trade the real way — through grease, mistakes, 
        long days, and the guy next to me who'd seen it all before.
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        The Problem
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        Good mechanics were wasting hours hunting for answers that someone three bays 
        over already had. Not every shop has that experienced guy to turn to. Not every 
        tech has someone in their corner. And when you're stuck, the clock is running, 
        and the customer is waiting — a dead forum post from 2011 that almost describes 
        your problem just doesn't cut it.
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        The Personal Why
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        The knowledge passed between mechanics, bay to bay, is worth more than any 
        manual ever written. I wanted something that felt like turning to the guy next 
        to you and saying "hey, you ever seen this before?" — and actually getting an 
        answer. That knowledge shouldn't stay in one shop. It should travel. Mechanic 
        to mechanic, coast to coast — just like my dad passing it to me.
      </p>

      {/* Closing */}
      <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          That's MechRelay.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Because no mechanic should have to figure it out alone.
        </p>
      </div>

    </div>
  );
}