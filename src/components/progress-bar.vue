<template>
	<section class="progress-block">
		<div class="progress-block__description">
			<div class="progress__title">{{ data.title}}</div>
			<ul class="progress__list">
				<li v-for="item in data.progress" class="progress__list-item"> {{ item.text}}</li>
			</ul>
		</div>
		<div ref="progressContainer" class="progress-block__img"></div>
	</section>

</template>

<script setup>

	import {ref, onMounted} from 'vue'
	import Progress from '/assets/animations/deskHuman.json'
	import Lottie from 'lottie-web'

	const data = ref({
		title: 'Трекер прогресса',
		progress: [
			{id: 1, text: 'Отображение процента выполнения'},
			{id: 2, text: 'Визуализация достижений'},

		]

	})

	const progressContainer = ref(null)

	onMounted(() => {
		if (progressContainer.value) {
			Lottie.loadAnimation({
				container: progressContainer.value,
				loop: false,
				autoplay: true,
				animationData: Progress
			})
		}
	})

</script>

<style scoped>

	.progress-block__img {
		width: 50%;
	}

	.progress-block {
		display: flex;
		gap: 32px;
		padding: 32px;
		background-color: #f9f9f9;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.progress-block__description {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.progress__title {
		font-size: 50px;
		display: flex;
	}

	.progress__list-item {
		font-size: 24px;

	}

</style>