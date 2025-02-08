<template>
	<div class="success-modal">
		<div class="wrapper">
			<div class="img__wrrapper">
				<img class="img__panda" :src="SuccessPanda" alt="">
			</div>
			<div class="success__title">{{$t('success.title')}}</div>
			<div class="success__text">{{$t('success.article')}}!</div>
			<NuxtLink to="/welcomePage">
				<button class="success__btn">{{$t('success.button')}}</button>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import SuccessPanda from '/assets/images/successS.png';
	import { useRoute } from 'vue-router';
	const route = useRoute();
	const username = route.query.username
</script>

<style scoped>

	.success-modal {
		position: relative;
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
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20px;
		color: #333;
		text-align: center;
	}

	.success__btn {
		width: 100%;
		margin-top: 10px;
		padding: 10px 40px;
		background: #FFB74D;
		color: white;
		font-size: 20px;
		border: none;
		border-radius: 15px;
		cursor: pointer;
		font-weight: bold;
		font-family: "Nunito", serif;
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.success__title {
		font-size: 40px;
		font-weight: bold;
		/*color: #5D4037;*/
		color: var(--text-color);
	}

	.success__text {
		text-align: center;
		padding: 10px;
		color: var(--text-color);
		font-size: 15px;
		font-weight: 400;
		font-family: "Nunito", serif;
		letter-spacing: 2px;
	}

</style>
