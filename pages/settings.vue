<template>
	<div class="settings__wrapper">
		<div v-show="confirmDeleteDatas" class="overlay">
			<div class="confirm__wrapper">
				<div class="confirm__title">{{ $t('delAllDatas.title')}}</div>
				<div class="confirm_sub-title">{{ $t('delAllDatas.subTitle')}}</div>
				<div class="btns-wrapper">
					<button @click="deleteAllDatas" class="btn_del-data --del-data">{{ $t('delAllDatas.acceptBtn')}}</button>
					<button @click="NotdeleteAllDatas" class="btn_del-data --not-del">{{ $t('delAllDatas.rejectBtn')}}</button>
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
					<img v-if="isMounted && ($t('setting.' + (index - 1)).trim() === 'Mode' || $t('setting.' + (index - 1)).trim() === 'Мод')"
					     class="color__mode-icon"
					     :src="colorMode.preference === 'dark' ? Light : Dark"
					     alt="">
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref, onMounted, computed} from 'vue';
	import Light from '../assets/images/light.png';
	import Dark from '../assets/images/dark.png';
	import HeaderWithBack from '../src/components/headerWithBack.vue';
	import Arrowicon from '../assets/images/arrowSvg.svg';
	import {useRoute , useRouter} from "vue-router";
	import {useHabitStore} from "../stores/habitStore.js";
	import {useI18n} from 'vue-i18n';
	const { t } = useI18n();
	const isMounted = ref(false);
	const habitStore = useHabitStore()
	const confirmDeleteDatas = ref(false)
	const router = useRouter();
	const colorMode = useColorMode();
	const modeLabel = ['Mode', 'Мод']
	const deleteLabels = ['Удалить аккаунт', 'Delete account', 'Выдаліць акаунт', 'Konto löschen', 'Eliminar cuenta', 'Supprimer le compte']
	const {locale, messages} = useI18n();

	const deleteAccount = () => {
		confirmDeleteDatas.value = true
	}

	const deleteAllDatas = () => {
		confirmDeleteDatas.value = false
		habitStore.clearAlldates()
		router.push("/")
	}

	const NotdeleteAllDatas = () => {
		confirmDeleteDatas.value = false
	}

	const toggleTheme = () => {
		colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
	};

	const SettingsChange = (text) => {
		const textItem = text.trim();
		if (modeLabel.includes(textItem)) {
			toggleTheme();
		} else if (deleteLabels.includes(textItem)) {
			deleteAccount();
		}
	};

	onMounted(() => {
		isMounted.value = true;
	});

</script>

<style scoped>

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
		transform: translate(-50% , -50%);
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
