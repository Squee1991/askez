<template>
	<div class="askeza__settings">
		<div class="askeza__settings-content">
			<div class="settings__title">Settings</div>
			<div class="settings__btn-wrapper">
				<NuxtLink to="/account">
					<button class="account__settings-btn">
						Account settings
					</button>
				</NuxtLink>
			</div>
			<div class="settings__btn-wrapper">
				<NuxtLink>
					<button class="account__settings-btn">
						About app
					</button>
				</NuxtLink>
			</div>
			<div class="settings__btn-wrapper">
				<NuxtLink>
					<button class="account__settings-btn">
						Language
					</button>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: 'footerlayout'
	})
</script>

<style scoped>

	.askeza__settings-content {
		width: 100%;
		padding: 30px;
	}

	.settings__title {
	    font-size: 30px;
		font-family: "Nunito", serif;
		padding: 15px;
		margin-bottom: 10px;
	}

	.account__settings-btn {
		border: none;
		width: 100%;
		padding: 15px;
		font-size: 18px;
		border-radius: 10px;
		font-family: "Nunito", serif;
		font-weight: 700;
		text-align: start;
	}

	.settings__btn-wrapper {
		padding:  10px 0;
	}
</style>