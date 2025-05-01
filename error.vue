<template>
	<div class="error">
		<img class="error__img" src="/images/pandaErrors.png" alt="Error"/>
		<div class="text">{{ $t('noConnetction.off') }}</div>
		<button class="reconnect" @click="tryReconnect" :disabled="isTrying" type="button">
			{{ $t('noConnetction.btn') }}
		</button>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const isTrying = ref(false)
	const tryReconnect = async () => {
		if (isTrying.value) return
		isTrying.value = true
		try {
			await fetch('https://www.gstatic.com/generate_204', {
				method: 'GET',
				cache: 'no-cache',
				mode: 'no-cors',
			})
			window.addEventListener('online', () => {
				router.replace('/')
			})
			location.reload()
		} catch (e) {
			console.error(e)
		} finally {
			isTrying.value = false
		}
		router.push('/')
	}
</script>

<style scoped>

	* {
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

	.error__img {
		width: 200px;
	}

	.error {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100%;
		background-color: var(--background-color);
		text-align: center;
		padding: 20px;
		box-sizing: border-box;
		position: relative;
	}

	.text {
		color: #e74c3c;
		font-size: 22px;
		font-weight: bold;
		font-family: 'Nunito', sans-serif;
		margin-top: 40px;
		margin-bottom: 20px;
		max-width: 250px;
	}

	.reconnect {
		background-color: #2196F3;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 20px;
		font-size: 16px;
		font-family: "Nunito", sans-serif;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: background-color 0.2s ease, transform 0.1s ease;
		min-width: 240px;
		text-align: center;
		touch-action: manipulation;
		-webkit-user-select: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}
	.reconnect:active {
		background-color: #83beea;
		transform: scale(0.98);
	}
</style>
