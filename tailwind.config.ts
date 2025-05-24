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
				// Weather-specific colors
				weather: {
					'blue-light': '#79C0FF',
					'blue': '#0EA5E9',
					'blue-dark': '#0C4A6E',
					'cloud': '#E5E7EB',
					'sun': '#FBBF24',
					'rain': '#60A5FA',
					'snow': '#E5E7EB',
					'thunder': '#7C3AED',
					'mist': '#9CA3AF',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float': 'float 3s infinite ease-in-out'
			},
			backgroundImage: {
				'sunny-gradient': 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 25%, #FDB462 75%, #F4A460 100%)',
				'clear-night-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 25%, #334155 75%, #475569 100%)',
				'cloudy-gradient': 'linear-gradient(135deg, #CBD5E1 0%, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%, #CBD5E1 100%)',
				'rainy-gradient': 'linear-gradient(135deg, #374151 0%, #4B5563 25%, #6B7280 50%, #4B5563 75%, #374151 100%)',
				'snow-gradient': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 25%, #CBD5E1 50%, #E2E8F0 75%, #F8FAFC 100%)',
				'thunder-gradient': 'linear-gradient(135deg, #1F2937 0%, #374151 25%, #4B5563 50%, #374151 75%, #1F2937 100%)',
				'mist-gradient': 'linear-gradient(135deg, #F3F4F6 0%, #D1D5DB 25%, #E5E7EB 50%, #D1D5DB 75%, #F3F4F6 100%)',
				'night-gradient': 'linear-gradient(to bottom, #0F172A, #020617)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
