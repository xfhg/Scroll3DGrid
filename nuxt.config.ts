import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/base.css'],
  nitro: {
    compatibilityDate: '2025-10-02'
  },
  app: {
    head: {
      htmlAttrs: { class: 'js' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
