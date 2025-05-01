<template>
	<div class="welcome">
		<Transition name="fade">
			<div v-if="authStore.isBotEnabled && showAIGreeting && greetingMessage"
			     class="ai-greeting"
			     @click="goToBot"
			>
				{{ greetingMessage }}
			</div>
		</Transition>
		<div v-if="authStore.isBotEnabled" @click="goToBot" class="chat__icon">
			<img class="icon-bot" src="../assets/images/pandaAssistant.png" alt="">
		</div>
		<Transition name="fade">
			<div class="habbit__page">
				<div v-if="isHabitGoalVisible && !isSuccessModalVisible" class="overlay">
					<div class="habbit__goal" @click="closeHabitGoal">
						<div class="habit-goal-wrapper" @click.stop>
							<HabbitGoal @add="handleAddTask" @close="closeHabitGoal"/>
						</div>
					</div>
				</div>
				<SuccesModal v-if="isSuccessModalVisible" @close="handleSuccessClose"/>
				<div class="progress__inner">
					<div class="user__greetings">
						<div class="title"> {{ $t('homePage.greetings') }},<span
							class="username"> {{ authStore.name}}</span>
						</div>
						<div class="button__add-goal">
							<button @click="toPremium" class="goal__btn">
								<img src="assets/images/premium.png" alt="" class="goal__btn-icon"/>
							</button>
						</div>
					</div>
					<div class="goals__inner">
						<div class="goals__content">
							<div class="goals__btns-inner">
								<div class="goal__selector">
									<div class="goal__indicator"
									     :style="{ transform: activeButton === 'achiv' ? 'translateX(0%)' : activeButton === 'tasks' ? 'translateX(100%)' : 'translateX(200%)' }"/>
									<button class="achiv__btn" :class="{ active: activeButton === 'achiv' }"
									        @click="setActive('achiv')">{{ $t('navTop.achiv') }}
									</button>
									<button class="achiv__btn" :class="{ active: activeButton === 'tasks' }"
									        @click="setActive('tasks')">{{ $t('navTop.askez') }}
									</button>
									<button class="achiv__btn" :class="{ active: activeButton === 'stats' }"
									        @click="setActive('stats')">{{ $t('navTop.stats') }}
									</button>
								</div>
							</div>
							<div class="add__goals">
								<Transition :name="transitionName" mode="out-in">
									<div v-if="activeButton === 'achiv'" class="achiv">
										<Achievment/>
									</div>
									<div v-else-if="activeButton === 'stats'" class="stats">
										<Statistic/>
									</div>
									<div v-else class="task__goal-content">
										<div class="calendar-wrapper">
											<v-calendar
												view="weekly"
												v-model="selectedDate"
												:attributes="dotAttributes"
												:select-attribute="null"
												@dayclick="onDayClick"
											/>
										</div>
										<div
											class="task__goal-list"
											v-for="task in tasks"
											:key="task.id"
											:style="{ borderBottomColor: task.color }"
										>
											<div class="task__goal-list-inner">
												<div class="taks__progress__date-wrapper">
													<div class="task__datum-wrapper">
														<div class="task__goal-wrapper">
															<div :style="{ color: task.color }" class="task__goal-item goals goal__name">{{ task.goal
																}}
															</div>
														</div>
														<div class="task__date-wrapper">
															<div class="task__start__date tasks__date">
																<div class="task__goal-item goal__type">{{
																	formatDate(task.dateRange.start) }}
																</div>
															</div>
															<img class="arrow__datum" src="../assets/images/arrows.svg"
															     alt="">
															<div class="task__end__date tasks__date">
																<div class="task__goal-item goal__type">{{
																	formatDate(task.dateRange.end) }}
																</div>
															</div>
														</div>
														<div class="task__checked-status">
															<span
																class="checked-status-value"
																:class="{'status-green': getTaskStatus(task, selectedDate).isDone,
																'status-red': getTaskStatus(task, selectedDate).isLate,
																'status-orange': getTaskStatus(task, selectedDate).isNot}"
															>{{ getTaskStatus(task, selectedDate).isDone ? $t('dayMarked.done') :
																getTaskStatus(task, selectedDate).isLate ? $t('dayMarked.passed') : $t('dayMarked.notDone') }}
															</span>
														</div>
													</div>
												</div>
												<div class="taks__btns">
													<div class="task__progress-wrapper">
														<div class="task__progress-value">
															<div class="task__progress-green">
																<span class="emoji">&#9989;</span>
																<span class="progress-green percent__progress">{{ getProgress(task).progress }}</span>
															</div>
															<div class="task__progress-green">
																<span class="emoji">&#10060;</span>
																<span class="progress-red percent__progress">{{ getProgress(task).progressMiss }}</span>
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
								</Transition>
							</div>
							<Transition name="fade">
								<div class="not__task-inner"
								     v-if="isTasksLoaded  && isNotTask && activeButton === 'tasks'">
									<img class="no__task-icon" src="../assets/images/Memepanda.png" alt="">
									<span class="no__task-text"> {{ $t('homePage.no_active_goals') }}</span>
								</div>
							</Transition>
						</div>
					</div>
					<Footer @toggleHabit="toggleHabitGoal"/>
				</div>
			</div>
		</Transition>
	</div>
