<template>
	<div class="tabelle__wrapper">
		<div class="tabelle">
			<div @click="sortingById" class="title user__name">id</div>
			<div @click="sortingByTitle" class="title user__title">title</div>
			<div class="title user__age">completed</div>
		</div>
		<div v-for="(user, index) in paginationsUsers" :key="index" class="added__info">
			<div class="added added__user-name">{{ user.id }}</div>
			<div class="added added__user-email">{{ user.title }}</div>
			<div class="added added__user-age">{{ user.completed }}</div>
		</div>
	</div>
	<div class="tabelle__pagination">
		<div
			:class="{ 'selected': page === pageNumber }"
			@click="pageClick(page)" v-for="page in pages "
			class="tabelle__page">
			{{ page }}
		</div>
	</div>
	<input v-model="localValue" type="text">
	<div v-for="(value, index) in values" :key="index">
		<span>{{ value }}</span>
		<button @click="deleteItem(index)"> delete item</button>
	</div>
	<button @click="addValue">add</button>
	<button @click="clearValues">clear all</button>
</template>

<script setup>
	import {ref, computed, onMounted} from 'vue';

	const users = ref([]);
	const usersPerpage = ref(10)
	const pageNumber = ref(1)
	const posts = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos')
		const data = await response.json();
		users.value = data;
	}

	const sortingByTitle = () => {
		return users.value.sort((a, b) => a.title.localeCompare(b.title))
	}

	const sortingById = () => {
		return users.value.sort((a, b) => a.id - b.id)
	}

	const pageClick = (page) => {
		pageNumber.value = page
	}

	onMounted(() => {
		posts()
	})

	const pages = computed(() => {
		return Math.ceil(users.value.length / usersPerpage.value)
	})

	const paginationsUsers = computed(() => {
		let from = (pageNumber.value - 1) * usersPerpage.value
		let to = from + usersPerpage.value
		return users.value.slice(from, to)
	})


	const localValue = ref('')
	const values = ref([])


	const deleteItem = (index) => {
		values.value.splice(index, 1)
		localStorage.setItem('values', JSON.stringify(values.value));
	}

	const addValue = () => {
		if (localValue.value) {
			values.value.push(localValue.value)
			localStorage.setItem('values' , JSON.stringify(values.value))
			localValue.value = ''
		}
	}

	const clearValues = () => {
		values.value = [];
		localStorage.removeItem('values');
	};


</script>

<style>
	.tabelle__page:hover {
		background: grey;
	}

	.selected {
		background: grey;
	}

	.tabelle__wrapper {
		width: 100%;
	}

	.tabelle {
		justify-content: space-between;
		display: flex;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.title {
		font-size: 35px;
	}

	.added__info {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		padding: 20px;
	}

	.added {
		font-size: 25px;
	}

	.tabelle__page {
		border: 1px solid black;
		padding: 10px 15px;
		margin: 4px;
	}

	.tabelle__pagination {
		display: flex;
		justify-content: center;
		margin-bottom: 70px;
	}
</style>
