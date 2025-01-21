<template>
	<footer class="footer">
		<div class="content__bottom">
			<div class="profile__icon-wrapper">
				<NuxtLink to="/settings">
					<img src="assets/images/setings.svg" alt="" class="profile__icon-item">
				</NuxtLink>
			</div>
			<div class="button__add-goal">
				<button @click="toggleHabitGoalHandler"
				        class="goal__btn">
					<img src="assets/images/addTask.svg" alt="" class="goal__btn-icon"/>
				</button>
			</div>
			<div class="profile__icon-wrapper">
				<NuxtLink to="/welcomePage">
					<img src="assets/images/home.svg" alt="" class="profile__icon-item">
				</NuxtLink>
			</div>
		</div>
	</footer>
</template>


<script setup>
	const isButtonActive = ref(false);
	import {defineEmits} from 'vue';

	const emit = defineEmits(['toggleHabit']);
	const toggleHabitGoalHandler = () => {
		isButtonActive.value = true
		console.log('btn in footer');
		emit('toggleHabit');
	};
</script>

<style>

	.content__bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #d6dcec;
		padding: 10px 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.profile__icon-item {
		width: 25px;
	}

	.goal__btn {
		width: 50px;
		height: 50px;
		padding: 10px;
		border-radius: 50%;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #5bbd83;
		color: white;
		font-size: 16px;
		font-family: "Nunito", serif;
	}

	.goal__btn-icon {
		width: 40px;
		height: 40px;
	}
</style>
