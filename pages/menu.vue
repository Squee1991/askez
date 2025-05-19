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
			<div class="menu__title">
				<HeaderwithBack
					:title="$t('menu.title')"/>
				<div class="log__out-icon" @click="singOutBtn">
					<img :src="LogoutIcon" alt="">
				</div>
			</div>
			<div class="askeza__menu-content">
				<div class="askez__menu__scroll">
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
					<div class="askeza__v">FocusPanda v1.0</div>
					<div>
						<button v-if="!authStore.isPremium" class="premium_btn" @click="toPremium">
							<span class="premium__icon">
								<img class="premium__img" src="../assets/images/premium.png" alt="">
							</span>
							<span class="account__text">Get premium</span>
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
	import {useAuthStore} from "../stores/authStore.js"
	import LogoutIcon from '../assets/images/logout.svg'
	import {onMounted, onUnmounted, ref} from "vue";
	import {getAuth, signOut} from "firebase/auth";
	import {useRouter, useRoute} from 'vue-router'
	const {t} = useI18n();
	const router = useRouter()
	const premium = ref(false)
	const authStore = useAuthStore()

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

	const accountLabels = ['Акаўнт', "खाता", "Conta" , 'Аккаунт', 'Account', 'Konto', 'Cuenta', 'Compte', 'Акаунт', 'Hesto', '账户', 'الحساب'];

	const aboutLabels = ['Пра праграму', "ऐप के बारे में", "Sobre o aplicativo", 'О приложении', 'About App', 'Über die App', 'Sobre la app', "À propos de l'application", 'Про застосунок', 'Yassë Apacë', '关于应用', 'حول التطبيق', 'O aplikacji'];

	const languageLabels = ['Мова', 'Язык', "भाषा", 'Languages', 'Sprache', 'Idioma', 'Langue', 'Мова', 'Lambë', '语言', 'اللغات', 'Język'];

	const feedback = ['Обратная связь', "प्रतिक्रिया", 'Зваротная сувязь', 'Feedback', 'Comentarios', 'Commentaires', 'Зворотний зв\'язок', 'Anna atsa', '反馈', 'التعليقات', 'Opinie'];

	const settingsLabels = ['Налады', "सेटिंग्स", 'Настройки', "Configurações", 'Settings', 'Einstellungen', 'Configuración', 'Paramètres', 'Налаштування', 'Ondo', '设置', 'الإعدادات', 'Ustawienia'];


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

	// definePageMeta({
	// 	layout: 'footerlayout'
	// })

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

	.askez__menu__scroll {
		padding-bottom: 85px;
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
		border-radius: 20px;
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
		background: #8c3de3;
		width: 50%;
		margin: 5px;
		border-radius: 25px;
		border: none;
		color: white;
		padding: 10px 20px;
		font-weight: 600;
		font-size: 17px;
		font-family: "Nunito", sans-serif;
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
		margin: 0 auto;
		max-width: 180px;
		padding: 5px 0;
		color: grey;
		text-align: center;
		font-family: "Nunito", sans-serif;
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
		padding: 0 6vw;
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
		font-size: 16px;
		font-weight: 600;
		font-family: "Nunito", sans-serif;
		letter-spacing: 1px;
	}

	.askeza__menu-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		padding: 15px 6vw;

		background-color: var(--background-color);
		overflow-y: auto;

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
		border-radius: 20px;
		transition: background 0.3s ease;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

</style>
