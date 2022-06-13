/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	purge: {
		mode: "all",
		content: ["./src/**/*.{svelte,jsx,js,ts,html}"],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},

	plugins: [],
};
