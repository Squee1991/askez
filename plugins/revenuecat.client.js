import {Capacitor} from '@capacitor/core'
import {Purchases} from '@revenuecat/purchases-capacitor'

export default defineNuxtPlugin(async () => {
    if (process.client && Capacitor.isNativePlatform()) {
        await Purchases.setup({
            apiKey: 'YOUR_REVENUECAT_API_KEY'
        })
    }
})