<template>
	<div>
		<div class="achiv__text">
			<div class="archiv__title-sub">
				<div class="achieve__title">{{$t('achieveTitle.title')}}</div>
				<div class="achiv-text-item">{{$t('achieveTitle.subtitle')}}</div>
			</div>
			<div class="achiv__counter"> {{ activeAchievementCount }}</div>
		</div>
		<div class="achiv__list-wrapper">
			<div class="achiv__list-title">{{$t('achieveTitle.achiveDone')}}</div>
			<div class="achiv__list">
				<div v-for="(item, index) in data" :key="item.id" class="badge__wrapper">
					<img
						:class="{ 'isActive': habitStore.activeAchievements[index] }"
						class="badge"
						:src="item.src"
						alt="">
					<span class="achiv__under-text">{{$t(`achieve.${index + 1}`)}}</span>
				</div>
			</div>
		</div>
		<div class="achive__done-inner">
		</div>
	</div>
</template>

<script setup>
	import {ref, computed} from 'vue'
	import {useHabitStore} from "../../stores/habitStore.js";

	import Kimano from '../../assets/images/kimano.png'
	import panda1 from '../../assets/images/panda1.png'
	import panda3 from '../../assets/images/panda3.png'
	import panda4 from '../../assets/images/panda4.png'
	import panda2 from '../../assets/images/panda2.png'
	import pandaa from '../../assets/images/pandaa.png'

	const activeAchievementCount = computed(() => habitStore.activeAchievements.filter(ach => ach).length);
	const habitStore = useHabitStore();

	const data = ref([
		{id: 1, src: Kimano, alt: 'Kimano'},
		{id: 2, src: panda1, alt: 'panda1'},
		{id: 3, src: panda3, alt: 'panda3'},
		{id: 4, src: panda4, alt: 'panda4'},
		{id: 5, src: panda2, alt: 'panda2'},
		{id: 6, src: pandaa, alt: 'pandaa'}
	]);
</script>

<style scoped>
	.badge__wrapper {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.achiv__counter {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45px;
		height: 45px;
        margin-right: 15px;
		border: 3px solid green;
		padding: 10px;
		border-radius: 50%;
		font-family: "Acme", serif;
	}

	.archiv__title-sub {
		text-align: start;
		padding: 10px;
		font-size: 16px;
		font-family: 'Nunito', serif;
	}

	.achiv__list-title {
		padding: 20px;
		font-size: 24px;
		color: var(--text-color);
		font-family: "Acme", serif;
		font-weight: 600;
		letter-spacing: 1px;
	}

	.achiv-text-item {
		margin-top: 10px;
		font-weight: 100;
	}

	.achiv__text {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--menu--btn-bg);
		margin: 10px 15px;
		border-radius: 10px;
		font-family: 'Nunito', serif;
	}

	.achiv__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.achiv__list-wrapper {
		background: var(--menu--btn-bg);
		margin: 15px;
		border-radius: 10px;
		padding: 0 0 10px 0;
	}

	.achieve__title {
		color: var(--text-color);
		text-align: start;
		font-size: 24px;
	}

	.badge {
		width: 75px;
		height: 75px;
		filter: grayscale(1);
		opacity: 80%;
		transition: filter 0.3s ease, opacity 0.3s ease;
	}

	.isActive {
		filter: grayscale(0);
		opacity: 1;
	}

	.achive__done-inner {
		padding: 20px;
	}

	.achive__done {
		background: var(--menu--btn-bg);
		text-align: center;
		padding: 20px 0;
		border-radius: 20px;
		font-size: 20px;
		color: var(--text-color);
		font-family: "Nunito", serif;
	}

	.achiv__text {
		font-size: 20px;
		color: var(--text-color);
		font-weight: 600;
		padding: 10px;
		text-align: center;
		font-family: "Nunito", serif;
	}

	.achiv__under-text {
		color: var(--text-color);
		width: 100px;
		text-align: center;
		margin: 5px 0;
		font-family: "Nunito", serif;
		font-size: 14px;
		font-weight: 400;
	}
</style>
