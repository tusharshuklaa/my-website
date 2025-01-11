/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");
require("tailwindcss/defaultTheme");
require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

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

const conicGradientColors = ["#89FC00", "#F896D8", "#C879FF", "#06D6A0", "#75DDDD", "#9368B7"];

const svgToDataUri = require("mini-svg-data-uri");

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
        "conic-text": "conic-expand 0.5s ease forwards",
        "conic-text-rev": "conic-expand-rev 0.5s ease forwards",
        gradient: "gradient 8s linear infinite",
        "noise-anim-1": "noise-anim-1 2s infinite linear alternate-reverse",
        "noise-anim-2": "noise-anim-2 3s infinite linear alternate-reverse",
        "zoom-in": "zoom-in 3s ease forwards",
        "welcome-text": "welcome-text 3s ease forwards 0.5s",
        "fade-in": "fade-in 1s ease-in-out 3.3s forwards",
        "background-position-spin": "background-position-spin 3000ms infinite alternate",
        "gradient-shift": "gradient-shift 5s ease-in-out infinite",
        "blur-animation": "blur-animation 3s ease-in-out alternate infinite",
        marquee: 'marquee 15s linear infinite',
        "slider-anim": "slider-anim 20s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        background: "var(--background)",
        "collage-gradient":
          "`conic-gradient(${conicGradientColors[0]} 12%, ${conicGradientColors[1]} 12%, ${conicGradientColors[1]} 33%, ${conicGradientColors[2]} 33%, ${conicGradientColors[2]} 55%, ${conicGradientColors[3]} 55%, ${conicGradientColors[3]} 70%, ${conicGradientColors[4]} 70%, ${conicGradientColors[4]} 87%, ${conicGradientColors[0]} 87%)`",
        "cosmic-bot": "url('/img/cosmic-bot.png')",
      },
      backgroundSize: {
        "50%": "50%",
      },
      boxShadow: {
        blip: "0 0 3rem 0.75rem currentColor",
      },
      colors: {
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
        antiquewhite: "#FAEBD7",
        lightYellow: "hsl(40deg 52% 80%)",
      },
      fontSize: {
        "screen-xs": "2.3vmin",
        "screen-sm": "4.6vmin",
        "screen-md": "6.89vmin",
        "screen-lg": "9.19vmin",
        "screen-xl": "14vmin",
        "screen-2xl": "22vmin",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        dongle: ["var(--font-dongle)", "Dongle", "sans-serif"],
      },
      keyframes: {
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        "noise-anim-1": {
          "0%": {
            clip: "rect(52px, 9999px, 97px, 0)",
          },
          "5%": {
            clip: "rect(62px, 9999px, 70px, 0)",
          },
          "10%": {
            clip: "rect(96px, 9999px, 63px, 0)",
          },
          "15%": {
            clip: "rect(22px, 9999px, 32px, 0)",
          },
          "20%": {
            clip: "rect(5px, 9999px, 17px, 0)",
          },
          "25%": {
            clip: "rect(18px, 9999px, 62px, 0)",
          },
          "30%": {
            clip: "rect(25px, 9999px, 98px, 0)",
          },
          "35%": {
            clip: "rect(80px, 9999px, 72px, 0)",
          },
          "40%": {
            clip: "rect(74px, 9999px, 59px, 0)",
          },
          "45%": {
            clip: "rect(3px, 9999px, 23px, 0)",
          },
          "50%": {
            clip: "rect(74px, 9999px, 30px, 0)",
          },
          "55%": {
            clip: "rect(72px, 9999px, 82px, 0)",
          },
          "60%": {
            clip: "rect(3px, 9999px, 33px, 0)",
          },
          "65%": {
            clip: "rect(71px, 9999px, 45px, 0)",
          },
          "70%": {
            clip: "rect(25px, 9999px, 19px, 0)",
          },
          "75%": {
            clip: "rect(30px, 9999px, 33px, 0)",
          },
          "80%": {
            clip: "rect(57px, 9999px, 45px, 0)",
          },
          "85%": {
            clip: "rect(79px, 9999px, 3px, 0)",
          },
          "90%": {
            clip: "rect(67px, 9999px, 82px, 0)",
          },
          "95%": {
            clip: "rect(90px, 9999px, 29px, 0)",
          },
          "100%": {
            clip: "rect(53px, 9999px, 92px, 0)",
          },
        },
        "noise-anim-2": {
          "0%": {
            clip: "rect(47px, 9999px, 75px, 0)",
          },
          "5%": {
            clip: "rect(86px, 9999px, 72px, 0)",
          },
          "10%": {
            clip: "rect(45px, 9999px, 58px, 0)",
          },
          "15%": {
            clip: "rect(65px, 9999px, 5px, 0)",
          },
          "20%": {
            clip: "rect(42px, 9999px, 90px, 0)",
          },
          "25%": {
            clip: "rect(86px, 9999px, 98px, 0)",
          },
          "30%": {
            clip: "rect(88px, 9999px, 84px, 0)",
          },
          "35%": {
            clip: "rect(60px, 9999px, 27px, 0)",
          },
          "40%": {
            clip: "rect(96px, 9999px, 79px, 0)",
          },
          "45%": {
            clip: "rect(14px, 9999px, 26px, 0)",
          },
          "50%": {
            clip: "rect(97px, 9999px, 97px, 0)",
          },
          "55%": {
            clip: "rect(78px, 9999px, 13px, 0)",
          },
          "60%": {
            clip: "rect(87px, 9999px, 98px, 0)",
          },
          "65%": {
            clip: "rect(20px, 9999px, 44px, 0)",
          },
          "70%": {
            clip: "rect(32px, 9999px, 19px, 0)",
          },
          "75%": {
            clip: "rect(38px, 9999px, 3px, 0)",
          },
          "80%": {
            clip: "rect(20px, 9999px, 41px, 0)",
          },
          "85%": {
            clip: "rect(96px, 9999px, 44px, 0)",
          },
          "90%": {
            clip: "rect(91px, 9999px, 35px, 0)",
          },
          "95%": {
            clip: "rect(21px, 9999px, 87px, 0)",
          },
          "100%": {
            clip: "rect(81px, 9999px, 45px, 0)",
          },
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
          },
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
          },
        },
        "zoom-in": {
          "0%": {
            transform: "scale(0.8)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "welcome-text": {
          "0%": {
            transform: "scale(1)",
          },
          "75%": {
            transform: "scale(1.3)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0.1)",
            opacity: "0",
            "font-size": "0px",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "background-position-spin": {
          "0%": {
            backgroundPosition: "top center",
          },
          "100%": {
            backgroundPosition: "bottom center",
          },
        },
        "gradient-shift": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        "blur-animation": {
          to: { filter: "blur(3vmin)", transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "slider-anim": {
          "0%": {
            transform: "perspective(1000px) rotateX(-14deg) rotateY(0deg)"
          },
          "100%": {
            transform: "perspective(1000px) rotateX(-14deg) rotateY(360deg)"
          },
        },
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        }
      },
      lineHeight: {
        "extra-tight": "0.75",
      },
      maxWidth: {
        screen: "100vw",
        full: "100%",
        "1/2": "50%",
        "2/3": "75%",
        halfScreen: "50vw",
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
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    backfaceVisibility,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}

export default config;
