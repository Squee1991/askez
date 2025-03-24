<template>
	<Transition name="fade">
		<div v-if="state" class="wrapper">
			<div class="container">
				<div ref="animationContainer"></div>
			</div>
			<div class="nuxt__links">
				<button @click="toDescription" class="btn"> {{ $t("startPage.value")}}</button>
			</div>
		</div>
		<div v-else class="description">
			<NuxtLink to="/singup">
				<button class="next__btn">{{ $t("description.value")}}</button>
			</NuxtLink>
		</div>
	</Transition>

</template>

<script setup>
	import Lottie from 'lottie-web'
	import {ref, onMounted} from 'vue'
	import Panda from 'assets/animations/panda.json'

	const state = ref(true)
	const animationContainer = ref(null)
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase;

	const toDescription = () => {
		state.value = false
	}

	onMounted(() => {
		if (animationContainer.value) {
			Lottie.loadAnimation({
				container: animationContainer.value,
				loop: true,
				autoplay: true,
				animationData: Panda
			})
		}
	})

	definePageMeta({
		middleware: ['auth'],
	})
</script>

<style scoped>

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.description {
		background-image: url("../assets/images/bgPandaDescription.png");
		width: 100%;
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
	}

	.next__btn {
		opacity: 70%;
		width: 50%;
		border-radius: 12px;
		position: absolute;
		border: none;
		padding: 10px 15px;
		bottom: 15px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #005F23;
		font-weight: bold;
		font-size: 19px;
		color: #ffffff;
		margin-bottom: 20px;
		font-family: "Nunito", serif;
	}

	.container {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.btn {
		text-align: center;
		padding: 15px;
		background-color: #005F23;
		border: none;
		color: #FFFFFF;
		border-radius: 10px;
		opacity: 60%;
		width: 100%;
		font-size: 22px;
		font-weight: 600;
		font-family: "Nunito", serif;
	}

	.wrapper {
		position: relative;
		width: 100%;
		background-image: url("/assets/images/background.jpg");
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
		margin: 0;
		padding: 0;
	}

	.nuxt__links {
		width: 100%;
		padding: 0 80px;
		margin-bottom: 20%;
	}

</style>