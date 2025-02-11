console.log(process.env.NODE_ENV)
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://default-api.example.com'
		}
	},
	compatibilityDate: '2024-11-01',
	devtools: {enabled: true},
	modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxtjs/color-mode', '@nuxtjs/i18n'],
	i18n: {
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
			Itim: true
		}
	},
	colorMode: {
		preference: 'light',
		fallback: 'light',
		classSuffix: '',
	},
})
