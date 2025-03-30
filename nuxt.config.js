console.log(process.env.NODE_ENV)

export default defineNuxtConfig({
	ssr: true,
	nitro: {
		preset: "vercel"
	},

	runtimeConfig: {
		public: {
			firebaseAuthDisableSession: true
		}
	},
	compatibilityDate: '2024-11-01',
	devtools: {enabled: true},
	modules: [ '@vite-pwa/nuxt', '@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxtjs/color-mode', '@nuxtjs/i18n', 'nuxt-vuefire'],
	css: ['@/assets/styles/global.css',],
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
			sessionCookie: false
		},
	},
	i18n: {
		legacy: false,
		lazy: true,
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
				code: 'be-BY',
				iso: 'be-BY',
				name: 'Беларускі',
				file: 'be-BY.json',
			},
			{
				code: 'uk-UA',
				iso: 'uk-UA',
				name: 'Українська',
				file: 'uk-UA.json'
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
			{
				code: 'ar',
				iso: 'ar-EG',
				name: 'العربية',
				file: 'ar-EG.json'
			},
			{
				code: 'zh-CN',
				iso: 'zh-CN',
				name: '中文',
				file: 'zh-CN.json'
			},
			{
				code: 'el-EL',
				iso: 'el-EL',
				name: 'Elvish',
				file: 'el-EL.json'
			},

		],

		defaultLocale: 'en-US',
		detectBrowserLanguage: false
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
			Roboto: true,
			'ZCOOL KuaiLe': true,
			'Ma Shan Zheng': true
		}
	},
	colorMode: {
		preference: 'dark',
		fallback: 'dark',
		classSuffix: '',
	},
})
