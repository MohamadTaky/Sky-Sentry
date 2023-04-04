/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			"black-1": "#1d2125",
			"black-2": "#121517",
			"black-3": "#08090A",
			"white-1": "#ffffff",
			"white-2": "#e5e5e5",
			"white-3": "#cccccc",
			"accent-3": "#574AE2",
			"accent-2": "#675ce4",
			"accent-1": "#786ee7",
			"success-1": "#56f7c2",
			"success-2": "#41f6ba",
			"success-3": "#2cf6b3",
			"orange-1": "#ffa500",
			"midnight-1": "#000033",
			"blue-1": "#2563eb",
			transparent: "#00000000",
		},
		extend: {
			height: {
				screen: "calc(var(--vh) * 100)",
			},
		},
	},
	plugins: [],
};
