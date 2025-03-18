<template>
	<div class="update__date-wrapper">
		<div :class="{'show__confirm': editState}" class="confirm__window">
			<div class="confirm__content-wrapper">
				<div class="confirm__title">{{ $t('delConfirm.title')}}</div>
				<div class="confirm__btns">
					<NuxtLink @click="clearTask(selectedTask.id)" class="confirm__btn" to="/welcomePage">
						<button class="confirm__btn">{{ $t('delConfirm.accept')}}</button>
					</NuxtLink>
					<button @click="cancelDelete" class="btn-green confirm__btn">{{ $t('delConfirm.reject')}}</button>
				</div>
			</div>
		</div>
		<div v-if="selectedTask">
			<div class="task__name">
				<NuxtLink to="/welcomePage">
					<div class="task__icon-back">
						<svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
						     width="30px" height="30px" viewBox="0 0 193.266 193.266"
						     xml:space="preserve">
<g>
	<path d="M183.011,111.191c-13.503-36.417-51.753-46.329-86.965-37.976c1.185-8.843,0.875-17.887,0.649-26.781
		C96.494,38.482,97,29.389,95.584,21.28c-0.005-0.037-0.013-0.071-0.018-0.107c-0.258-1.465-0.56-2.907-0.963-4.292
		c-0.79-2.72-4.822-2.799-5.572,0c-0.139,0.515-0.218,1.048-0.325,1.573c-14.494,2.817-27.809,13.573-38.962,22.392
		c-6.306,4.986-12.443,10.196-18.487,15.511c-0.609-0.107-1.174,0.392-1.099,0.969C20.107,66.224,10.404,75.518,1.236,85.305
		c-1.426,1.523-1.855,4.518,0,5.972c30.215,23.666,57.453,52.513,89.75,73.318c0.635,0.409,1.248,0.315,1.7-0.025
		c1.129,0.224,2.323-0.152,3.133-1.298c3.548-5.033,1.35-16.004,1.158-21.858c-0.319-9.69-0.359-19.447-1.299-29.103
		c-0.306-3.148-4.586-3.148-4.892,0c-0.208,2.139-0.363,4.281-0.492,6.427c-20.425-16.76-42.62-32.602-64.911-46.671
		c3.142-3.206,6.384-6.417,9.706-9.579c17.919,17.464,39.387,32.001,59.841,46.1c0.571,0.394,1.116,0.463,1.593,0.346
		c-1.207,1.029-1.539,2.12,0.312,3.051c3.231,1.624,7.92-0.111,11.33-0.231c10.472-0.368,21.174,1.799,31.254,4.421
		c27.209,7.077,36.858,32.485,35.867,58.302c-0.162,4.208,4.941,5.065,7.204,2.634C204.136,172.434,187.177,122.427,183.011,111.191
		z M88.837,157.484c-23.365-25.615-51.154-48.365-78.416-69.66c2.155-2.315,4.39-4.705,6.668-7.12
		c19.029,25.518,47.702,41.455,72.384,60.894C89.285,145.7,88.26,152.22,88.837,157.484z M90.037,123.879
		c-0.162,4.025-0.254,8.054-0.372,12.08c-23.843-18.807-50.812-33.954-71.053-56.869c1.762-1.859,3.572-3.737,5.402-5.62
		C46.408,89.391,66.472,109.772,90.037,123.879z M175.227,113.337c0.388,0.962,0.846,2.13,1.327,3.38
		c-4.065-4.199-8.558-8.104-12.592-12.078c-8.462-8.339-17.324-16.26-26.242-24.102c-0.074-0.065-0.153-0.094-0.229-0.134
		C153.939,84.858,167.891,95.087,175.227,113.337z M88.021,27.104C88.114,31.48,88.651,35.917,89,40.16
		c-1.274-0.877-2.578-1.695-3.752-2.525c-2.876-2.031-5.853-3.905-8.873-5.709C80.205,30.026,84.085,28.381,88.021,27.104z
		 M73.448,33.453c3.091,1.995,6.117,4.073,9.061,6.282c2.224,1.668,4.412,3.892,6.821,5.546c0.125,2.239,0.251,4.477,0.361,6.72
		c-3.283-2.633-7.01-4.847-10.415-7.213c-4.007-2.784-8.194-5.403-12.651-7.413C68.875,35.97,71.156,34.682,73.448,33.453z
		 M63.941,39.094c4.186,2.222,8.243,4.523,12.17,7.215c4.617,3.165,8.874,7.295,13.794,9.992c0.095,1.959,0.187,3.918,0.291,5.876
		c-4.137-2.947-9.297-5.183-13.327-7.531c-6.35-3.699-12.537-7.595-18.672-11.602C60.093,41.671,62.012,40.362,63.941,39.094z
		 M104.335,105.296c-0.323,0.056-4.208,1.296-6.711,2.84c0.688-0.955,0.764-2.481-0.44-3.406
		C77.457,89.566,56.738,75.862,37.016,60.667c2.521-2.36,5.105-4.66,7.718-6.924c23.335,16.969,47.495,32.496,69.889,50.762
		C111.075,104.513,107.601,104.741,104.335,105.296z M119.264,104.628c0.382-0.715,0.353-1.603-0.473-2.339
		C96.915,82.781,71.129,68.128,46.737,52.032c3.079-2.607,6.219-5.115,9.409-7.5c5.407,4.148,11.154,7.877,16.839,11.605
		c5.502,3.607,11.394,8.754,17.526,11.596c0.153,2.407,0.316,4.812,0.521,7.21c-1.264,1.352-0.779,3.649,0.804,4.59
		c0.73,0.819,2.023,1.022,2.76,0.261c3.474-0.692,6.979-1.195,10.482-1.563c9.283,11.346,21.512,20.502,33.053,29.368
		C132.202,106.083,125.709,104.986,119.264,104.628z M141.533,108.496c-0.284-0.084-0.597-0.152-0.886-0.233
		c0.97-0.591,1.539-2.063,0.486-2.884c-11.471-8.927-23.009-17.109-33.122-27.423c4.293-0.334,8.564-0.37,12.778-0.152
		c-0.297,0.334-0.387,0.847,0.021,1.274c12.762,13.315,26.317,25.026,38.656,37.992
		C154.367,113.438,148.411,110.526,141.533,108.496z M122.35,77.89c5.049,0.35,9.978,1.152,14.714,2.403
		c-0.772,0.003-1.441,0.948-0.725,1.624c7.854,7.391,15.739,14.75,23.424,22.317c7.246,7.133,13.191,15.561,20.399,22.626
		c1.472,4.519,2.908,9.507,3.945,14.523C171.702,114.656,143.388,97.193,122.35,77.89z M183.474,166.147
		c-0.486-10.317-2.692-19.978-6.774-28.444c1.848,2.6,3.645,5.262,5.347,8.041c0.654,1.068,2.102,1.034,2.928,0.384
		C186.124,153.768,186.063,161.04,183.474,166.147z"/>
