<script setup>
	import { defineProps, ref, defineEmits } from 'vue';
	import hideIcon from '/assets/images/hideicon.png';
	import showIcon from '/assets/images/showicon.png';

	const props = defineProps({
		text: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		field: {
			type: Object,
			required: true,
		},

	});

	const currentThemeSrc = ref(hideIcon);
	const localFieldValue = ref(props.field.model);
	const fieldType = ref(props.field.type);
	const emit = defineEmits(['update:modelValue']);

	onMounted(() => {
		fieldType.value = props.field.type;
	});

	const togglePasswordIcon = () => {
		if (fieldType.value === 'password') {
			currentThemeSrc.value = showIcon;
			fieldType.value = 'text';
		} else {
			currentThemeSrc.value = hideIcon;
			fieldType.value = 'password';
		}
	};

	watch(() => props.field.value, (newValue) => {
		localFieldValue.value = newValue;
	});
</script>

<template>
	<div class="wrapper">
		<input
			class="form__input"
			:value="localFieldValue"
			:id="props.field.id"
			v-model="localFieldValue"
			:placeholder="props.placeholder"
			:type="fieldType"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
		<div
			class="form__icon-wrapper"
			v-if="props.field.type === 'password'"
			@click="togglePasswordIcon"
		>
			<img
				v-if="currentThemeSrc"
				class="form__icon"
				:src="currentThemeSrc"
				alt="Password icon"
			/>
		</div>
	</div>
</template>


<style>
	.wrapper {
		position: relative;

	}

	.form__input {
		padding: 18px 30px 18px 18px;
		border-radius: 11px;
		position: relative;
		width: 100%;
		background: white;
		border: none;
		color: black;
		margin-bottom: 10px;
		font-size: 14px;
		font-weight: 600;
		opacity: 85%;
	}

	.form__icon-wrapper {
		position: absolute;
		left: 90%;
		bottom: 10%;
		width: 40px;
		height: 40px;
	}

	.form__icon {
		padding: 5px 10px 5px 5px;
		width: 32px;
		height: 27px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>