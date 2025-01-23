<template>
	<div>
		<h3>Детали задачи</h3>
		<div v-if="selectedTask">
			<div>Название: {{ selectedTask.goal }}</div>
			<div>Прогресс: {{ selectedTask.progress }}%</div>
			<div>начало: {{ formatDate(selectedTask.dateRange.start) }}</div>
			<div>Окончание {{ formatDate(selectedTask.dateRange.end) }}</div>
			<VDatePicker  v-model.range="localDateRange" mode="range"/>
			<div>
				<button @click="updateTaskDates">Update</button>
			</div>
			<ProgressBar
				:progress="selectedTask.progress"
				:offset="selectedTask.offset"
				:radius="habitStore.radius"
				:circumference="circumference"
			/>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import { useHabitStore } from "/stores/habitStore.js";
	import ProgressBar from "../src/components/progressBar.vue";
	const route = useRoute();
	const habitStore = useHabitStore();
	const circumference = computed(() => 2 * Math.PI * habitStore.radius);
	const selectedTask = computed(() =>
		habitStore.tasks.find((task) => task.id === Number(route.query.id))
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
</script>

