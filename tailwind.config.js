/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px', // Add the `xs` breakpoint for extra small screens
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        borderColor: "var(--border-color)",
        textColor: "var(--text-color)",
        linkColor: "var(--link-color)",
        buttonColor: "var(--button-color)",
        svgColor: "var(--svg-color)",
        scrollbar: {
          DEFAULT: '#e0e0e0',
          dark: '#888',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
