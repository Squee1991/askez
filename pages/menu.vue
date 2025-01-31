<template>
	<div class="askeza__menu">
		<div class="askeza__menu-content">
			<div class="menu__title">Menu</div>
			<div class="menu__btns">
				<div
					v-for="item in menuList.items"
					:key="item.id"
					class="menu__btn-wrapper"
				>
					<NuxtLink :to="item.link" class="account__settings-btn">
						<img
							class="account__icon"
							:class="{
							'settings-bg-orange': item.icon === 'setings.svg',
							'lang-bg-rot': item.icon === 'language.svg',
							'aboutapp-bg-green': item.icon === 'aboutAPP.svg',
							'acc-bg-blue': item.icon === 'account.svg'
						}"
							:src="item.icon"
							:alt="item.text"
						/>
						<span class="account__text">{{ item.text }}</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import {ref, onMounted} from "vue";

	const menuList = ref([]);
	onMounted(async () => {
		const response = await fetch('/dataListJSON.json');
		const data = await response.json();
		menuList.value = data.menu;
	});

	definePageMeta({
		layout: 'footerlayout'
	});

</script>

<style scoped>

	.lang-bg-rot {
		background: #D64545;
	}

	.settings-bg-orange {
		background: #ffa450;
	}

	.acc-bg-blue {
		background: #4169E1;
	}

	.aboutapp-bg-green {
		background: #32CD32;
	}


	.account__icon {
		width: 35px;
		margin-right: 20px;
		padding: 5px;
		border-radius:10px;
	}

	.account__text {
		color: var(--text-color);
	}

	.askeza__menu-content {
		width: 100%;
		padding: 30px;
		height: 100vh;
		background-color: var(--background-color);
	}

	.menu__title {
		font-size: 30px;
		font-family: "Nunito", serif;
		padding: 15px 0;
		font-weight: 700;
		margin-bottom: 10px;
		color: var(--text-color);
	}

	.account__settings-btn:after {
		content: '';
		width: 100%;
		height: 1px;
		background: #dec8b4;
		bottom: 0;
		left: 0;
		position: absolute;
	}

	.menu__btn-wrapper {
		padding: 5px 0;
	}

</style>
