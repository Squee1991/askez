<template>
	<label>
		<input type="checkbox" class="checkbox">
		<span class="fake">
		</span>
		<span class="text"></span>
	</label>
</template>

<script setup>
	import {ref, defineProps} from 'vue'
	import CheckboxIcon from 'assets/images/checkbox.svg'
</script>

<style scoped>
	.checkbox {
		display: none;
	}

	.fake {
		display: inline-block;
		width: 30px;
		height: 30px;
		border: 1px solid black;
		border-radius: 4px;
		position: relative;
		z-index: 0;
	}

	.fake:before {
		content: '';
		position: absolute;
		width: 30px;
		height: 30px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-image: url('/assets/images/checkbox.svg');
		background-size: cover;
		background-repeat: no-repeat;
		opacity: 0;
	}

	.checkbox:checked + .fake:before {
		opacity: 1;
	}

	.checkbox:checked + .fake {
		border: none;
	}


</style>