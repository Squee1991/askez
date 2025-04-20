<template>
	<div class="achieve__inner">
		<div class="achiv__text">
			<div class="archiv__title-sub">
				<div class="achieve__title">{{$t('achieveTitle.title')}}</div>
				<div class="achiv-text-item">{{$t('achieveTitle.subtitle')}}</div>
			</div>
			<div class="ring-wrapper" :style="{ '--progress': progressValue }">
				<div class="ring-progress"></div>
				<div class="ring-text">{{ activeAchievementCount }} / {{ totalAchievements }}</div>
			</div>
		</div>
		<div class="achiv__list-wrapper">
			<div class="achiv__list-title">{{$t('achieveTitle.achiveDone')}}</div>
			<div class="achiv__list">
				<div v-for="(item, index) in data" :key="item.id" class="badge__wrapper">
					<img
						:class="{ 'isActive': habitStore.activeAchievements[index] }"
						class="badge"
						:src="item.src"
						loading="eager"
						decoding="async"
						alt="">
					<span class="achiv__under-text">{{$t(`achieve.${index + 1}`)}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, computed , onMounted } from 'vue'
	import {useHabitStore} from "../../stores/habitStore.js";
	import Panda1 from '../../assets/images/p1.webp'
	import Panda2 from '../../assets/images/p2.webp'
	import Panda3 from '../../assets/images/p3.webp'
	import Panda4 from '../../assets/images/p4.webp'
	import Panda5 from '../../assets/images/p5.webp'
	import Panda6 from '../../assets/images/p6.webp'
	import Panda7 from '../../assets/images/p7.webp'
	import Panda8 from '../../assets/images/p8.webp'
	import Panda9 from '../../assets/images/p9.webp'

	const habitStore = useHabitStore()
	const activeAchievementCount = computed(() => habitStore.activeAchievements.filter(a => a).length)
	const totalAchievements = computed(() => habitStore.achievementThresholds.length)
	const progressValue = computed(() => `${(activeAchievementCount.value / totalAchievements.value) * 360}deg`)

	const data = ref([
		{id: 1, src: Panda1, alt: 'Panda1'},
		{id: 2, src: Panda2, alt: 'Panda2'},
		{id: 3, src: Panda3, alt: 'Panda3'},
		{id: 4, src: Panda4, alt: 'Panda4'},
		{id: 5, src: Panda5, alt: 'Panda5'},
		{id: 6, src: Panda6, alt: 'Panda6'},
		{id: 7, src: Panda7, alt: 'Panda7'},
		{id: 8, src: Panda8, alt: 'Panda8'},
		{id: 9, src: Panda9, alt: 'Panda9'},
	]);

</script>

<style scoped>
	.ring-wrapper {
		position: relative;
		width: 70px;
		height: 70px;
	}

	.ring-progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: conic-gradient(#0028f3 var(--progress), #dddde4  var(--progress));
		mask: radial-gradient(farthest-side, transparent 70%, black 71%);
		-webkit-mask: radial-gradient(farthest-side, transparent 70%, black 71%);
	}

	.ring-text {
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: "Acme", serif;
		font-size: 16px;
		color: var(--text-color);
		font-weight: bold;
	}

	.badge__wrapper {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.achieve__inner {
		height: 100%;
		overflow-y: auto;
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
		font-family: "Nunito", sans-serif;
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
		border-radius: 20px;
		font-family: 'Nunito', serif;
		margin-bottom: 10px;
	}

	.achiv__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.achiv__list-wrapper {
		background: var(--menu--btn-bg);
		border-radius: 20px;
		padding: 0 0 10px 0;
	}

	.achieve__title {
		color: var(--text-color);
		text-align: start;
		font-size: 24px;
	}

	.badge {
		display: block;
		width: 76px;
		height: 76px;
		object-fit: contain;
		filter: grayscale(1);
	}

	.isActive {
		object-fit: contain;
		display: block;
		width: 76px;
		height: 76px;
		filter: grayscale(0) brightness(1.10);
		opacity: 1;
		transform: scale(1.05);
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
		width: 90px;
		text-align: center;
		font-family: "Nunito", serif;
		font-size: 12px;
		font-weight: 400;
	}
</style>
