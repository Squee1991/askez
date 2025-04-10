<script setup>
	import { useHabitStore } from '../../stores/habitStore.js'
	import { computed, ref } from 'vue';
	import CheckedIcon from '../../assets/images/checkIcon.svg'
	import CheckedNotFull from '../../assets/images/cross.svg'
	import InProgressIcon from '../../assets/images/in-progress.svg'

	const isActiveButton = ref('active')
	const counter = useHabitStore()

	const filteredTotal = computed(() => {
		const archiveIds = new Set(counter.archiveTasks.map(task => task.id));
		if (isActiveButton.value === 'active') {
			return counter.tasks.filter(task => !archiveIds.has(task.id)).length;
		}
		if (isActiveButton.value === 'archive') {
			return counter.archiveTasks.length;
		}
		return 0;
	});

	const filteredDone = computed(() => {
		const archiveIds = new Set(counter.archiveTasks.map(task => task.id));
		return counter.tasks.filter(task =>
			!archiveIds.has(task.id) &&
			task.progress === 100 &&
			task.progressMiss === 0
		).length;
	});

	const filteredNotCompleted = computed(() => {
		return tasks.value.filter(task =>
			(task.progress + task.progressMiss === 100) &&
			task.progress < 100
		).length;
	});

	const filteredInProgress = computed(() => {
		return tasks.value.filter(task =>
			(task.progress + task.progressMiss) < 100
		).length;
	});

	const isArchivedTask = (task) => {
		return counter.archiveTasks.some(t => t.id === task.id);
	};

	const tasks = computed(() => {
		const archiveIds = new Set(counter.archiveTasks.map(task => task.id));
		if (isActiveButton.value === 'active') {
			return counter.tasks.filter(task => !archiveIds.has(task.id));
		}
		if (isActiveButton.value === 'archive') return counter.archiveTasks;
		return [];
	});

	const filteredCompletionRate = computed(() => {
		const relevantTasks = tasks.value;
		if (relevantTasks.length === 0) return 0;
		const doneCount = relevantTasks.filter(task =>
			task.progress === 100 && task.progressMiss === 0
		).length;
		return Math.round((doneCount / relevantTasks.length) * 100);
	});

	const currenticon = (task) => {
		if (task.progress === 100) return CheckedIcon;
		if (task.progress + task.progressMiss === 100) return CheckedNotFull;
		return InProgressIcon;
	};

	const completionColor = computed(() => {
		const progress = filteredCompletionRate.value;
		if (progress === 100) return "#388E3C";
		if (progress >= 80) return "#38b840";
		if (progress >= 60) return "#FFA500";
		if (progress >= 40) return "#D38B5D";
		if (progress >= 20) return "#b24c39";
		if (progress > 0) return "#a10505";
		return "grey";
	});
</script>

