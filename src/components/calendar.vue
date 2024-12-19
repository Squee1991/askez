<template>
	<section class="feature-block">
		<div class="feature-block__calendar">
			<div ref="calendarContainer" class="calendar">

			</div>
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
			{id: 1, text: 'Добавляйте события на определённые даты'},
			{id: 2, text: 'Отмечайте выполненные цели'},
			{id: 3, text: 'Следите за своим прогрессом'},

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

		padding: 20px;
		background-color: #f3e9e9;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.feature-block__calendar {
		flex: 1;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}

	.calendar {
		text-align: center;
	}

	.feature-block__description {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.feature-block__title {
		font-size: 50px;
		margin-bottom: 30px;
	}

	.feature__item {
		padding: 20px;
		font-size: 22px;
	}


</style>