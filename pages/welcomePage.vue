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
			<img class="icon-bot" src="../assets/images/chat-bot.svg" alt="">
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
								<div class=""></div>
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
															<span class="emoji">&#9989; </span>
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
	import CustomCheckbox from "../src/components/customCheckbox.vue";
	import Footer from '../src/components/footer.vue'
	import {useLocalePath} from '#i18n';
	import {useRouter, useRoute} from 'vue-router'
	import {getAuth} from "firebase/auth";
	let aiGreetedOnce = false
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
	const buttonBackground = ref(null);
	const auth = getAuth()
	const isReady = ref(false);
	const user = auth.currentUser
	const tasks = computed(() => {
		const habitTasks = habitStore.tasks;
		const offlineTasks = taskStore.tasks;
		const filteredOffline = offlineTasks.filter(offlineTask => {
			return !habitTasks.some(onlineTask =>
				onlineTask.goal === offlineTask.goal &&
				JSON.stringify(onlineTask.dateRange) === JSON.stringify(offlineTask.dateRange)
			);
		});

		return [...habitTasks, ...filteredOffline];
	});


	const pandaGreetings = {
		en: [
			'Hi! I\'m your mindful panda 🐼',
			'Let’s make today awesome!',
			'Discipline makes dreams real!',
		],
		ru: [
			'Привет! Я твоя панда 🐼',
			'Сегодня отличный день для цели!',
			'Дисциплина — путь к победе!',
		],
		de: [
			'Hallo! Ich bin dein Panda 🐼',
			'Bereit für neue Ziele?',
			'Disziplin macht den Meister!',
		],
		fr: [
			'Salut ! Je suis ton panda 🐼',
			'C’est une belle journée pour avancer !',
			'La discipline est la clé !',
		],
		es: [
			'¡Hola! Soy tu panda 🐼',
			'¡Vamos a lograrlo hoy!',
			'La disciplina crea resultados.',
		],
	}


	const toPremium = () => {
		router.push('premium')
	}

	const goToBot = () => {
		router.push('/chat') // путь к твоему компоненту с ботом
	}
	// const toggleHabitGoalHandler = () => {
	// 	isButtonActive.value = true
	// 	console.log('btn in footer');
	// 	emit('toggleHabit');
	// };
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
		activeButton.value = buttonName;
		buttonBackground.value = buttonName
		setTimeout(() => {
			buttonBackground.value = null
		}, 200)
	};

	onMounted(async () => {
		await taskStore.loadTasksFromLocal();
		await taskStore.syncTasks();
		setTimeout(() => {
			isTasksLoaded.value = true;
		}, 220)
	});

	onMounted(() => {
		if (route.query.open === 'true') {
			isHabitGoalVisible.value = true;
		}
	});


	onMounted(() => {
		if (!authStore.isBotEnabled) return;

		if (!aiGreetedOnce) {
			const lang = locale.value.split('-')[0] || 'en'
			const greetings = pandaGreetings[lang] || pandaGreetings['en']
			const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

			greetingMessage.value = randomGreeting
			showAIGreeting.value = true

			setTimeout(() => {
				showAIGreeting.value = false
			}, 1500)

			aiGreetedOnce = true
		}
	})

</script>

<style>
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
		width: 50px;
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
		width: 50px;
		height: 50px;
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

	.task__goal-content {
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: translateX(-100%);
		overflow-y: auto;
		padding: 0 20px 40px 20px;
		pointer-events: none;
		visibility: hidden;
		transition: none;
	}

	.task__goal-content.visible {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
		visibility: visible;
		transition: transform 0.3s ease, opacity 0.3s ease;
	}

	.task__goal-content:not(.visible) {
		transition: none;
		right: -100%;
		opacity: 0;
	}

	.stats {
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		transform: translateX(100%);
		opacity: 0;
		overflow-y: auto;
		transition: none;
		pointer-events: none;
		visibility: hidden;
	}

	.stats.visible {
		transform: translateX(0);
		opacity: 1;
		transition: transform 0.3s ease, opacity 0.3s ease;
		pointer-events: auto;
		visibility: visible;
	}

	.achiv {
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		transform: translateX(-100%);
		opacity: 0;
		overflow-y: auto;
		transition: none;
		pointer-events: none;
		visibility: hidden;
	}

	.achiv.visible {
		transform: translateX(0);
		opacity: 1;
		transition: transform 0.3s ease, opacity 0.3s ease;
		pointer-events: auto;
		visibility: visible;
	}

	.goals__btns-inner {
		/*margin: 0 -10px;*/
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		background-color: var(--slider-bg);
		padding: 5px;
	}

	.goal__indicator {
		position: absolute;
		top: 0;
		left: 0;
		width: 33.33%;
		height: 100%;
		background: var(--indicator-bg);
		border-radius: 12px;
		z-index: 0;
		transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
	}

	.achiv__btn {
		position: relative;
		flex: 1;
		color: white;
		font-family: Nunito, serif;
		font-size: 16px;
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
		flex-grow: 1;
		overflow-y: auto;
		padding: 10px;
		border-radius: 10px;
	}

	.task__come-btn {
		padding: 10px 19px;
		border: none;
		/*background-color: var(--footer-bg);*/
		background: #6378e1;
		border-radius: 5px;
		color: white;
		font-size: 16px;
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
		text-align: center;
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
		margin-top: 10px;
		max-width: 200px;
		font-family: "Nunito", serif;
		font-weight: bold;
		font-size: 18px;
		color: #aed7ae;
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
		font-size: 13px;
		font-weight: 300;
		color: var(--goals-date-color);
	}

	.arrow__datum {
		margin: 0 5px;
		width: 10px;
	}

	.goals {
		margin-bottom: 5px;
		font-size: 17px;
		font-weight: 600;
		font-family: "Acme", serif;
		color: var(--text-color);
		max-width: 160px;
	}

	.add__goals {
		flex-grow: 1;
		overflow-y: auto;
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
		/*padding: 10px;*/

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
