import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
	const authStore = useAuthStore();

	if (process.server) return;

	// Ждём восстановления сессии Firebase
	const waitForUser = () =>
		new Promise(resolve => {
			const unsub = onAuthStateChanged(getAuth(), (user) => {
				unsub(); // отпишемся
				resolve(user);
			});
		});

	await waitForUser(); // ⏳ дождались, пока Firebase подтянет текущего юзера

	const lang = await authStore.loadLanguageFromFirebase();

	if (lang && nuxtApp.$i18n) {
		nuxtApp.$i18n.locale.value = lang;
	}
});