</g>
</svg>
					</div>
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
					<button @click="onCheckClick" :disabled="isDateMarked" class="update__task-btn check">{{ $t('checkedBtns.done')}}</button>
				</div>
				<div class="task__details-btn">
					<button @click="onMissClick" :disabled="isDateMarked" class="update__task-btn">{{ $t('checkedBtns.missed')}}</button>
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
	const isDateSelected = ref(false);
	const checkedDates = ref([])
	const missedDates = ref([])
	const checkedCount = ref(0);
	const missedCount = ref(0);

	const habitStore = useHabitStore();
	const selectedTask = computed(() =>
		habitStore.tasks.find((task) => task.id === Number(router.query.id)) || null
	);

	const onDateSelect = (day) => {
		if (!day || !day.id || !selectedTask.value) return;
		const tempSelectedDate = removeTime(day.id);
		const rangeStart = removeTime(selectedTask.value.dateRange.start);
		const rangeEnd = removeTime(selectedTask.value.dateRange.end);
		if (tempSelectedDate < rangeStart || tempSelectedDate > rangeEnd) {
			console.log("Дата вне диапазона");
			return;
		}
		isDateSelected.value = true;
		localDateRange.value.start = tempSelectedDate;

	};

	const removeTime = (timestamp) => {
		const date = new Date(timestamp);
		date.setHours(0, 0, 0, 0);
		return date.getTime();
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
			new Date(selectedDate) >= new Date(selectedTask.value.dateRange.end)
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

	watch(selectedTask, (newTask) => {
		if (newTask) {
			checkedCount.value = newTask.checkedDates?.length || 0;
			missedCount.value = newTask.missedDates?.length || 0;
		}
	}, { deep: true, immediate: true });

</script>
<style>

	.vc-highlight-red {
		background-color: #FF3030 !important;
		color: black !important;
	}

	.vc-highlight-green {
		background-color: #00D100 !important;
		color: black !important;
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
		font-size: 18px;
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
		padding: 16px 20px 2px 20px;
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
		color: var(--text-color);
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