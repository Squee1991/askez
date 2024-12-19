<!--<template>-->
<!--	<div :class="{ 'is-open': isMenuOpen }" class="menu">-->
<!--		<nav class="nav">-->
<!--			<div class="burger">-->
<!--				<button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">-->
<!--					☰-->
<!--				</button>-->
<!--			</div>-->
<!--			<ul class="nav__list">-->
<!--				<li @click="menuTarget($event)" v-for="item in data.items" :key="item.id" class="nav__list-item">-->
<!--					<a href="#" class="nav__list-link">{{ item.text }}</a>-->
<!--				</li>-->
<!--			</ul>-->
<!--		</nav>-->
<!--	</div>-->
<!--</template>-->

<!--<script setup>-->
<!--	import {ref} from 'vue'-->

<!--	const data = ref({-->
<!--		items: [-->
<!--			{id: 1, text: 'Главная'},-->
<!--			{id: 2, text: 'О сайте'},-->
<!--			{id: 3, text: 'Привычки'},-->
<!--			{id: 4, text: 'Контакты'},-->
<!--		]-->
<!--	})-->
<!--	const isMenuOpen = ref(false)-->

<!--	const toggleMenu = (event) => {-->
<!--		isMenuOpen.value = !isMenuOpen.value-->
<!--		console.log(event.target)-->
<!--	}-->

<!--	const menuTarget = (event) => {-->
<!--		console.log(event.target)-->
<!--	}-->
<!--</script>-->

<!--<style scoped>-->

<!--	* {-->
<!--		padding: 0;-->
<!--		margin: 0;-->
<!--		box-sizing: border-box;-->
<!--	}-->

<!--	a {-->
<!--		text-decoration: none;-->
<!--	}-->

<!--	li {-->
<!--		list-style-type: none;-->
<!--	}-->

<!--	.menu {-->
<!--		padding: 0 10px;-->
<!--		background-color: #a2c8e1;-->
<!--		height: 83px;-->
<!--		overflow: hidden;-->
<!--		transition: .5s;-->
<!--	}-->

<!--	.is-open {-->
<!--		height: 300px;-->
<!--		padding-bottom: 20px;-->
<!--		background-color: #b3c8e3;-->
<!--		transition: .5s;-->
<!--	}-->

<!--	.nav__list-link {-->
<!--		color: white;-->
<!--		font-size: 25px;-->
<!--		font-family: 'Roboto', sans-serif;-->
<!--	}-->

<!--	.nav__list-item {-->
<!--		padding: 10px;-->
<!--		width: 100%;-->
<!--		transition: .3s;-->
<!--		text-align: center;-->
<!--	}-->

<!--	.nav__list-item:hover {-->
<!--		background-color: #c3d8f3;-->
<!--		transition: .3s;-->
<!--	}-->

<!--	.menu-toggle {-->
<!--		padding: 10px 15px;-->
<!--		border: none;-->
<!--		background-color: #c3d8f3;-->
<!--		color: white;-->
<!--		font-size: 32px;-->
<!--	}-->

<!--	.burger {-->
<!--		width: 100%;-->
<!--		padding: 10px 0;-->
<!--	}-->
<!--</style>-->
