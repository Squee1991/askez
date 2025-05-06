<template>
	<div class="achievements">
		<HeaderWithBack :icon="backIcon" title="Достижения"/>
		<div class="category">
			<img src="" alt="">
			<div>
				{{ $t('achievements.category')}}
			</div>
			<div class="count"></div>
		</div>
		<ul class="achievements__list">
			<li v-for="item in achievementKeys" :key="item" class="achievements__item">
				<h3 class="achievements__item-title">
					{{ $t(`achievements.${item}.title`) }}
				</h3>
				<p class="achievements__item-description">
					{{ $t(`achievements.${item}.description`) }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import HeaderWithBack from '../src/components/headerWithBack.vue'
	import backIcon from '../assets/images/back.svg'
	import { computed } from 'vue'
	const { locale, messages , t } = useI18n();
	const openedCategory = ref(null);

	const achievementKeys = computed(() => {
		const all = messages.value[locale.value].achievements;
		return Object.keys(all).filter(key => {
			return typeof all[key] === 'object' && all[key].title && all[key].description;
		});
	});

</script>

<style scoped>
	.achievements {
		padding: 16px;
		color: #f0f0f0;
		font-family: 'Segoe UI', sans-serif;
	}

	.achievements__title {
		font-size: 20px;
		margin-bottom: 16px;
		font-weight: bold;
		border-bottom: 1px solid #333;
		padding-bottom: 8px;
	}

	.achievements__list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.achievements__item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 10px;
		cursor: pointer;
		border: 2px solid transparent;
		transition: background-color 0.2s;
		flex-direction: column;
	}


	.achievements__icon {
		font-size: 18px;
		width: 28px;
	}

	.achievements__name {
		flex: 1;
		padding-left: 10px;
		font-size: 18px;
		font-family: "Nunito", sans-serif;
	}

	.achievements__progress {
		font-size: 14px;
		color: #aaa;
		min-width: 50px;
		text-align: right;
	}
</style>
