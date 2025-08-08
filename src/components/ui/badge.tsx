import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-white/20 backdrop-blur-md border border-white/30 text-primary hover:bg-white/30 hover:border-white/40 shadow-lg",
        secondary:
          "bg-white/15 backdrop-blur-md border border-white/20 text-secondary-foreground hover:bg-white/25 hover:border-white/30 shadow-lg",
        destructive:
          "bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-600 hover:bg-red-500/30 hover:border-red-500/40 shadow-lg",
        outline: "border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/40 shadow-lg",
        accent: "bg-primary/20 backdrop-blur-md border border-primary/30 text-primary hover:bg-primary/30 hover:border-primary/40 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
