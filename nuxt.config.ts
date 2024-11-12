// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  routeRules: {
    '/': { prerender: true }
  },
  app: { head: { link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }] } },
  nitro: { preset: 'vercel-edge' },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module']
})
