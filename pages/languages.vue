<template>
	<div class="language">
		<div class="language__wrapper">
			<HeaderwithBack :title="languages.title"/>
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
	const languages = ref({});
	const selectedLanguage = ref(null);
	const computedClassNames = computed(() => {
		if (languages.value) {
			return {
				['menu--' + languages.value.mode]: languages.value.mode,
				mainMenu: languages.value.items && languages.value.items.length > 2
			};
		}
		return {};
	});

	const loadLanguageData = async (lang) => {
		try {
			let response;
			if (lang === 'de') {
				response = await fetch('/dataListDeutsch.json');
			}
			else if (lang === 'es') {
				response = await fetch('/dataListSpanian.json');
			}
			else if (lang === 'ru') {
				response = await fetch('/dataListRussian.json');
			}
			else if(lang === 'by') {
				response = await fetch('/dataListBelorussian.json')
			}
			else {
				response = await fetch('/dataListJSON.json');
			}

			const data = await response.json();
			languages.value = data.languages;
		} catch (error) {

		}
	};
	onMounted(async () => {
		changeDefaultTypeLanguage();
		await loadLanguageData(selectedLanguage.value);
	});

	const changeDefaultTypeLanguage = () => {
		const localStorageLanguage = localStorage.getItem('language');
		if (localStorageLanguage) {
			selectedLanguage.value = localStorageLanguage;
			return
		}
		selectedLanguage.value = 'ru';
	};

	watch(selectedLanguage, (newLang) => {
		localStorage.setItem('language', newLang);
		loadLanguageData(newLang);
	});


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