<template>
	<div class="menu">
		<div class="container">
			<div class="menu__inner">
				<div class="logo">
					<img class="logo__icon" :src="Logo" alt="">
				</div>
				<nav class="nav">
					<ul class="nav__list">
						<li v-for="item in data.items" :key="item.id" class="nav__list-item">
							<a href="#" class="nav__list-link">{{ item.text }}</a>
						</li>
					</ul>
				</nav>
				<div class="auths__wrapper">
					<div class="login__icon-wrapper">
						<img class="auths__login" :src="LoginIcon" alt="">
					</div>
					<button class="auths__btn-item"> {{ data.btn.text}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>

	import Logo from '/assets/images/logo-type.png'
	import {ref} from 'vue'

	import LoginIcon from '/assets/images/login.png'

	const data = ref({
		logo: {
			text: 'Logo'
		},
		btn: {
			text: 'log-in'
		},
		items: [
			{id: 1, text: 'Главная'},
			{id: 2, text: 'Мои аскезы'},
			{id: 3, text: 'Сообщество'},
			{id: 4, text: 'Дневник'},
			{id: 4, text: 'Профиль'},
		]
	})

</script>

<style scoped>

	.nav__list {
		display: flex;
		justify-content: center;
	}

	.menu__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#FFF4E6;
	}

	.nav {
		margin-left: 50px;
		display: flex;
		padding: 15px;
		justify-content: center;
	}

	.nav__list-link {
		padding: 10px 15px;
		font-size: 20px;
		color: black;
	}

	.logo {
		width: 100px;
		display: flex;
		justify-content: center;
	}

	.logo__icon {
		width: 100%;
	}

	.auths__btn-item {
		margin-right: 30px;
		padding: 1px;
		border: none;
		cursor: pointer;
		font-size: 22px;
        background: none;
		color: black;
	}

	.login__icon-wrapper {
		width: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.auths__login {
		width: 100%;
	}

	.auths__wrapper {
		display: flex;
	}

</style>
