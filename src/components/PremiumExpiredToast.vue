<template>
	<div class="toast" v-if="visible">
		<p>Подписка закончилась. Некоторые функции будут отключены.</p>
		<button class="close-btn" @click="visible = false">ОК</button>
	</div>
</template>

<script setup>
	import {ref, watch} from 'vue'
	import {useAuthStore} from 'stores/authStore.js'

	const authStore = useAuthStore()
	const visible = ref(false)

	watch(() => authStore.premiumExpired, (val) => {
		visible.value = val
	})
</script>

<style scoped>
	.toast {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: #ff4d4f;
		color: white;
		padding: 1rem 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
		font-size: 16px;
		z-index: 9999;
		display: flex;
		align-items: center;
		gap: 1rem;
		animation: slide-up 0.4s ease-out;
	}

	.close-btn {
		background: white;
		color: #ff4d4f;
		border: none;
		border-radius: 6px;
		padding: 0.3rem 0.7rem;
		font-weight: bold;
		cursor: pointer;
	}


	@keyframes slide-up {
		from {
			transform: translateX(-50%) translateY(30px);
			opacity: 0;
		}
		to {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
	}
</style>
