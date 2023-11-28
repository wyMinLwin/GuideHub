import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				light: "#F2F2F2",
				bluejeans: "#5D9CEC",
				secondary: "#e5e5e5",
				success: "#7CD197",
				progress: "#FFAA33",
				error: "#ED5565",
			},
			
		},
	},
	plugins: [],
};
export default config;
