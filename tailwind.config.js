/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ibm: ["'IBM Plex Sans Condensed'", "sans-serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        montserrat: ["'Montserrat'", "sans-serif"],
      },
			gridTemplateColumns: {
				"60": "repeat(60, minmax(0, 1fr))",
			},
			gridColumn: {
				"span-18": "span 18 / span 18",
				"span-24": "span 24 / span 24",
			},
    },
  },
};
