<template>
	<div class="wrapper">
		<SuccessModal v-if="isSuccessVisible" @close="handleSuccessClose" />
		<div v-else class="habit-goal-modal">
			<div class="input__fields-wrapper">
				<div class="close__wrapper">
					<div class="close__title">Create New Habit Goal</div>
					<button class="close__goal-btn" @click="closeWindow">
						<img class="close__goal" :src="CloseIcon" alt="" />
					</button>
				</div>
				<div class="input__fields-inner">
					<div class="input__fields">
						<span class="input__label">Your Goal</span>
						<input class="input__goal" v-model="inputValueGoal" type="text" />
						<span class="input__label">Habit Name</span>
						<input class="input__goal" v-model="inputValueName" type="text" />
					</div>
				</div>
				<button class="create__btn" @click="addValue">Create New</button>
			</div>

		</div>
	</div>
</template>

<script setup>
	import { ref, defineEmits } from "vue";
	import CloseIcon from "/assets/images/close.svg";
	import SuccessModal from "./SuccessModal.vue";


	const isSuccessVisible = ref(false);
	const inputValueGoal = ref("");
	const inputValueName = ref("");


	const emit = defineEmits(["close", "add"]);


	const closeWindow = () => {
		emit("close");
	};


	const addValue = () => {
		if (!inputValueGoal.value.trim() || !inputValueName.value.trim()) return;


		emit("add", inputValueGoal.value, inputValueName.value,);


		inputValueGoal.value = "";
		inputValueName.value = "";


		isSuccessVisible.value = true;
	};

	const handleSuccessClose = () => {
		isSuccessVisible.value = false;
		emit("close");
	};
</script>

<style scoped>

	.wrapper {
		position: relative;
	}

	.input__fields-wrapper {
		padding: 20px;
		background: white;
		border-radius: 10px;
	}

	.habit-goal-modal {
		margin-top: 60px;
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
		margin-bottom: 10px;
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
		border-radius: 10px;
		color: white;
	}
</style>
