<template>
	<div class="progress-container">
		<div class="progress-circle"
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
	</div>
</template>

<script setup>
	import {computed, defineProps} from "vue";

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
			return "#cbd5e1 0% 100%";
		}
		let stops = [];
		let currentProgress = 0;
		props.history.forEach((segment) => {
			const nextProgress = currentProgress + segment.percent;
			stops.push(`${segment.color} ${currentProgress}% ${nextProgress}%`);
			currentProgress = nextProgress;
		});
		if (currentProgress < 100) {
			stops.push(`#cbd5e1 ${currentProgress}% 100%`);
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
		padding: 20px;

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
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-color);
		font-family: "Nunito", sans-serif;
		font-size: 14px;
	}

	/*.progress-text.bottom {*/
	/*	bottom: 38%;*/
	/*	transform: translateY(50%);*/
	/*	color: #e37b7b;*/
	/*	font-size: 14px;*/
	/*}*/
</style>






