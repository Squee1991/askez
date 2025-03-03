<template>
	<div>
		<div class="achiv__text">
			<div class="achiv-text-item">Выполненные достижения</div>
		</div>
		<div class="achiv__list">
			<div v-for="(item, index) in data" :key="item.id" class="badge__wrapper">
				<img
					:class="{ 'isActive': habitStore.activeAchievements[index] }"
					class="badge"
					:src="item.src"
					alt=""
				>
				<span class="achiv__under-text"></span>
			</div>
		</div>
		<div class="achive__done-inner">
			<div class="achive__done">У вас {{ activeAchievementCount }} из 6 достижений</div>
		</div>
	</div>
</template>

<script setup>
	import { ref , computed } from 'vue'
	import { useHabitStore } from "../../stores/habitStore.js";

	import Kimano from '../../assets/images/kimano.png'
	import panda1 from '../../assets/images/panda1.png'
	import panda3 from '../../assets/images/panda3.png'
	import panda4 from '../../assets/images/panda4.png'
	import panda2 from '../../assets/images/panda2.png'
	import pandaa from '../../assets/images/pandaa.png'
	const activeAchievementCount = computed(() => habitStore.activeAchievements.filter(ach => ach).length);
	const habitStore = useHabitStore();

	const data = ref([
		{ id: 1, src: Kimano, alt: 'Kimano' },
		{ id: 10, src: panda1, alt: 'panda1' },
		{ id: 15, src: panda3, alt: 'panda3' },
		{ id: 20, src: panda4, alt: 'panda4' },
		{ id: 25, src: panda2, alt: 'panda2' },
		{ id: 30, src: pandaa, alt: 'pandaa' }
	]);
</script>

<style scoped>
	.badge__wrapper {
		padding: 10px;
	}

	.badge {
		width: 100px;
		height: 100px;
		filter: grayscale(1);
		opacity: 70%;
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

	.achiv__list {
		padding: 0 20px;
		border-radius: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.achiv__text {
		font-size: 20px;
		color: var(--text-color);
		font-weight: 600;
		padding: 10px;
		text-align: center;
		font-family: "Nunito", serif;
	}
</style>
