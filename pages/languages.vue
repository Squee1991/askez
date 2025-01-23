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
	import {ref, onMounted, computed} from 'vue';
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import ListComponent from '../src/components/ListComponent.vue';
	import SelectedIcon from '../assets/images/selectedLanguage.svg';
	import Arrowicon from '../assets/images/arrowSvg.svg'

	const languages = ref([]);
	const selectedLanguage = ref(null);

	const computedClassNames = computed(()=> {
		if (languages.value) {
			return {
				['menu--' + languages.value.mode]: languages.value.mode,
				"mainMenu": languages.value.items && languages.value.items.length > 2
			}
		}
	})

	const changeDefaultTypelanguage = () => {
		const localStorageLanguage = localStorage.getItem('language')
		if (localStorageLanguage) {
			selectedLanguage.value = localStorageLanguage
			return
		}
		selectedLanguage.value = 'ru'
	}

	onMounted(async ()=> {
		const response = await fetch('/dataListJSON.json');
		const data = await response.json();
		languages.value = data.languages;
		changeDefaultTypelanguage()
	});

	definePageMeta({
		layout: 'footerlayout'
	});

</script>

<style scoped>

	.language__wrapper {
		width: 100%;
		padding: 30px;
		height: 100vh;
		background: #aed7ae;
	}

	.no-space {
		display: flex;
		justify-content: space-between;
	}
</style>
