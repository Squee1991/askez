<template>
	<div class="toast">
		<div class="toast__wrapper">
			<div class="toast__inner" v-if="!visible">
				<img class="toast__icon" src="../assets/images/rejected.svg" alt="">
				<p class="toast__text">Подписка закончилась. Некоторые функции будут отключены.</p>
				<button @click="visible = false" class="toast-btn">Ок</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref, watch} from 'vue'

	const authStore = useAuthStore()
	const visible = ref(false)

	watch(() => authStore.premiumExpired, (val) => {
		visible.value = val
	})
</script>

<style scoped>

	.toast__icon {
		width: 200px;
	}

	.toast__wrapper {
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		height: 100vh;
		background: var(--background-color);
		padding: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.toast__inner{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.toast__text {
		padding: 30px;
		text-align: center;
		font-size: 18px;
		font-family: "Nunito", sans-serif;
		font-weight: 600;
		color: var(--text-color);

	}

	.toast-btn {
		width: 100%;
		font-size: 18px;
		background: #a855f7;
		color: white;
		border: none;
		font-family: "Nunito", sans-serif;

		padding: 15px;
		border-radius: 25px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

</style>