</template>
<script setup>
	import {ref, computed, onMounted, onUnmounted} from "vue";
	import {useHabitStore} from "../stores/habitStore.js";
	import {useAuthStore} from "../stores/authStore.js";
	import {useTaskStore} from '../stores/OfflineTaskStore.js'
	import Achievment from "../src/components/achievment.vue"
	import Statistic from "../src/components/statistics.vue"
	import ProgressCircle from "../src/components/progressBar";
	import SuccesModal from "../src/components/succesModal.vue";
	import HabbitGoal from "../src/components/newHabitGoal.vue";
	import Footer from '../src/components/footer.vue'
	import {useLocalePath} from '#i18n';
	import {useRouter, useRoute} from 'vue-router'
	import {getAuth} from "firebase/auth";
	import {App} from '@capacitor/app';
	import {timeBasedGreetings, getTimeOfDay} from '../src/ai/messageBot.js'

	const route = useRoute();
	const isTasksLoaded = ref(false)
	const taskStore = useTaskStore();
	const {locale} = useI18n()
	const localePath = useLocalePath()
	const router = useRouter()
	const habitStore = useHabitStore();
	const authStore = useAuthStore()
	const progress = ref({});
	const isHabitGoalVisible = ref(false);
	const isSuccessModalVisible = ref(false);
	const showAIGreeting = ref(false)
	const greetingMessage = ref(null)
	const activeButton = ref('tasks');
	const transitionName = ref('slide-left')
	let prevButton = 'tasks'
	const auth = getAuth()
	const isReady = ref(false);
	const user = auth.currentUser
	const isNotTask = computed(() => habitStore.tasks.length === 0);
	const selectedDate = ref(new Date());
	const tasks = computed(() => {
		const habitTasks = habitStore.tasks;
		const offlineTasks = taskStore.tasks;

		const allTasks = [...habitTasks, ...offlineTasks.filter(offlineTask => {
			return !habitTasks.some(onlineTask =>
				onlineTask.goal === offlineTask.goal &&
				JSON.stringify(onlineTask.dateRange) === JSON.stringify(offlineTask.dateRange)
			);
		})];

		const selected = new Date(selectedDate.value);
		selected.setHours(0, 0, 0, 0);

		return allTasks.filter(task => {
			let start = task.dateRange.start;
			let end = task.dateRange.end;
			if (typeof start.toDate === 'function') start = start.toDate();
			if (typeof end.toDate === 'function') end = end.toDate();

			start = new Date(start);
			end = new Date(end);
			start.setHours(0, 0, 0, 0);
			end.setHours(0, 0, 0, 0);

			return selected >= start && selected <= end;
		});
	});

	function getLocalizedGreeting(currentLocale) {
		const lang = currentLocale.split('-')[0] || 'en'
		const time = getTimeOfDay()
		const greetings = timeBasedGreetings[lang]?.[time] || timeBasedGreetings.en.day
		return greetings[Math.floor(Math.random() * greetings.length)]
	}

	const dotAttributes = ref([
		{
			key: 'selected-dot',
			dot: true,
			dates: [selectedDate.value],
		},
	])

	const onDayClick = ({ date }) => {
		selectedDate.value = date
		dotAttributes.value = [
			{
				key: 'selected-dot',
				dot: true,
				dates: [date],
			},
		]
	}

	const getTaskStatus = (task, date) => {
		const toLocalDateString = (d) => {
			const dateNow = new Date(d);
			dateNow.setHours(0, 0, 0, 0);
			return dateNow.toLocaleDateString('sv-SE');
		};
		const selectedStr = toLocalDateString(date);
		const todayStr = toLocalDateString(new Date());
		const normalize = (list) => Array.isArray(list) ? list.map(toLocalDateString) : [];
		const checked = normalize(task.checkedDates);
		const missed = normalize(task.missedDates);
		const isDone = checked.includes(selectedStr) || missed.includes(selectedStr);
		const isLate = selectedStr < todayStr && !isDone;
		const isNot = selectedStr >= todayStr && !isDone;
		return { isDone, isLate, isNot};
	};

	const toPremium = () => {
		router.push('premium')
	}

	const goToBot = () => {
		router.push('/chat')
	}

	const handleAddTask = (task) => {
		addTask(task);
		isSuccessModalVisible.value = true;
	};

	const handleSuccessClose = () => {
		isSuccessModalVisible.value = false;
		isHabitGoalVisible.value = false;
	};

	const getProgress = (task) => {
		if (habitStore.tasks.find(t => t.id === task.id)) {
			return habitStore.result(task.id);
		} else {
			return taskStore.result(task.id);
		}
	};

	const openTaskDetails = (task) => {
		router.push({
			path: "/TaskDetails",
			query: {
				id: task.id,
			},
		});
	};

	const addTask = (task) => {
		if (navigator.onLine) {
			habitStore.addTask(task);
		} else {
			taskStore.addTask(task);
		}
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
		let newDate;
		if (date && typeof date.toDate === "function") {
			newDate = date.toDate();
		} else {
			newDate = new Date(date);
		}
		return newDate.toLocaleDateString(locale.value, {
			day: "2-digit",
			month: "long",
		});
	};

	const setActive = (buttonName) => {
		if (buttonName === activeButton.value) return;
		const order = ['achiv', 'tasks', 'stats'];
		const fromIndex = order.indexOf(activeButton.value);
		const toIndex = order.indexOf(buttonName);
		transitionName.value = toIndex > fromIndex ? 'slide-left' : 'slide-right';

		prevButton = activeButton.value;
		activeButton.value = buttonName;
	};

	onMounted(async () => {
		await taskStore.loadTasksFromLocal();
		await taskStore.syncTasks();
		setTimeout(() => {
			isTasksLoaded.value = true;
		}, 220)
	});

	onMounted(() => {
		if (!window.__greetingReset) {
			sessionStorage.removeItem('greeted')
			window.__greetingReset = true
		}
		if (
			authStore.isBotEnabled &&
			sessionStorage.getItem('greeted') !== 'true' &&
			locale.value
		) {
			greetingMessage.value = getLocalizedGreeting(locale.value)
			showAIGreeting.value = true

			setTimeout(() => {
				showAIGreeting.value = false
			}, 2000)
			sessionStorage.setItem('greeted', 'true')
		}
	})

	onMounted(() => {
		if (route.query.open === 'true') {
			isHabitGoalVisible.value = true;
			router.replace({path: route.path});
		}
	});

	onMounted(() => {
		const el = document.querySelector('.achiv');
		if (el) {
			el.style.visibility = 'hidden';
			el.style.display = 'block';
			el.offsetHeight;
			el.style.display = '';
			el.style.visibility = '';
		}
	});
