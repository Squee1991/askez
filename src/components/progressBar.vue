<template>
	<div class="progress-container">
		<div
			class="progress-circle"
			:style="{
                background: `conic-gradient(${gradientStops})`,
                width: `${size}px`,
                height: `${size}px`,
                padding: `${padding}px`
            }"
		>
			<div class="progress-inner"></div>
		</div>
		<div class="progress-text  top">{{ Math.floor(progress) }}%</div>
		<div class="progress-text bottom">{{ Math.floor(progressMiss) }}%</div>
	</div>
</template>

<script setup>
	import {computed , defineProps} from "vue";

	const props = defineProps({
		progress: {
			type: Number,
			required: true,
			default: 0,
		},
		progressMiss: {
			type: Number,
			required: true,
			default: 0,
		},
		size: {
			type: Number,
			default: 85,
		},
		padding: {
			type: Number,
			default: 10
		},
		history: {
			type: Array,
			required: true,
			default: () => [],
		},
	});

	const gradientStops = computed(() => {
		if (!props.history || props.history.length === 0) {
			return "gray 0% 100%";
		}
		let stops = [];
		let currentProgress = 0;
		props.history.forEach((segment) => {
			const nextProgress = currentProgress + segment.percent;
			stops.push(`${segment.color} ${currentProgress}% ${nextProgress}%`);
			currentProgress = nextProgress;
		});
		if (currentProgress < 100) {
			stops.push(`gray ${currentProgress}% 100%`);
		}
		return stops.join(", ");
	});


</script>

<style scoped>
	.progress-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.progress-circle {
		position: relative;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.7s ease-in-out;
	}

	.progress-inner {
		width: 100%;
		height: 100%;
		background-color: var(--background-color);
		border-radius: 50%;
	}

	.progress-text {
		position: absolute;
		font-size: 16px;
		font-weight: bold;
		color: white;
	}

	.progress-text.top {
		top: 40%;
		transform: translateY(-50%);
		color: green;
		font-size: 18px;
	}

	.progress-text.bottom {
		bottom: 37%;
		transform: translateY(50%);
		color: #bfbfbf;
		font-size: 12px;
	}
</style>






