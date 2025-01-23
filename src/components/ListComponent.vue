<template>
	<div>
		<div
			v-for="item in data.items"
			:key="item.code || item.id || item.text"
			class="menu__btn-wrapper"
		>
			<button
				@click="changeLanguage(item.code)"
				:class="item.className"
				class="account__settings-btn">
				<span
					class="accoun__text">
					{{ item.name || item.text }}
				</span>
				<img
					v-if="localValue === item.code"
					class="selected__icon"
					:src="icon"
					alt="selected"
				/>
			</button>
		</div>
	</div>
</template>

<script setup>
	import {defineProps, defineEmits, ref, watch} from 'vue';

	const emit = defineEmits(['update:model-value']);
	const localValue = ref(null)

	const props = defineProps({
		icon: {
			type: String,
			default: ''
		},
		data: {
			type: [Array, Object],
			required: true
		},
		modelValue: {
			type: [String, null],
			required: true
		}
	});
	const changeLanguage = (code) => {
		localStorage.setItem('language' , code)
		localValue.value = code
		emit('update:model-value', localValue.value);
	};

	watch(() => props.modelValue, () => {
			localValue.value = props.modelValue
		}, {immediate: true}
	)

</script>

<style >

	.selected__icon {
		width: 20px;
	}

	.account__settings-btn {
		display: flex;
		align-items: center;
		border: none;
		width: 100%;
		padding: 10px 0;
		font-size: 18px;
		border-radius: 10px;
		font-family: "Nunito", serif;
		font-weight: 700;
		text-align: start;
		background: none;
		position: relative;
	}

	.no-space {
		display: flex;
		justify-content: space-between;
	}

</style>
