/// <reference types="vitest" />
import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { lingui } from "@lingui/vite-plugin";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [
    react({
      plugins: [["@lingui/swc-plugin", {}]],
    }),
    tailwindcss(),
    svgr(),
    lingui(),
  ],
});
