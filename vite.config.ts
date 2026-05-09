import path from "node:path";
import { fileURLToPath } from "node:url";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const qbitUrl = env.VITE_QBIT_URL ?? "http://localhost:8080";
  const target = new URL(qbitUrl);
  const targetOrigin = `${target.protocol}//${target.host}`;

  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,
      host: true,
      proxy: {
        "/api": {
          target: qbitUrl,
          changeOrigin: true,
          cookieDomainRewrite: "",
          configure(proxy) {
            // qBittorrent rejects requests whose Origin/Referer don't match
            // its Host. Browsers forbid setting these from JS, so we rewrite
            // them server-side here.
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("Origin", targetOrigin);
              proxyReq.setHeader("Referer", `${targetOrigin}/`);
            });
          },
        },
      },
    },
    build: {
      outDir: "cascade/public",
      emptyOutDir: true,
      sourcemap: true,
    },
  };
});
