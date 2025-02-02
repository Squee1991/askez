import {reactive} from 'vue';

const translations = reactive({
	currentLanguage: 'ru',
	data: {},
});
let response;
async function loadLanguage(lang) {
	translations.currentLanguage = lang;
	try {

		if (lang === 'de') {
			response = await fetch('/dataListDeutsch.json');
		} else if (lang === 'es') {
			response = await fetch('/dataListSpanian.json');
		} else if (lang === 'ru') {
			response = await fetch('/dataListRussian.json');
		} else if (lang === 'by') {
			response = await fetch('/dataListBelorussian.json');
		} else {
			response = await fetch('/dataListJSON.json');
		}

		const data = await response.json();
		translations.data = data.languages;
	} catch (error) {
		console.error(error);
		translations.data = {error};
	}

	if (lang) {
		localStorage.setItem('language', lang);
	}
}

export default translations;
