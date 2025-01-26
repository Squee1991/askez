<template>
	<div class="update__date-wrapper">
		<div :class="{'show__confirm': editState}" class="confirm__window">
			<div class="confirm__content-wrapper">
				<div class="confirm__title">Delete your goal ?</div>
				<div class="confirm__btns">
					<button @click="cancelDelete" class="btn-green confirm__btn">No</button>
					<NuxtLink @click="clearTask(selectedTask.id)" class="confirm__btn" to="/welcomePage">
						<button class="confirm__btn">Yes</button>
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
					<EditDeleteMenu @click="editMenu"/>
					<ul v-if="isOpen" class="edit__menu-list">
						<li @click="updateTaskDates" class="edit__menu-item">Edit tsk</li>
						<li @click="openConfirmWindow(selectedTask.id)" class="edit__menu-item">Del task</li>
					</ul>
				</div>
			</div>
			<div class="range__date-wrapper">
				<div class="range__date">
					<div class="range__date-text">Start date:</div>
					<div class="range__date__data start">{{ formatDate(selectedTask.dateRange.start) }}</div>
				</div>
				<div class="range__date">
					<div class="range__date-text">End date:</div>
					<div class="range__date__data end">{{ formatDate(selectedTask.dateRange.end) }}</div>
				</div>
			</div>
			<div class="date__picker">
				<VDatePicker v-model.range="localDateRange" mode="range"/>
			</div>
			<div class="task__details-btns">
				<div class="task__details-btn check">
					<button class="update__task-btn check">Check</button>
				</div>
				<div class="task__details-btn">
					<button class="update__task-btn">Miss</button>
				</div>
			</div>
			<div class="progress__container-details">
				<ProgressBar
					:progress="selectedTask.progress"
					:offset="selectedTask.offset"
					:radius="habitStore.radius"
					:circumference="circumference"
				/>
			</div>
			<div class="checked__progress">
				<div class="checked__progress-wrapper">
					<div class="checked__wrapper">
						<img src="../assets/images/checkIcon.svg" alt="" class="checked__icon">
						<span class="checked__text checked__green">goal has checked</span>
					</div>
					<div class="checked__wrapper">
						<img src="../assets/images/noyChecked.svg" alt="" class="checked__icon">
						<span class="checked__text">goal hasn’t checked</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>
	import {ref, computed, onMounted} from "vue";
	import {useRoute} from "vue-router";
	import {useHabitStore} from "/stores/habitStore.js";
	import ProgressBar from "../src/components/progressBar.vue";
	import HeaderWithBack from '../src/components/headerWithBack.vue'
	import EditDeleteMenu from '../src/components/EditDeleteMenu.vue'
	import ConfirmWindow from '../src/components/confirmWindow.vue'

	const editState = ref(false)
	const isOpen = ref(false);
	const taskToDelete = ref(null);
	const router = useRoute();
	const habitStore = useHabitStore();
	const circumference = computed(() => 2 * Math.PI * habitStore.radius);
	const selectedTask = computed(() =>
		habitStore.tasks.find((task) => task.id === Number(router.query.id)) || null
	);

	const localDateRange = ref({
		start: selectedTask.value?.dateRange.start || "",
		end: selectedTask.value?.dateRange.end || "",
	});

	const clearTask = (taskId) => {
		if (!taskId) return;
		habitStore.removeTask(taskId);
		editState.value = false;
	};

	const editMenu = () => {
		isOpen.value = true
	}

	const cancelDelete = () => {
		taskToDelete.value = null;
		isOpen.value = false;
		editState.value = false
	};

	const openConfirmWindow = (taskId) => {
		taskToDelete.value = taskId;
		isOpen.value = false;
		editState.value = true;
	};

	const updateTaskDates = () => {
		if (!selectedTask.value) return;
		selectedTask.value.dateRange = {
			start: localDateRange.value.start,
			end: localDateRange.value.end,
		};
		habitStore.updateProgress(selectedTask.value);
		habitStore.saveTasks();
		isOpen.value = false
	};

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};
	onMounted(() => {
		habitStore.loadTasks();
		if (selectedTask.value) {
			localDateRange.value = {
				start: selectedTask.value.dateRange.start,
				end: selectedTask.value.dateRange.end,
			};
		}
	});

	definePageMeta({
		layout: 'footerlayout'
	})
</script>
<style>

	.vc-highlight-light-bg {
		background: red;
	}

	.vc-highlight-bg-solid {
		background-color: #4FC55C;
	}

	.vc-highlight-bg-light {
		background: #C7FFDE;
	}

	.vc-blue {
		border: none;
	}

	.vc-header .vc-arrow {
		color: #FF5C00;
	}

	.vc-container {
		width: 100%;
		border: none;
		background: #FBFBFB;
		padding: 10px;
	}

	.vc-header .vc-title {
		color: #FF5C00;
		background: none;
		font-size: 20px;
	}

	.vc-header {
		margin-top: 0;
	}

	.task__details__arrow-icon {
		width: 40px;
	}

	.confirm__content-wrapper {

	}

	.checked__green {
		color: #4FC55C;
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
	}

	.checked__progress {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 45px;
	}

	.progress__container-details {
		display: flex;
		margin: 0 auto;
		justify-content: center;
		width: 65%;
	}

	.task__details-btns {
		display: flex;
		justify-content: space-between;
	}

	.range__date-text {
		font-size: 13px;
		color: #2F2F2F;
		font-family: "Nunito", serif;
	}

	.range__date__data {
		font-size: 14px;
		font-weight: 500;
		color: #2F2F2F;
		font-family: "Nunito", serif;
	}

	.edit__menu-item {
		font-size: 16px;
		margin: 2px;
		padding: 2px;
		color: white;
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

	}

	.range__date-wrapper {
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}

	.task__name {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30px;
		color: black;
		padding: 0 10px 10px 10px;
		font-family: "Nunito", serif;
		font-weight: 600;
	}

	.task__icon-back {
		width: 30px;
	}

	.update__task-btn {
		width: 100%;
		padding: 12px 20px;
		border: none;
		font-size: 18px;
		border-radius: 10px;
		background: linear-gradient(48.62deg, #FFA450 11.85%, #FF5C00 66.77%);
		color: white;
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
		background: #DFF4E4;
		width: 100%;
		height: 100%;
	}

	.confirm__title {
		padding: 15px;
		color: #2F2F2F;
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
		color: white;
		font-family: "Nunito", serif;
	}

</style>
