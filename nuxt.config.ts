// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  modules: ["@nuxtjs/tailwindcss", '@fedorae/nuxt-uikit'],
  devServer: {
    port: 7001
  }
})