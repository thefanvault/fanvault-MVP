import React from "react";

export function AnimatedAura() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Organic blob shape - main feature with much higher visibility */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh]">
        <div className="relative w-full h-full animate-organic-drift">
          {/* Main blob - much more visible */}
          <div className="absolute inset-0 opacity-80 blur-3xl bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-pink-400/25 rounded-[60%_40%_70%_30%_/_60%_30%_70%_40%]" />
          {/* Secondary blob for layering */}
          <div className="absolute inset-8 opacity-60 blur-2xl bg-gradient-to-tr from-purple-400/35 via-pink-400/25 to-transparent rounded-[40%_60%_50%_70%_/_70%_50%_60%_40%] animate-organic-pulse" />
          {/* Inner glow */}
          <div className="absolute inset-16 opacity-70 blur-xl bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full animate-glow" />
        </div>
      </div>

      {/* Additional floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 opacity-50 blur-2xl bg-pink-400/30 rounded-full animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 opacity-40 blur-xl bg-purple-400/25 rounded-full animate-drift-slower" />
      <div className="absolute top-3/4 left-3/4 w-24 h-24 opacity-35 blur-lg bg-pink-300/20 rounded-full animate-drift-slowest" />

      {/* Subtle gradient overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
    </div>
  );
}
