<template>
	<div class="select__field-wrapper">
		<select
			class="select__field"
			v-model="localValue"
			:name="name"
			@change="emitChange"
		>
			<option class="option" v-for="option in options" :key="option.value" :value="option.value">
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script setup>
	import {ref, watch, defineProps, defineEmits} from "vue";
	const emit = defineEmits(["update:modelValue"]);

	const props = defineProps({
		options: {
			type: Array,
			required: true,
		},
		modelValue: {
			type: String,
			default: "",
		},
		name: {
			type: String,
			default: "",
		},
	});

	const localValue = ref(props.modelValue);

	watch(() => props.modelValue, (newValue) => {
			localValue.value = newValue;
		}
	);

	const emitChange = () => {
		emit("update:modelValue", localValue.value);
	};
</script>

<style scoped>
	.select__field {
		width: 100%;
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #ccc;
		background: #E7E7E7;
		font-family: "Nunito", serif;
		line-height: 19px;
		font-weight: 700;
		font-size: 14px;
	}

	.option {
		line-height: 19px;
		font-weight: 700;
		font-size: 14px;
		font-family: "Nunito", serif;
	}

	.select__field-wrapper {
		width: 50%;
		border: none;
	}
</style>
