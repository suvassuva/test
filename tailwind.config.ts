import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          deep: "#2A0202",
          velvet: "#4A0404",
          burgundy: "#6B0F1A",
          darkest: "#1A0101",
        },
        gold: {
          metallic: "#D4AF37",
          champagne: "#F5D061",
          bright: "#FFDF73",
          light: "#FDF4DC",
          antique: "#AA8C2C",
          dark: "#8C6D1F",
        },
        luxury: {
          ivory: "#FAF6F0",
          muted: "#D6C7B2",
          black: "#120505",
          charcoal: "#1C1414",
          surface: "rgba(42, 2, 2, 0.65)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Cormorant Garamond", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5D061 0%, #D4AF37 50%, #AA8C2C 100%)",
        "gold-shimmer": "linear-gradient(90deg, #D4AF37 0%, #FAF6F0 50%, #D4AF37 100%)",
        "maroon-gradient": "linear-gradient(180deg, #2A0202 0%, #120505 100%)",
        "radial-luxury": "radial-gradient(circle at 50% 30%, #4A0404 0%, #2A0202 60%, #120505 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.25)",
        "gold-glow-lg": "0 0 50px rgba(245, 208, 97, 0.35)",
        "maroon-depth": "0 20px 40px -15px rgba(18, 5, 5, 0.8)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

