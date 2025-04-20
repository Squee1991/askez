<template>
	<div class="update__date-wrapper">
		<div ref="animationBlock" class="animation__block"></div>
		<div :class="['notification', notification.type, notification.show ? 'active' : '']" @click="closeNotification">
			<div class="notification__message">{{ notification.message }}</div>
			<button class="notification__close" @click.stop="closeNotification">×</button>
		</div>
		<div>
			<div :class="{'not__allowed': notAllowed.show}" class="not__allowed-data">
				{{ notAllowed.message }}
			</div>
		</div>
		<div v-if="isOpen" class="overlay__confirm">
			<div class="confirm__window">
				<div class="confirm__content-wrapper">
					<img class="out__icon" src="../assets/images/garbage.svg" alt="">
					<div class="confirm__title">{{ t('delConfirm.title') }}</div>
					<div class="confirm__btns">
						<NuxtLink @click="clearTask(selectedTask.id)" class="confirm__btn" to="/welcomePage">
							<button class="confirm__btn">{{ t('delConfirm.accept') }}</button>
						</NuxtLink>
						<button @click="cancelDelete" class="btn-green confirm__btn">{{ t('delConfirm.reject') }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="selectedTask">
			<div class="task__name">
				<NuxtLink class="task__icon-back" to="/welcomePage">
					<img class="task__icon-back" src="../assets/images/back.svg" alt="">
				</NuxtLink>
				<span class="task__goal-name">{{ selectedTask.goal }}</span>
				<div class="edit__menu-wrapper">
					<EditDeleteMenu :icon="editIcon" @click="editMenu"/>
				</div>
			</div>
			<div class="range__date-wrapper">
				<div class="range__date">
					<div class="range__date-text">{{ t('taskDetails.startDate') }}</div>
					<div class="range__date__data start">{{ formatDate(selectedTask.dateRange.start) }}</div>
				</div>
				<div class="range__date">
					<div class="range__date-text">{{ t('taskDetails.endDate') }}</div>
					<div class="range__date__data end">{{ formatDate(selectedTask.dateRange.end) }}</div>
				</div>
			</div>
			<div class="progres__wrapper-inner" :style="selectedTask.color ? { borderTop: `4px solid ${selectedTask.color}` } : {}">
				<div class="task__about">
					<div class="tas__name-wrapper">
						<span class="task__goal-name">{{$t('taskDetails.title')}}: </span>
						<span class="task__goal-name-item"> {{ selectedTask.goal }}</span>
					</div>
					<div class="infinity__items">
						<span class="infinity__text">{{$t('taskDetails.status')}}: </span>
						<img class="task__progress-icon" :src="currenticon(selectedTask)" alt="">
					</div>
				</div>
				<img class="goal__sticker-item" src="../assets/images/sticker-target.svg" alt="">
			</div>
			<div class="progress__circle">
				<div class="progress__container-details">
					<div class="circle__inner">
						<div class="circle">
							<ProgressBar
								:progress="selectedTask.progress"
								:progressMiss="selectedTask.progressMiss"
								:history="selectedTask.history"
								:size="120"
								:padding="20"
							/>
						</div>
					</div>
					<div class="count">
						<div class="checked__progress-inner">
							<span class="checked__text checked__green"> {{t('CheckedProgress.checked')}} :</span>
							<span class="checked__count">{{ checkedCount }}</span>
						</div>
						<div class="checked__progress-inner">
							<span class="checked__text">{{ t('CheckedProgress.notChecked') }} :</span>
							<span class="checked__count">{{ missedCount }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="date__picker">
				<v-calendar
					is-expanded
					v-if="allowedDateRange.start && allowedDateRange.end"
					:locale="locale"
					:min-date="allowedDateRange.start"
					:max-date="allowedDateRange.end"
					:disabled-dates="disabledDates"
					v-model="selectedDate"
					@dayclick="onDateSelect"
					:attributes="[...checkedDatesAttributes, ...activeDateAttributes]"
				/>
			</div>
			<div class="task__details-btns">
				<div v-for="(btn, index) in ['done', 'missed']" :key="index" class="task__details-btn"
				     :class="[btn === 'done' ? 'check' : '', isDateMarked ? 'disabled' : '']">
					<button
						:disabled="isDateMarked"
						@click="misscCheckClick(btn)"
						class="update__task-btn"
						:class="btn === 'done' ? 'check' : ''"
						:aria-label="t(`checkedBtns.${btn}`)"
					>
						{{ t(`checkedBtns.${btn}`) }}
					</button>
				</div>
			</div>
			<div class="phrase">
				<img class="calendar__icon" src="../assets/images/target.svg" alt="">
				<div class="phrase__text">
					<div class="days__task-text">{{ $t('archieve.totalDays')}} :</div>
					<div class="days__task-count">{{ totalTaskDays }}</div>
				</div>
				<div class="phrase__text">
					<div class="days__task-text">{{ $t('archieve.notchecked') }} :</div>
					<div class="days__task-count">{{ remainingDays }}</div>
				</div>
			</div>
			<div v-if="selectedTask.notes" class="task__notes">
				<div class="task__notes-title">{{ t('taskDetails.taskNotes') }}</div>
				<div class="task__notes-content">{{ selectedTask.notes }}</div>
			</div>
		</div>
	</div>
	<StepHint
		:steps="hintSteps"
		:show="showHints"
		@close="showHints = false"
	/>
</template>

<script setup>
	import StepHint from '../src/components/StepHint.vue'
	import {ref, computed, onMounted, watch} from "vue";
	import {useRoute} from "vue-router";
	import {useHabitStore} from "../stores/habitStore.js";
	import ProgressBar from "../src/components/progressBar.vue";
	import EditDeleteMenu from "../src/components/EditDeleteMenu.vue";
	import EditIcon from '../assets/images/icon-trash.svg';
	import {useI18n} from 'vue-i18n';
	import Lottie from 'lottie-web';
	import CongratsAmination from '../assets/animations/GratsAnimation.json'
	import {useTaskStore} from '../stores/OfflineTaskStore.js'
	import {getAuth} from 'firebase/auth';
	import CheckedIcon from "../assets/images/check-mark.svg";
	import CheckedNotFull from "../assets/images/letter-x.svg";
	import InProgressIcon from "../assets/images/clock.svg";
	const {locale, t} = useI18n();
	let showHints = ref(true);
	const hintSteps = [
		{ selector: '.task__icon-back', text: 'stepHint.screen' },
		{ selector: '.task__goal-name', text: 'stepHint.goal' },
		{ selector: '.range__date-wrapper', text: 'stepHint.date' },
		{ selector: '.vc-container', text: 'stepHint.calendar' },
		{ selector: '.task__details-btns', text: 'stepHint.mark' },
		{ selector: '.progress__container-details', text: 'stepHint.progress' }
	];

	const animationBlock = ref(null);
	const editIcon = ref(EditIcon);
	const editState = ref(false);
	const isOpen = ref(false);
	const taskToDelete = ref(null);
	const router = useRoute();
	const isDateSelected = ref(false);
	const checkedDates = ref([]);
	const missedDates = ref([]);
	const checkedCount = computed(() => selectedTask.value?.checkedDates?.length || 0);
	const missedCount = computed(() => selectedTask.value?.missedDates?.length || 0);
	const habitStore = useHabitStore();
	const selectedDate = ref(null);
	const taskStore = useTaskStore();
	const activeDateAttributes = computed(() => {
		if (!selectedDate.value) return [];
		return [{
			key: 'active-date',
			dates: [new Date(selectedDate.value + 'T00:00:00')],
			customData: {active: true}
		}];
	});

	const totalTaskDays = computed(() => {
		if (!selectedTask.value) return 0;
		const start = convertToDate(selectedTask.value.dateRange.start);
		const end = convertToDate(selectedTask.value.dateRange.end);
		const diffTime = end.getTime() - start.getTime();
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
		return diffDays;
	});

	const remainingDays = computed(() => {
		if (!selectedTask.value) return 0;
		const total = totalTaskDays.value;
		const checked = selectedTask.value.checkedDates?.length || 0;
		const missed = selectedTask.value.missedDates?.length || 0;

		const remaining = total - checked - missed;

		return remaining >= 0 ? remaining : 0;
	});


	const notAllowed = ref({show: false, message: ''})
	const showNotAllowed = (key) => {
		notAllowed.value = {
			show: true,
			message: t(`notAllowed.${key}`),
		}
		setTimeout(() => {
			notAllowed.value.show = false
		}, 2000)
	}
	const applausAudio = () => {
		if (!habitStore.isAudioEnabled) return;
		const audio = new Audio('/sounds/cry.wav')
		audio.play()
	}

	const selectedTask = computed(() => {
		const id = router.query.id;
		const allTasks = [...habitStore.tasks, ...taskStore.tasks];
		return allTasks.find(task => task.id == id) || null;
	});

	const convertToDate = (date) => {
		return date && typeof date.toDate === "function" ? date.toDate() : new Date(date);
	};

	const getLocalDate = () => {
		const d = new Date();
		const year = d.getFullYear();
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const day = d.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const formatDateLocal = (date) => {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const day = d.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const notification = ref({
		show: false,
		message: '',
		type: ''
	});

	const currenticon = (task) => {
		if (task.progress === 100) return CheckedIcon;
		if (task.progress + task.progressMiss === 100) return CheckedNotFull;
		return InProgressIcon;
	};

	const showNotification = (message, type) => {
		notification.value = {
			show: true,
			message,
			type
		};
		setTimeout(() => {
			notification.value.show = false;
		}, 2000);
	};
	// Функция для закрытия уведомления
	const closeNotification = () => {
		notification.value.show = false;
	};

	const misscCheckClick = (btn) => {
		if (!selectedTask.value) return;

		const selDateStr = selectedDate.value;
		const taskStartStr = convertToDate(selectedTask.value.dateRange.start).toLocaleDateString('en-CA');
		const taskEndStr = convertToDate(selectedTask.value.dateRange.end).toLocaleDateString('en-CA');

		if (btn === "done") {
			if (!selectedTask.value.checkedDates) selectedTask.value.checkedDates = [];
			selectedTask.value.checkedDates.push(selDateStr);
			checkedDates.value = [...selectedTask.value.checkedDates];
		} else if (btn === "missed") {
			if (!selectedTask.value.missedDates) selectedTask.value.missedDates = [];
			selectedTask.value.missedDates.push(selDateStr);
			missedDates.value = [...selectedTask.value.missedDates];
		}

		const totalDays = Math.max(1, (new Date(taskEndStr) - new Date(taskStartStr)) / (1000 * 60 * 60 * 24) + 1);
		const step = (100 / totalDays).toFixed(2);

		if (!selectedTask.value.history) selectedTask.value.history = [];

		const currentProgress = selectedTask.value.progress || 0;
		const currentProgressMiss = selectedTask.value.progressMiss || 0;
		const remainingProgress = 100 - currentProgress - currentProgressMiss;

		if (remainingProgress > 0) {
			selectedTask.value.history.push({
				color: btn === 'done' ? "#4FC55C" : "#FF5C00",
				percent: Math.min(parseFloat(step), remainingProgress),
			});
		}

		habitStore.updateTask(selectedTask.value);
		habitStore.updateProgress(selectedTask.value);
		habitStore.saveTasks();

		const isCompleted = selectedTask.value.progress + selectedTask.value.progressMiss >= 100;
		const hasMisses = selectedTask.value.progressMiss > 0;
		if (isCompleted) {
			const message = hasMisses ? t('congrats.notDone') : t('congrats.done');
			const type = hasMisses ? 'notDone' : 'marked';
			showNotification(message, type);

			if (!hasMisses && btn === "done") {
				// проигрываем звук отдельно, если включён
				applausAudio();

				// запускаем анимацию, если включена
				if (!habitStore.isAnimationEnabled) return;
				setTimeout(() => {
					if (animationBlock.value) {
						const anim = Lottie.loadAnimation({
							container: animationBlock.value,
							loop: false,
							animationData: CongratsAmination,
						});
						anim.setSpeed(0.4);
					}
				}, 400);
			}
		} else {
			const message = btn === "done" ? t('congrats.marked') : t('congrats.missed');
			const type = btn === "done" ? "success" : "missed";
			showNotification(message, type);
		}
	};

	const allowedDateRange = computed(() => {
		if (selectedTask.value) {
			const start = convertToDate(selectedTask.value.dateRange.start);
			const end = convertToDate(selectedTask.value.dateRange.end);
			return {
				start: start.toLocaleDateString('en-CA'),
				end: end.toLocaleDateString('en-CA')
			};
		}
		return {start: null, end: null};
	});

	const onDateSelect = (day) => {
		if (!day || !day.id || !selectedTask.value) return;

		const selDate = new Date(day.id);
		selDate.setHours(0, 0, 0, 0);
		const formatted = formatDateLocal(selDate);
		const taskStart = new Date(convertToDate(selectedTask.value.dateRange.start));
		taskStart.setHours(0, 0, 0, 0);
		const taskEnd = new Date(convertToDate(selectedTask.value.dateRange.end));
		taskEnd.setHours(0, 0, 0, 0);

		if (selDate < taskStart || selDate > taskEnd) {
			showNotAllowed('outside')
			return;
		}

		if (checkedDates.value.includes(formatted) || missedDates.value.includes(formatted)) {
			showNotAllowed('done');
			return;
		}
		isDateSelected.value = true;
		selectedDate.value = formatDateLocal(selDate);
		console.log("Выбрана", selectedDate.value);
	};

	const disabledDates = computed(() => {
		return selectedTask.value?.blockedDates || [];
	});

	const loadTask = () => {
		habitStore.loadTasks();
		if (selectedTask.value) {
			const savedCheckedDates = localStorage.getItem(`task_${selectedTask.value.id}_checkedDates`);
			if (savedCheckedDates) {
				checkedDates.value = JSON.parse(savedCheckedDates);
				selectedTask.value.checkedDates = [...checkedDates.value];
			}
			const savedMissedDates = localStorage.getItem(`task_${selectedTask.value.id}_missedDates`);
			if (savedMissedDates) {
				missedDates.value = JSON.parse(savedMissedDates);
				selectedTask.value.missedDates = [...missedDates.value];
			}
		}
	};

	onMounted(() => {
		loadTask();
		if (selectedTask.value) {
			checkedCount.value = selectedTask.value.checkedDates?.length || 0;
			missedCount.value = selectedTask.value.missedDates?.length || 0;
		}
	});

	const checkedDatesAttributes = computed(() => {
		return [
			...checkedDates.value.map(date => ({
				key: `checked-${date}`,
				dates: [new Date(date + 'T00:00:00')],
				highlight: {contentClass: "vc-highlight-green"},
			})),
			...missedDates.value.map(date => ({
				key: `missed-${date}`,
				dates: [new Date(date + 'T00:00:00')],
				highlight: {contentClass: "vc-highlight-red"},
			})),
		];
	});


	const isDateMarked = computed(() => {
		const date = selectedDate.value;
		if (!date) return true;
		const today = getLocalDate();
		if (date !== today) {
			showNotAllowed('onlyToday')
			return true;
		}

		return checkedDates.value.includes(date) || missedDates.value.includes(date);
	});

	const clearTask = async (taskId) => {
		if (!taskId) return;

		if (habitStore.tasks.find(t => t.id === taskId)) {
			habitStore.removeTask(taskId);
		} else {
			await taskStore.archiveTask(taskId);
		}

		const allTasks = [...habitStore.tasks, ...taskStore.tasks];
		checkedCount.value = allTasks.reduce((sum, task) => sum + (task.checkedDates?.length || 0), 0);
		missedCount.value = allTasks.reduce((sum, task) => sum + (task.missedDates?.length || 0), 0);
	};

	const cancelDelete = () => {
		taskToDelete.value = null;
		isOpen.value = false;
		editState.value = false;
	};

	const editMenu = () => {
		isOpen.value = true;
	};

	onMounted(() => {
		const user = getAuth().currentUser;

		if (user && user.uid) {
			const hintKey = `hints_shown_${user.uid}`;
			if (localStorage.getItem(hintKey) !== 'true') {
				showHints.value = true;
				localStorage.setItem(hintKey, 'true');
			} else {
				showHints.value = false;
			}
		} else {
			if (localStorage.getItem('hints_shown_guest') !== 'true') {
				showHints.value = true;
				localStorage.setItem('hints_shown_guest', 'true');
			} else {
				showHints.value = false;
			}
		}
	});
	const formatDate = (date) => {
		const d = convertToDate(date);
		return d.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	watch(selectedTask, (newTask) => {
		if (!newTask) return;
		checkedDates.value = newTask.checkedDates || [];
		missedDates.value = newTask.missedDates || [];
	}, {immediate: true});

</script>
<style>
	.phrase__text {
		display: flex;
		padding: 11px;

	}

	.days__task-count {
		font-size: 19px;
		font-weight: bold;
		font-family: "Acme", serif;
		color: var(--text-color);
	}

	.days__task-text {
		font-family: "Nunito", sans-serif;
		font-size: 15px;
		font-weight: 600;
		display: flex;
		align-items: center;
		width: 126px;
		margin-right: 4px;
		color: var(--text-color);
	}

	.calendar__icon{
		position: absolute;
		right: 10px;
		width: 125px;
	}

	.circle {
		background: var(--menu--btn-bg);
		border-radius: 20px;
	}

	.progress__container-details {
		display: flex;
		justify-content: space-between;
	}

	.phrase {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 150px;
		background-color: var(--menu--btn-bg);
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20px;
	}

	.count {
		background: var(--menu--btn-bg);
		border-radius: 20px;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
	}

	.circle__inner{
		padding-right: 10px;
	}

	.progress__circle {
		width: 100%;

	}

	.task__progress-icon {
		width: 20px;
		margin-right: 10px;
	}

	.goal__sticker-item {
		position: absolute;
		width: 120px;
		margin: 0 auto;
		right: 5%;
	}

	.tas__name-wrapper {
		display: flex;
		align-items: center;
	}

	.task__about {
		padding: 15px;
		display: flex;
		align-items: start;
		flex-direction: column;
		justify-content: center;
	}

	.infinity__items {
		display: flex;
		align-items: center;
		margin-top: 10px;
	}

	.infinity__text {
		color: var(--text-color);
		font-size: 16px;
		font-family: "Nunito", sans-serif;
		margin-right: 10px;
		font-weight: 600;
	}

	.task__goal-name-item {
		color: var(--text-color);
		font-family: "Nunito", sans-serif;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1 1 auto;
	}

	.progres__wrapper-inner {
		margin: 10px 0;
		border-top: 5px solid var(--task-border-color);
		background-color: var(--menu--btn-bg);
		display: flex;
		border-radius: 30px;
		padding: 10px 10px 5px 10px;
		position: relative;
		overflow: hidden;
	}

	.task__goal-name {
		font-size: 16px;
		color: var(--text-color);
		font-family: "Nunito", sans-serif;
		margin-right: 10px;
		font-weight: 600;
	}

	.animation__block {
		position: absolute;
		top: 50%;
		left: 0;
		z-index: 10;
		transform: translateY(-50%);
	}

	.vc-highlight-red {
		background-color: #FF3030 !important;
		color: white !important;
	}

	.vc-highlight-green {
		background-color: #00D100 !important;
		color: white !important;
	}

	.vc-highlight-light-bg {
		background: white;
	}

	.vc-highlight-bg-solid {
		background-color: #4FC55C;
	}

	.vc-highlight-bg-light {
		background-color: var(--vc-highlight-bg);
	}

	.vc-blue {
		border: none;
	}

	.vc-header .vc-arrow {
		color: var(--vc-arrow-cal);
	}

	.vc-container {
		width: 100%;
		border: none;
		background-color: var(--menu--btn-bg);
		padding: 10px;
		border-radius: 20px;
	}

	.vc-header .vc-title {
		color: var(--text-color);
		background: none;
		font-size: 20px;
	}

	.vc-header {
		margin-top: 0;
	}

	.vc-highlight-content-light {
		color: var(--text-color);
	}

	.vc-day, .vc-weekday {
		color: var(--text-color);
	}

	.task__details__arrow-icon {
		width: 40px;
	}

	.checked__wrapper {
		display: flex;
		align-items: center;
		background-color: var(--menu--btn-bg);
		padding: 10px 30px;
		border-radius: 17px;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.checked__progress-inner {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.checked__text {
		font-weight: 600;
		font-size: 14px;
		font-family: "Nunito", serif;
		line-height: 21.82px;
		color: var(--text-color);
		text-align: start;
		margin-right: 10px;
		min-width: 140px;
	}

	.checked__progress-wrapper {
		justify-content: space-between;
		width: 100%;
	}

	.checked-progress {
		justify-content: center;
		align-items: center;
		margin-bottom: 15px;
		padding-bottom: 15px;
		border-bottom: 5px solid var(--task-border-color);
		border-radius: 15px;
	}


	.task__details-btns {
		margin: 10px 0 10px 0 ;
		display: flex;
		justify-content: space-between;
		background-color: var(--menu--btn-bg);
		padding: 10px;
		border-radius: 20px;

	}

	.range__date-text {
		font-size: 13px;
		color: var(--text-color);
		font-family: "Nunito", serif;
	}

	.range__date__data {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-color);
		font-family: "Nunito", serif;
	}

	.edit__menu-item {
		font-size: 12px;
		margin: 2px;
		padding: 2px;
		color: var(--text-color);
		border-radius: 5px;
		font-weight: 400;
	}

	.edit__menu-list {
		width: 78px;
		background: #4FC55C;
		padding: 4px;
		border-radius: 5px;
		position: absolute;
		top: 0;
		right: 0;
	}

	.edit__menu-wrapper {
		position: relative;
	}

	.task__details-btn {
		width: 48%;
	}

	.update__date-wrapper {
		width: 100%;
		height: 100vh;
		padding: 12px;
		overflow: auto;
		position: relative;
		background-color: var(--background-color);
	}

	.range__date-wrapper {
		display: flex;
		justify-content: space-between;
		padding: 2px 10px;
	}

	.task__name {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30px;
		padding: 0 10px 7px 10px;
		font-family: "Nunito", serif;
		font-weight: 600;
	}

	.checked__icon {
		width: 50px;
	}

	.checked__count {
		font-size: 29px;
		font-family: "Acme", serif;
		color: var(--text-color);
		padding: 0 15px 0 0;
		text-align: center;
        width: 39px;
	}

	.task__icon-back {
		width: 35px;
		height: 35px;
		color: var(--text-color);
		padding: 4px;
		border-radius: 50%;
	}

	.update__task-btn {
		width: 100%;
		padding: 13px 22px;
		border: none;
		font-size: 18px;
		font-weight: 600;
		border-radius: 25px;
		background: linear-gradient(to right, #ff5c00, #ff7f2a);
		color: white;
		font-family: "Nunito", system-ui, -apple-system, sans-serif;
		box-shadow: 0 4px 10px rgba(255, 92, 0, 0.3);
		transition: all 0.2s ease-in-out;
		touch-action: manipulation;
	}

	.update__task-btn:active{
		transform: scale(0.99);
		box-shadow: 0 2px 6px rgba(255, 92, 0, 0.2);
	}

	.update__task-btn.check {
		background: #4FC55C;
	}

	.out__icon {
		width: 100px;
	}

	.confirm__window {
		width: 100%;
		top: 30%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: height 0.3s ease;
	}

	.overlay__confirm {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
		transition: opacity 0.3s ease, visibility 0.3s ease;
	}

	.not__allowed-data {
		height: 0;
		overflow: hidden;
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		transition: .3s;
		text-align: center;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-family: "Nunito", sans-serif;
		font-size: 16px;
	}

	.not__allowed {
		height: 50px;
		background-color: #FF5C00;
		transition: .3s;
		font-family: "Nunito", sans-serif;
		font-size: 16px;
	}

	.confirm__content-wrapper {
		background-color: #56369f;
		padding: 20px;
		width: 80%;
		height: 100%;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.confirm__title {
		padding: 15px;
		color: white;
		text-align: center;
		font-size: 20px;
		font-family: "Nunito", serif;

	}

	.confirm__btns {
		display: flex;
		justify-content: center;
		color: #4FC55C;
		padding: 15px;
	}

	.confirm__btn.btn-green {
		background: none;
		color: #4FC55C;
		width: 60px;
		font-size: 20px;
		font-weight: bold;
		font-family: "Nunito", sans-serif;
	}


	.confirm__btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60px;
		margin: 0 5px;
		font-size: 20px;
		font-family: "Nunito", sans-serif;
		padding: 5px;
		border-radius: 10px;
		border: none;
		background: none;
		color: #4FC55C;
		font-weight: bold;
	}

	.notification {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		height: 0;
		transition: height 0.3s ease, padding 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 1000;
	}

	.notification.active {
		height: 80px;
		padding: 20px;
	}

	.notification.success {
		background-color: #4FC55C;
		color: white;
	}

	.notification.missed {
		background-color: #FF5C00;
		color: white;
	}

	.notification.marked {
		background-color: #0099FF;
		color: white;
	}

	.notification.notDone {
		background-color: #C80000;
		color: white;
	}

	.notification__message {
		font-size: 16px;
		font-family: "Nunito", sans-serif;
	}

	.notification__close {
		background: none;
		border: none;
		color: white;
		font-size: 18px;
		cursor: pointer;
		margin-left: 10px;
	}

	.task__details-btn.disabled .update__task-btn {
		opacity: 0.8;
		cursor: not-allowed;
	}

	.confirm__description {
		padding: 0 15px 15px;
		color: var(--text-color);
		text-align: center;
		font-size: 14px;
		opacity: 0.8;
	}
</style>