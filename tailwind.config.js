const tlTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],

	theme: {
		extend: {
			colors: {
				baseColor: "3f51b5",
				secondaryColor: "#F9B713",
				textColor: "#434449",
				bottomBarGray: "#F2F2F2",
				baseGray: "#777677",
				baseBlack: "#565454",
				darkerBlack: "#525252",
				lighterGray: "#f1f1f4",
				lightGray: "#e4e5e9",
				darkGray: "#6f7077",
				indigo: "#3f51b5",
				indigoDarken10: "#364495",
				indigoLighten80: "#b7c1f8",
				logoOrange: "#e86c60",
				logoBlue: "#43a6dd",
				logoGray: "#e6e6e6",
				logoDarkGray: "#b3b3b3",
			},
			fontSize: {
				xxs: ["0.625rem", ".875rem"],
			},
			fontFamily: {
				aldrich: "'Aldrich', sans-serif",
				poppins: "'Poppins', sans-serif",
				inter: "'Inter', sans-serif",
				roboto: "'Roboto', sans-serif",
			},
			screens: {
				"mobile-sm": "320px",
				...tlTheme.screens,
			},
		},
	},
	plugins: [],
};
