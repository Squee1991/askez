<script setup>
	import {ref, onMounted, computed} from 'vue';
	import {getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser} from 'firebase/auth';
	import Light from '../assets/images/light.png';
	import Dark from '../assets/images/dark.png';
	import HeaderWithBack from '../src/components/headerWithBack.vue';
	import Arrowicon from '../assets/images/arrowSvg.svg';
	import {useRoute, useRouter} from "vue-router";
	import {useHabitStore} from "../stores/habitStore.js";
	import {useAuthStore} from "../stores/authStore.js";
	import {useTaskStore} from '../stores/OfflineTaskStore.js';
	import {useI18n} from 'vue-i18n';
	import {useValidationStore} from '../stores/validationStore.js'

	const taskStore = useTaskStore();
	const validationStore = useValidationStore()
	const {t} = useI18n();
	const isMounted = ref(false);
	const habitStore = useHabitStore()
	const authStore = useAuthStore()
	const confirmDeleteDatas = ref(false)
	const router = useRouter();
	const password = ref('');
	const deleteError = ref('');
	const colorMode = useColorMode();
	const passwordInput = ref('');

	const toggleTheme = () => {
		colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
	};

	const modeLabel = [
		'Mode',
		'Мод',
		'Режим',
		'Fëapolë',
		'模式',
		'الوضع'
	];

	const deleteLabels = [
		'Удалить аккаунт',
		'Delete account',
		'Выдаліць акаунт',
		'Видалити акаунт',
		'Konto löschen',
		'Eliminar cuenta',
		'Supprimer le compte',
		'Account vanwa',
		'删除账户',
		'حذف الحساب'
	];
	const {locale, messages} = useI18n();

	const cancelDelete = () => {
		confirmDeleteDatas.value = false;
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
				await taskStore.clearLocalTasks()
				confirmDeleteDatas.value = false;
				router.push('/');
			} catch (error) {
				console.error(error);
				deleteError.value = validationStore.getFirebaseError(error);
			}
		}
	};

	const NotdeleteAllDatas = () => {
		confirmDeleteDatas.value = false
	}

	onMounted(() => {
		const savedMode = localStorage.getItem('nuxt-color-mode') || 'dark';
		colorMode.preference = savedMode;
		isMounted.value = true;
	});

	const SettingsChange = (text) => {
		const textItem = text.trim();
		if (modeLabel.includes(textItem)) {
			toggleTheme();
		} else if (deleteLabels.includes(textItem)) {
			confirmDeleteDatas.value = true
		}
	};

	onMounted(() => {
		isMounted.value = true;
	});

</script>

<template>
	<div class="settings__wrapper">
		<div v-if="confirmDeleteDatas" class="overlay">
			<div class="confirm__wrapper">
				<div class="confirm__title">{{ $t('delAllDatas.title')}}</div>
				<div class="confirm_sub-title">{{ $t('delAllDatas.subTitle')}}</div>
				<div class="confirm__label">
					<input class="confirm__field-password" v-model="passwordInput" type="password"
					       placeholder="enter password">
					<span v-if="deleteError" class="error-message">{{ deleteError }}</span>
				</div>
				<div class="btns-wrapper">
					<button @click="deleteAllDatas" class="btn_del-data --del-data">{{ $t('delAllDatas.acceptBtn')}}
					</button>
					<button @click="NotdeleteAllDatas" class="btn_del-data --not-del">{{ $t('delAllDatas.rejectBtn')}}
					</button>
				</div>
			</div>
		</div>
		<HeaderWithBack
			:icon="Arrowicon"
			:title="$t('settings.title')"
		/>
		<div class="settings__btns">
			<div class="menu__btn-wrapper" v-for="index in 3" :key="index">
				<button class="account__settings-btn" @click="SettingsChange($t('setting.' + (index - 1)))">
					<span class="accoun__text">{{ $t('setting.' + (index - 1)) }}</span>
					<img
						v-if="isMounted && index === 3 "
						class="color__mode-icon"
						:src="colorMode.preference === 'dark' ? Light : Dark"
						alt="">
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.confirm__label {
		height: 80px;
	}

	.error-message {
		color: red;
		font-size: 14px;
		height: 20px;
		font-family: "Acme", serif;
		font-weight: 600;
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
		font-size: 20px;
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
		z-index: 1;
	}

	.confirm__wrapper {
		width: 80%;
		background: #34364a;
		padding: 20px;
		border-radius: 15px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 50%;
		z-index: 10;
	}

	.confirm_sub-title {
		padding: 15px 5px 15px 0;
		color: grey;
	}

	.btn_del-data {
		margin-left: 25px;
		border: none;
		background: none;
		color: #24ba1d;
		padding: 10px;
		font-weight: bold;
		font-size: 18px;
	}

	.btns-wrapper {
		display: flex;
		justify-content: end;
		margin-right: 10px;
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
		border-radius: 12px;
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
		font-weight: 600;
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
