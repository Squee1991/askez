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
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import VFields from '../src/components/v-fields.vue'

	const datafromFields = ref([])

	const submitForm = () => {
		const allFieldsFilled = data.value.fields.every((field) => field.value.trim() !== "");
		if (!allFieldsFilled) {
			alert('empty')
			return
		}

		const nameField = data.value.fields.find((field) => field.name === "name");
		if (nameField) {
			router.push(`/welcomePage?username=${encodeURIComponent(nameField.value)}`);
		}
	};

    const router = useRouter()
	const data = ref({
		fields: [
			{
				id: 1,
				text: '',
				name: "name",
				type: "text",
				label: "Name",
				placeholder: "name",
				value: "",
				error: null
			},
			{
				id: 1,
				text: '',
				email: "Email",
				type: "Email",
				label: "Email",
				placeholder: "email",
				value: "",
				error: null
			},
			{
				id: 1,
				text: '',
				name: "password",
				type: "password",
				label: "Password",
				placeholder: "password",
				value: "",
				error: null
			}
		],
	})
</script>

<style >
	.form {
		width: 100%;
		height: 100vh;
		background-image: url("/assets/images/formbg.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;

	}
	input {
		border: 2px solid red;
		padding: 10px;
		font-size: 16px;
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
