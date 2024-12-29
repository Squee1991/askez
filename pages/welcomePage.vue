<template>
	<div class="welcome">
		<div class="user__greetings">
			<div class="title">Hello, </div>
			<div class="user__name"> {{ username }} </div>
		</div>
	</div>
</template>

<script setup>
	import { useRoute } from "vue-router";
	import { ref, onMounted } from 'vue';
	const route = useRoute();
	const username = route.query.username;

</script>

<style>
	.welcome {
		width: 100%;
		background: linear-gradient(135deg, #A8E6CF, #56B870);
		height: 100vh;
	}

	.title {
		font-size: 2.5rem;
		color: black;
		font-family: "Nunito", serif;
	}

	.user__name {
		font-size: 24px;
	}

	.user__greetings {
		display: flex;
		align-items: center;
	}
</style>
