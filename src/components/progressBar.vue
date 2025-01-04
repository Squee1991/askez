<template>
	<div class="progress-container">
		<svg class="progress-circle" viewBox="0 0 100 100">
			<circle class="background-circle" cx="50" cy="50" r="45" />
			<circle
				class="progress"
				cx="50"
				cy="50"
				r="45"
				:stroke-dasharray="props.circumference"
				:stroke-dashoffset="props.offset"
			/>
			<text x="50" y="55" text-anchor="middle" class="progress-text">
				{{ props.progress }}%
			</text>
		</svg>
	</div>
</template>

<script setup>
	import { computed, defineProps , ref , watch } from "vue";

	const props = defineProps({
		progress: {
			type: Number,
			required: true,
		},
		radius: {
			type: Number,
			default: 45,
		},

		offset: {
			type: Number
		},

		circumference: {
			type: Number
		}
	});


</script>

<style scoped>

	.progress-container {
		padding: 10px;
		width: 100px;
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
		stroke-width: 10;
	}

	.progress {
		fill: none;
		stroke: #ff8a65;
		stroke-width: 10;
		stroke-linecap: round;
		transition: stroke-dashoffset 0.5s ease;
	}

	.progress-text {
		font-family: "Nunito", serif;
		font-size: 20px;
		fill: #ffffff;
	}
</style>
