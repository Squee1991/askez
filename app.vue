<template>
	<NuxtLayout>
		<NuxtPage/>
	</NuxtLayout>
</template>

<script setup>
	import './assets/styles/global.css'


</script>

<style src="assets/styles/variables.css">
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
	}
	body {
		margin: 0;
		background-color: var(--background-color);
		color: var(--text-color);
	}

	html {
		color: var(--text-color);
	}

	button {
		--btn-color: #00BCD4;
	}
</style>
