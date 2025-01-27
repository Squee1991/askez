console.log(process.env.NODE_ENV)
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://default-api.example.com'
        }
    },
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],
    googleFonts: {
        families: {
            Nunito: true
        }
    },
})
