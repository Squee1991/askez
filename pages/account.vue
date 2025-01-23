<template>
	<div class="account__wrapper">
		<div class="account__content">
			<HeaderWithback title="Account"/>
			<div class="account__fields">
				<div v-for="field in data.fields" :key="field.id" class="account__field">
					<span class="field__label"> {{ field.label}}</span>
					<VFields
						:field="field"
						v-model="field.value"
					/>
				</div>
			</div>
			<button @click="changeData" class="account__btn">Update</button>
		</div>
	</div>
</template>
<script setup>
	import HeaderWithback from '../src/components/headerWithBack.vue'
	import {ref, onMounted} from 'vue';
	import VFields from '/src/components/v-fields.vue';
	import {useHabitStore} from '../stores/habitStore.js';

	definePageMeta({
		layout: 'footerlayout',
	});

	const habitStore = useHabitStore();
	import {useRouter} from 'vue-router'

	const router = useRouter()
	const data = ref({
		fields: [
			{
				id: 1,
				name: "name",
				type: "text",
				label: "Name",
				placeholder: "Enter your name",
				value: "",
				error: false,
			},
			{
				id: 2,
				name: "email",
				type: "email",
				label: "Email",
				placeholder: "Enter your email",
				value: "",
				error: false,
			},
			{
				id: 3,
				name: "password",
				type: "password",
				label: "Password",
				placeholder: "Enter your password",
				value: "",
				error: false,
			},
			{
				id: 4,
				name: "password",
				type: "password",
				label: "Password",
				placeholder: "Enter your password",
				value: "",
				error: false,
			},
		],
	});
	onMounted(() => {
		habitStore.loadUserData();
		data.value.fields.forEach((field) => {
			if (field.name === "name") field.value = habitStore.username;
			if (field.name === "email") field.value = habitStore.email;
			if (field.name === "password") field.value = habitStore.password;
		});
	});

	const changeData = () => {
		let updatedData = {};
		data.value.fields.forEach((field) => {
			if (field.name === "name") updatedData.name = field.value;
			if (field.name === "email") updatedData.email = field.value;
			if (field.name === "password") updatedData.password = field.value;
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
		background: #bbe3bb;
		height: 100vh;
	}

	.account__btn {
		margin-top: 20px;
		width: 100%;
		border: none;
		padding: 15px;
		border-radius: 10px;
		font-size: 20px;
	}

	.field__label {
		color: #666666;
	}
</style>