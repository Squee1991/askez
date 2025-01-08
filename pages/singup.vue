<template>
	<div class="form">
		<div class="form__title">Sing Up</div>
		<div class="form__field-inner">
			<div v-for="field in data.fields" :key="field.id" class="form__field">
				<span class="form__label"> {{ field.label}}</span>
				<v-fields
					:field="field"
					v-model="field.value"
					:placeholder="field.placeholder"
				/>
			</div>
			<button @click="submitForm" class="form__btn"> sing up </button>
		</div>
	</div>
</template>

<script setup>
	import VFields from '../src/components/v-fields.vue'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useHabitStore  } from '../stores/habitStore.js'
	const habitStore = useHabitStore()

	const router = useRouter()
	const datafromFields = ref([])
	const data = ref({
		fields: [
			{
				id: 1,
				name: "name",
				type: "text",
				label: "Name",
				placeholder: "name",
				value: "",
				error: null
			},
			{
				id: 2,
				email: "Email",
				type: "Email",
				label: "Email",
				placeholder: "email",
				value: "",
				error: null
			},
			{
				id: 3,
				name: "password",
				type: "password",
				label: "Password",
				placeholder: "password",
				value: "",
				error: null
			}
		],
	})

	const submitForm = () => {
		const allFieldsFilled = data.value.fields.every((field) => field.value.trim() !== "");
		if (!allFieldsFilled) {
			alert('empty')
			return
		}

		const nameField = data.value.fields.find((field) => field.name === "name");
		if (nameField) {
			habitStore.setUsername(nameField.value);
			router.push('/welcomePage');
		}
	};

</script>

<style >
	.form {
		width: 100%;
		height: 100vh;
		background: #9ed79e;
		background-image: url("/assets/images/formbg.webp");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.form__title {
		padding: 40px 0 0 20px;
		font-size: 35px;
		font-weight: bold;
		color: #515ba7;
	}

	.form__field-inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20px;
		margin-bottom: 50px;
	}

	.form__btn {
		margin-top: 30px;
		width: 100%;
		padding: 15px;
		border: none;
		font-size: 18px;
		border-radius: 10px;
		color: white;
		font-weight: 600;
		background-color: #515ba7;
		opacity: 80%;
	}

    .form__label {
	    font-weight: 600;
    }
</style>
