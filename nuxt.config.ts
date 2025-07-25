// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxtjs/cloudinary",
    "nuxt-auth-utils",
    "nuxt-tiptap-editor",
  ],
  runtimeConfig: {
    githubId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
    githubSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
    public: {
      authOrigin: process.env.NUXT_PUBLIC_AUTH_ORIGIN,
    },
  },

  // --- เพิ่มส่วนนี้เข้ามา ---
  vite: {
    optimizeDeps: {
      exclude: ["@prisma/client"], // <--- นี่คือบรรทัดสำคัญ!
    },
  },
  // -------------------------
});
