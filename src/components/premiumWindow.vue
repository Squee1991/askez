<template>
	<div class="premium__window-overlay" v-show="visible" @click="handleOverlayClick">
		<div class="premium__window" @click.stop>
			<img @click="closePremiumWindow" class="close__img" :src="Close" alt="">
			<img class="premium__window-icon" :src="LickPanda" alt="">
			<div>
				<div class="premium__window-text">{{ props.text }}</div>
				<div class="premium__window-subtext">{{ props.subtext }}</div>
			</div>
			<NuxtLink to="/premium" class="premium__premium__window-btn">
				{{ $t('premiumWindow.btnPremium') }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import {defineProps} from 'vue'
	import LickPanda from '../../assets/images/diamond.svg'
	import Close from '../../assets/images/close.svg'
	const visible = ref(true)
	const props = defineProps({
		text: {
			type: String,
			required: true
		},
		subtext: {
			type: String,
			required: true
		},
	})

	const emit = defineEmits(['close'])

	const handleOverlayClick = () => {
		emit('close')
	}

	const closePremiumWindow = () => {
		visible.value = false
	}

	watch(visible, (val) => {
		if (!val) emit('close')
	})

</script>

<style scoped>
	.premium__window-overlay {
		position: fixed;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.56);
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		padding: 30px;
		display: flex;
		justify-content: center;
	}

	.premium__window-icon {
		width: 130px;
		margin: 0 auto;

	}
	.close__img {
		width: 38px;
		padding: 12px;
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
	}

	.premium__window {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		top: 10%;
		width: 80%;
		height: 430px;
		padding: 20px;
		background: #56369f;
		border-radius: 15px;
	}

	.premium__window-text {
		text-align: center;
		font-size: 14px;
		color: white;
		font-family: "Nunito", sans-serif;
		margin-bottom: 10px;
	}

	.premium__window-subtext {
		max-width: 200px;
		margin: 0 auto;
		font-size: 12px;
		text-align: center;
		color: #e0d3d3;
		font-family: "Nunito", sans-serif;

	}

	.premium__premium__window-btn {
		width: 100%;
		background: #dda742;
		font-family: "Nunito", serif;
		display: flex;
		justify-content: center;
		color: white;
		padding: 10px;
		border-radius: 12px;
		font-size: 18px;
	}

	.premium__premium__window-btn:active {
		background: #e7bd6f;
	}

</style>