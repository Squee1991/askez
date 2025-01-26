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
			<img :src="currentIcon" alt="Toggle password visibility" />
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
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
	position: relative;
}

.v-field-input {
	width: 100%;
	padding: 10px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.toggle-icon {
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
}
</style>
