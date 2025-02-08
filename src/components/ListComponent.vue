<template>
	<div>
		<div
			v-for="item in locales"
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
	const { locales, setLocale  } = useI18n()
	const emit = defineEmits(['update:model-value']);
	const localValue = ref(null)
	const props = defineProps({
		icon: {
			type: null,

		},
		data: {
			type: [Array, Object , String],
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
		setLocale(code)
		emit('update:model-value', localValue.value);
	};

	watch(() => props.modelValue, () => {
			localValue.value = props.modelValue
		}, {immediate: true}
	)

</script>

<style scoped >
	.selected__icon {
		width: 20px;
	}

	.account__settings-btn {
		display: flex;
		align-items: center;
		border: none;
		width: 100%;
		padding: 12px 0;
		font-size: 20px;
		border-radius: 10px;
		font-family: "Nunito", serif;
		font-weight: 400;
		text-align: start;
		background: none;
		position: relative;
		justify-content: space-between ;
	}

	.account__settings-btn:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 100%;
		background: #dec8b4;
	}

	.no-space {
		display: flex;
		justify-content: space-between;
	}

	.accoun__text {
		color: var(--text-color);
	}
</style>