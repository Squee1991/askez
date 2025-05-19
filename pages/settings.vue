<script setup>
	import {ref, onMounted, computed} from 'vue';
	import {getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser} from 'firebase/auth';
	import PremiumWindow from '../src/components/premiumWindow.vue'
	import Light from '../assets/images/sun-2.svg';
	import Dark from '../assets/images/moon.svg';
	import HeaderWithBack from '../src/components/headerWithBack.vue';
	import Arrowicon from '../assets/images/back.svg';
	import {useRouter} from "vue-router";
	import {useHabitStore} from "../stores/habitStore.js";
	import {useAuthStore} from "../stores/authStore.js";
	import {useTaskStore} from '../stores/OfflineTaskStore.js';
	import {useI18n} from 'vue-i18n';
	import {useValidationStore} from '../stores/validationStore.js';
	import { toggleTheme, activeAnim, isToggle } from '../src/utils/themeToggle.js'
	const taskStore = useTaskStore();
	const validationStore = useValidationStore();
	const {t} = useI18n();
	const habitStore = useHabitStore();
	const authStore = useAuthStore();
	const router = useRouter();
	let confirmDeleteDatas = ref(false);
	const isOverlayVisible = ref(false)
	const passwordInput = ref('');
	const deleteError = ref('');
	const colorMode = useColorMode();
	const localBotToggle = ref(false);
	const activeBotAnim = ref(false)
	const isAudioEnabled = computed(() => habitStore.isAudioEnabled);
	const isAnimationEnabled = computed(() => habitStore.isAnimationEnabled);

	const clickToggleBot = async () => {
		if (!authStore.isPremium) return;
		activeBotAnim.value = true;
		setTimeout(() => {
			activeBotAnim.value = false;
		}, 200);
		localBotToggle.value = !localBotToggle.value;
		authStore.isBotEnabled = localBotToggle.value;
		await authStore.saveBotStateToFirebase(localBotToggle.value);
	};

	const clickPremiumButton = () => {
		if (!authStore.isPremium) {
			isOverlayVisible.value = true;
			return;
		}
		clickToggleBot();
	}

	const handleClick = (index) => {
		if (index === 2) {
			router.push('/policyPrivacy');
		} else if (index === 3) {
			router.push('/attribution');
		} else if (index === 4) {
			habitStore.toggleAudio();
		} else if (index === 5) {
			habitStore.toggleAnimation();
		} else if (index === 6) {
			toggleTheme();
		} else if (index === 7) {
			clickPremiumButton();
		} else {
			SettingsChange(t(`setting.${index - 1}`));
		}
	};

	const deleteAllDatas = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!passwordInput.value.trim()) {
			deleteError.value = 'Please enter password before deleting';
			return;
		}
		if (user && user.email) {
			const credential = EmailAuthProvider.credential(user.email, passwordInput.value);
			try {
				await reauthenticateWithCredential(user, credential);
				await habitStore.clearAlldates();
				await deleteUser(user);
				await taskStore.clearLocalTasks();
				confirmDeleteDatas.value = false;
				router.push('/');
			} catch (error) {
				console.error(error);
				deleteError.value = validationStore.getFirebaseError(error);
			}
		}
	};

	const SettingsChange = (text) => {
		const textItem = text
		if ([
			'Mode', 'Мод', 'Режим', 'Fëapolë', '模式', 'الوضع', 'Tryb'
		].includes(textItem)) {
			clickToggle();
		} else if (["Privacy Policy", "سياسة الخصوصية",
			"Палітыка прыватнасці", "Datenschutzbestimmungen", "Násië", "Политика конфиденциальности",
			"Політика конфіденційності", "隐私政策", "Politique de confidentialité", "Polityka prywatności", "Política de privacidad",].includes(textItem)) {
			router.push('/policyPrivacy')
		} else if (['Удалить аккаунт', 'Delete account', 'Выдаліць акаунт', 'Видалити акаунт', 'Konto löschen', 'Usuń konto', 'Eliminar cuenta',
			'Supprimer le compte', 'Account vanwa', '删除账户', 'حذف الحساب'].includes(textItem)) {
			confirmDeleteDatas.value = true;
		}
	};

	onMounted(() => {
		const savedMode = localStorage.getItem('nuxt-color-mode') || 'light';
		colorMode.preference = savedMode;
		isToggle.value = savedMode === 'light';

		// ✅ Синхронизация состояния бота с премиумом
		if (!authStore.isPremium) {
			localBotToggle.value = false;
			authStore.isBotEnabled = false;
			authStore.saveBotStateToFirebase(false); // ⬅️ важно
		} else {
			localBotToggle.value = authStore.isBotEnabled;
		}

		const audioSetting = localStorage.getItem('audioEnabled');
		isAudioEnabled.value = audioSetting ? JSON.parse(audioSetting) : true;
	});

	const show = () => {
		activeAnim.value = true
	}

	watch(() => colorMode.preference, (val) => {
		isToggle.value = val === 'light';
	});

