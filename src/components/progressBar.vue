<template>
	<div class="progress-container">
		<svg class="progress-circle" viewBox="0 0 100 100">
			<circle class="background-circle" cx="50" cy="50" r="40" />
			<circle
				class="progress"
				cx="50"
				cy="50"
				r="40"
				:stroke-dasharray="circumference"
				:stroke-dashoffset="offset"
			/>
			<text x="50" y="55" text-anchor="middle" class="progress-text">
				{{ progress }}%
			</text>
		</svg>
	</div>
</template>

<script setup>
	import { defineProps, defineEmits, watch } from "vue";

	const emit = defineEmits(["update:progress"]);
	const props = defineProps({
		progress: {
			type: Number,
			required: true,
			default: 0,
		},
		radius: {
			type: Number,
			required: true,
		},
		offset: {
			type: Number,
			required: true,
		},
		circumference: {
			type: Number,
			required: true,
		},
	});

	watch(() => props.progress, (newVal) => {
		emit("update:progress", newVal);
	});
</script>

<style scoped>

	.progress-container {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.progress-circle {
		width: 100%;
		height: 100%;
	}

	.background-circle {
		fill: none;
		stroke: #e6e6e6;
		stroke-width: 13;
	}

	.progress {
		fill: none;
		stroke: #4FC55C;
		stroke-width:13;
		transition: stroke-dashoffset 0.5s ease;
	}

	.progress-text {
		font-family: "Nunito", serif;
		fill: #4FC55C;
		font-weight: 600;
	}
</style>
