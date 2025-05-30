<template>
	<div class="layout safe-area-top">
		<div class="container">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	import {onMounted} from 'vue'

	import {useRouter} from 'vue-router'

	if (!window.__greetingReset) {
		sessionStorage.removeItem('greeted')
		window.__greetingReset = true
	}

	const user = useCurrentUser()
	const router = useRouter()
	const route = useRoute()

	onMounted(() => {
		watch(user, (user, prevUser) => {
			if (prevUser && !user) {
				// Пользователь вышел из системы → перенаправляем на /login
				router.push('/singup')
			} else if (user && typeof route.query.redirect === 'string') {
				// Пользователь вошел в систему → перенаправляем на страницу, с которой он пришел
				router.push(route.query.redirect)
			}
		})
	})

	</script>


<style>

	body {
		background: var(--background-color);
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

	a {
		text-decoration: none;
		display: flex;
		align-items: center;
	}

	li {
		list-style-type: none;
	}

	.container {
		width: 100%;
		margin: 0 auto;
		min-height: 100vh;
	}

	.safe-area-top {
		padding-top: env(safe-area-inset-top, 24px);
	}


</style>