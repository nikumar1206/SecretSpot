/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "Avenir", "Helvetica", "Arial", "sans-serif"],
			h1: ["Dosis", "Avenir", "Helvetica", "Arial", "sans-serif"],
			button: ["Dosis", "Avenir", "Helvetica", "Arial", "sans-serif"],
		},
		extend: {
			zIndex: {
				100: "100",
				200: "200",
				300: "300",
				400: "400",
				500: "500",
				600: "600",
				700: "700",
			},
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			rateYellow: "#fff170",
			rateRed: "#ff9c9c",
			rateGreen: "#7ff6c3",
		},
	},
	plugins: [],
});
