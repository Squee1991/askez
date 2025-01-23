<template>
	<div class="update__date-wrapper">
		<div v-if="selectedTask">
			<div class="task__name">{{ selectedTask.goal }}</div>
			<div class="range__date-wrapper">
				<div>
					<div>Start date</div>
					<div>{{ formatDate(selectedTask.dateRange.start) }}</div>
				</div>
				<div>
					<div>End date</div>
					<div>{{ formatDate(selectedTask.dateRange.end) }}</div>
				</div>
			</div>
			<VDatePicker  v-model.range="localDateRange" mode="range"/>
			<div>
				<button class="update__task-btn" @click="updateTaskDates">Update</button>
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
	const localRadius = ref(70);
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


<style>
	.vc-header {

	}

	.vc-container {
		width: 100%;
		border: none;
		margin-bottom: 15px;
	}

    .update__date-wrapper {
	    width: 100%;
	    height: 100vh;
	    padding: 20px;
    }

	.range__date-wrapper {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
	}

	.task__name {
		font-size: 30px;
		color: black;
		padding: 10px 10px 20px 10px;
	}

	.update__task-btn {
		width: 100%;
		padding: 10px;
		border: none;
	}
</style>
