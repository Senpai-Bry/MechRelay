import React from "react";

export default function WhyMechRelay() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Why MechRelay Exists
      </h1>

      {/* Intro Section */}
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        MechRelay was built from 13 years of real mechanic experience. 
        It wasn’t created in a boardroom or dreamed up by someone who’s never 
        held a wrench. It was born in the shop — in the noise, the heat, the 
        pressure, and the everyday chaos of trying to keep work moving while 
        staying organized.
      </p>

      {/* Highlight Box */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded-md mb-10">
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          <span className="font-bold">Built by a mechanic, for mechanics.</span>  
          MechRelay brings clarity, structure, and real-world workflow to the 
          shop floor — designed from hands-on experience, not assumptions.
        </p>
      </div>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        The Problem
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        Most shops rely on scattered notes, memory, whiteboards, and generic 
        business software that doesn’t understand how technicians actually work. 
        Jobs slip through the cracks. Parts go missing. Customers ask for updates 
        you can’t instantly pull. New techs struggle to learn the process. 
        Nothing feels intuitive — because nothing was built for the mechanic’s 
        workflow.
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        The Mission
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        MechRelay exists to bring structure and clarity to the shop. It transforms 
        everyday chaos into a clean, intuitive system that helps techs learn, 
        collaborate, and solve problems faster. It’s not just software — it’s a 
        workflow built from real experience, designed to make the job easier, 
        smoother, and more efficient.
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        The Personal Why
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        After more than a decade in the industry, I wanted to take everything I 
        learned — the discipline, the systems thinking, the problem-solving — and 
        turn it into something that helps the next generation of techs. 
        MechRelay is the tool I wish I had when I started. A tool that respects 
        the craft, the workflow, and the people who keep the world moving.
      </p>

      {/* Closing */}
      <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          This is more than an app.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          It’s a bridge between where I’ve been and where I’m going — and a tool 
          built to make life easier for the people who do real work every day.
        </p>
      </div>
    </div>
  );
}