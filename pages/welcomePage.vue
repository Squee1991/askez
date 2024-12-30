<template>
	<div class="welcome">
		<div class="overlay">
			<div v-if="showHabitGoal" class="habbit__goal">
				<div class="habit-goal-wrapper">
					<HabbitGoal
						@add="addTask"
						@close="closeHabitGoal"
					/>
				</div>
			</div>
		</div>
		<div class="progress__inner">
			<div class="user__greetings">
				<div class="title">Hello,<span class="username">{{ username }}</span></div>
			</div>
			<div class="progress__circle-wrapper">
				<ProgressCircle
					:progress="progress"
					:radius="radius"
					:offset="offset"
					:circumference="circumference"
				/>
			</div>
			<div class="goals__inner">
				<div class="goals__content">
					<div class="goals__header">
						<div class="goals__title goals__text">Your Goals</div>
						<button class="goals__list goals__text">Show all</button>
					</div>
					<div class="add__here">
						<ul v-for="task in tasks" :key="task.id">
							<li class="task__goal goal"> {{ task.goal}}</li>
							<li class="task__goal name"> {{ task.name}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="button__add-goal">
				<button @click="toggleHabitGoal" class="goal__btn">add</button>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {useRoute} from "vue-router";
	import {ref, onMounted, computed, watch} from 'vue';
	import ProgressCircle from '../src/components/progressBar'
	import HabbitGoal from '../src/components/newHabitGoal.vue'

	const route = useRoute();
	const username = route.query.username;
	const tasks = ref([]);
	const progress = ref(11);
	const radius = 45;
	const showHabitGoal = ref(false);
	const circumference = 2 * Math.PI * radius;
	const offset = computed(() => {
		return circumference - (progress.value / 100) * circumference;
	})

	const toggleHabitGoal = () => {
		showHabitGoal.value = true
	}

	const addTask = (goal, name) => {
		const newTask = {
			id: Date.now(),
			goal: goal,
			name: name,
		};
		tasks.value.push(newTask);
	};

	const closeHabitGoal = () => {
		showHabitGoal.value = false
	}

</script>

<style>

	.habit-goal-wrapper {
		padding-top: 100px;
	}

	.habbit__goal {
		background: rgba(255, 255, 255, 0.3);
		height: 100vh;
		padding: 20px;
		width: 100%;
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
	}

	.goal__btn {
		padding: 10px 15px;
		border-radius: 10px;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #367650;
		color: white;
		font-size: 16px;
		font-family: "Nunito", serif;
	}

	.goals__title {
		font-size: 20px;
		font-family: "Nunito", serif;
		font-weight: 600;
	}

	.goals__list {
		font-size: 14px;
		font-family: "Nunito", serif;
		color: green;
		border: none;
		background: none;
	}

	.goals__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.progress__inner {
		width: 100%;
		padding: 10px;
	}

	.goals__content {
		padding: 20px;
		background: #dfe6f3;
		border-radius: 10px;
	}

	.goals__inner {
		padding: 30px 0;
	}

	.welcome {
		width: 100%;
		height: 100vh;
		background: #f5f1f1;
		position: relative;
	}

	.title {
		font-size: 2.0rem;
		color: black;
		font-family: "Nunito", serif;
	}

	.username {
		padding: 0 10px;
		color: #FF5722;
		font-size: 2.0rem;
		font-weight: bold;
	}

	.user__greetings {
		display: flex;
		align-items: center;
		padding: 20px 0;
	}

	.progress__circle-wrapper {
		background: #7ACB7A;
		width: 100%;
		padding: 10px;
		border-radius: 10px;
	}
</style>
