import { type Config } from "tailwindcss";
import TWA from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        scroll: "scroll 60s linear infinite",
        "scroll-reverse": "scroll-reverse 60s linear infinite",
        "free-fall":
          "gravity 10s cubic-bezier(0.33333, 0, 0.66667, 0.33333) infinite",
        shake: "shake 0.3s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        vibrate: "vibrate 5s ease-in-out",
        splatter1: "splatter1 1s ease-out forwards",
        splatter2: "splatter2 1s ease-out forwards",
        splatter3: "splatter3 1s ease-out forwards",
        splatter4: "splatter4 1s ease-out forwards",
        splatter5: "splatter5 1s ease-out forwards",
        splatter6: "splatter6 1s ease-out forwards",
        rotateClockwise: "rotateClockwise 1s linear infinite",
      },
      keyframes: {
        vibrate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(10deg)",
          },
          "75%": {
            transform: "rotate(-10deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        splatter1: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-180px, -170px) scale(0.5)",
            opacity: "0",
          },
        },
        splatter2: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(200px, -80px) scale(0.6)",
            opacity: "0",
          },
        },
        splatter3: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-220px, 30px) scale(0.5)",
            opacity: "0",
          },
        },
        splatter4: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(300px, -40px) scale(0.6)",
            opacity: "0",
          },
        },
        splatter5: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-120px, 150px) scale(0.5)",
            opacity: "0",
          },
        },
        splatter6: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(200px, 120px) scale(0.4)",
            opacity: "0",
          },
        },
        shake: {
          "0%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "25%": {
            transform: "translate(5px, 5px) rotate(5deg)",
          },
          "50%": {
            transform: "translate(0, 0) rotate(0eg)",
          },
          "75%": {
            transform: " translate(-5px, 5px) rotate(-5deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
        },

        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(calc(-250px * 10))",
          },
        },
        "scroll-reverse": {
          "0%": {
            transform: "translateX(calc(-250px * 10))",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        gravity: {
          "0%": {
            transform: "translateY(-10vh) rotate(0deg)",
          },
          "100% ": {
            transform: "translateY(110vh) rotate(120deg)",
          },
        },
        "sun-gravity": {
          "0%": {
            transform: "translateY(-100vh) rotate(0deg)",
          },
          "100%": {
            transform: "translateY(200vh) rotate(360deg)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        rotateClockwise: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      transitionTimingFunction: {
        "suck-in": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      fontFamily: {
        VikingHell: "var(--font-viking-hell)",
        PressStart: "var(--font-Press_Start_2P)",
        Garet: "var(--font-Garet)",
        gilroy: "var(--font-gilroy)",
      },
      colors: {
        primary: {
          50: "#e6fff5",
          100: "#ccffeb",
          200: "#99ffd8",
          300: "#66ffc4",
          400: "#33ffb1",
          500: "#00ff9d",
          600: "#00cc7e",
          700: "#00995e",
          800: "#00663f",
          900: "#00331f",
          950: "#001a10",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          50: "#fbf4e9",
          100: "#f7e9d4",
          200: "#efd3a9",
          300: "#e7bd7e",
          400: "#dfa753",
          500: "#d79128",
          600: "#d79128",
          700: "#d79128",
          800: "#d79128",
          900: "#d79128",
          950: "#d79128",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          50: "#F2FBFD",
          100: "#E5F6FA",
          200: "#CFEFF7",
          300: "#B5E6F2",
          400: "#9BDDED",
          500: "#86D6E9",
          600: "#6CCDE5",
          700: "#52C4E0",
          800: "#3ABCDC",
          900: "#156275",
          950: "#0B333D",
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        glassy: "rgba(var(--background-rgb), 0.8)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [TWA],
};

export default config;
