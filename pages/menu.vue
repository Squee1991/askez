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
                              'lang-bg-orange': languageLabels.includes(item),
                              'settings-bg-fiol': settingsLabels.includes(item),
                              'feedback-bg-l-blue': feedback.includes(item)
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
	import FeedBackIcon from '../assets/images/feedbackIcon.svg'
	import {useI18n} from 'vue-i18n';

	const accountLabels = ['Акаўнт', 'Аккаунт', 'Account', 'Konto', 'Cuenta' , 'Compte'];
	const aboutLabels = ['Пра праграму', 'О программе', 'About App', 'Über die App', 'Sobre la app' , 'À propos de l\'application'];
	const languageLabels = ['Мова', 'Язык', 'Languages', 'Sprache', 'Idioma' , 'Langue'];
	const feedback = ['Обратная связь', 'Зваротная сувязь', 'Feedback', 'Feedback', 'Comentarios' , 'Commentaires']
	const settingsLabels = ['Налады', 'Настройки', 'Settings', 'Einstellungen', 'Configuración' , 'Paramètres'];
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
		} else if (feedback.includes(isLink)) {
			return '/feedBack';
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
		} else if (feedback.includes(isItem)) {
			return FeedBackIcon
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

	.lang-bg-orange {
		background: #FF8C00;
	}

	.settings-bg-fiol {
		background: #9a50ff;
	}

	.acc-bg-blue {
		background: #1E90FF;
	}

	.aboutapp-bg-green {
		background: #32cd32;
	}

	.feedback-bg-l-blue {
		background: #00BCD4;
	}

	.account__icon {
		width: 40px;
		height: 40px;
		margin-right: 15px;
		padding: 8px;
		border-radius: 15px;
	}

	.account__text {
		color: var(--text-color);
		font-size: 18px;
		font-weight: 600;
		font-family: "Roboto", serif;
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
		padding: 15px;
		font-weight: 400;
		background: var(--menu--btn-bg);
		border-radius: 12px;
		margin-bottom: 10px;
		transition: background 0.3s ease;

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
