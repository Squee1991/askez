<template>
	<div class="update__date-wrapper">
		<div v-if="selectedTask">
			<div class="task__name">
				<span>{{ selectedTask.goal }}</span>
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
			<VDatePicker v-model.range="localDateRange" mode="range"/>
			<div class="task__details-btns">
				<div class="task__details-btn check">
					<button class="update__task-btn check">Check</button>
				</div>
				<div class="task__details-btn">
					<button class="update__task-btn" @click="updateTaskDates">Update</button>
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

	const router = useRoute();
	const habitStore = useHabitStore();
	const circumference = computed(() => 2 * Math.PI * habitStore.radius);
	const selectedTask = computed(() =>
		habitStore.tasks.find((task) => task.id === Number(router.query.id))
	);

	const localDateRange = ref({
		start: selectedTask.value?.dateRange.start || "",
		end: selectedTask.value?.dateRange.end || "",
	});

	const updateTaskDates = () => {
		if (!selectedTask.value) return;
		selectedTask.value.dateRange = {
			start: localDateRange.value.start,
			end: localDateRange.value.end,
		};
		habitStore.updateProgress(selectedTask.value);
		habitStore.saveTasks();
	};

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			day: "2-digit",
			month: "long",
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
	}

	.vc-header {
		margin-top: 0;
	}

	.task__details__arrow-icon {
		width: 40px;
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
	}

	.range__date-wrapper {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
	}

	.task__name {
		text-align: center;
		font-size: 30px;
		color: black;
		padding: 10px 10px 10px 10px;
		font-family: "Nunito", serif;
		font-weight: 600;
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

</style>
