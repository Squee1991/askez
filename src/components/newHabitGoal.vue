<template>
	<div class="habit-goal-modal">
		<div class="close__wrapper">
			<div class="close__title">Create New Habit Goal</div>
			<button class="close__goal-btn" @click="closeWindow">
				<img class="close__goal" :src="CloseIcon" alt="">
			</button>
		</div>
		<div class="inpit__fields-inner">
			<div class="inpit__fields">
				<span class="inpit__label">Your Goal </span>
				<input class="input__goal" v-model="inputValueGoal" type="text">
				<span class="inpit__label">Habit Name</span>
				<input class="input__goal" v-model="inputValueName" type="text">
			</div>
		</div>
		<button  class="create__btn" @click="addValue">Create New</button>
	</div>
</template>

<script setup>

	import CloseIcon from '/assets/images/close.svg'
	import { ref , defineEmits } from "vue";
	const inputValueGoal = ref('');
	const inputValueName = ref('');
	const emit = defineEmits(["close" , "add"]);

	const closeWindow = () => {
		emit("close")

	}

	const addValue = () => {
		if (!inputValueGoal.value.trim() && !inputValueName.value.trim()) return
		if (inputValueGoal.value.trim() && inputValueName.value.trim()) {
			emit("add", inputValueGoal.value , inputValueName.value );
			inputValueGoal.value = "";
			inputValueName.value = "";
			closeWindow()
		}
	};

</script>

<style scoped>

	.inpit__label {
		font-size: 14px;
		font-family: "Nunito", serif;
		font-weight: 700;
	}

	.inpit__fields-inner {
		width: 100%;
	    padding: 20px 0;
	}

	.input__goal {
		margin-bottom: 10px;
		width: 100%;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid #EDEDED;
	}

	.input__goal:focus {
		border: 1px solid #c14747;
	}

	.habit-goal-modal {
		width: 100%;
		border-radius: 10px;
		background: white;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	.close__goal-btn {
		border: none;
		background: none;
	}

	.close__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.close__title {
		font-size: 18px;
		font-weight: 700;
		font-family: "Nunito", serif;
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
