<template>
	<div v-if="isSuccessVisible" class="success__modal-window">
		<SuccessModal @close="handleSuccessClose"/>
	</div>
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
						<span class="input__label">Your Goal</span>
						<input class="input__goal" v-model="inputValueGoal" type="text"/>
						<span class="input__label">Habit Name</span>
						<input class="input__goal" v-model="inputValueName" type="text"/>
					</div>
				</div>
				<div class="period__wrapper select">
					<span class="select_label label">Period</span>
					<SelectComponent
						:options="options.periodOptions"
						v-model="selectedPeriod"

					/>
				</div>
				<div class="habbit__wrapper select">
					<span class="select_label label">Habit Type</span>
					<SelectComponent
						:options="options.habitTypeOptions"
						v-model="selectedHabitType"

					/>
				</div>
				<button class="create__btn" @click="addValue">Create New</button>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, defineEmits} from "vue";
	import CloseIcon from "/assets/images/close.svg";
	import SuccessModal from "./SuccessModal.vue";
	import SelectComponent from '/src/components/selectComponent.vue'

	const isSuccessVisible = ref(false);
	const inputValueGoal = ref("");
	const inputValueName = ref("");
	const selectedPeriod = ref("");
	const selectedHabitType = ref("")
	const emit = defineEmits(["close", "add"]);

	const options = ref({
		periodOptions: [
			{label: "1 Month", value: "1_month"},
			{label: "3 Months", value: "3_months"},
			{label: "6 Months", value: "6_months"},
		],
		habitTypeOptions: [
			{label: "Everyday", value: "everyday"},
			{label: "Once a Week", value: "once_a_week"},
			{label: "Custom", value: "custom"},
		],
	});

	const clearFields = (fields) => fields.forEach(field => field.value = "")

	const addValue = () => {
		const isInputValid = [inputValueGoal.value, inputValueName.value, selectedPeriod.value, selectedHabitType.value]
		.every(value => value.trim?.());
		if (!isInputValid) return;
		emit("add", inputValueGoal.value, inputValueName.value, selectedPeriod.value, selectedHabitType.value);
		clearFields([inputValueGoal, inputValueName, selectedPeriod, selectedHabitType])
		isSuccessVisible.value = true;
	};

	const handleSuccessClose = () => {
		isSuccessVisible.value = false;
		emit("close");
	};

	const closeWindow = () => {
		emit("close");
	};

</script>

<style scoped>

	.label {
		font-family: "Nunito", serif;
		font-size: 14px;
		font-weight: 600;
		line-height: 19px;
		color: #2F2F2F;
	}

	.select {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
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
		margin-top: 90px;  /* 90 это временно! надо подругому отпозиционировать  */
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

	.input__label {
		font-size: 14px;
		font-family: "Nunito", serif;
		font-weight: 700;
	}

	.input__goal {
		margin: 5px 0 10px 0;
		width: 100%;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid #ededed;
	}

	.input__goal:focus {
		border: 1px solid #c14747;
	}

	.create__btn {
		width: 100%;
		padding: 17px;
		border: none;
		background: #48e37e;
		border-radius: 5px;
		color: white;
		margin-top: 10px;
	}
</style>
