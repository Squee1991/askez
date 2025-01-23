<template>
	<div class="success-modal">
		<div class="wrapper">
			<div class="img__wrrapper">
				<img class="img__panda" :src="SuccessPanda" alt="">
			</div>
			<div class="success__title">Done!!</div>
			<div class="success__text">Let’s do the best to achieve your goal!</div>
			<!--				<button class="success__btn" @click="$emit('close')">OK</button>-->
			<NuxtLink to="/welcomePage">
				<button class="success__btn">OK</button>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import SuccessPanda from '/assets/images/successPanda.png';
	import { useRoute } from 'vue-router';
	const route = useRoute();
	const username = route.query.username
</script>

<style scoped>

	.success-modal {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: #fff;
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
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.success__title {
		font-size: 40px;
		font-weight: bold;
		color: #5D4037;
	}

	.success__text {
		text-align: center;
		padding: 10px;
		color: #757575;
		font-size: 16px;
	}

</style>
