<template>
	<div class="settings__wrapper">
		<HeaderWithBack
			:icon="Arrowicon"
			:title="settings.title" />
		<div class="settings__btns">
			<div
				v-for="item in settings.items"
				:key="item.id"
				class="menu__btn-wrapper"
			>
				<button class="account__settings-btn"
				        @click="buttonClick(item.text)">
					<span class="accoun__text">{{ item.text }}</span>
					<img class="color__mode-icon"
						:src="colorMode.preference === 'dark' ? item.lightIcon : item.darkIcon"
						alt="">
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import HeaderWithBack from '../src/components/headerWithBack.vue';
	import Arrowicon from '../assets/images/arrowSvg.svg'
	const settings = ref([]);
	const colorMode = useColorMode();
	const toggleTheme = () => {
		colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
	};

	const buttonClick = (text ) => {
		if (text === 'Mode') {
			toggleTheme()
		}
	}

	onMounted(async () => {
		const response = await fetch('/dataListEnglish.json');
		const data = await response.json();
		settings.value = data.settings;
	});

	definePageMeta({
		layout: "footerlayout"
	})

</script>

<style scoped>

	.color__mode-icon {
		width: 30px;
	}
	.settings__wrapper {
		padding: 25px;
		height: 100vh;
		width: 100%;
		background-color: var(--background-color);
	}

	.menu__btn-wrapper {
		padding: 6px 0;
	}

	.account__settings-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: none;
		border: none;
		padding: 10px 0;
		width: 100%;
		font-size: 18px;
		font-weight: 400;
		font-family: "Nunito", serif;
		text-align: start;
		border-radius: 10px;
		align-items: center;
		position: relative;
		cursor: pointer;
		color: var(--text-color);

	}

	.color-mode-btn {
		margin-top: 20px;
		padding: 10px 20px;
		background-color: var(--background-color);
		color: var(--text-color);
		border: 1px solid var(--text-color);
		border-radius: 8px;
		cursor: pointer;
	}

	.color-mode-btn:hover {
		background-color: var(--text-color);
		color: var(--background-color);
	}
</style>
