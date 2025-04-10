<template>
	<NuxtLayout>
		<NuxtPage/>
	</NuxtLayout>
</template>

<script setup>
	import './assets/styles/global.css'
	import { useAuthStore } from './stores/authStore.js'
	import { onMounted, onBeforeUnmount } from 'vue'
	import { useRouter } from 'vue-router'
	import { App as CapacitorApp } from '@capacitor/app'
	const router = useRouter()

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
		const authStore = useAuthStore();
		await authStore.loadBotStateFromLocal();
		authStore.fetchingUser()
	});

	onMounted(() => {
		CapacitorApp.addListener('backButton', handleBackButton).then((listener) => {
			removeListener = listener.remove
		})
	})

	onBeforeUnmount(() => {
		if (removeListener) removeListener()
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
