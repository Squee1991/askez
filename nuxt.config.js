console.log(process.env.NODE_ENV)

export default defineNuxtConfig({
    ssr: true,

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://default-api.example.com'
        }
    },
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxtjs/color-mode', '@nuxtjs/i18n', 'nuxt-vuefire'],
    vuefire: {
        config: {
            apiKey: 'AIzaSyBhDly0l8cImq0geDGG7pQdsbH12sPl9CQ',
            authDomain: 'ascetic-app-a3a9d.firebaseapp.com',
            projectId: 'ascetic-app-a3a9d',
            storageBucket: "ascetic-app-a3a9d.firebasestorage.app",
            appId: '1:727045995978:web:70afb6b73fc2bab1e26333',
            measurementId: "G-CMRDWZ7TDP"
        },
        auth: {
            enabled: true,
            errorMap: 'debug', // Подробные ошибки в разработке
            popupRedirectResolver: false, // Отключает зависимость всплывающих окон для входа через соцсети
            persistence: ['indexedDBLocal'], // Сохраняет сессию пользователя в IndexedDB
            sessionCookie: true
        },
    },
    i18n: {
        legacy: false,
        langDir: 'locales/',
        strategy: 'no_prefix',
        locales: [
            {
                code: 'en-US',
                iso: 'en-US',
                name: 'English',
                file: 'en-US.json',
            },
            {
                code: 'ru-RU',
                iso: 'ru-RU',
                name: 'Русский',
                file: 'ru-RU.json',
            },
            {
                code: 'de-DE',
                iso: 'de-DE',
                name: 'Deutsch',
                file: 'de-DE.json',
            },
            {
                code: 'by-BY',
                iso: 'by-BY',
                name: 'Беларускі',
                file: 'by-BY.json',
            },
            {
                code: 'es-ES',
                iso: 'es-ES',
                name: 'Español',
                file: 'es-ES.json',
            },
            {
                code: 'fr-FR',
                iso: 'fr-FR',
                name: 'Français',
                file: 'fr-FR.json',
            },
        ],
        detectBrowserLanguage: false,
        defaultLocale: 'en-US',
        lazy: true,
    },

    googleFonts: {
        families: {
            Nunito: true,
            Bangers: true,
            'Indie Flower': true,
            'Permanent Marker': true,
            Acme: true,
            Merienda: true,
            Itim: true,
            Roboto: true
        }
    },
    colorMode: {
        preference: 'light',
        fallback: 'light',
        classSuffix: '',
    },
})
