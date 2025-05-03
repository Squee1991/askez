import { Capacitor } from '@capacitor/core'
import { Purchases } from '@revenuecat/purchases-capacitor'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(async () => {
	if (process.client && Capacitor.isNativePlatform()) {
		const auth = getAuth()
		const user = auth.currentUser

		await Purchases.configure({
			apiKey: 'your_public_revenuecat_android_key',
			appUserID: user?.uid || null,
		})
	}
})
