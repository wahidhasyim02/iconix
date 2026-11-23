// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('ix-') || tag.startsWith('iconix-') || tag.startsWith('gv-'),
    },
  },
  tailwindcss: {
    viewer: false,
  },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: {
        lang: 'id',
        class: 'dark',
      },
      title: 'Iconix — SVG Icon Studio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'robots', content: 'noindex, nofollow' },
        {
          name: 'description',
          content:
            'Studio icon SVG modern: Linear, Solid, Dualtone, dan Dualtone Linear dengan live stroke, opacity, color picker, zoom, dan export SVG/React/Vue/PNG instan.',
        },
        { name: 'theme-color', content: '#090B0E' },
        { property: 'og:title', content: 'Iconix — SVG Icon Studio' },
        {
          property: 'og:description',
          content:
            'Studio icon SVG modern: Linear, Solid, Dualtone, dan Dualtone Linear dengan live stroke, opacity, dan export instan.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL || '' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Iconix — SVG Icon Studio' },
        {
          name: 'twitter:description',
          content: 'Studio icon SVG modern dengan live styling Linear, Solid, Dualtone, dan export.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap',
        },
      ],
    },
  },
});
