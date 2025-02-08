<template>
	<div class="language">
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
</template>

<script setup>
	import {ref, onMounted, computed, watch} from 'vue';
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import ListComponent from '../src/components/ListComponent.vue';
	import SelectedIcon from '../assets/images/selectedLanguage.svg';
	import Arrowicon from '../assets/images/arrowSvg.svg?url';
	const languages = ref({});
	const selectedLanguage = ref(null);
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

	watch(selectedLanguage, (newLang) => {
		localStorage.setItem('language', newLang);
		loadLanguageData(newLang);
	});

	definePageMeta({
		layout: "footerlayout"
	})
</script>

<style scoped>
	.language__wrapper {
		width: 100%;
		padding: 30px;
		height: 100vh;
		background-color: var(--background-color);
	}

	.no-space {
		display: flex;
		justify-content: space-between;
	}
</style>