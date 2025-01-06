// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "vite";
import fastify from "vite-plugin-fastify";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [fastify()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
