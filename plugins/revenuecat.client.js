import { Capacitor } from '@capacitor/core'
import { Purchases } from '@revenuecat/purchases-capacitor'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(async () => {
	if (process.client && Capacitor.isNativePlatform()) {
		const auth = getAuth()
		const user = auth.currentUser

		if (user) {
			await Purchases.setup({
				apiKey: 'YOUR_REVENUECAT_API_KEY',
				appUserID: user.uid
			})
		} else {
			await Purchases.setup({
				apiKey: 'YOUR_REVENUECAT_API_KEY'
			})
		}
	}
})
