<template>
	<div class="account__wrapper">
		<div class="account__content">
			<HeaderWithback :icon="Arrowicon" :title="$t('account.accoutTitle')"/>
			<div class="account__fields">
				<div v-for="field in data.fields" :key="field.id" class="account__field">
					<span class="field__label"> {{ field.label}}</span>
					<VFields
						:field="field"
						v-model="field.value"
					/>
				</div>
			</div>
			<button @click="changeData" class="account__btn">{{ $t('account.accountBtn')}}</button>
		</div>
	</div>
</template>
<script setup>
	import Arrowicon from '../assets/images/arrowSvg.svg'
	import HeaderWithback from '../src/components/headerWithBack.vue'
	import {ref, onMounted, computed} from 'vue';
	import VFields from '/src/components/v-fields.vue';
	import {useHabitStore} from '../stores/habitStore.js';
	import {useRouter} from 'vue-router'

	const habitStore = useHabitStore();
	const router = useRouter()
	const data = ref({
		fields: [
			{
				id: 1,
				name: "name",
				type: "text",
				label: "Name",
				placeholder: "",
				value: "",
				error: false,
			},
			{
				id: 2,
				name: "email",
				type: "email",
				label: "Email",
				placeholder: "",
				value: "",
				error: false,
				readonly:true
			},
		],

	});
	definePageMeta({
		middleware: ['auth'],
	})
	onMounted(() => {
		habitStore.loadUserData();
		data.value.fields.forEach((field) => {
			if (field.name === "name") field.value = habitStore.username;
			if (field.name === "email") field.value = habitStore.email;
		});
	});

	const changeData = () => {
		let updatedData = {};
		data.value.fields.forEach((field) => {
			if (field.name === "name") updatedData.name = field.value;
			if (field.name === "email") updatedData.email = field.value;
		});
		habitStore.updateUserData(updatedData);
		router.push("/welcomePage");
	};

</script>

<style scoped>

	.account__content {
		padding: 30px;
		display: flex;
		flex-direction: column;
	}

	.account__wrapper {
		background-color: var(--background-color);
		height: 100vh;
	}

	.account__btn {
		margin-top: 20px;
		width: 100%;
		border: none;
		padding: 15px;
		border-radius: 10px;
		font-size: 20px;
		background-color: var(--button-bg);
		color: var(--button-text-color);
		font-family: "Acme", serif;
	}

	.field__label {
		color: var(--text-color);
		font-family: "Acme", serif;
	}
</style>