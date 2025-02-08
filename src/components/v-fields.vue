<template>
	<div class="v-field-wrapper">
		<input
			class="v-field-input"
			:type="localType"
			v-model="localValue"
			:placeholder="field.placeholder"
			:autocomplete="field.autocomplete || 'off'"
		/>
		<div v-if="field.type === 'password'" class="toggle-icon" @click="togglePassword">
			<img :src="currentIcon" alt="Toggle password visibility" class="toggle-icon-item"/>
		</div>
	</div>
</template>

<script setup>
	import {defineProps, ref, watch} from 'vue';
	import hideIcon from '/assets/images/hideicon.png';
	import showIcon from '/assets/images/showicon.png';

	const props = defineProps({
		field: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(['update:modelValue']);

	const localValue = ref(props.field.value);
	const localType = ref(props.field.type);
	const currentIcon = ref(hideIcon);

	watch(() => props.field.value, (newVal) => {
		localValue.value = newVal;
	});

	watch(localValue, (newVal) => {
		emit('update:modelValue', newVal);
	});

	const togglePassword = () => {
		if (localType.value === 'password') {
			localType.value = 'text';
			currentIcon.value = showIcon;
		} else {
			localType.value = 'password';
			currentIcon.value = hideIcon;
		}
	};
</script>

<style scoped>
	.v-field-wrapper {
		margin-top: 3px;
		position: relative;
	}

	.v-field-input {
		width: 100%;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 12px;
	}

	.toggle-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
		width: 40px;
		padding: 10px;
	}

	.toggle-icon-item {
		width: 100%;
	}
</style>
