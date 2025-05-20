<template>
    <NuxtLayout>
        <NuxtPage/>
<!--        <PremiumExpired v-if="showPremiumToast" @close="showPremiumToast = false" />-->
    </NuxtLayout>
</template>

<script setup>
import './assets/styles/global.css'
import {disableDevtools, preventDebugAccess, blockConsole} from './src/utils/protect.js'
import PremiumExpired from './src/components/PremiumExpiredToast.vue'
import {useAuthStore} from './stores/authStore.js'
import {onMounted, onBeforeUnmount, watch} from 'vue'
import {useRouter} from 'vue-router'
import {App as CapacitorApp} from '@capacitor/app'
import {Purchases} from '@revenuecat/purchases-capacitor';
import {Capacitor} from '@capacitor/core';
const showPremiumToast = ref(false)
const router = useRouter()
const authStore = useAuthStore();
if (process.client) {
    if (!navigator.onLine) {
        router.replace('/error')
    }

    window.addEventListener('offline', () => {
        router.replace('/error')
    })
}

let removeListener = null

const handleBackButton = () => {
    const path = router.currentRoute.value.path
    if (path === '/welcomePage') {
        return
    }
    if (window.history.length > 1) {
        router.back()
    }
}
onMounted(async () => {
    if (Capacitor.isNativePlatform()) {
        await Purchases.configure({
            apiKey: 'goog_BkCdjeLzZiqDbsdGktigOVPrvuL'
        });
    }

    await authStore.fetchingUser();
    const isPremium = await authStore.checkRevenueCatPremium();

    if (!isPremium) {
        authStore.isBotEnabled = false;
        await authStore.saveBotStateToFirebase(false);
    }

    authStore.startPremiumStatusPolling();

    disableDevtools();
    preventDebugAccess();
    blockConsole();
});


onMounted(() => {
    CapacitorApp.addListener('backButton', handleBackButton).then((listener) => {
        removeListener = listener.remove
    })
})

onMounted(async () => {
    // 🔁 Проверка премиума при старте
    if (!authStore.isPremium) {
        authStore.isBotEnabled = false
        await authStore.saveBotStateToFirebase(false)
    }
})

onBeforeUnmount(() => {
    if (removeListener) removeListener()
})

watch(() => authStore.isPremium, (newVal) => {
    console.log('[RevenueCat] Подписка изменилась:', newVal ? 'Активна' : 'Неактивна')
    if (!newVal) {
        showPremiumToast.value = true
    }
})

</script>

<style src="assets/styles/variables.css">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}

body {
    margin: 0;
    background-color: var(--background-color);
    color: var(--text-color);
}

html {
    color: var(--text-color);
}

button {
    --btn-color: #00BCD4;
}
</style>
