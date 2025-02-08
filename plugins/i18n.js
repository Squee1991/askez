export default defineNuxtPlugin((nuxtApp) => {
	const i18n = nuxtApp.$i18n;
	if (process.client) {
		const savedLang = localStorage.getItem('language');
		if (savedLang && i18n) {
			i18n.setLocale(savedLang);
		} else {
			localStorage.setItem('language', i18n.locale);
		}
	}
});
