import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
	const authStore = useAuthStore();
	if (process.server) return;
	const waitForUser = () =>
		new Promise(resolve => {
			const unsub = onAuthStateChanged(getAuth(), (user) => {
				unsub();
				resolve(user);
			});
		});

	await waitForUser();

	const lang = await authStore.loadLanguageFromFirebase();

	if (lang && nuxtApp.$i18n) {
		nuxtApp.$i18n.locale.value = lang;
	}
});
