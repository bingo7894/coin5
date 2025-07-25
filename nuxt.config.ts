// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  // --- เพิ่มส่วนนี้เข้ามา ---
  devServer: {
    host: "0.0.0.0", // นี่คือสิ่งที่ทำให้สามารถเข้าถึงจาก IP อื่นในเครือข่ายได้
    port: 3000, // ตั้งพอร์ตที่คุณต้องการให้รัน (หรือปล่อยว่างไว้ให้ใช้ค่าเริ่มต้น Nuxt คือ 3000)
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
    githubId: "",
    githubSecret: "",
  },
});
