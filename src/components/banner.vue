<template>
	<div class="container">
		<div class="banner">
			<div class="banner__content">
				<div class="banner__content-left">
					<div v-html="data.article.text" class="banner__article"></div>
					<div class="banner__title">{{ data.title }}</div>
					<div class="banner__btns">
						<button class="banner__btn btn">{{ data.btn.text }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import Lottie from 'lottie-web'
	import BannerAnimation from '/assets/animations/bannerAnimation.json'
	import Arrow from '/assets/images/bannerArrow.svg'

	const destContainer = ref(null)

	onMounted(() => {
		const savedValues = localStorage.getItem('values');
		if (savedValues) {
			values.value = JSON.parse(savedValues);
		}
		if (destContainer.value) {
			Lottie.loadAnimation({
				container: destContainer.value,
				loop: false,
				autoplay: true,
				animationData: BannerAnimation
			})
		}
	})

	const data = ref({
		article: {
			text: 'Askese: every day a new step towards perfection  ',
		},
		title: 'Take steps towards becoming the best version of yourself every day.',
		btn: {
			text: 'Начать аскезу'
		},
		bannerbackground: {
			src: '',
			alt: ''
		}
	})
</script>

<style >
	.banner__content {
		display: flex;
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.banner__article {
		display: flex;
		justify-content: center;
		font-size: 54px;
		font-family: "Open Sans", serif;
	}

	.banner__title {
		font-size: 20px;
		padding: 30px 0;
		font-family: 'Manrope', serif;
		line-height: 22px;
	}

	.banner__content-left {
		padding: 40px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.banner__content-right {
		width: 50%;
	}

	.banner__btn {
		margin: 40px 0;
		padding: 20px 55px;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		font-size: 20px;
		color: white;
		background: rgb(0, 51, 102)
	}

	.banner__btns {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.banner {
		background: rgb(255, 245, 225);
	}
</style>
