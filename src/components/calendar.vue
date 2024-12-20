<template>
	<section class="feature-block">
		<div class="feature-block__calendar">
			<div ref="calendarContainer" class="calendar"></div>
		</div>
		<div class="feature-block__description">
			<div class="feature-block__title">{{ data.title }}</div>
			<div class="feature__article">{{ data.article }}.</div>
			<ul class="feature__list">
				<li v-for="item in data.feature" :key="item.id" class="feature__item"> {{ item.text}}</li>
			</ul>
		</div>
	</section>
</template>

<script setup>
	import {ref, onMounted} from 'vue'
	import CalendarAnimation from '/assets/animations/calendarAnimation.json'
	import Lottie from 'lottie-web'

	const data = ref({
		title: 'Calendar',
		article: 'Используйте календарь, чтобы отслеживать важные даты, ставить цели и отмечать достижения.',
		feature: [
			{
				id: 1,
				text: 'Добавляйте события на определённые даты'
			},
			{
				id: 2,
				text: 'Отмечайте выполненные цели'
			},
			{
				id: 3,
				text: 'Следите за своим прогрессом'
			},
		]
	})

	const calendarContainer = ref(null)

	onMounted(() => {
		if (calendarContainer.value) {
			Lottie.loadAnimation({
				container: calendarContainer.value,
				loop: false,
				autoplay: true,
				animationData: CalendarAnimation
			})
		}
	})

</script>

<style scoped>
	.feature-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30px;
		background: rgb(226, 215, 194);

	}

	.feature-block__calendar {
		flex: 1;
		padding: 15px;
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 10px;

	}

	.calendar {
		width: 100%;
	}

	.feature-block__description {
		flex: 1;
		padding-left: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.feature-block__title {
		font-size: 36px;
		font-weight: bold;
		color: #4a4a4a;
		margin-bottom: 20px;
	}

	.feature__article {
		font-size: 18px;
		color: #6a6a6a;
		margin-bottom: 20px;
	}

	.feature__list {
		list-style-type: none;
		padding: 0;
	}

	.feature__item {
		font-size: 20px;
		color: #4a4a4a;
		padding: 10px 0;
		border-bottom: 1px solid #f0f0f0;
		transition: transform 0.3s ease;
	}

	.feature__item:hover {
		transform: translateX(5px);
		color: #d147ab;
	}
</style>
