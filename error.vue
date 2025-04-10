<template>
	<div class="error">
		<img class="error__img" src="/images/error.svg" alt="Error"/>
		<div class="text">{{ $t('noConnetction.off') }}</div>
		<button class="reconnect" @click="tryReconnect" :disabled="isTrying">
			{{ $t('noConnetction.btn') }}
		</button>
	</div>
</template>

<script setup>
	import {ref} from 'vue'

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
			location.reload()
		} catch (e) {
			console.warn('Still offline')
		} finally {
			isTrying.value = false
		}
	}
</script>

<style scoped>

	* {
		outline: none;
		-webkit-tap-highlight-color: transparent;
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
		margin-top: 250px;
		margin-bottom: 20px;
	}

	.reconnect {
		background-color: #3498db;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
		font-family: 'Acme', serif;
		transition: background-color 0.3s ease, transform 0.2s ease;
		position: relative;
		overflow: hidden;
		z-index: 1;
		-webkit-tap-highlight-color: transparent;
	}

	.reconnect::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) scale(0);
		width: 120px;
		height: 120px;
		background: rgba(255, 255, 255, 0.4);
		border-radius: 50%;
		opacity: 0;
		pointer-events: none;
		transition: transform 0.4s ease-out, opacity 0.4s ease-out;
	}

	.reconnect:active::after {
		transform: translate(-50%, -50%) scale(4);
		opacity: 1;
	}
</style>
