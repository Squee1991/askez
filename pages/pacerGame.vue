<template>
	<div class="pacer-form">
		<div class="error__pacer"
		     :class="{'visible': isError }"
		>
			<div class="pacer__error-mgs"> {{ errorMessage }}</div>
		</div>
		<div class="pacer-form__inner">
			<div>
				<div v-for="field in fields" :key="field.id" class="pacer-form__field">
					<label class="pacer-form__label">
						<span>{{ field.label }}</span>
						<input
							:id="field.key"
							v-model="form[field.key]"
							:type="field.type"
							class="pacer-form__input"
						>
					</label>
				</div>
				<button @click="createActivity" class="pacer-form__button">Создать</button>
			</div>
			<div class="pacer__confidence" v-if="authStore.isPacerEnabled">
				{{ authStore.confidence }}
			</div>
		</div>
		<ul v-if="pacerStore.activities.length" class="pacer-list">
			<li v-for="pacer in pacerStore.activities" :key="pacer.id" class="pacer-list__item">
				<div class="pacer-list__field">
					<span class="pacer-list__label">Название:</span>
					<span class="pacer-list__value">{{ pacer.title }}</span>
				</div>
				<div class="pacer-list__field">
					<span class="pacer-list__label">Мера:</span>
					<span class="pacer-list__value">{{ pacer.amount }}</span>
				</div>
				<div class="pacer-list__field">
					<span class="pacer-list__label">Сложность:</span>
					<span class="pacer-list__value">{{ pacer.difficulty }}</span>
				</div>
				<button @click="pacerStore.removeActivity(pacer.id)" class="pacer-list__button-remove">Удалить</button>
			</li>
		</ul>

		<div v-else>
			<div class="pacer-form__empty-message">
				Нет созданных действий
			</div>
		</div>
	</div>

</template>

<script setup>
	import {makeActivityStore} from '../stores/pacerGameStore.js';
	import {useAuthStore} from '../stores/authStore.js';

	const authStore = useAuthStore()
	const pacerStore = makeActivityStore();
	const errorMessage = ref('111')
	const isError = ref(false)
	import {ref, onMounted} from 'vue';
	import {watch} from "../.nuxt/imports";

	const form = ref({
		title: '',
		amount: '',
		difficulty: 1
	});

	const fields = [
		{key: 'title', type: 'text', label: 'Название действия'},
		{key: 'amount', type: 'text', label: 'Мера'},
		{key: 'difficulty', type: 'text', label: 'Сложность'},
	];

	function showError(msg) {
		errorMessage.value = msg;
		isError.value = true;
		setTimeout(() => {
			isError.value = false;
		}, 2000);
	}

	const createActivity = async () => {
		if (!form.value.title || !form.value.amount || !form.value.difficulty) {
			showError('Заполните все поля!');
			return;
		}
		if (Number(form.value.difficulty) > authStore.confidence) {
			showError('Не хватает уверенности!');
			return;
		}

		 await pacerStore.addActivity(form.value.title, form.value.amount, form.value.difficulty);
	};


	watch(() => pacerStore.activities.length, () => {
		form.value = {
			title: '',
			amount: '',
			difficulty: 1
		};
	});

	onMounted(() => {
		pacerStore.loadActivities();
		authStore.isPacerEnabled

	});

</script>

<style scoped>

	.error__pacer {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: var(--footer-bg);
		height: 0;
		overflow: hidden;
		transition: .2s;
	}

	.pacer__error-mgs {
		text-align: center;
		padding: 10px;
		color: white;
		font-family: "Nunito", sans-serif;
		font-style: italic;
	}

	.error__pacer.visible {
		height: 40px;
		transition: .3s;
	}

	.pacer-form {
		padding: 30px;
		background-color: var(--background-color);
		color: var(--text-color);
		font-family: "Nunito", sans-serif;
	}

	.pacer__confidence {
		font-size: 21px;
		font-family: "Nunito", sans-serif;
		font-weight: bold;
		padding: 10px;
		border: 3px dashed #c29999;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pacer-form__empty-message {
		text-align: center;
		font-size: 18px;
		color: #aaa;
		padding: 20px;
		border: 2px dashed #ccc;
		border-radius: 10px;
	}

	.pacer-form__inner {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		margin-bottom: 20px;
		padding: 20px;
	}

	.pacer-form__field {
		margin-bottom: 10px;
		width: 100%;
	}

	.pacer-form__label {
		display: flex;
		flex-direction: column;
		font-size: 16px;
		color: var(--text-color);
	}

	.pacer-form__input {
		padding: 10px 15px;
		border: 2px solid #ddd;
		border-radius: 8px;
		margin-top: 3px;
		font-size: 16px;
		transition: border-color 0.3s ease;
	}

	.pacer-form__input:focus {
		border-color: orange;
		outline: none;
	}

	.pacer-form__button {
		width: 100%;
		padding: 13px 20px;
		background-color: var(--footer-bg);
		font-family: "Nunito", sans-serif;
		font-style: italic;
		font-weight: 600;
		color: white;
		border: none;
		border-radius: 30px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.pacer-form__button:active {
		background-color: #7777db;
	}

	.pacer-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.pacer-list__item {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 15px;
		margin-bottom: 10px;
		color: #333;
		font-size: 16px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	}

	.pacer-list__item div {
		margin-bottom: 8px;
	}

	.pacer-list__button-remove {
		background-color: #e84e4e;
		color: white;
		border: none;
		border-radius: 8px;
		padding: 8px 16px;
		font-size: 14px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.pacer-list__button-remove:hover {
		background-color: #c0392b;
	}

	.pacer-list__field {
		display: flex;
		align-items: center;
		margin-bottom: 6px;
	}

	.pacer-list__label {
		font-weight: bold;
		margin-right: 8px;
		color: #555;
	}

	.pacer-list__value {
		color: #222;
	}

</style>