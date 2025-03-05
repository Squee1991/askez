<template>
	<footer class="footer">
		<div class="content__bottom">
			<div class="profile__icon-wrapper">
				<button class="footer__nav-btn"
				        :class="{ 'active-effect': activeIcon === 0 , 'active-color' : activeColor === 0 }"
				        @click="handleClick(0)">
					<svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill="currentColor" fill-rule="evenodd"
						      d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
					</svg>
				</button>
			</div>
			<div class="button__add-goal">
				<button @click="toggleHabitGoalHandler" class="goal__btn">
					<img src="assets/images/addTask.svg" alt="" class="goal__btn-icon"/>
				</button>
			</div>
			<div class="profile__icon-wrapper">
				<button
					class="footer__nav-btn"
					:class="{ 'active-effect': activeIcon === 1 , 'active-color' : activeColor === 1 }"
					@click="handleClick(1)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px" height="25px">
						<path
							d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"
							fill="currentColor"/>
					</svg>
				</button>
			</div>
		</div>
	</footer>
</template>

<script setup>
	const isButtonActive = ref(false);
	import {defineEmits} from 'vue';
	import {useRouter} from 'vue-router'
	const emit = defineEmits(['toggleHabit']);
	const router = useRouter()
	const activeIcon = ref(null);
	const activeColor = ref(null)

	const handleClick = (index) => {
		activeIcon.value = index;
		activeColor.value = index;
		setTimeout(() => {
			router.push(index === 0 ? "/menu" : "/welcomePage");
			activeIcon.value = null;
		}, 200);
	};

	onMounted(() => {
		const saveColor = localStorage.getItem('activeColor');
		if (saveColor !== null) {
			activeColor.value = Number(saveColor);
		}
	});
	const toggleHabitGoalHandler = () => {
		isButtonActive.value = true
		console.log('btn in footer');
		emit('toggleHabit');
	};

	watch(activeColor, (newVal) => {
		localStorage.setItem('activeColor', newVal);
	});

</script>

<style>
	.footer__nav-btn {
		background: none;
		border: none;
		color: #bfbfbf;
	}

	.profile__icon-wrapper {
		position: relative;
		border-radius: 50%;
		padding: 15px;
		color: #bfbfbf;
		transition: .3s;
	}

	.footer__nav-btn.active-color {
		color: #50C878;
		transform: scale(1.2);
		transition: .3s;
	}

	.footer__nav-btn:before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: .3s;
		filter: blur(2px);
	}

	.footer__nav-btn.active-effect:before {
		width: 95px;
		height: 95px;
		opacity: 1;
	}

	.content__bottom {
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: var(--footer-bg);
		padding: 5px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.goal__btn {
		width: 40px;
		height: 40px;
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
