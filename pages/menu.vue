<template>
	<div class="askeza__menu">
		<div class="askeza__menu-content">
			<HeaderwithBack :title="$t('menu.title')"/>
			<div class="menu__btns">
				<div v-for="(item , index) in menuPlain" :key="index">
					<NuxtLink class="account__settings-btn" :to="getMenuPlainLink(item)">
						<img :class="{
                              'acc-bg-blue': accountLabels.includes(item),
                              'aboutapp-bg-green': aboutLabels.includes(item),
                              'lang-bg-rot': languageLabels.includes(item),
                              'settings-bg-orange': settingsLabels.includes(item)
                                     }"
						     class="account__icon" :src="getMenuPlainIcon(item)" alt="">
						<span class="account__text"> {{ item }}</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import {ref, onMounted, computed} from 'vue';
	import AccoutIcon from '../assets/images/account.svg'
	import AboutApp from '../assets/images/aboutApp.svg'
	import languageIcon from '../assets/images/language.svg'
	import SettingsIcon from '../assets/images/setings.svg'
	import {useI18n} from 'vue-i18n';

	const accountLabels = ['Акаўнт', 'Аккаунт', 'Account', 'Konto', 'Cuenta'];
	const aboutLabels = ['Пра праграму', 'О программе', 'About the App', 'Über die App', 'Sobre la app'];
	const languageLabels = ['Мова', 'Язык', 'Languages', 'Sprache', 'Idioma'];
	const settingsLabels = ['Налады', 'Настройки', 'Settings', 'Einstellungen', 'Configuración'];
	const {locale, messages} = useI18n();

	const getMenuPlainLink = (text) => {
		const isLink = text.trim();
		if (accountLabels.includes(isLink)) {
			return '/account';
		} else if (aboutLabels.includes(isLink)) {
			return '/aboutApp';
		} else if (languageLabels.includes(isLink)) {
			return '/languages';
		} else if (settingsLabels.includes(isLink)) {
			return '/settings';
		} else {
			return ''
		}
	};
	const getMenuPlainIcon = (text) => {
		const isItem = text.trim();
		if (accountLabels.includes(isItem)) {
			return AccoutIcon;
		} else if (aboutLabels.includes(isItem)) {
			return AboutApp;
		} else if (languageLabels.includes(isItem)) {
			return languageIcon;
		} else if (settingsLabels.includes(isItem)) {
			return SettingsIcon;
		} else {
			return '';
		}
	};

	const menuPlain = computed(() => {
		const raw = messages.value[locale.value].meniu;
		return raw.map(item => {
			if (typeof item === 'string') {
				return item
			}
			return item.body?.static || '';
		})
	})

	definePageMeta({
		layout: 'footerlayout'
	});

</script>

<style scoped>

	.lang-bg-rot {
		background: #d64545;
	}

	.settings-bg-orange {
		background: #ffa450;
	}

	.acc-bg-blue {
		background: #4169e1;
	}

	.aboutapp-bg-green {
		background: #32cd32;
	}

	.account__icon {
		width: 35px;
		margin-right: 20px;
		padding: 5px;
		border-radius: 10px;
	}

	.account__text {
		color: var(--text-color);
		font-size: 18px;
		font-family: "Itim", serif;
		letter-spacing: 1px;
		font-style: normal;
	}

	.askeza__menu-content {
		width: 100%;
		padding: 30px;
		height: 100vh;
		background-color: var(--background-color);
	}

	.menu__btn-wrapper {
		padding: 5px 0;
	}

	.account__settings-btn {
		display: flex;
		align-items: center;
		border: none;
		width: 100%;
		padding: 12px 0;
		font-size: 20px;
		border-radius: 10px;
		font-family: "Nunito", serif;
		font-weight: 400;
		text-align: start;
		background: none;
		position: relative;
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
</style>
