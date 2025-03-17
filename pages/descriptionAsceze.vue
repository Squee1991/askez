<template>
	<div class="description">
		<NuxtLink to="/singup">
			<button class="next__btn">{{ $t("description.value")}}</button>
		</NuxtLink>
	</div>
</template>
<script setup>

	definePageMeta({
		middleware: ['auth'],
	})
</script>

<style>

</style>