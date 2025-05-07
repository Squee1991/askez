<script setup>
	import {ref, onMounted} from 'vue'
	import HeaderWichback from '../src/components/headerWithBack.vue'
	import {useHabitStore} from '../stores/habitStore.js'
	import Arrow from '../assets/images/ArrowTask.svg'
	import ArrowBack from '../assets/images/back.svg'
	import { useTaskStore } from '../stores/OfflineTaskStore.js'
	const taskStore = useTaskStore()
	const habitStore = useHabitStore()
	const isScaled = ref({})
	const openTask = (id) => {
		isScaled.value[id] = !isScaled.value[id]
	}

	const convertToDate = (date) => {
		return date && typeof date.toDate === 'function' ? date.toDate() : new Date(date);
	};

	const calculateDaysBetweenRange = (start, end) => {
		if (!start || !end) return 0;
		const startDate = convertToDate(start);
		const endDate = convertToDate(end);
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(0, 0, 0, 0);
		const diffInMs = endDate - startDate;
		const minDays = Math.round(diffInMs / (1000 * 60 * 60 * 24)) + 1;
		return Math.max(minDays, 0);
	};

	onMounted(() => {
		habitStore.loadArchiveTasks();
	})

	definePageMeta({
		layout: 'footerlayout'
	})

	const formatDate = (date) => {
		const d = convertToDate(date);
		return d.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "long",
			year: "numeric"
		});
	};

	onMounted(() => {
		taskStore.loadTasksFromLocal();
	});
</script>

<template>
	<div>
		<div class="archive__wrapper">
			<HeaderWichback :icon="ArrowBack" :title="$t('archieve.achieveTitle')"/>
			<div class="archive__body">
				<div class="archive__banner">
					<div class="archive__header">
						<div class="archive__name">{{ $t('archieve.name') }}</div>
					</div>
				</div>
				<div class="archive__text" v-if="!habitStore.archiveTasks.length">
					<div class="archiv__folder">
						<img class="folder__icon" src="../assets/images/icon-archive.svg" alt="">
					</div>
					<div class="archiv__empty-text">{{ $t('archieve.empty') }}</div>
				</div>
				<div class="archive__items">
					<div :class="{'archive__list--expanded': isScaled[task.id]}"
						v-for="task in habitStore.archiveTasks"
						:key="task.id"
						class="archive__list"
					>
						<div class="archive__list-inner">
							<div
								:class="{'archive__list-goal--full': isScaled[task.id]}"
								class="archive__list-goal"
							>{{ task.goal }}</div>
							<div @click="openTask(task.id)" :class="{'archive__icon--rotated': isScaled[task.id]}"
							     class="archive__icon">
								<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
								     xmlns="http://www.w3.org/2000/svg">
									<path d="M18 9L12 15L6 9" stroke="#4FC55C" stroke-width="3"/>
								</svg>
							</div>
						</div>
						<div class="archive__range">
							<div class="archive__range-text archive__range-text--start">{{ $t('taskDetails.startDate')
								}}
							</div>
							<div class="archive__range-text archive__range-text--end">{{ $t('taskDetails.endDate') }}
							</div>
						</div>
						<div class="archieve__format-data">
							<div class="archive__data-text"> {{ formatDate(task.dateRange.start)}}</div>
							<div class="archive__data-text"> {{ formatDate(task.dateRange.end)}}</div>
						</div>
						<div class="archive__task-description">
							<div class="archive__description-label">{{ $t('archieve.totalDays') }} :</div>
							<div class="archive__description-value archive__description-value--total">
								{{ calculateDaysBetweenRange(task.dateRange.start, task.dateRange.end) }}
							</div>
						</div>
						<div class="archive__task-description">
							<div class="archive__description-label">{{ $t('archieve.checkedDays') }} :</div>
							<div class="archive__description-value archive__description-value--checked">
								{{ task.checkedDates?.length || 0 }}
							</div>
						</div>
						<div class="archive__task-description">
							<div class="archive__description-label">{{ $t('archieve.notChecked') }} :</div>
							<div class="archive__description-value archive__description-value--not-checked">
								{{ calculateDaysBetweenRange(task.dateRange.start, task.dateRange.end) -
								(task.checkedDates?.length || 0) }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

	.archive__text{
		color: white;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50% , -50%);
	}

	.archiv__empty-text {
		font-size: 30px;
		font-weight: bold;
		text-align: center;
		color: var(--text-color);
	}

	.folder__icon {
		width: 100%;
	}

	.archive__items {
		max-height: 74vh;
		height: 100%;
		overflow-y: auto;
		padding-right: 5px;
		padding-bottom: 30px;
	}

	.archiv__folder {
		width: 70px;
		margin: 0 auto;
	}

	.archive__wrapper {
		width: 100%;
		background: var(--background-color);
		height: 100vh;
		padding: 10px 6vw;
	}

	.archive__data-text {
		padding: 4px 0 5px 0;
		font-size: 12px;
		color: #f1e2f3;
		font-weight: 400;
		font-family: "Nunito", serif;
	}

	.archive__range-text {
		color: #a597a7;
		font-family: "Nunito", serif;
		font-weight: 600;
		font-size: 16px;
	}

	.archive__banner {
		margin-bottom: 10px;
	}

	.archive__header,
	.archieve__format-data {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.archive__name {
		font-size: 23px;
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
		height: 200px;
		transition: .3s;
	}

	.archive__list-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.archive__list-goal {
		color: #4FC55C;
		font-size: 18px;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.archive__list-goal--full {
		white-space: normal;
		overflow: visible;
		text-overflow: unset;
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

	.archive__task-description {
		padding-top: 5px;
		display: flex;
		justify-content: space-between;
	}

	.archive__description-label {
		font-size: 16px;
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
		color: #7DA6FF;
	}

	.archive__description-value--checked {
		color: #85C88A;
	}

	.archive__description-value--not-checked {
		color: #E57373;
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
