<!--<template>-->
<!--	<div class="progress-container">-->
<!--		<svg class="progress-circle" viewBox="0 0 100 100">-->
<!--			<circle class="background-circle" cx="50" cy="50" r="42"/>-->
<!--			<circle-->
<!--				class="progress-miss"-->
<!--				cx="50"-->
<!--				cy="50"-->
<!--				r="42"-->
<!--				:stroke-dasharray="circumference"-->
<!--				:stroke-dashoffset="offsetMiss"-->
<!--				transform="rotate(-90 50 50)"-->
<!--			/>-->
<!--			<circle-->
<!--				class="progress-check"-->
<!--				cx="50"-->
<!--				cy="50"-->
<!--				r="42"-->
<!--				:stroke-dasharray="circumference"-->
<!--				:stroke-dashoffset="offsetCheck"-->
<!--				transform="rotate(-90 50 50)"-->
<!--			/>-->
<!--			<text x="50" y="55" text-anchor="middle" class="progress-text">-->
<!--				{{ progress + progressMiss }}%-->
<!--			</text>-->
<!--		</svg>-->
<!--	</div>-->
<!--</template>-->

<!--<script setup>-->
<!--	import {defineProps, computed} from "vue";-->

<!--	const props = defineProps({-->
<!--		progress: {-->
<!--			type: Number, -->
<!--			required: true, -->
<!--			default: 0-->
<!--		},-->
<!--		progressMiss: {-->
<!--			type: Number, -->
<!--			required: true, -->
<!--			default: 0-->
<!--		},-->
<!--		radius: {-->
<!--			type: Number, -->
<!--			required: true-->
<!--		},-->
<!--		circumference: {-->
<!--			type: Number, -->
<!--			required: true}-->
<!--	});-->

<!--	const offsetCheck = computed(() => {-->
<!--		return props.circumference - (props.progress / 100) * props.circumference;-->
<!--	});-->

<!--	const offsetMiss = computed(() => {-->
<!--		return props.circumference - ((props.progress + props.progressMiss) / 100) * props.circumference;-->
<!--	});-->
<!--</script>-->

<!--<style scoped>-->
<!--	.progress-container {-->
<!--		display: flex;-->
<!--		justify-content: center;-->
<!--		align-items: center;-->
<!--	}-->

<!--	.progress-circle {-->
<!--		width: 100%;-->
<!--		height: 100%;-->
<!--	}-->

<!--	.background-circle {-->
<!--		fill: none;-->
<!--		stroke: #e6e6e6;-->
<!--		stroke-width: 13;-->
<!--	}-->

<!--	.progress-miss {-->
<!--		fill: none;-->
<!--		stroke: red;-->
<!--		stroke-width: 13;-->
<!--		transition: stroke-dashoffset 0.5s ease;-->
<!--	}-->


<!--	.progress-check {-->
<!--		fill: none;-->
<!--		stroke: #4FC55C;-->
<!--		stroke-width: 13;-->
<!--		transition: stroke-dashoffset 0.5s ease;-->
<!--	}-->

<!--	.progress-text {-->
<!--		font-family: "Nunito", serif;-->
<!--		fill: #4FC55C;-->
<!--		font-weight: 600;-->
<!--	}-->
<!--</style>-->

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






