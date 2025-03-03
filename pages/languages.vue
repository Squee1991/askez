<template>
	<div v-if="preloader" class="preloader__lang">
		<Reloader/>
	</div>
	<div v-if="!preloader" class="language">
		<div class="language__content">
			<div class="language__wrapper">
				<HeaderwithBack
					:icon="Arrowicon"
					:title="$t('languages.title')"/>
				<div v-if="languages" class="language__list">
					<ListComponent
						:class="computedClassNames"
						:data="languages"
						:icon="SelectedIcon"
						v-model="selectedLanguage"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref, onMounted, computed, watch} from 'vue';
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import ListComponent from '../src/components/ListComponent.vue';
	import SelectedIcon from '../assets/images/checkIcon.svg';
	import Arrowicon from '../assets/images/arrowSvg.svg?url';
	import Reloader from '../src/components/preloader.vue'
	const languages = ref({});
	const selectedLanguage = ref(null);
	const preloader = ref(false)
	const { locales, local } = useI18n()
	const computedClassNames = computed(() => {
		if (languages.value) {
			return {
				['menu--' + languages.value.mode]: languages.value.mode,
				mainMenu: languages.value.items && languages.value.items.length > 2
			};
		}
		return {};
	});

	const loadLanguageData =  (lang) => {
		languages.value  = lang
	};

	onMounted( () => {
		changeDefaultTypeLanguage();
		loadLanguageData(selectedLanguage.value);
	});

	const changeDefaultTypeLanguage = () => {
		const localStorageLanguage = localStorage.getItem('language');
		if (localStorageLanguage) {
			selectedLanguage.value = localStorageLanguage;
			return
		}
		selectedLanguage.value = local;
	};

	watch(selectedLanguage, (newValue, oldValue) => {
		if (!oldValue) return;
		preloader.value = true;
		setTimeout(() => {
			localStorage.setItem('language', newValue);
			loadLanguageData(newValue);
			preloader.value = false;
		}, 3500);
	});

</script>

<style scoped>
	.language__wrapper {
		width: 100%;
		padding: 15px;
		height: 100vh;
		background-color: var(--background-color);
	}

	.language__list {
		background: var(--menu--btn-bg);
		padding: 10px 10px 10px 10px;
		border-radius: 15px;
	}

	.no-space {
		display: flex;
		justify-content: space-between;
	}


</style>