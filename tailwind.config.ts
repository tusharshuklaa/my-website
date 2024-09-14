/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");
require("tailwindcss/defaultTheme");
require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const backfaceVisibility = plugin(function ({
  addUtilities,
}: {
  addUtilities: (utils: Record<string, unknown>) => void;
}) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
      "-moz-backface-visibility": "visible",
      "-webkit-backface-visibility": "visible",
      "-ms-backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
      "-moz-backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden",
      "-ms-backface-visibility": "hidden",
    },
  });
});

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "noise-anim-1": "noise-anim-1 2s infinite linear alternate-reverse",
        "noise-anim-2": "noise-anim-2 3s infinite linear alternate-reverse",
        "conic-text": "conic-expand 0.5s ease forwards",
        "conic-text-rev": "conic-expand-rev 0.5s ease forwards",
      },
      backgroundImage: {
        'collage-gradient': 'conic-gradient(#D9D7F1 12%, #BAABDA 12%, #BAABDA 33%, #E7FBBE 33%, #E7FBBE 55%, #FFCBCB 55%, #FFCBCB 70%, #B5DEFF 70%, #B5DEFF 87%, #F7D1BA 87%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundSize: {
        '50%': '50%',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "noise-anim-1": {
          "0%": { clip: "rect(52px, 9999px, 97px, 0)" },
          "5%": { clip: "rect(62px, 9999px, 70px, 0)" },
          "10%": { clip: "rect(96px, 9999px, 63px, 0)" },
          "15%": { clip: "rect(22px, 9999px, 32px, 0)" },
          "20%": { clip: "rect(5px, 9999px, 17px, 0)" },
          "25%": { clip: "rect(18px, 9999px, 62px, 0)" },
          "30%": { clip: "rect(25px, 9999px, 98px, 0)" },
          "35%": { clip: "rect(80px, 9999px, 72px, 0)" },
          "40%": { clip: "rect(74px, 9999px, 59px, 0)" },
          "45%": { clip: "rect(3px, 9999px, 23px, 0)" },
          "50%": { clip: "rect(74px, 9999px, 30px, 0)" },
          "55%": { clip: "rect(72px, 9999px, 82px, 0)" },
          "60%": { clip: "rect(3px, 9999px, 33px, 0)" },
          "65%": { clip: "rect(71px, 9999px, 45px, 0)" },
          "70%": { clip: "rect(25px, 9999px, 19px, 0)" },
          "75%": { clip: "rect(30px, 9999px, 33px, 0)" },
          "80%": { clip: "rect(57px, 9999px, 45px, 0)" },
          "85%": { clip: "rect(79px, 9999px, 3px, 0)" },
          "90%": { clip: "rect(67px, 9999px, 82px, 0)" },
          "95%": { clip: "rect(90px, 9999px, 29px, 0)" },
          "100%": { clip: "rect(53px, 9999px, 92px, 0)" },
        },
        "noise-anim-2": {
          "0%": { clip: "rect(47px, 9999px, 75px, 0)" },
          "5%": { clip: "rect(86px, 9999px, 72px, 0)" },
          "10%": { clip: "rect(45px, 9999px, 58px, 0)" },
          "15%": { clip: "rect(65px, 9999px, 5px, 0)" },
          "20%": { clip: "rect(42px, 9999px, 90px, 0)" },
          "25%": { clip: "rect(86px, 9999px, 98px, 0)" },
          "30%": { clip: "rect(88px, 9999px, 84px, 0)" },
          "35%": { clip: "rect(60px, 9999px, 27px, 0)" },
          "40%": { clip: "rect(96px, 9999px, 79px, 0)" },
          "45%": { clip: "rect(14px, 9999px, 26px, 0)" },
          "50%": { clip: "rect(97px, 9999px, 97px, 0)" },
          "55%": { clip: "rect(78px, 9999px, 13px, 0)" },
          "60%": { clip: "rect(87px, 9999px, 98px, 0)" },
          "65%": { clip: "rect(20px, 9999px, 44px, 0)" },
          "70%": { clip: "rect(32px, 9999px, 19px, 0)" },
          "75%": { clip: "rect(38px, 9999px, 3px, 0)" },
          "80%": { clip: "rect(20px, 9999px, 41px, 0)" },
          "85%": { clip: "rect(96px, 9999px, 44px, 0)" },
          "90%": { clip: "rect(91px, 9999px, 35px, 0)" },
          "95%": { clip: "rect(21px, 9999px, 87px, 0)" },
          "100%": { clip: "rect(81px, 9999px, 45px, 0)" },
        },
        "conic-expand": {
          "0%": {
            "background-size": "50%",
            "background-position": "0 0",
          },
          "20%": {
            "background-size": "55%",
            "background-position": "0 1em",
          },
          "100%": {
            "background-size": "325%",
            "background-position": "-10em -4em",
          }
        },
        "conic-expand-rev": {
          "0%": {
            "background-size": "325%",
            "background-position": "-10em -4em",
          },
          "20%": {
            "background-size": "55%",
            "background-position": "0 1em",
          },
          "100%": {
            "background-size": "50%",
            "background-position": "0 0",
          }
        },
      },
      transformOrigin: {
        "almost-center": "50% 50% .4em",
      },
      transitionDelay: {
        "char-index": "calc(0ms + var(--char-index) * 25ms)",
      },
      transitionTimingFunction: {
        "in-text": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        "in-letter": "cubic-bezier(0.5, 0, 0, 1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    backfaceVisibility,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
