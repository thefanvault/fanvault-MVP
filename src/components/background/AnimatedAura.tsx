import React from "react";

export function AnimatedAura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />

      {/* Organic blob shape - main feature */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[100vh]">
        <div className="relative w-full h-full animate-organic-drift">
          {/* Main blob */}
          <div className="absolute inset-0 opacity-40 blur-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 rounded-[60%_40%_70%_30%_/_60%_30%_70%_40%]" />
          {/* Secondary blob for layering */}
          <div className="absolute inset-8 opacity-30 blur-2xl bg-gradient-to-tr from-accent/25 via-primary/15 to-transparent rounded-[40%_60%_50%_70%_/_70%_50%_60%_40%] animate-organic-pulse" />
          {/* Inner glow */}
          <div className="absolute inset-16 opacity-50 blur-xl bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-glow" />
        </div>
      </div>

      {/* Additional floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-30 blur-2xl bg-primary/20 rounded-full animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-25 blur-xl bg-accent/20 rounded-full animate-drift-slower" />
      <div className="absolute top-3/4 left-3/4 w-20 h-20 opacity-20 blur-lg bg-primary/15 rounded-full animate-drift-slowest" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40" />
    </div>
  );
}
