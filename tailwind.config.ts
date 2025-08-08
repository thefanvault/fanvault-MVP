import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				fanvault: {
					pink: 'hsl(var(--fanvault-pink))',
					red: 'hsl(var(--fanvault-red))'
				}
			},
			backgroundImage: {
				'fanvault-gradient': 'var(--fanvault-gradient)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				drift: {
					'0%': { transform: 'translate3d(0,0,0) scale(1)' },
					'50%': { transform: 'translate3d(8%, -6%, 0) scale(1.03)' },
					'100%': { transform: 'translate3d(-6%, 8%, 0) scale(1)' }
				},
				'organic-drift': {
					'0%': { 
						transform: 'translate3d(-10%, 5%, 0) rotate(0deg) scale(1)',
						borderRadius: '60% 40% 70% 30% / 60% 30% 70% 40%'
					},
					'25%': { 
						transform: 'translate3d(5%, -8%, 0) rotate(90deg) scale(1.1)',
						borderRadius: '50% 60% 40% 70% / 70% 40% 60% 50%'
					},
					'50%': { 
						transform: 'translate3d(8%, 3%, 0) rotate(180deg) scale(0.95)',
						borderRadius: '70% 30% 60% 40% / 50% 70% 30% 60%'
					},
					'75%': { 
						transform: 'translate3d(-3%, -5%, 0) rotate(270deg) scale(1.05)',
						borderRadius: '40% 70% 50% 60% / 60% 50% 70% 40%'
					},
					'100%': { 
						transform: 'translate3d(-10%, 5%, 0) rotate(360deg) scale(1)',
						borderRadius: '60% 40% 70% 30% / 60% 30% 70% 40%'
					}
				},
				'organic-pulse': {
					'0%, 100%': { 
						transform: 'rotate(-30deg) scale(1)',
						opacity: '0.4'
					},
					'50%': { 
						transform: 'rotate(30deg) scale(1.2)',
						opacity: '0.6'
					}
				},
				glow: {
					'0%, 100%': { opacity: '0.45' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'drift-slow': 'drift 40s ease-in-out infinite',
				'drift-slower': 'drift 60s ease-in-out infinite',
				'drift-slowest': 'drift 90s ease-in-out infinite',
				'organic-drift': 'organic-drift 120s ease-in-out infinite',
				'organic-pulse': 'organic-pulse 15s ease-in-out infinite',
				glow: 'glow 8s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
