<template>
	<div class="settings__wrapper">
		<HeaderWithBack
			:icon="Arrowicon"
			:title="$t('settings.title')"
		/>
		<div class="settings__btns">
			<div class="menu__btn-wrapper" v-for="(item, index) in settingsPlain" :key="index">
				<button class="account__settings-btn" @click="buttonClick(item)">
					<span class="accoun__text">{{ item }}</span>
					<img v-if="isMounted && (item.trim() === 'Mode' || item.trim() === 'Мод')"
					     class="color__mode-icon"
					     :src="colorMode.preference === 'dark' ? Light : Dark "
					     alt="">
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import Light from '../assets/images/light.png';
	import Dark from '../assets/images/dark.png';
	import HeaderWithBack from '../src/components/headerWithBack.vue';
	import Arrowicon from '../assets/images/arrowSvg.svg';
	import { useI18n } from 'vue-i18n';
	const isMounted = ref(false);
	const colorMode = useColorMode();
	const { locale, messages } = useI18n();
	const settingsPlain = computed(() => {
		const raw = messages.value[locale.value].setting;
		return raw.map(item => {
			if (typeof item === 'string') {
				return item;
			}
			return item.body?.static;
		});
	});

	const toggleTheme = () => {
		colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
	};

	const buttonClick = (text) => {
		const textItem = text.trim();
		if (textItem === 'Mode' || textItem === 'Мод') {
			toggleTheme();
		}
	};

	onMounted(() => {
		isMounted.value = true;
	});

	definePageMeta({
		layout: "footerlayout"
	});
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
		padding: 3px 0;
	}

	.account__settings-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: none;
		border: none;
		padding: 10px 0 13px 0;
		width: 100%;
		font-size: 18px;
		font-weight: 400;
		font-family: "Nunito", serif;
		text-align: start;
		border-radius: 10px;
		position: relative;
		cursor: pointer;
		color: var(--text-color);
	}

	.account__settings-btn:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 100%;
		background: #dec8b4;
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
