<template>
	<div class="journey-grid">
		<div
			v-for="day in visibleDays"
			:key="day"
			class="journey-day"
			:class="{ done: isDayDone(day), 'toggleClass': toggleDay === day }"
		>
			<div class="journey-day__top">
				<div class="journey-day__date">
					<div class="month">{{ getMonthLabel(day) }}</div>
					<div class="day">{{ getDayNumber(day) }}</div>
				</div>
				<div class="journey-day__title">{{ $t('completed.day')}} {{ day }}</div>
				<div class="progress-circle">
					<img v-if="isChecked(day)" class="checked__circle" src="../../assets/images/basic-tick.svg" alt="">
				</div>
			</div>
			<div class="journey-day__task">
				<label class="task-checkbox">
					<CustomCheckbox
						:checked="isChecked(day)"
						@change="toggleCheck(day)"
					/>
					<span class="task-label" :class="{ disabled: !isDayToday(day) }">
  {{ isChecked(day) ? $t('completed.done') : $t('completed.notDone') }}
</span>
				</label>
			</div>
			<div @click="toggleTask(day)" class="toggle__journey">
				<img :class="{scale: toggleDay === day }" class="journey-toggle__arrow"
				     src="../../assets/images/ArrowTask.svg" alt="">
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref} from 'vue'
	import {startOfToday, addDays, format, isToday, differenceInCalendarDays} from 'date-fns'
	import CustomCheckbox from "../components/customCheckbox.vue";
	import {ru, enUS, de, fr, uk, es, pt, zhCN, arSA, pl} from 'date-fns/locale'
	import {useI18n} from 'vue-i18n'

	const {locale} = useI18n()
	const currentDay = computed(() => {
		const base = getBaseDate()
		if (!base || isNaN(base)) return 0
		return Math.min(differenceInCalendarDays(startOfToday(), base) + 1, 21)
	})

	const visibleDays = computed(() =>
		Array.from({length: currentDay.value}, (_, i) => i + 1)
	)
	const props = defineProps({
		entries: Array,
		startDate: String
	})
	const emit = defineEmits(['select'])
	const toggleDay = ref(null)

	const todayString = format(startOfToday(), 'yyyy-MM-dd')

	const isDayToday = (day) => {
		const date = getFormattedDateForDay(day)
		return date === todayString
	}

	const getBaseDate = () => new Date(props.startDate)
	const getDateForDay = (day) => addDays(getBaseDate(), day - 1)
	const getFormattedDateForDay = (day) => format(getDateForDay(day), 'yyyy-MM-dd')

	const toggleCheck = (day) => {
		const date = getDateForDay(day)
		if (!isToday(date)) return
		const checked = isChecked(day)
		emit('select', {day, checked: !checked})
	}

	const localeMap = {
		ru,
		en: enUS,
		de,
		fr,
		uk,
		es,
		pt,
		zh: zhCN,
		ar: arSA,
		pl,
		hi: enUS,
		be: ru
	}

	const getMonthLabel = (day) => {
		const date = getDateForDay(day)
		const localeKey = locale.value?.split('-')[0] || 'en'
		const currentLocale = localeMap[localeKey] || enUS
		return format(date, 'LLLL', {locale: currentLocale})
	}

	const getDayNumber = (day) => {
		const date = getDateForDay(day)
		return format(date, 'd')
	}

	const toggleTask = (day) => {
		toggleDay.value = toggleDay.value === day ? null : day
	}

	const isChecked = (day) => {
		const date = getFormattedDateForDay(day)
		return props.entries?.some(entry => entry.date === date)
	}

	const isDayDone = isChecked
</script>

<style scoped>
	.checked__circle {
		width: 30px;
		padding: 5px;
	}

	.journey-toggle__arrow {
		transform: scale(1);
		transition: .6s;
	}

	.scale {
		transform: scale(-1);
		transition: .6s;
	}

	.toggle__journey {
		position: absolute;
		display: flex;
		justify-content: center;
		padding: 10px 10px 0 10px;
		left: 50%;
		bottom: 3px;
		transform: translateX(-50%);
	}

	.journey-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 16px;
		margin: 10px 0;
		border-radius: 16px;
	}

	.journey-day {
		background: linear-gradient(180deg, #a18cdf, #7e57c2);
		border-radius: 16px;
		padding: 16px 16px 15px 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		font-family: "Nunito", sans-serif;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
		color: white;
		position: relative;
		height: 98px;
		transition: .5s;
		overflow: hidden;
	}

	.toggleClass {
		height: 180px;
		transition: .5s;
	}

	.journey-day__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.journey-day__date {
		/*width: 65px;*/
		/*height: 65px;*/
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #b39ddb;
		padding: 6px 10px;
		border-radius: 12px;
		color: white;
		font-weight: 700;
		min-width: 48px;
	}

	.journey-day__date .month {
		font-size: 18px;
		text-transform: capitalize;
		margin-bottom: 2px;
	}

	.journey-day__date .day {
		font-size: 18px;
		font-weight: 800;
	}

	.journey-day__title {
		font-size: 18px;
		font-weight: 800;
		flex: 1;
		margin-left: 15px;
	}

	.progress-circle {
		padding: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.25);
	}

	.journey-day__task {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.task-checkbox {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px;
	}

	.task-checkbox input[type="checkbox"] {
		width: 20px;
		height: 20px;
		accent-color: white;
	}

	.task-label {
		font-size: 16px;
		font-weight: 600;
		color: white;
	}

	.disabled {
		color: #b1b1b1;
	}
</style>
