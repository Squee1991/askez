<template>
	<div class="wrapper">
		<PremiumOverlay
			v-if="!authStore.isPremium && isOverlayVisible"
			:text="$t('premiumWindow.taskText')"
			:subtext="$t('premiumWindow.subtext')"
			@close="isOverlayVisible = false"
		/>
		<div v-if="!isOverlayVisible" class="habit-goal-modal">
			<div class="empty" :class="{'is-empty' : IsEmpty}">
				<div class="empty__text">
					{{ inputErrorType === 'blocked'
					? $t('bublingWindows.blockedWord')
					: $t('bublingWindows.error') }}
				</div>
			</div>
			<div class="input__fields-wrapper">
				<div class="close__wrapper">
					<div class="close__title">
						{{ isEditMode ? $t('createTask.edit_title') : $t('createTask.title') }}
					</div>
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
							class="color-picker__wrapper"
							:class="{ selected: selectedColor === color }"
						>
							<div
								class="color-circle"
								:style="{ backgroundColor: color }"
								@click="selectedColor = color"
							/>
						</div>
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
				<button class="create__btn" @click="addValue">
					{{ isEditMode ? $t('createTask.edit_btn') : $t('createTask.btn') }}
				</button>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, defineEmits, computed , onMounted} from "vue";
	import PremiumOverlay from '/src/components/premiumWindow.vue'
	import CloseIcon from "/assets/images/close.svg";
	import SelectComponent from '/src/components/selectComponent.vue'
	import SuccesModal from '/src/components/succesModal.vue'
	import {useHabitStore} from '../../stores/habitStore.js'
	import {useAuthStore} from '../../stores/authStore.js'
	// import { blockedWords, supportedLangs } from '/src/ai/messageBot.js'
	import { useI18n } from 'vue-i18n'
	// const userLang = computed(() => locale.value.split('-')[0])
	import {useRouter} from 'vue-router'
	const inputErrorType = ref(null)
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
	const isEditMode = computed(() => !!props.taskToEdit)
	const props = defineProps({
		taskToEdit: Object
	})

	// const containsBlockedWord = (text) => {
	// 	const lowered = text.toLowerCase()
	// 	const cleaned = lowered.replace(/[^\p{L}\p{N}\s]/gu, '')
	// 	const words = cleaned.split(/\s+/)
	//
	// 	return Object.values(blockedWords).some(list =>
	// 		list.some(word => words.includes(word))
	// 	)
	// }

	const colors = [
		'#845EC2',
		'#FF6B6B',
		'#4D96FF',
		'#d7b52a',
		'#FF9671',
		'#00C9A7',
		'#FF61A6',
		'#c782a1',
		'#61d2ff',
		'#bb6634',
	];
	let selectedColor = ref(colors[0])
	const clearFields = (fields) => fields.forEach(field => field.value = "")
	// const addValue = () => {
	// 	if (!authStore.isPremium && habitStore.tasks.length >= 1) {
	// 		isOverlayVisible.value = true;
	// 		return;
	// 	}
	// 	const isInputValid = [inputValueGoal.value].every((value) => value.trim?.());
	// 	const isDateRangeValid = localDateRange.value.start && localDateRange.value.end;
	// 	if (!isInputValid || !isDateRangeValid) {
	// 		IsEmpty.value = true;
	// 		setTimeout(() => {
	// 			IsEmpty.value = false;
	// 		}, 1300);
	// 		return;
	// 	}
	//
	// 	if (containsBlockedWord(inputValueGoal.value)) {
	// 		IsEmpty.value = true
	// 		inputValueGoal.value = ''
	// 		setTimeout(() => {
	// 			IsEmpty.value = false
	// 		}, 1500)
	// 		return
	// 	}
	//
	// 	if (isEditMode.value && props.taskToEdit?.id) {
	// 		const newRange = localDateRange.value;
	// 		const totalDays = Math.max(1, (new Date(newRange.end) - new Date(newRange.start)) / (1000 * 60 * 60 * 24) + 1);
	// 		const checkedDays = props.taskToEdit.checkedDates?.length || 0;
	// 		const missedDays = props.taskToEdit.missedDates?.length || 0;
	// 		const donePercent = +(100 * checkedDays / totalDays).toFixed(2);
	// 		const missedPercent = +(100 * missedDays / totalDays).toFixed(2);
	//
	// 		const updatedTask = {
	// 			...props.taskToEdit,
	// 			goal: inputValueGoal.value,
	// 			color: selectedColor.value,
	// 			dateRange: newRange,
	// 			history: [
	// 				...Array(checkedDays).fill({ percent: +(100 / totalDays).toFixed(2), color: '#4FC55C' }),
	// 				...Array(missedDays).fill({ percent: +(100 / totalDays).toFixed(2), color: '#FF5C00' })
	// 			],
	// 			progress: donePercent,
	// 			progressMiss: missedPercent,
	// 		};
	//
	// 		habitStore.updateTask(updatedTask);
	// 		emit('close');
	// 		return;
	// 	}
	//
	// 	const newTask = {
	// 		goal: inputValueGoal.value,
	// 		dateRange: localDateRange.value,
	// 		color: selectedColor.value,
	// 		checked: false,
	// 	};
	// 	habitStore.addTask(newTask);
	// 	emit("add", newTask);
	// 	clearFields([inputValueGoal]);
	// 	selectedColor.value = colors[0];
	// };
	const addValue = () => {
		if (!authStore.isPremium && !isEditMode.value && habitStore.tasks.length >= 1) {
			isOverlayVisible.value = true;
			return;
		}

		const isInputValid = inputValueGoal.value.trim();
		if (!isInputValid) {
			IsEmpty.value = true;
			setTimeout(() => {
				IsEmpty.value = false;
			}, 1300);
			return;
		}

		// if (containsBlockedWord(inputValueGoal.value)) {
		// 	IsEmpty.value = true;
		// 	inputValueGoal.value = '';
		// 	setTimeout(() => {
		// 		IsEmpty.value = false;
		// 	}, 1500);
		// 	return;
		// }

		if (isEditMode.value && props.taskToEdit?.id) {
			const original = props.taskToEdit;

			const updatedTask = {
				...original,
				goal: inputValueGoal.value,
				color: selectedColor.value,
				dateRange: {
					start: localDateRange.value?.start || original.dateRange.start,
					end: localDateRange.value?.end || original.dateRange.end
				}
			};

			habitStore.updateTask(updatedTask);
			emit('close');
			return;
		}

		const isDateRangeValid = localDateRange.value?.start && localDateRange.value?.end;
		if (!isDateRangeValid) {
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

	const toogleColor = () => {
		accordion.value = !accordion.value
	}

	const closeWindow = () => {
		emit("close");
	};

	onMounted(() => {
		if (isEditMode.value) {
			inputValueGoal.value = props.taskToEdit.goal || ''
			selectedColor.value = props.taskToEdit.color || colors[0]
			localDateRange.value = {
				start: new Date(props.taskToEdit.dateRange.start),
				end: new Date(props.taskToEdit.dateRange.end)
			}
		}
	})

</script>
<style>
	.color-picker {
		display: flex;
		gap: 8px;
		margin: 5px 0 12px 0;
		padding: 10px;
		border-radius: 10px;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
	}

	.title__underline {
		color: var(--text-color);
		font-size: 14px;
		font-family: "Nunito", sans-serif;
		font-weight: 600;
	}

	.color-picker__wrapper {
		padding: 8px;
		border-radius: 30%;
		border: 2px solid transparent;
		box-sizing: border-box;
		transition: border-color 0.3s ease;
	}

	.color-picker__wrapper.selected {
		border: 2px solid grey;
	}

	.color-circle {
		padding: 10px;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		cursor: pointer;
		transition: transform 0.2s;
		border: 2px solid transparent;
		flex: 0 0 auto;
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
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		z-index: 11111;
		background-color: var(--footer-bg);
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
		color: #7e61c7;
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
		background-color: var(--menu--btn-bg);
		padding: 10px 10px 0 10px;
		border-radius: 20px;
		margin-top: 5px;
	}

	.vc-header .vc-title {
		color: var(--text-color);
		background: none;
		font-size: 15px;
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
		border-radius: 25px;
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
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input__fields-wrapper {
		width: 100vw;
		height: 100vh;
        padding: 20px;
		background-color: var(--calendar--bg);
		overflow-y: auto;
	}

	.habit-goal-modal {
		width: 100%;
		top: 20px;
		border-radius: 10px;
		font-family: Arial, sans-serif;
	}

	.close__wrapper {
		padding-top: 15px;
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
