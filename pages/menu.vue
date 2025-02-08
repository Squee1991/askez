<template>
	<div class="askeza__menu">
		<div class="askeza__menu-content">
			<HeaderwithBack :title="$t('menu.title')"/>
			<div class="menu__btns">
				<div
					v-for="item in menuList.items"
					:key="item.id"
					class="menu__btn-wrapper"
				>
					<NuxtLink :to="item.link" class="account__settings-btn">
						<img class="account__icon" :class="
						    {
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
	import {ref, onMounted, computed} from 'vue';
	import {useI18n} from 'vue-i18n';

	const menuList = ref({});
	onMounted(async () => {
		const response = await fetch('/dataListBelorussian.json');
		const data = await response.json();
		menuList.value = data.menu;
	});

	definePageMeta({
		layout: 'footerlayout'
	});
</script>

<style scoped>

	.lang-bg-rot {
		background: #d64545;
	}

	.settings-bg-orange {
		background: #ffa450;
	}

	.acc-bg-blue {
		background: #4169e1;
	}

	.aboutapp-bg-green {
		background: #32cd32;
	}

	.account__icon {
		width: 35px;
		margin-right: 20px;
		padding: 5px;
		border-radius: 10px;
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

	.menu__btn-wrapper {
		padding: 5px 0;
	}

	.account__settings-btn {
		display: flex;
		align-items: center;
		border: none;
		width: 100%;
		padding: 12px 0;
		font-size: 20px;
		border-radius: 10px;
		font-family: "Nunito", serif;
		font-weight: 400;
		text-align: start;
		background: none;
		position: relative;
	}

	.account__settings-btn:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 100%;
		background: #dec8b4;
	}
</style>
