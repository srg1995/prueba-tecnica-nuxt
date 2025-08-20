// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
  ],
  content: {
    database: false, // ⚡ modo filesystem, Vercel friendly
  },
  css: ["~/assets/css/main.css"],
  image: {
    domains: ["images.dog.ceo"],
  },
});
