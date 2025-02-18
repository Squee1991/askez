<template>
	<div class="feedback-container">
		<div v-if="isSended" class="feed__back-overlay">
			<div class="overlay__window">
				<div class="overlay__text">{{ $t('feedBack.overlayTitle')}}</div>
				<button @click="isSendedfeedBack" class="overlay__btn">{{ $t('feedBack.overlayBtn')}}</button>
			</div>
		</div>
		<div class="feed__back-wrapper">
			<HeaderWithBack
				:icon="Arrowicon"
				:title="$t('feedBack.title')"/>
			<div class="feedback-content">
				<label><textarea
					class="text__area"
					v-model="feedback"
					:placeholder="$t('feedBack.placeholder')"
					rows="5"></textarea>
				</label>
			</div>
			<button type="submit" class="feed__back-btn" @click="sendFeedback">{{ $t('feedBack.button')}}</button>
		</div>
	</div>
</template>
<script setup>
	import {ref} from 'vue';
	import emailjs from 'emailjs-com';
	import Arrowicon from '../assets/images/arrowSvg.svg';
	import HeaderWithBack from '../src/components/headerWithBack';

	const isSended = ref(false)
	const feedback = ref('');

	const sendFeedback = async () => {
		if (!feedback.value.trim()) return;
		try {
			await emailjs.send(
				"service_9zsuox2",
				"template_s9p24lo",
				{ message: feedback.value },
				"2v5vLDUsbkXWrluyJ"
			);
			feedback.value = '';
			isSended.value = true
		} catch (error) {
			console.log(error)
		}
	};

	const isSendedfeedBack = () => {
		isSended.value = false
	}
</script>

<style scoped>
	.feedback-container {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.feedback-content {
		display: flex;
		flex-direction: column;
	}

	.text__area {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		resize: none;
		font-family: "Nunito", serif;
		height: 130px;
		font-size: 14px;
	}

	.feed__back-btn {
		margin-top: 15px;
		width: 100%;
		padding: 10px;
		background-color: var(--button-bg);
		color: var(--button-text-color);
		border: none;
		font-size: 24px;
		font-family: "Itim", serif;
		border-radius: 5px;
		cursor: pointer;
	}

	.feed__back-wrapper {
		padding: 20px;
	}

	.feedback-container {
		width: 100%;
		height: 100vh;
		background-color: var(--background-color);
	}

	.feed__back-overlay {
		width: 100%;
		height: 100vh;
		position: absolute;
		background: white;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(3px);
		top: 0;
		left: 0;
		z-index: 1;
	}

	.overlay__window {
		background: #34364a;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 20;
		position: relative;
		padding: 30px;
		margin: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.overlay__text {
		font-family: "Nunito", serif;
		color: white;
		font-size: 20px;
		margin-bottom: 20px;
		text-align: center;
	}

	.overlay__btn {
        border: none;
		width: 50%;
		font-size: 18px ;
		padding: 10px;
		border-radius: 10px;
	}
</style>
