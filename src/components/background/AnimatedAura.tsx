import React from "react";

export function AnimatedAura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/40" />

      {/* Organic blob shape - main feature */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[80vh] w-[80vh] animate-organic-drift">
          <div 
            className="absolute inset-0 opacity-60 blur-3xl"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 50% 50%, 
                hsl(var(--primary) / 0.15) 0%, 
                hsl(var(--accent) / 0.1) 30%, 
                hsl(var(--primary) / 0.05) 60%, 
                transparent 100%)`,
              borderRadius: '60% 40% 70% 30% / 60% 30% 70% 40%',
              transform: 'rotate(45deg)'
            }}
          />
          <div 
            className="absolute inset-4 opacity-40 blur-2xl animate-organic-pulse"
            style={{
              background: `radial-gradient(ellipse 50% 60% at 50% 50%, 
                hsl(var(--accent) / 0.2) 0%, 
                hsl(var(--primary) / 0.1) 40%, 
                transparent 80%)`,
              borderRadius: '40% 60% 50% 70% / 70% 50% 60% 40%',
              transform: 'rotate(-30deg)'
            }}
          />
        </div>
      </div>

      {/* Subtle aurora layers for depth */}
      <div className="absolute -top-32 -left-32 h-[40vh] w-[40vh] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent animate-drift-slow" />
      <div className="absolute bottom-[-20vh] right-[-10vw] h-[50vh] w-[50vh] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent animate-drift-slower" />

      {/* Soft vignette to keep it subdued */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,black)] opacity-[0.2] dark:opacity-[0.3] mix-blend-multiply" />
    </div>
  );
}