<template>
	<div class="stats__content">
		<div class="stats__header">
			<div class="stats__banner-content">
				<div class="stats__left">
					<div class="stats__text">{{ $t('navTop.stats') }}</div>

					<div v-if="tasks.length">
						<div class="total__task">
							{{ $t('statslable.total') }}:
							<span class="askez__counter">{{ filteredTotal }}</span>
						</div>
						<div class="total__task">
							{{ $t('statslable.doneTotal') }}:
							<span class="askez__counter">{{ filteredDone }}</span>
						</div>
						<div class="total__task">
							{{ $t('statslable.notCompleted') }}:
							<span class="askez__counter">{{ filteredNotCompleted }}</span>
						</div>
						<div class="total__task">
							{{ $t('statslable.InProgressTotal') }}:
							<span class="askez__counter">{{ filteredInProgress }}</span>
						</div>
					</div>
					<div class="not__active-askez" v-else>
						{{ $t('hasNotAskez.value') }}
					</div>
				</div>

				<div class="stats__right" :style="{ color: completionColor }">
					{{ filteredCompletionRate }}<span class="procent">%</span>
				</div>
			</div>
			<div class="select__inner">
				<div class="select__wrapper">
					<div class="indicator" :style="{ transform: isActiveButton === 'active' ? 'translateX(0%)' : 'translateX(100%)' }" />
					<span
						class="select"
						:class="{ 'select__active': isActiveButton === 'active' }"
						@click="isActiveButton = 'active'">{{ $t('statslable.active') }}</span>
					<span
						class="select"
						:class="{ 'select__active': isActiveButton === 'archive' }"
						@click="isActiveButton = 'archive'">{{ $t('statslable.archieve') }}</span>
				</div>
			</div>
		</div>

		<div class="stat__askez-scroll">
			<div class="stat__askez-wrapper">
				<div v-for="task in tasks" :key="task.id" :class="['stat__askez', isArchivedTask(task) ? 'archived-task' : 'active-task']">
					<div class="askez__titles">
						<div class="askez__title-status --name__askez">{{ $t('infoLabels.name') }}</div>
						<div class="askez__title-status --status__askez">{{ $t('infoLabels.status') }}</div>
					</div>
					<div class="askez__info">
						<div class="askez__name">{{ task.goal }}</div>
						<img class="askez__status-img" :src="currenticon(task)" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

	.active-task {
		background: var(--menu--btn-bg);
	}

	.archived-task {
		background: var(--menu--btn-bg);
		opacity: 0.8;
	}

	.select__active {
		color: white !important; /* <- активный цвет точно сработает */
	}

	.stats__left {
		min-height: 128px;
	}

	.select__wrapper {
		position: relative;
		display: flex;
		justify-content: space-between;
		border-radius: 10px;
		overflow: hidden;
	}

	.indicator {
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100%;
		background: var(--indicator-bg);
		border-radius: 10px;
		z-index: 0;
		pointer-events: none;
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
	}

	.select__inner {
		margin: 10px 0;
		padding: 5px;
		background-color: var(--slider-bg);
		border-radius: 10px;
	}

	.select {
		z-index: 1;
		position: relative;
		width: 50%;
		color: gainsboro;;
		font-family: "Nunito", serif;
		letter-spacing: 1px;
		padding: 10px 0;
		text-align: center;
		cursor: pointer;
		transition: color 0.3s ease;
	}

	.not__active-askez {
		color: #666060;
		font-size: 16px;
		font-family: "Acme", serif;
		font-weight: 600;
		margin-top: 10px;
	}


	.stat__askez-wrapper {
		flex-grow: 1;
		overflow-y: auto;
		padding-bottom: 110px;
	}

	.stat__askez-scroll {
		flex-grow: 1;
		overflow-y: auto;
		padding-bottom: 120px;
	}

	.askez__status-img {
		width: 30px;
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.stats__content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0 20px;
	}

	.stats__header {
		flex-shrink: 0;
	}

	.stats__text {
		letter-spacing: 1px;
		font-size: 28px;
		color: var(--text-color);
		font-family: "Nunito", serif;
		font-weight: 600;
	}

	.stats__banner-content {
		padding: 8px 15px 8px 20px;
		background: var(--menu--btn-bg);
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 150px;
	}

	.stats__right {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 28px;
		font-weight: bold;
		font-family: "Acme", serif;
		background: #D0EBFF;
		width: 100px;
		height: 100px;
		padding: 15px;
	}

	.procent {
		font-size: 22px;
		padding: 1px;
	}

	.askez__name {
		display: flex;
		align-items: center;
		letter-spacing: 1px;
		font-size: 14px;
		font-weight: 400;
		font-family: "Acme", serif;
		color: var(--text-color);
	}

	.total__task {
		color: var(--text-color);
		display: flex;
		align-items: center;
		font-family: "Nunito", serif;
		letter-spacing: 1px;
	}

	.askez__counter {
		font-size: 18px;
		font-weight: bold;
		margin-left: 5px;
	}

	.askez__titles {
		margin-top: 10px;
		padding: 8px 10px;
		display: flex;
		font-size: 18px;
		justify-content: space-between;
		align-items: center;
	}

	.askez__title-status {
		letter-spacing: 1px;
		font-size: 20px;
		font-weight: bold;
		color: var(--text-color);
		font-family: "Nunito", serif;
	}

	.stat__askez {
		border-radius: 10px;
		padding: 0 15px 0 10px;
		min-height: 81px;
	}

	.askez__info {
		padding: 0 10px 8px 10px;
		display: flex;
		justify-content: space-between;
	}



</style>