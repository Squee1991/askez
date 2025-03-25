export default defineNuxtPlugin((nuxtApp) => {
	const i18n = nuxtApp.$i18n;
	if (process.client && i18n) {
		i18n.locale.value = 'en-US';
	}
	// const i18n = nuxtApp.$i18n;
	//
	// if (process.client && i18n) {
	// 	let savedLang = localStorage.getItem('language');
	// 	if (!savedLang) {
	// 		savedLang = 'en-US';
	// 		localStorage.setItem('language', savedLang);
	// 	}
	// 	if (i18n) {
	// 		i18n.setLocale(savedLang);
	// 	}
	// }
});

