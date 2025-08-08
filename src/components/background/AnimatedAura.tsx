import React from "react";

export function AnimatedAura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/40" />

      {/* Aurora layers */}
      <div className="absolute -top-32 -left-32 h-[60vh] w-[60vh] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-primary/30 via-accent/10 to-transparent animate-drift-slow" />
      <div className="absolute bottom-[-20vh] right-[-10vw] h-[70vh] w-[70vh] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-accent/30 via-primary/10 to-transparent animate-drift-slower" />
      <div className="absolute top-1/4 right-1/4 h-[40vh] w-[40vh] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent animate-drift-slowest" />

      {/* Soft vignette to keep it subdued */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,black)] opacity-[0.25] dark:opacity-[0.4] mix-blend-multiply" />
    </div>
  );
}
