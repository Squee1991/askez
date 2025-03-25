<template>
	<div class="acc">
		<button class="circle"
		        :class="{'clicked': clicked}"
		        @click="handleClick"
		        v-if="isButtonVisible">
			<svg fill="CurrentColor" width="60px" height="60px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<path d="M16 2.984c-7.201 0-13.015 5.815-13.015 13.016 0 7.199 5.814 13.016 13.015 13.016 7.2 0 13.016-5.816 13.016-13.016s-5.817-13.016-13.016-13.016zM15.954 8.189c0.931 0 1.687 0.755 1.687 1.688s-0.756 1.688-1.687 1.688c-0.933 0-1.688-0.756-1.688-1.688s0.755-1.688 1.688-1.688zM16.182 28.141c-3.541 0-6.26-2.644-6.26-6.065 0-3.305 2.502-6.067 5.857-6.064 0 0 6.298-0.31 6.298-6.083 0-3.47-2.1-5.567-6.085-6.083 7.173 0.398 12.148 5.373 12.148 12.147 0.001 6.61-5.439 12.148-11.958 12.148zM16.015 20.314c-0.932 0-1.688 0.755-1.688 1.688 0 0.932 0.756 1.688 1.688 1.688s1.688-0.756 1.688-1.688c0-0.933-0.756-1.688-1.688-1.688z"></path>
			</svg>
		</button>
		<div class="hero">
			<div class="progressbar-container">
				<div class="level-display">Level : {{ store.pandaLevel }}</div>
				<div class="progressbar">
					<div class="fill" :style="{ width: store.pandaProgressGlobal + '%' }"></div>
					<span class="progres__percent">{{ store.pandaProgressGlobal }}%</span>
				</div>
			</div>
			<div class="rank__wrapper">
				<span class="rank-label">{{ $t('rank.rank')}}: </span>
				<span class="rank__value">{{ currentRank }}</span>
			</div>
			<div class="hero__icon-wrapper">
				<img class="hero__icon-shadow" :src="pandaImg" alt="shadow" />
				<img class="hero__icon" :src="pandaImg" alt="panda" />
			</div>
		</div>
		<div class="left" :class="{ open: isOpen }"></div>
		<div class="right" :class="{ open: isOpen }"></div>
	</div>
</template>

<script setup>
	import {ref, computed ,  onMounted} from 'vue'
	import {useHabitStore} from '../stores/habitStore.js'
	const store = useHabitStore()
	const isOpen = ref(false);
	const isReady = computed(() => store.isLoaded && !isButtonVisible.value)
	const clicked = ref(false)
	const isButtonVisible = ref(true)
	import { useI18n } from 'vue-i18n'
	const { t } = useI18n()
	const rankKeys = ['rank.newbie', 'rank.pupil', 'rank.master', 'rank.legenda', 'rank.immortal']

	const currentRank = computed(() => {
		const level = store.pandaLevel
		const index = Math.min(rankKeys.length - 1, Math.max(0, level - 1))
		return t(rankKeys[index])
	})

	const pandaImg = computed(() => {
		const progress = store.pandaProgressGlobal
		if (progress === 100) return '/images/100.png'
		if (progress >= 66) return '/images/100.png'
		if (progress >= 33) return '/images/66.png'
		return '/images/33.png'
	})

	function handleClick() {
		clicked.value = true
		setTimeout(() => {
			isButtonVisible.value = false
			setTimeout(() => {
				isOpen.value = true
			}, 500)
		}, 2000)
	}

	onMounted(() => {
		store.updateAllProgress()
	})

	definePageMeta({
		layout: 'footerlayout'
	})

</script>

<style scoped>

	.rank__wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 30px;
	}

	.rank__value {
		padding: 0 10px;
		color: #FF5722;
		font-size: 1.3rem;
		font-weight: bold;
		font-family: "Acme", serif;
	}

	.rank-label {
		font-size: 18px;
		text-align: center;
		font-family: "Acme", serif;
		color: var(--text-color);
	}

	.hero__icon-wrapper {
		margin-top: 30px;
		width: 65%;
		position: relative;
		display: flex;
		justify-content: center;
	}

	.hero__icon-shadow {
		position: absolute;
		bottom: -85px;
		left: 32px;
		width: 100%;
		transform: skewX(-30deg) scaleY(0.4) translate(20px, 15px);
		opacity: 0.3;
		filter: brightness(0) blur(2.5px);
		z-index: 0;
		pointer-events: none;
	}

	.hero__icon {
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.level-display {
		margin: 5px 0 ;
		font-size: 22px;
		font-weight: bold;
		color: var(--text-color);
		font-family: "Acme", serif;
		text-align: center;
	}

	.progressbar-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.progressbar {
		position: relative;
		width: 200px;
		height: 40px;
		background: #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		margin-bottom: 30px;
	}

	.fill {
		height: 100%;
		background: #4ade80;
		transition: width 0.3s ease;
	}

	.progres__percent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: bold;
		color: #333;
		font-size: 20px;
		font-family: "Nunito", serif;
	}

	.fill {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #4ade80;
		transition: width 0.3s ease;
	}

	.acc {
		padding: 10px 20px ;
		flex-direction: column;
		position: relative;
		width: 100%;
		height: 100vh;
		background: var(--background-color);
		display: flex;
		overflow: hidden;
		justify-content: center;
	}

	.circle {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 4px solid #000;
		width: 120px;
		height: 120px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(0deg);
		background: radial-gradient(circle at center, #fde68a 0%, #b45309 100%);
		border-radius: 50%;
		box-shadow:
			0 0 10px rgba(0, 0, 0, 0.4),
			inset 0 0 10px #facc15;
		transition:
			transform 1.8s ease-in-out,
			background 1s ease-in-out 1.2s,
			opacity 1s ease 2.5s;
		z-index: 11;
		cursor: pointer;
	}

	.circle svg {
		transition: transform 1.8s ease-in-out;
	}

	.circle.clicked {
		transform: translate(-50%, -50%) rotate(180deg);
		box-shadow:
			0 0 10px rgba(0, 0, 0, 0.5),
			inset 0 0 12px #86efac;
		opacity: 0;
	}

	.circle.clicked svg {
		transform: rotate(180deg);
	}


	.hero {
		flex-direction: column;
		display: flex;
		align-items: center;
		height: 100vh;
	}

	.left,
	.right {
		width: 50%;
		height: 100vh;
		position: absolute;
		top: 0;
		background: #6b1e1e;
		border: 2px solid #000;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
		transition: transform 2s ease;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 30px 20px;
		z-index: 5;
	}


	.left::before,
	.left::after,
	.right::before,
	.right::after {
		content: '';
		display: block;
		height: 8px;
		background: #000;
		border-radius: 4px;
		margin: 20px 0;
	}

	.left {
		left: 0;
		transform: translateX(0%);
		border-right: none;
	}

	.right {
		right: 0;
		transform: translateX(0%);
		border-left: none;
	}

	.left.open {
		transform: translateX(-100%);
	}

	.right.open {
		transform: translateX(100%);
	}

</style>
