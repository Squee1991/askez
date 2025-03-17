<template>
	<div class="welcome">
		<div class="habbit__page">
			<div v-if="isHabitGoalVisible" class="overlay">
				<div class="habbit__goal" @click="closeHabitGoal">
					<div class="habit-goal-wrapper" @click.stop>
						<HabbitGoal @toggleHabit="toggleHabitGoal" @add="addTask" @close="closeHabitGoal"/>
					</div>
				</div>
			</div>
			<div class="progress__inner">
				<div class="user__greetings">
					<div class="title"> {{ $t('homePage.greetings') }},<span
						class="username"> {{ authStore.name}}</span>
					</div>
					<div class="button__add-goal">
						<button @click="toggleHabitGoal" class="goal__btn">
							<img src="assets/images/addTask.svg" alt="" class="goal__btn-icon"/>
						</button>
					</div>
				</div>
				<div class="goals__inner">
					<div class="goals__content">
						<div class="goals__btns-inner">
							<button
								class="achiv__btn"
								:class="{ 'active': activeButton === 'achiv' , 'background-active': buttonBackground === 'achiv'  }"
								@click="setActive('achiv')"> {{ $t('navTop.achiv') }}
							</button>
							<button class="achiv__btn"
							        :class="{ 'active': activeButton === 'tasks' , 'background-active': buttonBackground === 'tasks' }"
							        @click="setActive('tasks')">{{ $t('navTop.askez') }}
							</button>
							<button class="achiv__btn"
							        :class="{ 'active': activeButton === 'stats' , 'background-active': buttonBackground === 'stats' }"
							        @click="setActive('stats')">{{ $t('navTop.stats') }}
							</button>
						</div>
						<div class="add__goals">
							<div :class="{'visible' : activeButton === 'achiv' }" class="achiv">
								<Achievment/>
							</div>
							<div :class="{'visible': activeButton === 'stats'}" class="stats">
								<Statistic/>
							</div>
							<div :class="{ 'visible': activeButton === 'tasks' }" class="task__goal-content">
								<div class="task__goal-list"
								     v-for="task in tasks" :key="task.id">
									<div class="task__goal-list-inner">
										<div class="taks__progress__date-wrapper">
											<div class="task__datum-wrapper">
												<div class="task__goal-wrapper">
													<div class="task__goal-item goals goal__name">{{ task.goal }}
													</div>
												</div>
												<div class="task__date-wrapper">
													<div class="task__start__date tasks__date">
														<div class="task__goal-item goal__type">{{
															formatDate(task.dateRange.start)
															}}
														</div>
													</div>
													<img class="arrow__datum" src="../assets/images/arrayDatum.svg"
													     alt="">
													<div class="task__end__date tasks__date">
														<div class="task__goal-item goal__type">{{
															formatDate(task.dateRange.end)
															}}
														</div>
													</div>
												</div>

											</div>
										</div>
										<div class="taks__btns">
											<div class="task__progress-wrapper">
												<div class="task__progress-value">
													<div class="task__progress-green">
														<span>&#9989; </span>
														<span class="progress-green">{{
	                                                            habitStore.result(task.id).progress
	                                                            }}</span>
													</div>
													<div class="task__progress-green">
														<span>&#10060;</span>
														<span class="progress-red"> {{
	                                                            habitStore.result(task.id).progressMiss
	                                                            }}</span>
													</div>
												</div>
											</div>
											<div class="btn__details-wrapper">
												<button @click="openTaskDetails(task)" class="task__come-btn">
													{{ $t('homePage.btn') }}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="not__task-inner" v-if="isNotTask && activeButton === 'tasks'">
							<img class="no__task-icon" src="../assets/images/Memepanda.png" alt="">
							<span class="no__task-text"> {{ $t('homePage.no_active_goals') }}</span>
						</div>
					</div>
				</div>
				<Footer @toggleHabit="toggleHabitGoal"/>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, computed, onMounted, onUnmounted} from "vue";
	import {useHabitStore} from "../stores/habitStore.js";
	import {useAuthStore} from "../stores/authStore.js";
	import Achievment from "../src/components/achievment.vue"
	import Statistic from "../src/components/statistics.vue"
	import ProgressCircle from "../src/components/progressBar";
	import HabbitGoal from "../src/components/newHabitGoal.vue";
	import CustomCheckbox from "../src/components/customCheckbox.vue";
	import Archive from "../assets/images/Archive.svg";
	import Footer from '../src/components/footer.vue'
	import NotaskIcon from '../assets/images/NoTask.svg'
	import Cloud from '../assets/images/CloundIcon.svg'
	import {useLocalePath} from '#i18n';
	import {useRouter} from 'vue-router'
	import {getAuth} from "firebase/auth";

	const {locale} = useI18n()
	const localePath = useLocalePath()
	const router = useRouter()
	const habitStore = useHabitStore();
	const authStore = useAuthStore()
	const tasks = computed(() => habitStore.tasks);
	const progress = ref({});
	const isHabitGoalVisible = ref(false);
	const activeButton = ref('tasks');
	const buttonBackground = ref(null);
	const auth = getAuth()
	const user = auth.currentUser

	// const toggleHabitGoalHandler = () => {
	// 	isButtonActive.value = true
	// 	console.log('btn in footer');
	// 	emit('toggleHabit');
	// };

	const isNotTask = computed(() => habitStore.tasks.length === 0);

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
		return new Date(date).toLocaleDateString(locale.value, {
			day: "2-digit",
			month: "long",
		});
	};


	const setActive = (buttonName) => {
		activeButton.value = buttonName;
		buttonBackground.value = buttonName
		setTimeout(() => {
			buttonBackground.value = null
		}, 200)
	};

