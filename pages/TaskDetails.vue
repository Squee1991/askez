<template>
	<div class="update__date-wrapper">
		<div :class="{'show__confirm': editState}" class="confirm__window">
			<div class="confirm__content-wrapper">
				<div class="confirm__title">{{ $t('delConfirm.title')}}</div>
				<div class="confirm__btns">
					<button @click="cancelDelete" class="btn-green confirm__btn">{{ $t('delConfirm.reject')}}</button>
					<NuxtLink @click="clearTask(selectedTask.id)" class="confirm__btn" to="/welcomePage">
						<button class="confirm__btn">{{ $t('delConfirm.accept')}}</button>
					</NuxtLink>
				</div>
			</div>
		</div>
		<div v-if="selectedTask">
			<div class="task__name">
				<NuxtLink to="/welcomePage">
					<img class="task__icon-back" src="../assets/images/arrowSvg.svg" alt="">
				</NuxtLink>
				<span class="task__goal-name">{{ selectedTask.goal }}</span>
				<div class="edit__menu-wrapper">
					<EditDeleteMenu
						:icon="editIcon"
						@click="editMenu"/>
					<ul v-if="isOpen" class="edit__menu-list">
						<li @click="openConfirmWindow(selectedTask.id)" class="edit__menu-item">{{ $t('EditDeleteMenu.delTask')}}</li>
					</ul>
				</div>
			</div>
			<div class="range__date-wrapper">
				<div class="range__date">
					<div class="range__date-text">{{ $t('taskDetails.startDate')}}</div>
					<div class="range__date__data start">{{ formatDate(selectedTask.dateRange.start) }}</div>
				</div>
				<div class="range__date">
					<div class="range__date-text">{{ $t('taskDetails.endDate')}}</div>
					<div class="range__date__data end">{{ formatDate(selectedTask.dateRange.end) }}</div>
				</div>
			</div>
			<div class="date__picker">
				<v-calendar
					is-expanded
					v-if="localDateRange.start && localDateRange.end"
					:locale="locale"
					:min-date="localDateRange.start"
					:max-date="localDateRange.end"
					:disabled-dates="disabledDates"
					v-model.range="localDateRange"
					@dayclick="onDateSelect"
					:attributes="checkedDatesAttributes"
				/>
			</div>
			<div class="task__details-btns">
				<div class="task__details-btn check">
					<button @click="onCheckClick" :disabled="isDateMarked" class="update__task-btn check">Green</button>
				</div>
				<div class="task__details-btn">
					<button @click="onMissClick" :disabled="isDateMarked" class="update__task-btn">Grey</button>
				</div>
			</div>
			<div class="progress__container-details">
				<ProgressBar
					:progress="selectedTask.progress"
					:progressMiss="selectedTask.progressMiss"
					:history="selectedTask.history"
					:size="190"
					:padding="25"
				/>
			</div>
			<div class="checked-progress">
				<div class="checked__progress-wrapper">
					<div class="checked__wrapper">
						<img src="../assets/images/checkIcon.svg" alt="" class="checked__icon">
						<span class="checked__text checked__green">{{ checkedCount }} {{ $t('CheckedProgress.checked')}}</span>
					</div>
					<div class="checked__wrapper">
						<img src="../assets/images/noyChecked.svg" alt="" class="checked__icon">
						<span class="checked__text"> {{ missedCount }} {{ $t('CheckedProgress.notChecked')}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, computed, onMounted} from "vue";
	import {useRoute} from "vue-router";
	import {useHabitStore} from "../stores/habitStore.js";
	import ProgressBar from "../src/components/progressBar.vue";
	import EditDeleteMenu from '../src/components/EditDeleteMenu.vue';
	import EditIcon from  '../assets/images/editIcon.svg'
	const { locale } = useI18n()
    const editIcon = ref(EditIcon)
	const editState = ref(false);
	const isOpen = ref(false);
	const taskToDelete = ref(null);
	const router = useRoute();
	const missedCount = ref(0)
	const checkedCount = ref(0)
	const isDateSelected = ref(false);
	const checkedDates = ref([])
	const missedDates = ref([])
	const habitStore = useHabitStore();
	const selectedTask = computed(() =>
		habitStore.tasks.find((task) => task.id === Number(router.query.id)) || null
	);

	const onDateSelect = (day) => {
		if (!day || !day.id || !selectedTask.value) return;
		const selectedDate = day.id;
		if (selectedDate < selectedTask.value.dateRange.start || selectedDate > selectedTask.value.dateRange.end) {
			console.log("Дата вне диапазона");
			return;
		}
		isDateSelected.value = true;
		localDateRange.value.start = selectedDate;
		console.log("Выбрана", selectedDate);
	};

	const disabledDates = computed(() => {
		return selectedTask.value?.blockedDates || [];
	});

	const loadTask = () => {
		habitStore.loadTasks();
		if (selectedTask.value) {
			const savedDateRange = localStorage.getItem(`task_${selectedTask.value.id}_dateRange`);
			if (savedDateRange) {
				localDateRange.value = JSON.parse(savedDateRange);
			} else {
				localDateRange.value = {
					start: selectedTask.value.dateRange.start,
					end: selectedTask.value.dateRange.end,
				};
			}
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
		const savedCheckedCount = localStorage.getItem("checkedCount");
		if (savedCheckedCount) {
			checkedCount.value = parseInt(savedCheckedCount, 10);
		}
		const savedMissedCount = localStorage.getItem("missedCount");
		if (savedMissedCount) {
			missedCount.value = parseInt(savedMissedCount, 10);
		}
	});

	const onCheckClick = () => {
		if (!selectedTask.value) return;
		const selectedDate = localDateRange.value.start;
		if (!selectedDate ||
			new Date(selectedDate) < new Date(selectedTask.value.dateRange.start) ||
			new Date(selectedDate) > new Date(selectedTask.value.dateRange.end)
		) {
			console.log("дата вне диапазона!");
			localDateRange.value.start = null;
			return;
		}
		if (checkedDates.value.includes(selectedDate) || missedDates.value.includes(selectedDate)) {
			console.log("Дата уже отмечена");
			return;
		}
		if (!selectedTask.value.checkedDates) {
			selectedTask.value.checkedDates = [];
		}
		selectedTask.value.checkedDates.push(selectedDate);
		checkedDates.value.push(selectedDate);
		localStorage.setItem(`task_${selectedTask.value.id}_checkedDates`, JSON.stringify(checkedDates.value)
		);
		checkedCount.value++;

		const totalDays = Math.max(1, (new Date(selectedTask.value.dateRange.end) - new Date(selectedTask.value.dateRange.start)) / (1000 * 60 * 60 * 24) + 1);
		const step = (100 / totalDays).toFixed(2);
		if (!selectedTask.value.history) {
			selectedTask.value.history = [];
		}

		const remainingProgress = 100 - selectedTask.value.progressMiss - selectedTask.value.progress;
		if (remainingProgress <= 0) return;
		selectedTask.value.history.push({
			color: "#4FC55C",
			percent: Math.min(parseFloat(step), remainingProgress),
		});

		habitStore.updateProgress(selectedTask.value);
		habitStore.saveTasks();
	};

	const onMissClick = () => {
		if (!selectedTask.value) return;
		const selectedDate = localDateRange.value.start;
		if (!selectedDate || checkedDates.value.includes(selectedDate) || missedDates.value.includes(selectedDate)) {
			console.log("Дата уже отмечена или не выбрана");
			return;
		}
		if (!selectedTask.value.missedDates) {
			selectedTask.value.missedDates = [];
		}
		if (!selectedTask.value.missedDates.includes(selectedDate)) {
			selectedTask.value.missedDates.push(selectedDate);
			missedDates.value.push(selectedDate);
			localStorage.setItem(`task_${selectedTask.value.id}_missedDates`, JSON.stringify(missedDates.value)
			);

			const totalDays = Math.max(1, (new Date(selectedTask.value.dateRange.end) - new Date(selectedTask.value.dateRange.start)) / (1000 * 60 * 60 * 24) + 1);
			const step = (100 / totalDays).toFixed(2);
			if (!selectedTask.value.history) {
				selectedTask.value.history = [];
			}
			const remainingProgress = 100 - selectedTask.value.progressMiss - selectedTask.value.progress;
			if (remainingProgress <= 0) return;
			selectedTask.value.history.push({
				color: "#FF5C00",
				percent: Math.min(parseFloat(step), remainingProgress),
			});
			missedCount.value++;
			habitStore.updateProgress(selectedTask.value);
			habitStore.saveTasks();
		}
	};

	const checkedDatesAttributes = computed(() => {
		return [
			...checkedDates.value.map(date => ({
				key: `checked-${date}`,
				dates: [new Date(date)],
				highlight: {
					contentClass: "vc-highlight-green",
				},
			})),
			...missedDates.value.map(date => ({
				key: `missed-${date}`,
				dates: [new Date(date)],
				highlight: {
					contentClass: "vc-highlight-red",
				},
			})),
		];
	});
	const isDateMarked = computed(() => {
		const date = localDateRange.value.start;
		if (!date) return false;
		return checkedDates.value.includes(date) || missedDates.value.includes(date);
	});
	const localDateRange = ref({
		start: selectedTask.value?.dateRange.start || null,
		end: selectedTask.value?.dateRange.end || null,
	});
	const clearTask = (taskId) => {
		if (!taskId) return;
		habitStore.removeTask(taskId);
		editState.value = false;

		if (habitStore.tasks.length === 0) {
			checkedCount.value = 0;
			missedCount.value = 0;
		} else {
			checkedCount.value = habitStore.tasks.reduce((sum, task) => sum + (task.checkedDates?.length || 0), 0);
			missedCount.value = habitStore.tasks.reduce((sum, task) => sum + (task.missedDates?.length || 0), 0);
		}

		localStorage.setItem("checkedCount", checkedCount.value);
		localStorage.setItem("missedCount", missedCount.value);
	};
	const editMenu = () => {
		isOpen.value = true;
	};

	const cancelDelete = () => {
		taskToDelete.value = null;
		isOpen.value = false;
		editState.value = false;
	};

	const openConfirmWindow = (taskId) => {
		taskToDelete.value = taskId;
		isOpen.value = false;
		editState.value = true;
	};

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	definePageMeta({
		layout: 'footerlayout',
	});

	watch([checkedCount, missedCount], () => {
		localStorage.setItem("checkedCount", checkedCount.value);
		localStorage.setItem("missedCount", missedCount.value);
	});
