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
					<div class="title"> {{ $t('homePage.greetings')}},<span
						class="username">{{ username || 'Guest'}} </span></div>
					<div v-if="habitStore.archiveTasks.length" :class="{'empty' : !habitStore.archiveTasks.length}"
					     @click="toArchieve" class="archive__icon">
						<svg height="30px" width="30px" viewBox="0 0 60 60" xml:space="preserve">
<g stroke="currentColor" stroke-width="4">
	<path d="M55,47.166c-0.43-4.107-3.853-7.333-7.954-7.333c-2.564,0-4.983,1.287-6.479,3.402c-0.292-0.051-0.588-0.076-0.884-0.076
		c-2.32,0-4.381,1.577-5.066,3.813c-1.907,1.131-3.116,3.241-3.116,5.502c0,3.506,2.785,6.358,6.208,6.358h10.774
		c0.058,0,0.114-0.003,0.188-0.007c0.057,0.004,0.114,0.007,0.172,0.007h4.31c3.225,0,5.849-2.687,5.849-5.989
		C59,50.244,57.358,47.971,55,47.166z M53.151,56.833l-4.349-0.003l-0.173-0.005l-10.922,0.008c-2.32,0-4.208-1.955-4.208-4.358
		c0-1.665,0.949-3.21,2.417-3.935l0.435-0.214l0.102-0.475c0.331-1.56,1.689-2.692,3.229-2.692c0.344,0,0.687,0.057,1.019,0.169
		l0.777,0.261l0.409-0.711c1.079-1.878,3.057-3.045,5.158-3.045c3.265,0,5.955,2.747,5.999,6.124l0.011,0.814l0.799,0.154
		C55.677,49.279,57,50.927,57,52.844C57,55.043,55.273,56.833,53.151,56.833z" stroke="#b8b1b1"/>
	<path d="M22.505,18h10.99C35.428,18,37,16.428,37,14.495V13c0-0.553-0.447-1-1-1s-1,0.447-1,1v1.495C35,15.325,34.325,16,33.495,16
		h-10.99C21.675,16,21,15.325,21,14.495V13c0-0.553-0.447-1-1-1s-1,0.447-1,1v1.495C19,16.428,20.572,18,22.505,18z"/>
	<path d="M30,45h-7.495C21.675,45,21,44.325,21,43.495V42c0-0.553-0.447-1-1-1s-1,0.447-1,1v1.495C19,45.428,20.572,47,22.505,47H30
		c0.553,0,1-0.447,1-1S30.553,45,30,45z"/>
	<path d="M26,58H3.832C3.373,58,3,57.627,3,57.168V31h50v7.074c0,0.553,0.447,1,1,1s1-0.447,1-1V2.832C55,1.271,53.729,0,52.168,0
		H3.832C2.271,0,1,1.271,1,2.832v54.336C1,58.729,2.271,60,3.832,60H26c0.553,0,1-0.447,1-1S26.553,58,26,58z M3.832,2h48.336
		C52.627,2,53,2.373,53,2.832V29H3V2.832C3,2.373,3.373,2,3.832,2z"/>
</g>
</svg>
					</div>
				</div>
				<div class="goals__inner">
					<div class="goals__content">
						<div class="goals__btns-inner">
							<button
								class="achiv__btn"
								:class="{ 'active': activeButton === 'achiv' , 'background-active': buttonBackground === 'achiv'  }"
								@click="setActive('achiv')"> {{ $t('navTop.achiv')}}
							</button>
							<button class="achiv__btn"
							        :class="{ 'active': activeButton === 'tasks' , 'background-active': buttonBackground === 'tasks' }"
							        @click="setActive('tasks')">{{ $t('navTop.askez')}}
							</button>
							<button class="achiv__btn"
							        :class="{ 'active': activeButton === 'stats' , 'background-active': buttonBackground === 'stats' }"
							        @click="setActive('stats')">{{ $t('navTop.stats')}}
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
															formatDate(task.dateRange.start) }}
														</div>
													</div>
													<img class="arrow__datum" src="../assets/images/arrayDatum.svg"
													     alt="">
													<div class="task__end__date tasks__date">
														<div class="task__goal-item goal__type">{{
															formatDate(task.dateRange.end) }}
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
														<span class="progress-green">{{ habitStore.result(task.id).progress }}</span>
													</div>
													<div class="task__progress-green">
														<span>&#10060;</span>
														<span class="progress-red"> {{ habitStore.result(task.id).progressMiss }}</span>
													</div>
												</div>
											</div>
											<div class="btn__details-wrapper">
												<button @click="openTaskDetails(task)" class="task__come-btn">
													{{ $t('homePage.btn')}}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="not__task-inner" v-if="isNotTask && activeButton === 'tasks'">
							<img class="no__task-icon" src="../assets/images/Memepanda.png" alt="">
							<span class="no__task-text"> {{ $t('homePage.no_active_goals')}}</span>
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
	import Achievment from "../src/components/achievment.vue"
	import Statistic from "../src/components/statistics.vue"
	import ProgressCircle from "../src/components/progressBar";
	import HabbitGoal from "../src/components/newHabitGoal.vue";
	import CustomCheckbox from "../src/components/customCheckbox.vue";
	import Archive from "../assets/images/Archive.svg";
	import Footer from '../src/components/footer.vue'
	import NotaskIcon from '../assets/images/NoTask.svg'
	import {useLocalePath} from '#i18n';
	import {useRouter} from 'vue-router'

	const {locale} = useI18n()
	const localePath = useLocalePath()
	const isNotTask = ref(true)
	const router = useRouter()
	const habitStore = useHabitStore();
	const tasks = computed(() => habitStore.tasks);
	const progress = ref({});
	const isHabitGoalVisible = ref(false);
	const username = computed(() => habitStore.username);
	const activeButton = ref('tasks');
	const buttonBackground = ref(null);
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

	const toArchieve = () => {
		router.push('/archive')
	}

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

	html, body {
		overflow-x: hidden;
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

	.achiv {
		position: absolute;
		left: -100%;
		width: 100%;
		opacity: 0;
		overflow: hidden;
		transition: .2s;
	}

	.stats {
		position: absolute;
		right: -100%;
		width: 100%;
		opacity: 0;
		overflow: hidden;
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
		transform: translate(-50% , -50%);
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

		font-family: "Nunito", serif;
		font-weight: bold;
		font-size: 30px;
		color: #aed7ae;
		text-align: center;
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
