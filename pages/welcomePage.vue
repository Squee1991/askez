<template>
	<div class="welcome">
		<div class="habbit__page">
			<div class="overlay">
				<div v-if="isHabitGoalVisible" class="habbit__goal">
					<div class="habit-goal-wrapper">
						<HabbitGoal  @toggleHabit="toggleHabitGoal" @add="addTask" @close="closeHabitGoal"/>
					</div>
				</div>
			</div>
			<div class="progress__inner">
				<div class="user__greetings">
					<div class="title">Hello,<span class="username">{{ username }}</span></div>
				</div>
				<div class="banner__wrapper">
					<div class="panda__icon-wrapper">
						<img class="panda__icon" :src="PandaHello" alt="">
					</div>
				</div>
				<div class="goals__inner">
					<div class="habbit__content">
						<div class="habbit__header">
							<div class="goals__title goals__text">Your Habits</div>
							<button class="goals__list goals__text">Show all</button>
						</div>
						<div class="habbits__wrapper">
							<div class="add__habbits">
								<div :class="{'checked': task.checked}" class="task__habbit-list" v-for="task in tasks"
								     :key="task.id">
									<div class="task__goal-item habit goal__name">{{ task.habbit }}</div>
									<div class="checkbox__editor">
										<CustomCheckbox v-model="task.checked" @input="inputClick(task)"/>
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
								<div class="task__goal-list" v-for="task in tasks" :key="task.id">
									<div class="task__goal-wrapper">
										<div class="task__goal-item goals goal__name">{{ task.goal }}</div>
									</div>
									<div class="task__goal-list-inner">
										<div class="task__datum-wrapper">
											<div class="task__start__date tasks__date">
												<div class="task__goal-item goal__type">{{
													formatDate(task.dateRange.start) }}
												</div>
											</div>
											<img class="task__array-datum" src="../assets/images/arrayDatum.svg" alt="">
											<div class="task__end__date tasks__date">
												<div class="task__goal-item goal__type">{{
													formatDate(task.dateRange.end) }}
												</div>
											</div>
										</div>
										<ProgressCircle
											:key="progress[task.id]"
											v-model:progress="progress[task.id]"
											:radius="radius"
											:offset="offsetForTask(task.id)"
											:circumference="circumference"
										/>
									</div>
									<div class="delete__block__btns">
										<button @click="clearTask(task.id)" class="remove__task-btn">
											<span class="delete__text">Delete</span>
											<img class="delete__icon" src="../assets/images/deleteIcon.svg" alt="">
										</button>
									</div>
								</div>

							</div>

						</div>
					</div>
					<Footer @toggleHabit="toggleHabitGoal"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref, computed, onMounted, onUnmounted, defineEmits} from "vue";
	import {useHabitStore} from "/stores/habitStore.js";
	import ProgressCircle from "../src/components/progressBar";
	import HabbitGoal from "../src/components/newHabitGoal.vue";
	import CustomCheckbox from "../src/components/customCheckbox.vue";
	import PunktEditor from "../src/components/punkEditor.vue";
	import PandaHello from "../assets/images/greetings.webp";
	import ProfileIcon from '../assets/images/profile.png'
	import Footer from '../src/components/footer.vue'

	const punktValue = ref('');
	const habitStore = useHabitStore();
	const tasks = computed(() => habitStore.tasks);
	const progress = ref({});
	const radius = ref(45);
	const isHabitGoalVisible = ref(false);
	const circumference = computed(() => 2 * Math.PI * radius.value);
	let lastCheckedDate = new Date();

	const username = computed(() => habitStore.username);

	onMounted(() => {
		habitStore.loadUserData();
		habitStore.loadTasks();

	});

	const calculateProgressForTask = (task) => {
		const startDate = new Date(task.dateRange.start);
		const endDate = new Date(task.dateRange.end);
		const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
		const daysMissed = Math.max(0, Math.min(totalDays, Math.ceil((new Date() - startDate) / (1000 * 60 * 60 * 24))));
		const progressProcentDays = Math.floor((daysMissed / totalDays) * 100);
		return {totalDays, daysMissed, progressProcentDays};
	};

	const offsetForTask = (taskId) => {
		if (!progress.value[taskId]) return circumference.value;
		const taskProgress = progress.value[taskId];
		return circumference.value - (taskProgress / 100) * circumference.value;
	};

	const updateProgress = () => {
		tasks.value.forEach((task) => {
			const progressData = calculateProgressForTask(task);
			progress.value[task.id] = progressData.progressProcentDays;
		});
	};

	const addTask = (task) => {
		habitStore.addTask(task);
	};

	const inputClick = (task) => {
		habitStore.updateTask(task.id, task.checked);
	};

	const toggleHabitGoal = () => {
		console.log('btn from footer in WeclomePage');
		isHabitGoalVisible.value = true;
	};

	const closeHabitGoal = () => {
		isHabitGoalVisible.value = false;
	};

	const clearTask = (taskId) => {
		habitStore.removeTask(taskId);
	};

	onMounted(() => {
		updateProgress();
		const interval = setInterval(() => {
			const currentDate = new Date();
			if (currentDate.getDate() !== lastCheckedDate.getDate()) {
				lastCheckedDate = currentDate;
				updateProgress();
				console.log("Следующий день: прогресс обновлен");
			}
		}, 60000);

		onUnmounted(() => {
			clearInterval(interval);
		});
	});

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			day: "2-digit",
			month: "long",
		});
	};
</script>

<style>

	.task__array-datum {
		width: 18px;
		margin-right: 10px;
	}

	.delete__block__btns {
		margin-bottom: 10px;
		display: flex;
		width: 100%;
	}

	.delete__text {
		padding-right: 10px;
	}

	.delete__icon {
		width: 10px;
	}

	.remove__task-btn {
		width: 100%;
		border: none;
		background: #FF3E4BCC;
		font-size: 14px;
		border-radius: 10px;
		padding: 10px 0;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: "Nunito", serif;
	}

	.task__datum-wrapper {
		display: flex;
		align-items: center;
	}

	.task__goal-list-inner {
		display: flex;
		justify-content: space-between;
	}

	.task__label {
		font-size: 16px;
		font-weight: 600;
		font-family: "Nunito", serif;
		color: #94a3b8;
	}

	.habbit__page {
		display: flex;
		flex-direction: column;
	}

	.tasks__date {
		padding-right: 15px;
	}

	.content__bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #d6dcec;
		padding: 10px 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.settings__icon-item,
	.profile__icon-item {
		width: 25px;
	}

	.panda__icon {
		width: 100%;
		height: 100%;
	}

	.checkbox__editor {
		display: flex;
		align-items: center;
		position: relative;
	}

	.goal__type {
		color: #a1a1c9;
		font-weight: 600;
	}

	.goals {
		font-size: 18px;
		font-weight: 600;
		font-family: "Nunito", serif;
		color: green;

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

	.habit {
		font-size: 18px;
		font-weight: 600;
		font-family: "Nunito", serif;
		color: #FF5722;
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
		width: 40px;
		height: 40px;
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
		background: #5bbd83;
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
		padding: 8px 20px;
	}

	.banner__wrapper {
		width: 100%;
		border-radius: 15px;
		padding: 0 20px;
	}

	.button__add-goal {
		display: flex;
		justify-content: end;
		margin-top: 20px;
	}
</style>
