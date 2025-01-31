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
							:src="item.icon"
							alt=""
						/>
						<span class="accoun__text">{{ item.text }}</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import HeaderwithBack from '../src/components/headerWithBack.vue';
	import { ref, onMounted } from "vue";
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

<style>
.account__icon {
	width: 20px;
	margin-right: 20px;
}

.accoun__text {
	color: #2C3E50; /* Тёмно-синий цвет текста для хорошего контраста */
}

.askeza__menu-content {
	width: 100%;
	padding: 30px;
	height: 100vh;
	background: #E8F6F3; /* Светло-голубой пастельный фон */
}

.menu__title {
	font-size: 30px;
	font-family: "Nunito", serif;
	padding: 15px 0;
	font-weight: 700;
	margin-bottom: 10px;
	color: #2C3E50; /* Тёмно-синий цвет заголовка */
}

.account__settings-btn:after {
	content: '';
	width: 100%;
	height: 1px;
	background: #2C3E50; /* Тёмно-синяя линия под кнопкой */
	bottom: 0;
	left: 0;
	position: absolute;
}

.menu__btn-wrapper {
	padding: 5px 0;
}
</style>
