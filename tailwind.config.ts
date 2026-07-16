import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				display: ["var(--font-display)", "Georgia", "serif"],
				sans: ["var(--font-inter)", "system-ui", "sans-serif"],
				mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
			},
			colors: {
				// Design System: Warm Neutral palette + single accent green
				warm: {
					50:  "#faf8f5",
					100: "#f4f0e8",
					200: "#e8e0d0",
					300: "#d4c8b0",
					400: "#b8a88a",
					500: "#9a8870",
					600: "#7c6a54",
					700: "#5e4e3c",
					800: "#3e3228",
					900: "#1e1810",
					950: "#0e0c08",
				},
				// Single accent: editorial green
				accent: {
					DEFAULT: "oklch(52% 0.11 155)",
					light:   "oklch(72% 0.10 155)",
					dark:    "oklch(38% 0.10 155)",
					muted:   "oklch(92% 0.04 155)",
					"muted-dark": "oklch(22% 0.06 155)",
				},
				// Semantic aliases → CSS vars
				background:   "hsl(var(--background))",
				foreground:   "hsl(var(--foreground))",
				card: {
					DEFAULT:    "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT:    "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT:    "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT:    "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT:    "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				destructive: {
					DEFAULT:    "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input:  "hsl(var(--input))",
				ring:   "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg:  "var(--radius)",
				md:  "calc(var(--radius) - 2px)",
				sm:  "calc(var(--radius) - 4px)",
			},
			spacing: {
				"18":  "4.5rem",
				"22":  "5.5rem",
				"30":  "7.5rem",
				"section": "7rem",
			},
			maxWidth: {
				"prose-wide": "75ch",
				"editorial":  "1120px",
			},
			fontSize: {
				// Fluid editorial scale
				"display-xl": ["clamp(3rem, 8vw, 7rem)",     { lineHeight: "0.88", letterSpacing: "-0.03em" }],
				"display-lg": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
				"display-md": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1",    letterSpacing: "-0.02em" }],
				"display-sm": ["clamp(1.375rem, 2.5vw, 2rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
				"label":      ["0.6875rem",                  { lineHeight: "1", letterSpacing: "0.12em" }],
				"label-lg":   ["0.75rem",                    { lineHeight: "1", letterSpacing: "0.1em" }],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to:   { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to:   { height: "0" },
				},
				"fade-up": {
					from: { opacity: "0", transform: "translateY(1.5rem)" },
					to:   { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in": {
					from: { opacity: "0" },
					to:   { opacity: "1" },
				},
				"stagger-in": {
					from: { opacity: "0", transform: "translateY(0.75rem)" },
					to:   { opacity: "1", transform: "translateY(0)" },
				},
				"line-grow": {
					from: { transform: "scaleX(0)", transformOrigin: "left" },
					to:   { transform: "scaleX(1)", transformOrigin: "left" },
				},
				"score-reveal": {
					from: { transform: "scale(0.6)", opacity: "0" },
					to:   { transform: "scale(1)",   opacity: "1" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up":   "accordion-up 0.2s ease-out",
				"fade-up":    "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"fade-in":    "fade-in 0.5s ease forwards",
				"stagger-in": "stagger-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"line-grow":  "line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"score-reveal": "score-reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
			},
			transitionTimingFunction: {
				"editorial": "cubic-bezier(0.16, 1, 0.3, 1)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
