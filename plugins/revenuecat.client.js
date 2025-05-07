import { Capacitor } from '@capacitor/core'
import { Purchases } from '@revenuecat/purchases-capacitor'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin(() => {
	if (!Capacitor.isNativePlatform()) return
	const auth = getAuth()
	onAuthStateChanged(auth, async (user) => {
		try {
			await Purchases.configure({
				apiKey: 'goog_BkCdjeLzZiqDbsdGktigOVPrvuL',
				appUserID: user ? user.uid : null,
			})
			console.log('[RevenueCat] SDK настроен ✅')
		} catch (err) {
			console.error('[RevenueCat] Ошибка настройки:', err)
		}
	})
})
