<template>
	<div class="wrapper">
		<div class="habit-goal-modal">
			<div class="input__fields-wrapper">
				<div class="close__wrapper">
					<div class="close__title">Create New Habit Goal</div>
					<button class="close__goal-btn" @click="closeWindow">
						<img class="close__goal" :src="CloseIcon" alt=""/>
					</button>
				</div>
				<div class="input__fields-inner">
					<div class="input__fields">
						<span class="input__label label">Your Goal</span>
						<input class="input__goal" v-model="inputValueGoal" type="text"/>
					</div>
				</div>
				<div class="date__picker-inenr">
					<span class="date__picke-label label">Select date period</span>
					<VDatePicker v-model.range="localDateRange" mode="range"/>
				</div>
				<button class="create__btn" @click="addValue">Create new</button>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, defineEmits} from "vue";
	import CloseIcon from "/assets/images/close.svg";
	import SuccessModal from "../../pages/SuccessModal.vue";
	import SelectComponent from '/src/components/selectComponent.vue'
	import {useHabitStore} from '/stores/habitStore.js'

	const habitStore = useHabitStore()
	const isSuccessVisible = ref(false);
	const inputValueGoal = ref("");

	const selectedPeriod = ref("");
	const selectedHabitType = ref("")
	const emit = defineEmits(["close", "add"]);
	const router = useRouter()
	import {useRouter} from 'vue-router'

	const localDateRange = ref({
		start: new Date(),
		end: new Date()
	});

	const clearFields = (fields) => fields.forEach(field => field.value = "")
	const addValue = () => {
		const isInputValid = [inputValueGoal.value].every((value) => value.trim?.());
		const isDateRangeValid = localDateRange.value.start && localDateRange.value.end;

		if (!isInputValid || !isDateRangeValid) {
			return;
		}
		const newTask = {
			goal: inputValueGoal.value,

			dateRange: localDateRange.value,
			checked: false,
		};
		habitStore.addTask(newTask);
		emit("add", newTask);
		clearFields([inputValueGoal]);
		isSuccessVisible.value = true;
		router.push('/SuccessModal')

	};

	watch(localDateRange, (newVal) => {
		console.log("Выбраны даты:", newVal);
	});

	const closeWindow = () => {
		emit("close");
	};

</script>
<style>
	.create__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 18px;
		border: none;
		background-color: #48e37e;
		color: white;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		border-radius: 8px;
		position: relative;
		overflow: hidden;
	}

	.vc-container {
		width: 100%;
		border: none;
	}

	.label {
		font-family: "Nunito", serif;
		font-size: 14px;
		font-weight: 600;
		line-height: 19px;
		color: #2F2F2F;
	}

	.wrapper {
		position: relative;
	}

	.success__modal-window {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input__fields-wrapper {
		padding: 20px;
		background: #f8f4f4;
		border-radius: 10px;
	}

	.habit-goal-modal {
		position: absolute;
		width: 100%;
		border-radius: 10px;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	.close__wrapper {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.close__title {
		font-size: 18px;
		font-weight: 700;
		font-family: "Nunito", serif;
	}

	.close__goal-btn {
		border: none;
		background: none;
	}

	.input__fields {
		margin-bottom: 20px;
	}

	.label {
		font-size: 14px;
		font-family: "Nunito", serif;
		font-weight: 700;
		padding-bottom: 5px;
	}

	.input__goal {
		margin: 3px 0 3px 0;
		width: 100%;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid #ededed;
	}

	.input__goal:focus {
		border: 1px solid #47b7c1;
	}
</style>
