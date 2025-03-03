<template>
	<div class="askeza__menu">
		<div class="askeza__menu-content">
			<HeaderwithBack :title="$t('menu.title')"/>
			<div class="menu__btns">
				<div class="menu__btn-wrapper" v-for="index in 5" :key="index">
					<NuxtLink class="account__settings-btn" :to="getMenuPlainLink(t(`meniu.${index - 1}`))">
						<img
							:class="{
                'acc-bg-blue': accountLabels.includes(t(`meniu.${index - 1}`)),
                'aboutapp-bg-green': aboutLabels.includes(t(`meniu.${index - 1}`)),
                'lang-bg-orange': languageLabels.includes(t(`meniu.${index - 1}`)),
                'settings-bg-fiol': settingsLabels.includes(t(`meniu.${index - 1}`)),
                'feedback-bg-l-blue': feedback.includes(t(`meniu.${index - 1}`))
              }"
							class="account__icon"
							:src="getMenuPlainIcon(t(`meniu.${index - 1}`))"
							alt=""
						/>
						<span class="account__text">{{ t(`meniu.${index - 1}`) }}</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import {useI18n} from 'vue-i18n';

	const {t} = useI18n();
	const accountLabels = ['Акаўнт', 'Аккаунт', 'Account', 'Konto', 'Cuenta', 'Compte'];
	const aboutLabels = ['Пра праграму', 'О программе', 'About App', 'Über die App', 'Sobre la app', "À propos de l'application"];
	const languageLabels = ['Мова', 'Язык', 'Languages', 'Sprache', 'Idioma', 'Langue'];
	const feedback = ['Обратная связь', 'Зваротная сувязь', 'Feedback', 'Feedback', 'Comentarios', 'Commentaires'];
	const settingsLabels = ['Налады', 'Настройки', 'Settings', 'Einstellungen', 'Configuración', 'Paramètres'];

	const getMenuPlainLink = (text) => {
		if (accountLabels.includes(text)) {
			return '/account';
		} else if (aboutLabels.includes(text)) {
			return '/aboutApp';
		} else if (languageLabels.includes(text)) {
			return '/languages';
		} else if (settingsLabels.includes(text)) {
			return '/settings';
		} else if (feedback.includes(text)) {
			return '/feedBack';
		} else {
			return '';
		}
	};

	const getMenuPlainIcon = (text) => {
		if (accountLabels.includes(text)) {
			return '/images/account.svg';
		} else if (aboutLabels.includes(text)) {
			return '/images/aboutApp.svg';
		} else if (languageLabels.includes(text)) {
			return '/images/language.svg';
		} else if (settingsLabels.includes(text)) {
			return '/images/settings.svg';
		} else if (feedback.includes(text)) {
			return '/images/feedbackIcon.svg';
		} else {
			return '';
		}
	};

	definePageMeta({
		layout: 'footerlayout'
	})

</script>

<style>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

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
		padding: 15px 6vw;
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
		text-decoration: none;
		background: var(--menu--btn-bg);
		border-radius: 12px;
		transition: background 0.3s ease;
	}

</style>
