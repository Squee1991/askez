<template>
	<div class="success-modal">
		<div class="wrapper">
			<div class="img__wrrapper">
				<img class="img__panda" :src="SuccessPanda" alt="">
			</div>
			<div class="success__title">{{$t('success.title')}}</div>
			<div class="success__text">{{$t('success.article')}}!</div>
			<button @click="cloeWindow" class="success__btn">{{$t('success.button')}}</button>
		</div>
	</div>
</template>

<script setup>
	import SuccessPanda from '../../assets/images/successicon.png';
	import {useRoute, useRouter } from 'vue-router';
	import { defineEmits } from 'vue'
	const route = useRoute();
	const username = route.query.username
	const emit = defineEmits(['close'])
	const cloeWindow = () => {
		emit('close')
	}
</script>

<style scoped>
	.success-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: var(--background-color);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		z-index: 1000;
	}

	.img__panda {
		width: 100%;
	}

	.img__wrrapper {
		max-width: 300px;
	}

	.wrapper {
		height: 100vh;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20px;
		color: #333;
		text-align: center;
	}

	.success__btn {
		width: 50%;
		margin-top: 10px;
		padding: 10px 40px;
		background: linear-gradient(to right, #6378e1, #8199f4);
		color: white;
		font-size: 20px;
		border: none;
		border-radius: 15px;
		cursor: pointer;
		font-weight: bold;
		font-family: "Nunito", serif;
		box-shadow: 0 4px 12px rgba(99, 120, 225, 0.4);
		transition: all 0.2s ease-in-out;
		touch-action: manipulation;
	}

	.success__title {
		font-size: 40px;
		font-weight: bold;
		color: var(--text-color);
	}

	.success__text {
		max-width: 300px;
		text-align: center;
		padding: 10px;
		color: var(--text-color);
		font-size: 15px;
		font-weight: 400;
		font-family: "Nunito", serif;
		letter-spacing: 2px;
	}
</style>
