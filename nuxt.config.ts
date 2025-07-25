// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  // --- ตรวจสอบส่วนนี้ ---
  devServer: {
    host: "0.0.0.0", // นี่คือสิ่งที่ทำให้สามารถเข้าถึงจาก IP อื่นในเครือข่ายได้
    port: 3000, // ตั้งพอร์ตที่คุณต้องการให้รัน
  },
  // -------------------------

  modules: [
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxtjs/cloudinary",
    "nuxt-auth-utils",
    "nuxt-tiptap-editor",
  ],
  runtimeConfig: {
    // --- ตรวจสอบว่ารับค่าจาก .env ถูกต้อง ---
    githubId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
    githubSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
    public: {
      authOrigin: process.env.NUXT_PUBLIC_AUTH_ORIGIN,
      // ถ้าคุณมี API Backend ของตัวเองที่รันบนพอร์ตอื่น
      // apiBase: process.env.NODE_ENV === 'development' ? 'http://192.168.1.49:8000' : 'https://api.yourdomain.com'
    },
    // -------------------------------------
  },
});
