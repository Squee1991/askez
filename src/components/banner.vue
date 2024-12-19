<template>
	<div class="container">
		<div class="banner">
			<div class="banner__content">
				<div class="banner__content-left">
					<div class="banner__article"> {{ data.article}}</div>
					<div class="banner__title"> {{ data.title}}</div>
					<div class="banner__btns">
						<button class="banner__btn btn">{{ data.btn.text}}</button>
					</div>
				</div>
				<div class="banner__content-right">
					<div ref="destContainer" class="banner__animation"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

	import Lottie from 'lottie-web'
	import BannerAnimation from '/assets/animations/bannerAnimation.json'
	import Arrow from '/assets/images/bannerArrow.svg'

	const destContainer = ref(null)
	import {ref, onMounted} from 'vue'

	onMounted(() => {
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
		article: 'Become a better person through austerities',
		title: 'Выбирай аскезы, отслеживай прогресс ' +
			'находи единомышленников и достигай новых высот',
		btn: {
			text: 'Начать аскезу'
		},
		bannerbackground: {
			src: '',
			alt: ''
		}
	})
</script>

<style scoped>

	.banner__content {
		display: flex;
		width: 100%;
	}

	.banner__article {
		font-size: 44px;
		font-family: "Orbitron", serif;
	}

	.banner__title {
		font-size: 18px;
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
		padding: 20px 55px;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		font-size: 20px;
		background: rgba(145, 118, 239, 0.84);
		color: white;
	}

	.banner__btns {
		width: 100%;
		display: flex;
	}

	.banner {
		background: linear-gradient(135deg, #E0F7FF, #E8D9FF, #FFDBE9);
	}

</style>