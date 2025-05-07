<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>

<script setup>
import './assets/styles/global.css'
import {disableDevtools, preventDebugAccess, blockConsole} from './src/utils/protect.js'
import {useAuthStore} from './stores/authStore.js'
import {onMounted, onBeforeUnmount, watch} from 'vue'
import {useRouter} from 'vue-router'
import {App as CapacitorApp} from '@capacitor/app'
import {Purchases} from '@revenuecat/purchases-capacitor';
import {Capacitor} from '@capacitor/core';

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
    await authStore.fetchingUser()
    await authStore.checkRevenueCatPremium();
});


onMounted(() => {
    CapacitorApp.addListener('backButton', handleBackButton).then((listener) => {
        removeListener = listener.remove
    })
})

onBeforeUnmount(() => {
    if (removeListener) removeListener()
})

onMounted(() => {
    disableDevtools()
    preventDebugAccess()
    blockConsole()
})

onMounted(async () => {
    if (Capacitor.isNativePlatform()) {
        await Purchases.configure({
            apiKey: 'goog_BkCdjeLzZiqDbsdGktigOVPrvuL' // замени на свой из RevenueCat
        });
    }
});

watch(() => authStore.isPremium, (newVal) => {
    console.log('[RevenueCat] Подписка изменилась:', newVal ? 'Активна' : 'Неактивна')
    if (!newVal) {
        alert('Подписка закончилась. Некоторые функции будут отключены.')
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
