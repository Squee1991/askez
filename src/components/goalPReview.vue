<template>
	<div class="goal-preview">
		<div class="goal-preview__content">
			<img :src="imageSrc" alt="" class="goal-preview__image">
			<h1 class="goal-preview__title">{{ title }}</h1>
			<p class="goal-preview__description">{{ description }}</p>
			<button class="goal-preview__start" @click="$emit('start', goal)">
				{{ $t('DescriptionBtn.btn') }}
			</button>
		</div>
	</div>
</template>

<script setup>
	import {useI18n} from 'vue-i18n'
	import {computed} from 'vue'
	import PandaRead from '../../assets/images/pandaReadBook.svg'

	const props = defineProps({goal: Object})
	defineEmits(['start'])

	const {t} = useI18n()
	const imageSrc = computed(() => props.goal.imageSrc || '')
	const title = computed(() => t(`Task.${props.goal.i18nKey}`))
	const description = computed(() => t(`taskDescription.${props.goal.i18nKey}_description`))

</script>

<style scoped>

	.goal-preview {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100vh;
		background: linear-gradient(to bottom, #fefcff, #f6f0ff);
		color: #333;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 40px;
	}

	.goal-preview__content {
		width: 100%;
		height: 100%;
		max-width: 600px;
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.goal-preview__image {
		width: 100%;
		max-width: 250px;
		height: auto;
		margin-bottom: 24px;
	}

	.goal-preview__title {
		font-size: 26px;
		font-weight: 800;
		margin-bottom: 14px;
		text-align: center;
		color: #4b0082;
		font-family: "Nunito", sans-serif;
	}

	.goal-preview__description {
		font-size: 16px;
		font-family: "Nunito", sans-serif;
		line-height: 1.6;
		color: #555;
		text-align: center;
		max-width: 500px;
		margin-bottom: 30px;
	}

	.goal-preview__start {
		padding: 14px 24px;
		font-size: 18px;
		font-weight: bold;
		background-color: #a78bfa;
		color: white;
		border: none;
		border-radius: 30px;
		box-shadow: 0 4px 12px rgba(167, 139, 250, 0.4);
		cursor: pointer;
		transition: background-color 0.2s;
		width: 100%;
		max-width: 320px;
	}

	.goal-preview__start:hover {
		background-color: #8b5cf6;
	}
</style>
