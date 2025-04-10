<template>
	<div v-if="showPremiumModal" class="premium-info">
		<HeaderWithback :icon="ArrowIcon" title="Premium"/>
		<div class="premium-content">
			<h2 class="premium-title">✨ Преимущества Premium</h2>
			<ul class="premium-list">
				<li>🌿 Без рекламы</li>
				<li>🎯 Неограниченное количество целей</li>
				<li>🐼 Доступ к эксклюзивным аватарам</li>
				<li>💬 Поддержка разработчиков</li>
				<li>🌙 Тёмная тема интерфейса</li>
				<li>🏆 Особые достижения</li>
				<li>🚀 Прокачка панды</li>
			</ul>
			<button class="premium-button" @click="buyPremium">Купить Premium</button>
		</div>
	</div>
</template>

<script setup>
	import ArrowIcon from '../assets/images/arrowBack.svg';
	import HeaderWithback from '../src/components/headerWithBack.vue';
	import {useAuthStore} from '../stores/authStore.js'
	import { useRouter } from 'vue-router'
	const router = useRouter()

	const showPremiumModal = ref(true)
	const authStore = useAuthStore()

	const buyPremium = () => {
		authStore.activatePremium()
		showPremiumModal.value = false
		router.push('/welcomePage')
	}

</script>

<style scoped>
	.premium-info {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: black;
		padding: 20px;
		text-align: center;
		z-index: 1000;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
	}

	.premium-content {
		padding: 25px;
		border-radius: 20px;
		width: 90%;
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}

	.premium-title {
		font-size: 26px;
		margin-bottom: 20px;
		color: #4CAF50;
		font-family: "Acme", serif;
	}

	.premium-list {
		list-style: none;
		padding: 0;
		margin-bottom: 25px;
		font-size: 18px;
		font-family: "Nunito", serif;
		color: #555;
		text-align: left;
	}

	.premium-list li {
		margin: 12px 0;
		display: flex;
		align-items: center;
	}

	.premium-button {
		background-color: #4CAF50;
		color: white;
		padding: 14px 28px;
		border: none;
		border-radius: 10px;
		font-size: 18px;
		font-family: "Acme", serif;
		cursor: pointer;
		transition: transform 0.2s ease, background-color 0.3s ease;
	}

	.premium-button:hover {
		background-color: #43a047;
		transform: scale(1.05);
	}
</style>