</script>
<template>
	<div v-if="isOverlayVisible" class="premium__window">
		<PremiumWindow
			:text="$t('premiumWindow.bot')"
			:subtext="$t('premiumWindow.subtext')"
			@close="isOverlayVisible = false"
		/>
	</div>
	<div class="settings__wrapper">
		<div v-if="confirmDeleteDatas" class="overlay">
			<div class="confirm__wrapper">
				<div class="confirm__title">{{ $t('delAllDatas.title') }}</div>
				<div class="confirm_sub-title">{{ $t('delAllDatas.subTitle') }}</div>
				<div class="confirm__label">
					<input class="confirm__field-password" v-model="passwordInput" type="password"
					       placeholder="enter password"/>
					<span v-if="deleteError" class="error-message">{{ deleteError }}</span>
				</div>
				<div class="btns-wrapper">
					<button @click="deleteAllDatas" class="btn_del-data del-data">{{ $t('delAllDatas.acceptBtn') }}
					</button>
					<button @click="confirmDeleteDatas = false" class="btn_del-data not-del">{{
						$t('delAllDatas.rejectBtn') }}
					</button>
				</div>
			</div>
		</div>
		<HeaderWithBack :icon="Arrowicon" :title="$t('settings.title')"/>
		<div class="settings__btns">
			<div class="menu__btn-wrapper" v-for="index in 7" :key="index">
				<button
					class="account__settings-btn"
					:class="{ 'disabled-premium': index === 7 && !authStore.isPremium }"
					@click="handleClick(index)"
				>
					<span class="accoun__text">{{ $t('setting.' + (index - 1)) }}</span>
					<span v-if="index === 4" class="toggle-bar" :class="{ 'toggle-active': !isAudioEnabled }">
							<span class="toggle-thumb"
							      :style="{ left: isAudioEnabled ? '38px' : '2px', backgroundColor: isAudioEnabled ? 'orange' : 'grey' }"/>
						</span>
					<span v-if="index === 5" class="toggle-bar" :class="{ 'toggle-active': !isAnimationEnabled }">
							<span class="toggle-thumb"
							      :style="{ left: isAnimationEnabled ? '38px' : '2px', backgroundColor: isAnimationEnabled ? 'orange' : 'grey' }"/>
						</span>
					<span v-if="index === 6" class="toggle-bar" :class="{ 'toggle-active': isToggle }">
							<img :src="Dark" alt="Dark" class="toggle-icon left"/>
							<span class="toggle-thumb"
							      :style="{ left: isToggle ? '38px' : '2px', backgroundColor: isToggle ? 'orange' : 'grey' }"/>
							<img :src="Light" alt="Light" class="toggle-icon right"/>
						</span>
					<span v-if="index === 7" class="toggle-bar" :class="{ 'toggle-active': localBotToggle }">
							<span class="toggle-thumb"
							      :style="{ left: localBotToggle ? '38px' : '2px', backgroundColor: localBotToggle ? 'orange' : 'grey' }"/>
						</span>
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.premium__window {
		position: absolute;
		width: 100%;
		height: 100vh;
		z-index: 100;
	}

	.disabled-premium {
		opacity: 0.5;
		cursor: pointer;
	}

	.toggle-bar {
		width: 68px;
		height: 33px;
		background-color: #ccc;
		border-radius: 20px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 6px;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.toggle-bar.dark-mode {
		background-color: #222;
	}

	.toggle-bar.bot-disabled {
		background-color: #666;
	}

	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 28px;
		height: 28px;
		background-color: orange;
		border-radius: 50%;
		transition: left 0.5s ease, background-color 0.3s ease;
		z-index: 0;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	.toggle-bar.dark-mode .toggle-thumb {
		left: 38px;
		background-color: grey;
	}

	.toggle-bar.bot-disabled .toggle-thumb {
		left: 38px;
		background-color: grey;
	}

	.toggle-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
		pointer-events: none;
	}

	.toggle-thumb.active-anim {
		transform: scaleX(1.4);
	}

	.confirm__label {
		height: 80px;
	}

	.error-message {
		color: red;
		font-size: 14px;
		height: 20px;
		font-family: "Acme", serif;
		margin-bottom: 15px;
	}

	.confirm__field-password {
		font-size: 14px;
		margin-bottom: 5px;
		width: 100%;
		padding: 10px;
		border-radius: 10px;
		border: 2px solid grey;
	}

	.confirm__field-password:focus {
		border: 2px solid #24ba1d;
	}

	.confirm__title {
		color: white;
		font-family: "Acme", serif;
		font-size: 24px;
	}

	.overlay {
		width: 100%;
		height: 100vh;
		position: absolute;
		background: white;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(1px);
		padding: 20px;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.confirm__wrapper {
		width: 80%;
		background: #34364a;
		padding: 20px;
		border-radius: 15px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 40%;
		z-index: 10;
	}

	.confirm_sub-title {
		padding: 15px 5px 15px 0;
		color: grey;
	}

	.btn_del-data {
		border: none;
		background: none;
		color: white;
		padding: 10px;
		font-weight: bold;
		font-size: 18px;
		width: 50%;
		background: #1ab41a;
		border-radius: 25px;
		margin: 5px;
		font-family: "Nunito", sans-serif;
	}

	.btn_del-data.del-data {
		border: none;
		background: none;
		color: white;
		padding: 10px;
		font-weight: bold;
		font-size: 18px;
		width: 50%;
		background: #e84e4e;
		border-radius: 25px;
		margin: 10px;
		font-family: "Nunito", sans-serif;
	}

	.btns-wrapper {
		display: flex;
		justify-content: end;

	}

	.color__mode-icon {
		width: 30px;
	}

	.settings__wrapper {
		position: relative;
		padding: 25px;
		height: 100vh;
		width: 100%;
		background-color: var(--background-color);
	}

	.menu__btn-wrapper {
		padding: 3px 0;

	}

	.settings__btns {
		background: var(--menu--btn-bg);
		padding: 0 15px;
		border-radius: 20px;
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
		letter-spacing: 1px;
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
		transform: scaleY(0.2);
	}

	.menu__btn-wrapper:last-child .account__settings-btn:after {
		opacity: 0;
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
