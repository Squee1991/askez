<template>
	<div class="about__wrapper">
		<HeaderWithBack
			title="back to menu"
			:icon="Arrow"/>
		<div class="about__content">
			<div class="about__inner">
				<img class="about__img" src="../assets/images/aboutAPP.png" alt="">
			</div>
			<div class="about__text">Component under development...</div>
		</div>
	</div>
</template>

<script setup>
	import HeaderWithBack from '../src/components/headerWithBack.vue';
	import Arrow from '../assets/images/arrowBack.svg'
	import AboutPanda from '../assets/images/aboutAPP.png'
</script>

<style scoped>
	.about__wrapper {
		position: relative;
		padding: 25px;
		height: 100vh;
		width: 100%;
		background-color: var(--background-color);
	}

	.about__inner {
		margin: 40px 0;
		width: 80%;
		border-radius: 50%;
		background: #d5c4c4;
		overflow: hidden;
		border: 5px solid var(--background-color);
	}

	.about__text {
		text-align: center;
		font-size: 30px;
		color: var(--text-color);
		font-family: "Acme", serif;
	}

	.about__content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.about__img {
		width: 100%;
	}
</style>