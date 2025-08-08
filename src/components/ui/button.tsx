import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-blur-md border border-white/30 text-foreground hover:bg-white/30 hover:border-white/40 shadow-lg hover:shadow-xl hover:scale-105",
        destructive:
          "bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-600 hover:bg-red-500/30 hover:border-red-500/40 shadow-lg hover:shadow-xl hover:scale-105",
        outline:
          "border border-white/30 bg-white/15 backdrop-blur-md hover:bg-white/25 hover:border-white/40 shadow-lg hover:shadow-xl hover:scale-105",
        secondary:
          "bg-white/15 backdrop-blur-md border border-white/20 text-secondary-foreground hover:bg-white/25 hover:border-white/30 shadow-lg hover:shadow-xl hover:scale-105",
        ghost: "hover:bg-white/15 hover:backdrop-blur-md hover:border hover:border-white/25 hover:shadow-lg hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105",
        glass: "bg-gradient-to-r from-white/20 to-white/15 backdrop-blur-md border border-white/30 text-foreground hover:from-white/30 hover:to-white/25 hover:border-white/40 shadow-lg hover:shadow-2xl hover:scale-105",
        premium: "bg-gradient-to-r from-primary/40 to-accent/40 backdrop-blur-md border border-primary/50 text-white font-semibold hover:from-primary/50 hover:to-accent/50 hover:border-primary/60 shadow-lg hover:shadow-2xl hover:scale-105"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
