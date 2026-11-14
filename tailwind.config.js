/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        africa: {
          bg: "#06130d",
          surface: "#0c1f17",
          card: "#0f281e",
          cardHover: "#143527",
          border: "#183b2c",
          gold: "#eab308",
          goldLight: "#facc15",
          goldMuted: "rgba(234, 179, 8, 0.15)",
          textPrimary: "#f3f4f6",
          textSecondary: "#9ca3af",
          textMuted: "#6b7280",
          success: "#10b981",
          successBg: "rgba(16, 185, 129, 0.15)",
          danger: "#ef4444",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