</script>
<style>
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
		background: var(--background-color);
		padding: 10px;
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
	}

	.checked__text {
		text-align: start;
		font-size: 16px;
		font-family: "Nunito", serif;
		line-height: 21.82px;
		padding: 3px;
		color: var(--text-color);
	}

	.checked__progress-wrapper {
		margin-top: 10px;
	}

	.checked-progress {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 55px;
	}

	.progress__container-details {
		margin-top: 14px;
	}

	.task__details-btns {
		display: flex;
		justify-content: space-between;
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

	.task__goal-name {
		color: var(--text-color);
	}

	.edit__menu-wrapper {
		position: relative;
	}

	.task__details-btn {
		margin-top: 10px;
		width: 47%;
		padding: 5px;
	}

	.update__date-wrapper {
		width: 100%;
		height: 100vh;
		padding: 20px;
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
		padding: 0 10px 10px 10px;
		font-family: "Nunito", serif;
		font-weight: 600;
	}

	.task__icon-back {
		width: 35px;
		height: 35px;
		background: var(--footer-bg);
		padding: 4px;
		border-radius: 50%;
	}

	.update__task-btn {
		width: 100%;
		padding: 12px 20px;
		border: none;
		font-size: 18px;
		border-radius: 10px;
		background: #FF5C00;
		color: var(--text-color);
		font-family: "Nunito", serif;
	}

	.update__task-btn.check {
		background: #4FC55C;
	}

	.confirm__window.show__confirm {
		height: 125px;
		border-bottom-left-radius: 25px;
		border-bottom-right-radius: 25px;
	}

	.confirm__window {
		width: 100%;
		top: 0;
		left: 0;
		z-index: 2;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 0;
		overflow: hidden;
		transition: height 0.3s ease;
	}

	.confirm__content-wrapper {
		background: var(--footer-bg);
		width: 100%;
		height: 100%;
	}

	.confirm__title {
		padding: 15px;
		color: var(--text-color);
		text-align: center;
		font-size: 24px;
		font-family: "Nunito", serif;
		font-weight: 600;
	}

	.confirm__btns {
		display: flex;
		justify-content: center;
	}

	.confirm__btn.btn-green {
		background: #4FC55C;
	}

	.confirm__btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30%;
		margin: 0 5px;
		font-size: 18px;
		padding: 5px;
		border-radius: 10px;
		border: none;
		background: #FF5C00;
		color: var(--text-color);
		font-family: "Nunito", serif;
	}
</style>