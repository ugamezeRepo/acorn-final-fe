import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: "@components", replacement: path.resolve(__dirname, "src", "components") },
            { find: "@pages", replacement: path.resolve(__dirname, "src", "pages") },
            { find: "@routes", replacement: path.resolve(__dirname, "src", "routes") },
            { find: "@contexts", replacement: path.resolve(__dirname, "src", "contexts") },
            { find: "@configs", replacement: path.resolve(__dirname, "src", "configs") },
        ]
    }
});
