<template>
	<div class="start__page">
		<div class="form__logo">
			<img class="form__logo-icon" src="../assets/images/logo.png" alt="Logo"/>
		</div>
		<Transition name="fade">
			<div v-if="isLoading" class="loading-screen">
				<Transition name="fade">
					<div v-if="loading" class="loading">{{ $t('accState.load') }}</div>
				</Transition>
				<div class="loader"></div>
			</div>
		</Transition>
		<Transition name="fade">
			<div v-if="!isLoading" class="wrapper">
				<div class="container-lottie">
					<div ref="animationContainer"></div>
				</div>
				<Transition name="fade">
					<div v-if="showButton" class="nuxt__links">
						<button @click="toRegistration" class="btn"> {{ $t("startPage.value")}}</button>
					</div>
				</Transition>
			</div>
		</Transition>
	</div>
</template>
<script setup>
	import Lottie from 'lottie-web'
	import {ref, onMounted, nextTick} from 'vue'
	import Panda from 'assets/animations/panda.json'
	import {useRouter} from 'vue-router'
	const router = useRouter()
	const animation = ref(false)
	const loading = ref(false)
	const isLoading = ref(true);
	const animationContainer = ref(null)
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase;
	const showButton = ref(false)
	const toRegistration = () => {
		router.push('singup')
	}

	onMounted(() => {
		setTimeout(() => {
			loading.value = true
		}, 300)
		setTimeout(async () => {
			isLoading.value = false
			await nextTick()
			if (animationContainer.value) {
				Lottie.loadAnimation({
					container: animationContainer.value,
					loop: true,
					autoplay: true,
					animationData: Panda
				})
			}
			setTimeout(() => {
				showButton.value = true
			}, 500)
		}, 2000)
	})

	definePageMeta({
		middleware: ['auth'],
	})
</script>
<style scoped>
	.form__logo {
		position: absolute;
		top: 10%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-bottom: 15px;
		color: var(--text-color);
	}

	.form__logo-icon {
		margin-top: 20px;
		padding: 5px;
		width: 110px;
	}

	.loader {
		width: 100%;
		height: 22px;
		border-radius: 40px;
		color: #514b82;
		border: 2px solid;
		position: relative;
	}

	.loader {
		width: 0;
		height: 4.8px;
		display: inline-block;
		position: relative;
		background: #FFF;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
		box-sizing: border-box;
		animation: animFw 8s linear infinite;
	}

	.loader::after,
	.loader::before {
		content: '';
		width: 10px;
		height: 1px;
		background: #FFF;
		position: absolute;
		top: 9px;
		right: -2px;
		opacity: 0;
		transform: rotate(-45deg) translateX(0px);
		box-sizing: border-box;
		animation: coli1 0.3s linear infinite;
	}

	.loader::before {
		top: -4px;
		transform: rotate(45deg);
		animation: coli2 0.3s linear infinite;
	}

	@keyframes animFw {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes coli1 {
		0% {
			transform: rotate(-45deg) translateX(0px);
			opacity: 0.7;
		}
		100% {
			transform: rotate(-45deg) translateX(-45px);
			opacity: 0;
		}
	}

	@keyframes coli2 {
		0% {
			transform: rotate(45deg) translateX(0px);
			opacity: 1;
		}
		100% {
			transform: rotate(45deg) translateX(-45px);
			opacity: 0.7;
		}
	}

	.loading {
		font-size: 24px;
		text-align: center;
		font-weight: bold;
		color: var(--text-color);
		font-family: "Acme", serif;
		margin-bottom: 10px;
	}

	.loading-screen {
		position: absolute;
		bottom: 10%;
		width: 100%;
		left: 0;
		padding: 0 20px;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.7s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.container-lottie {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.btn {
		text-align: center;
		padding: 14px 18px;
		background-color: #005F23;
		border: none;
		opacity: 85%;
		color: #FFFFFF;
		border-radius: 30px;
		width: 100%;
		font-size: 17px;
		font-weight: 500;
		font-family: -apple-system, BlinkMacSystemFont, "Nunito", sans-serif;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: all 0.2s ease;
	}

	.btn:active {
		transform: scale(0.98);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		opacity: 0.9;
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