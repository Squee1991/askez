<template>
	<Transition name="fade">
		<div class="askeza__menu">
			<div class="log__out-overlay" :class="{'overlay': logOutAccept}"></div>
			<div v-if="logOutAccept" class="logout__confirm">
				<div class="logout"> {{ $t('logOut.out')}}</div>
				<div class="log__out-text">{{ $t('logOut.reject')}}</div>
				<div class="logout__btns">
					<button @click="confirmLogout" class="logout__btn yes-btn">{{ $t('delAllDatas.acceptBtn')}}</button>
					<button @click="NotConfirmLogout" class="logout__btn no-btn">{{ $t('delAllDatas.rejectBtn')}}
					</button>
				</div>
			</div>
			<div class="askeza__menu-content">
				<div>
					<div class="menu__title">
						<HeaderwithBack
							:title="$t('menu.title')"/>
						<div class="log__out-icon" @click="singOutBtn">
							<img :src="LogoutIcon" alt="">
						</div>
					</div>
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
					<div class="askeza__v">Askeza v1.0</div>
					<div>
						<button class="premium_btn" @click="toPremium">
							<span class="premium__icon">
								<img class="premium__img" src="../assets/images/premium.png" alt="">
							</span>
							<span class="account__text"> Get premium</span>
						</button>
					</div>
				</div>
				<Footer/>
			</div>
		</div>
	</Transition>
</template>
<script setup>
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import Footer from '../src/components/footer.vue'
	import {useI18n} from 'vue-i18n';
	import LogoutIcon from '../assets/images/logout.svg'
	import Arrowicon from '../assets/images/arrowBack.svg'
	import {onMounted, onUnmounted, ref} from "vue";
	import {getAuth, signOut} from "firebase/auth";
	import {useRouter, useRoute} from 'vue-router'

	const router = useRouter()
	const premium = ref(false)


	const toPremium = () => {
		router.push('premium')
	}

	const singOutBtn = () => {
		logOutAccept.value = true
	}

	const confirmLogout = async () => {
		const auth = getAuth()
		await signOut(auth)
		logOutAccept.value = false
	}

	const NotConfirmLogout = () => {
		logOutAccept.value = false
	}

	const handleClickOutside = (event) => {
		const menu = document.querySelector(".log__out-menu");
		const button = document.querySelector(".edit__component");
		if (menu && !menu.contains(event.target) && button && !button.contains(event.target)) {
			logOutMenu.value = false;
		}
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener("click", handleClickOutside);
	});


	const {t} = useI18n();
	const accountLabels = ['Акаўнт', 'Аккаунт', 'Account', 'Konto', 'Cuenta', 'Compte', 'Акаунт', 'Hesto', '账户', 'الحساب'];

	const aboutLabels = ['Пра праграму', 'О программе', 'About App', 'Über die App', 'Sobre la app', "À propos de l'application", 'Про застосунок', 'Yassë Apacë', '关于应用', 'حول التطبيق'];

	const languageLabels = ['Мова', 'Язык', 'Languages', 'Sprache', 'Idioma', 'Langue', 'Мова', 'Lambë', '语言', 'اللغات'];

	const feedback = ['Обратная связь', 'Зваротная сувязь', 'Feedback', 'Comentarios', 'Commentaires', 'Зворотний зв\'язок', 'Anna atsa', '反馈', 'التعليقات'];

	const settingsLabels = ['Налады', 'Настройки', 'Settings', 'Einstellungen', 'Configuración', 'Paramètres', 'Налаштування', 'Ondo', '设置', 'الإعدادات'];


	const logOutAccept = ref(false)
	const logOutMenu = ref(false)
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
			return '/images/About.svg';
		} else if (languageLabels.includes(text)) {
			return '/images/lang.svg';
		} else if (settingsLabels.includes(text)) {
			return '/images/seting.svg';
		} else if (feedback.includes(text)) {
			return '/images/feedBack.svg';
		} else {
			return '';
		}
	};

	definePageMeta({
		middleware: ['auth'],
	})

</script>

<style scoped>

	.premium__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 44px;
		height: 44px;
		padding: 2px;
		border-radius: 10px;
		margin-right: 15px;
	}

	.premium__img {
		width: 100%;
	}

	.premium_btn {
		display: flex;
		align-items: center;
		padding: 15px;
		font-weight: 400;
		text-decoration: none;
		background: var(--menu--btn-bg);
		border-radius: 12px;
		transition: background 0.3s ease;
		outline: none;
		-webkit-tap-highlight-color: transparent;
		border: none;
		width: 100%;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.askeza__v {
		margin-top: 10px;
		color: grey;
		font-size: 14px;
		font-weight: 400;
		text-align: center;
		margin-bottom: 15px;
		font-family: "Acme", serif;
	}

	.logout__confirm {
		width: 80%;
		background: #34364a;
		padding: 20px;
		border-radius: 15px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 40%;
		z-index: 100;
	}

	.log__out-icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logout__btns {
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}

	.logout__btn {
		background: none;
		border: none;
		color: #24ba1d;
		padding: 10px 20px;
		font-weight: bold;
		font-size: 19px;
		font-family: "Acme", serif;
	}

	.overlay {
		position: absolute;
		width: 100%;
		height: 100vh;
		background: black;
		opacity: 50%;
		z-index: 1;
	}

	.log__out-text {
		padding: 5px 0;
		color: grey;
		text-align: center;
	}

	.logout {
		margin-bottom: 10px;
		text-align: center;
		color: white;
		font-family: "Nunito", serif;
		font-size: 22px;
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

	.menu__title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.account__icon {
		width: 44px;
		height: 44px;
		margin-right: 15px;
		padding: 8px;
		border-radius: 15px;
	}

	.account__text {
		color: var(--text-color);
		font-size: 18px;
		font-weight: 600;
		font-family: "Acme", serif;
		letter-spacing: 1px;
	}

	.askeza__menu-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		padding: 15px 6vw;
		height: 100vh;
		background-color: var(--background-color);
	}

	.menu__btn-wrapper {
		padding: 5px 0;
	}

	.askeza__menu {
		position: relative;
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
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

</style>