</script>

<style>

	.goal__btn {
		width: 40px;
		height: 40px;
		padding: 10px;
		border-radius: 50%;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #4FC55C;
		color: white;
		font-size: 16px;
		font-family: "Nunito", serif;
	}

	.goal__btn-icon {
		width: 40px;
		height: 40px;
	}

	.archive__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: orange;
	}

	.empty {
		color: #b8b1b1;
	}

	svg {
		color: currentColor;
	}

	.task__progress-green {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.progress-green,
	.progress-red {
		width: 40px;
	}

	.task__progress-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #94ea97;
		font-weight: bold;
		font-family: "Nunito", serif;
		border: none;
	}

	.task__progress-value {
		padding: 0 8px;
	}

	.task__goal-content {
		position: absolute;
		right: -100%;
		width: 100%;
		max-height: 70vh;
		overflow-y: auto;
		padding: 0 20px;
		opacity: 0;
		transition: .2s;
	}

	.task__goal-content.visible {
		right: 0;
		opacity: 1;
	}

	.task__goal-content:not(.visible) {
		transition: none;
		right: -100%;
		opacity: 0;
	}

	.stats {
		position: absolute;
		width: 100%;
		opacity: 0;
		overflow-y: auto;
		max-height: 70vh;
		transition: .2s;
	}

	.achiv {
		position: absolute;
		width: 100%;
		opacity: 0;
		transition: .2s;
	}

	.achiv:not(.visible),
	.stats:not(.visible) {
		transition: none;
		opacity: 0;
		left: -100%;
		right: -100%;
	}

	.achiv.visible {
		left: 0;
		opacity: 1;
	}

	.stats.visible {
		right: 0;
		opacity: 1;
	}

	.goals__btns-inner {
		margin: 0 -10px;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
	}

	.achiv__btn {
		position: relative;
		padding: 10px 10px;
		border: none;
		transition: .3s;
		color: var(--text-color);
		font-size: 16px;
		background: none;
		font-family: "Nunito", serif;
		font-weight: 600;
		border-radius: 10px;
	}

	.achiv__btn.active {
		color: #4CAF50;
	}

	.achiv__btn.background-active {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}

	.goals__content {
		flex-grow: 1;
		overflow-y: auto;
		padding: 10px;
		border-radius: 10px;
	}

	.task__come-btn {
		padding: 9px 18px;
		border: none;
		background: #4FC55C;
		border-radius: 5px;
		color: white;
		font-family: "Acme", serif;
	}

	.taks__btns {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.taks__progress__date-wrapper {
		display: flex;
		justify-content: space-between;
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
		font-family: "Acme", serif;
		letter-spacing: 1px;
		display: flex;
		font-size: 14px;
	}

	.not__task-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.no__task-icon {
		width: 120px;
	}

	.no__task-text {
		max-width: 200px;
		font-family: "Nunito", serif;
		font-weight: bold;
		font-size: 30px;
		color: #aed7ae;
		text-align: center;
	}

	.goals__inner {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		min-height: 0; /* Важно для корректного распределения высоты */
	}

	.task__goal-list-inner {
		display: flex;
		justify-content: space-between;
	}

	.habbit__page {
		display: flex;
		flex-direction: column;
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
		letter-spacing: 1px;
		margin-bottom: 5px;
		font-size: 18px;
		font-weight: 600;
		font-family: "Acme", serif;
		color: #4FC55C;
	}
	.add__goals {
		flex-grow: 1;
		overflow-y: auto; /* Добавляет скролл, если элементов много */
	}

	.task__goal-list {
		background-color: var(--menu--btn-bg);
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
		overflow: auto;
	}

	.progress__inner {
		width: 100%;
		height: 100vh;
		padding: 10px;
	}

	.welcome {
		width: 100%;
		background-color: var(--background-color);
		position: relative;
		height: 100vh;
		max-height: 100vh;
		overflow: hidden;
	}

	.title {
		font-size: 2.0rem;
		color: var(--title-c);
		font-family: "Acme", serif;
	}

	.username {
		padding: 0 10px;
		color: #FF5722;
		font-size: 2.0rem;
		font-weight: bold;
		font-family: "Acme", serif;
	}

	.user__greetings {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 20px 8px 20px;
	}

</style>
