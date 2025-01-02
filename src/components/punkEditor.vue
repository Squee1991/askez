<template>
	<div @click="toggleMenu" class="edit__wrapper">
		<div class="dots"></div>
	</div>
	<div v-if="isOpen" class="btns__inner">
		<div @click="toggleMenu"  v-for="btn in editBtns" class="buttons__wrapper">
			<button class="edit__btn"> {{ btn.value }}</button>
		</div>
	</div>


</template>

<script setup>

	import {ref, defineProps} from 'vue'

	const props = defineProps({
		value : {
			type : String,
			default: '',
			required: true
		}
	})

	const isOpen = ref(false)

	const toggleMenu = () => {
		isOpen.value = !isOpen.value
	}

	const editBtns = ref([
		{id: 1, value: 'Egit'},
		{id: 2, value: 'Delete'},
	])

</script>

<style scoped>

	.buttons__wrapper {
		padding: 6px;
	}

	.edit__btn {
		border: none;
		color: #838383;
		background: none;
		font-size: 15px;
		font-weight: 600;
		font-family: "Nunito", serif;
	}

	.dots:before {
		top: 150%;
		left: 0;
		content: "";
		position: absolute;
		width: 4px;
		height: 4px;
		background: black;
		border-radius: 50%;
	}

	.btns__inner {
		position: absolute;
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 79px;
		height: 60px;
        background: white;
		padding: 5px;
		border-radius: 5px;
	}

	.dots:after {
		content: "";
		bottom: 150%;
		left: 0;
		position: absolute;
		width: 4px;
		height: 4px;
		background: black;
		border-radius: 50%;
	}

	.dots {
		width: 4px;
		height: 4px;
		font-weight: bold;
		background: black;
		position: relative;
		margin: 10px 0;
		border-radius: 50%;
	}

	.edit__wrapper {
		width: 20px;
		height: 20px;
		padding: 15px 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
</style>