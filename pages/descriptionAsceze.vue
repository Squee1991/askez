<template>
	<div class="description">
		<NuxtLink :to="localePath('/singup')">
			<button class="next__btn">{{ $t("description.value")}}</button>
		</NuxtLink>
	</div>
</template>
<script setup>
	import { useLocalePath } from '#i18n';
	const localePath = useLocalePath()
</script>

<style>

	.description {
		background-image: url("../assets/images/bgPandaDescription.png");
		width: 100%;
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
	}

	.next__btn {
		opacity: 95%;
		width: 50%;
		border-radius: 12px;
		position: absolute;
		border: none;
		padding: 10px 15px;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		background-color: #88c057;
		font-weight: bold;
		font-size: 19px;
		color: #ffffff;
		margin-bottom: 20px;
	}
</style>