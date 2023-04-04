import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), tsconfigPaths(), react()],
	server: {
		proxy: {
			"/location": {
				target: "http://ip-api.com/json/?fields=city,lat,lon,timezone",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/location/, ""),
			},
		},
	},
});
