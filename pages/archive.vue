<script setup>
	import { ref, onMounted } from 'vue'
	import Arrowicon from '../assets/images/arrowSvg.svg'
	import HeaderWichback from '../src/components/headerWithBack.vue'
	import { useHabitStore } from '../stores/habitStore.js'
	import Arrow from '../assets/images/ArrowTask.svg'
	const habitStore = useHabitStore()
	const isScaled = ref({})
	const openTask = (id) => {
		isScaled.value[id] = !isScaled.value[id]
	}

	const calculateDaysBetweenRange = (start, end) => {
		if (!start || !end) return 0;
		const startDate = new Date(start);
		const endDate = new Date(end);
		const diffInMs = endDate - startDate;
		const minDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
		return Math.max(minDays, 0);
	};

	onMounted(() => {
		habitStore.loadArchiveTasks();
	})

	definePageMeta({
		layout: 'footerlayout'
	})

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString({day: "2-digit", month: "long"
		});};
</script>

<template>
	<div>
		<div class="archive__wrapper">
			<HeaderWichback :icon="Arrowicon" :title="$t('archieve.achieveTitle')"/>
			<div class="archive__body">
				<div class="archive__items">
					<div class="archive__banner">
						<div class="archive__header">
							<div class="archive__name">{{ $t('archieve.name') }}</div>
						</div>
					</div>
					<div
						:class="{'archive__list--expanded': isScaled[task.id]}"
						v-for="task in habitStore.archiveTasks"
						:key="task.id"
						class="archive__list"
					>
						<div class="archive__list-inner">
							<div class="archive__list-goal">{{ task.goal }}</div>
							<div @click="openTask(task.id)" :class="{'archive__icon--rotated': isScaled[task.id]}" class="archive__icon">
								<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
								     xmlns="http://www.w3.org/2000/svg">
									<path d="M18 9L12 15L6 9" stroke="currentColor" stroke-width="3"/>
								</svg>
							</div>
						</div>
						<div class="archive__range">
							<div class="archive__range-text archive__range-text--start">{{ $t('taskDetails.startDate') }}</div>
							<div class="archive__range-text archive__range-text--end">{{ $t('taskDetails.endDate') }}</div>
						</div>
						<div class="archive__task-description">
							<div class="archive__description-label">{{ $t('archieve.totalDays') }}</div>
							<div class="archive__description-value archive__description-value--total">
								{{ calculateDaysBetweenRange(task.dateRange.start, task.dateRange.end) }}
							</div>
						</div>
						<div class="archive__task-description">
							<div class="archive__description-label">{{ $t('archieve.checkedDays') }}</div>
							<div class="archive__description-value archive__description-value--checked">
								{{ task.checkedDates?.length || 0 }}
							</div>
						</div>
						<div class="archive__task-description">
							<div class="archive__description-label">{{ $t('archieve.notChecked') }}</div>
							<div class="archive__description-value archive__description-value--not-checked">
								{{ calculateDaysBetweenRange(task.dateRange.start, task.dateRange.end) - (task.checkedDates?.length || 0) }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>



	.archive__wrapper {
		width: 100%;
		background: var(--background-color);
		height: 100vh;
		padding: 10px 6vw;
	}

	.archive__banner {
		margin-bottom: 10px;
	}

	.archive__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.archive__name {
		font-size: 22px;
		color: var(--text-color);
		font-family: "Acme", serif;
	}

	.archive__list {
		background: var(--menu--btn-bg);
		border-radius: 10px;
		padding: 10px;
		height: 50px;
		transition: .3s;
		position: relative;
		overflow: hidden;
		margin-bottom: 10px;
	}

	.archive__list--expanded {
		height: 170px;
		transition: .3s;
	}

	.archive__list-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.archive__list-goal {
		color: var(--text-color);
		font-size: 20px;
		font-weight: 600;
	}

	.archive__icon {
		color: var(--text-color);
		transition: .3s;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
	}

	.archive__icon--rotated {
		transform: scale(-1);
		transition: .3s;
	}

	.archive__range {
		padding-top: 5px;
		display: flex;
		justify-content: space-between;
		color: var(--text-color);
	}

	.archive__range-text {
		/* Базовые стили для текста диапазона */
	}

	.archive__range-text--start {
		/* Модификатор для даты начала, если нужно */
	}

	.archive__range-text--end {
		/* Модификатор для даты конца, если нужно */
	}

	.archive__task-description {
		padding-top: 5px;
		display: flex;
		justify-content: space-between;
	}

	.archive__description-label {
		font-size: 19px;
		color: var(--text-color);
		font-family: "Acme", serif;
		font-weight: 400;
	}

	.archive__description-value {
		padding: 0 10px;
		font-size: 18px;
		font-family: "Nunito", serif;
		font-weight: bold;
	}

	.archive__description-value--total {
		color: #74baff;
	}

	.archive__description-value--checked {
		color: #32cd32;
	}

	.archive__description-value--not-checked {
		color: #fd4d4d;
	}

	.svg {
		color: currentColor;
	}

	.archive__banner-title {
		letter-spacing: 1px;
		font-size: 28px;
		color: var(--text-color);
		font-weight: bold;
		font-family: "Acme", serif;
	}

</style>
