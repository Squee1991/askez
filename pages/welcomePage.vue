<template>
	<div class="welcome">
		<div class="habbit__page">
			<div class="overlay">
				<div v-if="isHabitGoalVisible" class="habbit__goal">
					<div class="habit-goal-wrapper">
						<HabbitGoal @toggleHabit="toggleHabitGoal" @add="addTask" @close="closeHabitGoal"/>
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
					<div class="goals__content">
						<div class="goals__wrapper">
							<div class="add__goals">
								<div class="task__goal-list" v-for="task in tasks" :key="task.id">

									<div class="task__goal-list-inner">
										<div class="taks__progress__date-wrapper">
											<div class="progres__wrapper">
												<ProgressCircle
													:progress="Math.floor(task.progress)"
													:progressMiss="Math.floor(task.progressMiss)"
													:history="task.history"
												/>
											</div>
											<div class="task__datum-wrapper">
												<div class="task__goal-wrapper">
													<div class="task__goal-item goals goal__name">{{ task.goal }}</div>
												</div>
												<div class="task__date-wrapper">
													<div class="task__start__date tasks__date">
														<div class="task__goal-item goal__type">{{
															formatDate(task.dateRange.start) }}
														</div>
													</div>
													<img class="arrow__datum" src="../assets/images/arrayDatum.svg" alt="">
													<div class="task__end__date tasks__date">
														<div class="task__goal-item goal__type">{{
															formatDate(task.dateRange.end) }}
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="taks__btns">
											<div class="btn__details-wrapper">
												<button @click="openTaskDetails(task)" class="task__come-btn">
													Open goal
												</button>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div class="not__task-inner" v-if="isNotTask">
							<img class="no__task-icon" src="../assets/images/NoTask.svg" alt="">
							<span class="no__task-text">No active Goals</span>
						</div>
					</div>
					<Footer @toggleHabit="toggleHabitGoal"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref, computed, onMounted, onUnmounted} from "vue";
	import {useHabitStore} from "../stores/habitStore.js";
	import ProgressCircle from "../src/components/progressBar";
	import HabbitGoal from "../src/components/newHabitGoal.vue";
	import CustomCheckbox from "../src/components/customCheckbox.vue";
	import PandaHello from "../assets/images/greetings.webp";
	import Footer from '../src/components/footer.vue'
	import NotaskIcon from '../assets/images/NoTask.svg'

	const isNotTask = ref(true)
	import {useRouter} from 'vue-router'

	const router = useRouter()
	const habitStore = useHabitStore();
	const tasks = computed(() => habitStore.tasks);
	const progress = ref({});
	const radius = ref(45);
	const isHabitGoalVisible = ref(false);
	const circumference = computed(() => 2 * Math.PI * habitStore.radius);
	const username = computed(() => habitStore.username);

	onMounted(() => {
		habitStore.loadUserData();
		habitStore.loadTasks();
		isNotTask.value = tasks.value.length === 0;
	});

	const openTaskDetails = (task) => {
		router.push({
			path: "/TaskDetails",
			query: {
				id: task.id,
			},
		});
	};

	const addTask = (task) => {
		habitStore.addTask(task);
		console.log(habitStore.tasks);
		isNotTask.value = tasks.value.length === 0;
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
		isNotTask.value = tasks.value.length === 0;
	};

	const formatDate = (date) => {
		const formattedDate = new Date(date).toLocaleDateString("en-US", {
			day: "2-digit",
			month: "long",
		});
		console.log("Даты   :", formattedDate);
		return formattedDate;
	};
</script>

<style>
	.task__come-btn {
		padding: 9px 18px;
		border: none;
		background: #4FC55C;
		border-radius: 5px;
		color: white;
		font-family: "Nunito", serif;
	}

	.remove__task-btn {
		border: none;
	}

	.taks__btns {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.taks__progress__date-wrapper {
		display: flex;
		justify-content: space-between;
	}

	.btn__delete-wrapper {
		display: flex;
		justify-content: center;
		padding: 10px;
	}

	.progres__wrapper {
		width: 90px;
	}

	.task__datum-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: start;
	}

	.task__date-wrapper {
		display: flex;
		font-size: 14px;
	}

	.delete__icon {
		width: 20px;
	}

	.not__task-inner {
		margin: 10px auto;
		width: 140px;
		height: 140px;
		border-radius: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.no__task-icon {
		width: 45px;
	}

	.no__task-text {
		font-family: "Nunito", serif;
		font-weight: bold;
		font-size: 15px;
		color: #aed7ae;
	}

	.task__goal-list-inner {
		display: flex;
		justify-content: space-between;
	}

	.habbit__page {
		display: flex;
		flex-direction: column;
	}

	.panda__icon {
		width: 100%;
		height: 100%;
	}

	.goal__type {
		font-weight: 300;
		color: var(--goals-date-color);
	}

	.arrow__datum {
		margin: 0 5px;
		width: 16px;
	}

	.goals {
		font-size: 18px;
		font-weight: 600;
		font-family: "Nunito", serif;
		color:var(--goals-name);
	}

	.task__goal-list {
		background-color: var(--task-bg);
		margin: 7px 0;
		border-radius: 10px;
		padding: 10px;
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

	.add__goals {
		margin-bottom: 40px;
		padding: 10px 0;
	}

	.progress__inner {
		width: 100%;
		padding: 10px;
	}

	.welcome {
		width: 100%;
		background-color: var(--background-color);
		position: relative;
		height: 100vh;
		max-height: 100vh;
	}

	.title {
		font-size: 2.0rem;
		color: var(--title-c);
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
</style>
