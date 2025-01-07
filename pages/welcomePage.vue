<template>
	<div class="welcome">
		<div class="overlay">
			<div v-if="isHabitGoalVisible" class="habbit__goal">
				<div class="habit-goal-wrapper">
					<HabbitGoal @add="addTask" @close="closeHabitGoal" />
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
					:circumference="circumference"/>
			</div>
			<div class="goals__inner">
				<div class="habbit__content">
					<div class="habbit__header">
						<div class="goals__title goals__text">Your Habbit</div>
						<button class="goals__list goals__text">Show all</button>
					</div>
					<div class="habbits__wrapper">
						<div class="add__habbits">
							<div :class="{'checked': task.checked}" class="task__habbit-list" v-for="task in habitStore.tasks"
							     :key="task.id">
								<li class="task__goal-item name goal__name"> {{ task.habbit}}</li>
								<div class="checkbox__editor">
									<CustomCheckbox
										v-model="task.checked"
										@input="inputClick(task)"
									/>
									<PunktEditor :value="punktValue"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="goals__content">
					<div class="goals__header">
						<div class="goals__title goals__text">Your Goals</div>
						<button class="goals__list goals__text">Show all</button>
					</div>
					<div class="goals__wrapper">
						<div class="add__goals">
							<ul class="task__goal-list" v-for="task in habitStore.tasks" :key="task.id">
								<li class="task__goal-item goal__name">{{ task.goal }}</li>
								<li class="task__goal-item goal__type">
									{{ formatDate(task.dateRange.start)}}
									- {{ formatDate(task.dateRange.end) }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="button__add-goal">
				<button @click="toggleHabitGoal" class="goal__btn">
					<img class="goal__btn-icon" :src="AddIcon" alt="">
				</button>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {useRoute} from "vue-router";
	import {ref, computed} from 'vue';
	import ProgressCircle from '../src/components/progressBar'
	import HabbitGoal from '../src/components/newHabitGoal.vue'
	import AddIcon from '../assets/images/addIcon.svg'
	import CustomCheckbox from '../src/components/customCheckbox.vue'
	import PunktEditor from '../src/components/punkEditor.vue'
	import { useHabitStore } from '/stores/habitStore.js';
	const punktValue = ref("");
	const habitStore = useHabitStore();
	const route = useRoute();
	const username = route.query.username;
	const tasks = ref([]);
	const progress = ref(11);
	const radius = 45;
	const isHabitGoalVisible = ref(false);
	const circumference = 2 * Math.PI * radius;
	const offset = computed(() => {
		return circumference - (progress.value / 100) * circumference;
	})

	const inputClick = (task) => {
		task.checked = !task.checked;
	};

	const toggleHabitGoal = () => {
		isHabitGoalVisible.value = true
	}
	const addTask = (task) => {
		habitStore.addTask(task);
	};

	const closeHabitGoal = () => {
		isHabitGoalVisible.value = false
	}

	const formatDate = (date) => {
		return date.toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'long'
		});
	};

</script>

<style>

	/** {*/
	/*	padding: 0;*/
	/*	margin: 0;*/
	/*	box-sizing: border-box;*/
	/*}*/


	.checkbox__editor {
		display: flex;
		align-items: center;
		position: relative;
	}

	.goal__type {
		color: #FF5C00;
	}

	.name {
		font-size: 16px;
		font-weight: 600;
		font-family: "Nunito", serif;
	}

	.task__habbit-list {
		display: flex;
		justify-content: space-between;
		color: #37C871;
		background: #FBFBFB;
		align-items: center;
		margin: 7px 0;
		border-radius: 10px;
		padding: 15px 10px;
	}

	.checked {
		background: #b5e2ca;
	}

	.task__goal-list {
		background: #FBFBFB;
		margin: 7px 0;
		border-radius: 10px;
		padding: 5px 10px;
	}

	.habbit__goal {
		background: rgba(255, 255, 255, 0.3);
		height: 100vh;
		width: 100%;
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		z-index: 1;
	}

	.goal__btn-icon {
		width: 100%;
	}

	.add__habbits,
	.add__goals {
		padding: 10px 0;
	}

	.goal__btn {
		width: 50px;
		height: 50px;
		padding: 10px;
		border-radius: 50%;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #84dea8;
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

	.goals__header,
	.habbit__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}

	.progress__inner {
		width: 100%;
		padding: 10px;
	}

	.goals__content,
	.habbit__content {
		margin: 8px 0;
		padding: 15px 10px 0 10px;
		background: #eaeaea26;
		border-radius: 10px;
	}

	.goals__inner {
		padding: 30px 0;
	}

	.welcome {
		width: 100%;
		background: #FCFCFF;
		position: relative;
		height: 100vh;
		max-height: 100vh;

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

	.button__add-goal {
		display: flex;
		justify-content: end;
		margin-top: 20px;
	}
</style>
