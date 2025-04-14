<template>
	<div class="wrapper">
		<div class="empty" :class="{'is-empty' : IsEmpty}">
			<div class="empty__text">
				{{ $t('bublingWindows.fieldEmpty')}}
			</div>
		</div>
		<PremiumOverlay
			v-if="!authStore.isPremium && isOverlayVisible"
			:text="$t('premiumWindow.taskText')"
			:subtext="$t('premiumWindow.subtext')"
			@close="isOverlayVisible = false"
		/>
		<div v-if="!isOverlayVisible" class="habit-goal-modal">
			<div class="input__fields-wrapper">
				<div class="close__wrapper">
					<div class="close__title"> {{ $t('createTask.title')}}</div>
					<button class="close__goal-btn" @click="closeWindow">
						<img class="close__goal" :src="CloseIcon" alt=""/>
					</button>
				</div>
				<div class="input__fields-inner">
					<div class="input__fields">
						<span class="input__label label">{{ $t('createTask.task')}}</span>
						<input
							class="input__goal"
							v-model="inputValueGoal"
							type="text"
							maxlength="35"
						/>
					</div>
				</div>
				<div class="border__underline-wrapper">
					<div @click="toogleColor" class="title__underline">{{ $t('color.value')}}</div>
					<div class="color-picker">
						<div
							v-for="color in colors"
							:key="color"
							class="color-circle"
							:style="{ backgroundColor: color,  }"
							:class="{ selected: selectedColor === color }"
							@click="selectedColor = color"
						/>
					</div>
				</div>
				<div class="date__picker-inenr">
					<span class="date__picke-label label">{{ $t('createTask.datum')}}</span>
					<VDatePicker
						:locale="locale"
						:min-date='new Date()'
						v-model.range="localDateRange"
						mode="range"
					/>
				</div>
				<button class="create__btn" @click="addValue">{{ $t('createTask.btn')}}</button>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, defineEmits} from "vue";
	import PremiumOverlay from '/src/components/premiumWindow.vue'
	import CloseIcon from "/assets/images/close.svg";
	import SelectComponent from '/src/components/selectComponent.vue'
	import SuccesModal from '/src/components/succesModal.vue'
	import {useHabitStore} from '../../stores/habitStore.js'
	import {useAuthStore} from '../../stores/authStore.js'
	import {useRouter} from 'vue-router'

	const authStore = useAuthStore()
	const IsEmpty = ref(false)
	const habitStore = useHabitStore()
	const {locale} = useI18n()
	const inputValueGoal = ref("");
	const emit = defineEmits(["close", "add"]);
	const router = useRouter()
	const isOverlayVisible = ref(false)
	const accordion = ref(false)
	const localDateRange = ref({
		start: new Date(),
		end: new Date()
	})
	const colors = [
		'#845EC2',
		'#FF6B6B',
		'#4D96FF',
		'#FFD93D',
		'#FF9671',
		'#00C9A7',
		'#FF61A6',
		'#c782a1',
		'#61d2ff',
		'#bb6634',
		'#61d2ff',
	];
	let selectedColor = ref(colors[0])

	const clearFields = (fields) => fields.forEach(field => field.value = "")
	const addValue = () => {
		if (!authStore.isPremium && habitStore.tasks.length >= 1) {
			isOverlayVisible.value = true;
			return;
		}
		const isInputValid = [inputValueGoal.value].every((value) => value.trim?.());
		const isDateRangeValid = localDateRange.value.start && localDateRange.value.end;
		if (!isInputValid || !isDateRangeValid) {
			IsEmpty.value = true;
			setTimeout(() => {
				IsEmpty.value = false;
			}, 1300);
			return;
		}

		const newTask = {
			goal: inputValueGoal.value,
			dateRange: localDateRange.value,
			color: selectedColor.value,
			checked: false,
		};
		habitStore.addTask(newTask);
		emit("add", newTask);
		clearFields([inputValueGoal]);
		selectedColor.value = colors[0];
	};

	watch(localDateRange, (newVal) => {
		console.log("Выбраны даты:", newVal);
	});

	const toogleColor = () => {
		accordion.value = !accordion.value
	}

	const closeWindow = () => {
		emit("close");
	};

</script>
<style>

	.color-picker {
		display: flex;
		gap: 8px;
		margin: 5px 0 12px 0;
		background: var(--background-color);
		padding: 10px;
		border-radius: 10px;
		align-items: center;
		overflow-x: auto;
	}

	.title__underline {
		color: var(--text-color);
		font-size: 14px;
		font-family: "Nunito", sans-serif;
		font-weight: 600;
	}

	.color-circle {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		cursor: pointer;
		transition: transform 0.2s;
		border: 2px solid transparent;
		flex: 0 0 auto;
	}

	.color-circle.selected {
		transform: scale(1.1);
		border-color: grey;
	}

	.border__underline-wrapper {
		padding: 5px 0 10px 0;
	}

	.border__underline {
		width: 40px;
		height: 40px;
		background: #3bff81;
		border-radius: 50%;
	}

	.border__underline:hover {
		border: 2px solid black;
	}

	.empty {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		z-index: 200;
		background: var(--indicator-bg);
		width: 100%;
		text-align: center;
		height: 0;
		font-size: 16px;
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
		overflow: hidden;
		transition: 0.3s;
	}

	.empty__text {
		color: white;
		font-size: 16px;
		font-family: sans-serif;
	}

	.is-empty {
		height: 42px;
		transition: 0.3s;
	}

	.vc-base-icon {
		stroke: blue;
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
		margin-top: 3px;
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

	.vc-day,
	.vc-weekday {
		color: var(--text-color);
		font-weight: bold;
	}


	.create__btn {
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 18px;
		border: none;
		background-color: var(--footer-bg);
		color: white;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		border-radius: 8px;
		position: relative;
		overflow: hidden;
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
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input__fields-wrapper {
		padding: 20px;
		background-color: var(--calendar--bg);
		border-radius: 10px;
	}

	.habit-goal-modal {
		position: absolute;
		width: 100%;
		top: 70px;
		border-radius: 10px;
		padding: 5px 15px;
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
		color: var(--title-c);
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
		color: var(--title-c);
	}

	.input__goal {
		margin: 3px 0 3px 0;
		width: 100%;
		padding: 15px;
		border-radius: 10px;
		border: 1px solid #ededed;
	}

	.input__goal:focus {
		border: 1px solid #47b7c1;
	}

</style>