</script>

<style>
	.calendar-wrapper .vc-focus {
		background-color: transparent !important;
		box-shadow: none !important;
		outline: none !important;
	}

	.vc-arrow.vc-next.vc-focus {
		border-radius: 50%;
		width: 30px;
		height: 30px;
		background: none;
	}

	.vc-dot {
		background-color: #00b7ff !important;
		width: 12px;
		height: 2px;
		display: flex;
		justify-content: center;
	}

	.vc-arrow.vc-prev.vc-focus {
		border-radius: 50%;
		width: 30px;
		height: 30px;
		background: none;
		color: white;
	}

	.task__checked-status {

		font-family: "Nunito", sans-serif;
		font-size: 14px;
		color: var(--text-color);
		display: flex;
	}

	.checked-status-label {
		font-weight: bold;
	}

	.checked-status-value {
		font-size: 13px;
		padding: 1px 10px;
		background: #4caf50;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: "Nunito", sans-serif;
		color: white;
	}

	.status-green {
		background-color: #4caf50;
	}

	.status-orange {
		background-color: #fb8c00;;
	}

	.status-red {
		background-color: #f44336;
	}

	.slide-left-enter-active,
	.slide-left-leave-active,
	.slide-right-enter-active,
	.slide-right-leave-active {
		transition: all 0.20s ease;
		position: absolute;
		width: 100%;
	}

	.slide-left-enter-from {
		transform: translateX(100%);
		opacity: 0;
	}

	.slide-left-leave-to {
		transform: translateX(-100%);
		opacity: 0;
	}

	.slide-right-enter-from {
		transform: translateX(-100%);
		opacity: 0;
	}

	.slide-right-leave-to {
		transform: translateX(100%);
	}

	.ai-greeting.gretingOff {
		width: 0;
		height: 0;
		opacity: 0;
		background: none;
	}

	.ai-greeting {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		color: #333;
		padding: 12px 20px;
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		font-family: 'Nunito', sans-serif;
		font-size: 16px;
		z-index: 1000;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.chat__icon {
		position: absolute;
		bottom: 95px;
		right: 10px;
		z-index: 10;
		cursor: pointer;
	}

	.icon-bot {
		width: 60px;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.emoji {
		font-size: 16px;
	}

	.goal__btn {
		width: 40px;
		height: 40px;
		padding: 10px;
		border-radius: 50%;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: none;
		color: white;
		font-size: 16px;
		font-family: "Nunito", serif;
	}

	.goal__selector {
		position: relative;
		display: flex;
		justify-content: space-between;
		border-radius: 12px;
		overflow: hidden;
		width: 100%;
	}

	.goal__btn-icon {
		width: 35px;
		height: 35px;
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
		color: var(--text-color);
	}

	.task__progress-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #94ea97;
		font-family: "Acme", serif;
		border: none;
	}

	.task__progress-value {
		padding: 0 8px;
	}

	.task__goal-content,
	.stats,
	.achiv {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.goals__btns-inner {
		border-radius: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--slider-bg);
		padding: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease;
		touch-action: manipulation;
	}

	.goal__indicator {
		position: absolute;
		top: 0;
		left: 0;
		width: 33.33%;
		height: 100%;
		background: var(--indicator-bg);
		border-radius: 30px;
		z-index: 0;
		transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.achiv__btn {
		position: relative;
		flex: 1;
		color: white;
		font-family: Nunito, serif;
		font-size: 14px;
		padding: 10px 0;
		border: none;
		background: none;
		transition: color 0.3s ease;
		cursor: pointer;
		text-align: center;
	}

	.achiv__btn.active {
		color: white;
	}

	.achiv__btn.background-active {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}

	.goals__content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: hidden;
	}

	.task__come-btn {
		min-width: 90px;
		padding: 10px 19px;
		border: none;
		background: linear-gradient(to right, #6378e1, #8199f4);
		border-radius: 15px;
		color: white;
		font-size: 17px;
		font-family: "Acme", system-ui, -apple-system, sans-serif;
		box-shadow: 0 4px 12px rgba(99, 120, 225, 0.4);
		transition: all 0.2s ease-in-out;
		touch-action: manipulation;
	}

	.task__come-btn:active {
		transform: scale(0.97);
		box-shadow: 0 2px 6px rgba(99, 120, 225, 0.3);
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

	.task__datum-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: start;
		padding-left: 3px;
	}

	.task__date-wrapper {
		font-family: "Nunito", sans-serif;
		letter-spacing: 1px;
		display: flex;
		text-align: center;
		font-size: 14px;
		margin-bottom: 3px;
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
		margin-top: 10px;
		max-width: 200px;
		font-family: "Nunito", serif;
		font-weight: bold;
		font-size: 18px;
		color: var(--text-color);
		text-align: center;
	}

	.goals__inner {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		min-height: 0;
		padding: 0 10px;
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
		font-size: 12px;
		font-weight: 300;
		color: var(--goals-date-color);
		font-family: "Nunito", sans-serif;
	}

	.arrow__datum {
		margin: 0 5px;
		width: 10px;
		transform: rotate(90deg);
	}

	.goals {
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: 600;
		font-family: "Nunito", sans-serif;
		color: var(--text-color);
		max-width: 160px;
	}


	.task__goal-list {
		margin-top: 15px;
		background-color: var(--menu--btn-bg);
		margin-bottom: 12px;
		border-radius: 25px;
		padding: 8px 16px;
		border-bottom: 4px solid transparent;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
		transition: all 0.2s ease-in-out;
		touch-action: manipulation;
	}

	.habbit__goal {
		background: rgba(255, 255, 255, 0.3);
		height: 100vh;
		width: 100%;
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		z-index: 99;
	}

	.add__goals {
		flex-grow: 1;
		margin-bottom: 80px;
		padding: 10px 0;
		overflow: hidden;
		position: relative;
	}

	.progress__inner {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
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
		font-family: "Nunito", sans-serif;
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