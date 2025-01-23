<template>
	<div class="settings__wrapper">
		<HeaderWithBack :title="settings.title" />
		<div class="settings__btns">
			<div
				v-for="item in settings.items"
				:key="item.id"
				class="menu__btn-wrapper"
			>
				<button class="account__settings-btn">
					<span class="accoun__text">{{ item.text }}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import HeaderWithBack from '../src/components/headerWithBack.vue';
	const settings = ref([]);
	onMounted(async () => {
		const response = await fetch('/dataListJSON.json');
		const data = await response.json();
		settings.value = data.settings;
	});
</script>

<style scoped>
	.settings__wrapper {
		padding: 25px;
		height: 100vh;
		width: 100%;
	}


	.menu__btn-wrapper {
		padding: 10px 0;
	}

	.account__settings-btn {
		background: none;
		border: none;
		padding: 10px 0;
		width: 100%;
		font-size: 18px;
		font-weight: 600;
		font-family: "Nunito", serif;
		text-align: start;
		border-radius: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		cursor: pointer;
	}
	
	.accoun__text {
		font-size: 16px;
		color: #333;
	}
</style>
