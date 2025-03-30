<template>
	<div class="preloader__container">
		<img class="lang__panda" src="../../assets/images/langpanda.png" alt=""/>
		<div class="orbit">
			<span
				v-for="(letter, index) in letters"
				:key="index"
				class="letter"
				:style="getStyle(index)"
			>
				{{ letter }}
			</span>
		</div>
	</div>
</template>



<script setup>
	import { ref } from 'vue'

	const letters = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ于абвгдежзиклмнопр关стуфхцчöóç'.split(''))

	function getStyle(index) {
		const angle = Math.random() * 360
		const radius = 80 + Math.random() * 60
		const x = Math.cos(angle * Math.PI / 180) * radius
		const y = Math.sin(angle * Math.PI / 180) * radius
		const size = Math.random() * 14 + 14

		return {
			position: 'absolute',
			transform: `translate(${x}px, ${y}px)`,
			fontSize: `${size}px`,
			color: 'var(--text-color)',
			pointerEvents: 'none',
		}
	}

</script>

<style scoped>

	.preloader__container {
		width: 100%;
		height: 100vh;
		background: var(--background-color);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.lang__panda {
		width: 100%;
		max-width: 300px;
		z-index: 1;
	}

	.orbit {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0;
		height: 0;
		animation: spin 20s linear infinite;
	}

	.letter {
		position: absolute;
		white-space: nowrap;
		user-select: none;
		opacity: 0.9;
	}

	@keyframes spin {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

</style>