<template>
	<footer class="footer">
		<div class="footer__inner">
			<div class="content__bottom">
				<div class="profile__icon-wrapper">
					<button class="footer__nav-btn"
					        :class="{ 'active-effect': activeIcon === 0 , 'active-color' : activeColor === 0 }"
					        @click="handleClick(0)">
						<svg clip-rule="evenodd" fill-rule="evenodd" height="25" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 1.70666 1.70666" width="25" xmlns="http://www.w3.org/2000/svg"><g id="Layer_x0020_1"><g id="_365995824" fill="currentColor"><circle id="_365996400" cx=".14" cy=".393" r=".14"/><rect id="_365996280" height=".281" rx=".14" width="1.285" x=".421" y=".253"/><circle id="_365996184" cx=".14" cy=".853" r=".14"/><rect id="_365996064" height=".281" rx=".14" width="1.285" x=".421" y=".713"/><circle id="_365995968" cx=".14" cy="1.314" r=".14"/><rect id="_365995872" height=".281" rx=".14" width="1.285" x=".421" y="1.173"/></g></g></svg>
						<span class="footer__nav-btn-text">{{ $t('footerBtnText.menu')}}</span>
					</button>
				</div>
				<div class="profile__icon-wrapper">
					<button class="footer__nav-btn"
					        :class="{ 'active-effect': activeIcon === 1 , 'active-color' : activeColor === 1 }"
					        @click="handleClick(1)">
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25"
								 height="25" x="0" y="0" viewBox="0 0 100 100"
								 style="enable-background:new 0 0 512 512" xml:space="preserve"
								 class=""><g><g fill="#176ecc">
    <path d="M30.825 18.725v72.92L2.5
    81.284V8.356zM63.641 8.822v72.242L35.671
    91.3V18.725zM97.5 18.725v72.92L69.519 81.407V8.488z"
					fill="currentColor" opacity="1" data-original="#176ecc" class="">

    </path></g></g></svg>
						<span class="footer__nav-btn-text">{{ $t('footerBtnText.journey')}}</span>
					</button>
				</div>
				<div class="profile__icon-wrapper">
					<div class="plus__icon-border">
						<button class="footer__nav-btn__plus"
						        @click="toggleHabitGoalHandler">
							<img src="assets/images/addTask.svg" alt="" class="goal__btn-icon-plus"/>
						</button>
					</div>
				</div>
				<div class="profile__icon-wrapper">
					<button class="footer__nav-btn"
					        :class="{ 'active-effect': activeIcon === 2 , 'active-color' : activeColor === 2 }"
					        @click="handleClick(2)">
						<svg id="Layer_1" enable-background="new 0 0 510 510" height="25" viewBox="0 0 510 510" width="25" xmlns="http://www.w3.org/2000/svg"><g><g id="wink__laughing" fill="currentColor"><path d="m415.9 404.8c-31.2 21.8-66.5 33.1-103.8 38.4-18.9 2.7-38 3.8-56.9 5.6-38.9-1.4-77.1-6.3-113.6-19.9-35.9-13.3-67.2-33-88.2-66.2-15.4-23.9-21-50.5-19.4-78.7 1.9-34.3 10.4-67 27.2-97 35.5-63.4 89.1-100.5 161.5-110 32.4-4.5 65.3-2.3 96.8 6.2 55.3 15.2 97.1 48.1 125.9 97.3 19.4 32.9 30 70.3 30.8 108.5 1.1 49.7-20.2 87.8-60.3 115.8z" fill="none"/><path d="m490.5 247.8c-4.4-24.1-12.8-46.8-24.3-68.7-.8-1.5-.4-3.4.8-4.5 1.8-1.5 3.4-3 5-4.6 10.3-9.8 17.8-21.4 20.1-35.5 4.3-25.7-4.7-47.6-21.1-66.7-13.7-15.9-30.8-25.8-52.5-24.3-22.6 1.6-39.5 14-53 31.3-2.7 3.4-4.6 3.8-8.2 2-25.3-11.7-52-17.7-79.6-20-43.7-3.5-85.8 2.5-126.2 20.3-1.4.6-4.1-.3-5.3-1.4-6.3-5.9-11.6-12.8-18.4-18-14.3-11-30.5-17-48.8-13.4-24.7 4.9-40.9 20.8-52.2 42.3-16.9 31.7-11.4 62.8 15.2 86.2 3.2 2.8 2.8 4.8 1.1 8-16.9 32.1-26.4 67.5-27.9 103.8-2.4 55.9 19.5 100.1 64.3 133 37.8 27.8 81.4 40.4 127.3 46.2 34.8 4.3 70 4 104.7-1.1 36.1-5.3 70.5-15.4 102.2-33.9 29.9-17.6 53.7-41 68.3-73 16-35.1 15.2-71.4 8.5-108zm-74.6 157c-31.2 21.8-66.5 33.1-103.8 38.4-18.9 2.7-37.9 3.8-56.9 5.6-38.9-1.4-77.1-6.3-113.6-19.9-35.9-13.3-67.2-33-88.2-66.2-15.4-23.9-21-50.5-19.4-78.7 1.9-34.3 10.4-67 27.2-97 35.5-63.4 89.1-100.5 161.5-110 32.4-4.4 65.3-2.3 96.9 6.3 55.3 15.2 97.1 48 125.9 97.3 19.4 32.9 30 70.3 30.8 108.5 1 49.6-20.3 87.7-60.4 115.7z" fill="currentColor"/><path d="m162.7 180.9c-51.7 5.2-86.3 59.7-70 109.2 6.9 21.1 24.7 34.1 45.4 33.6 3.5-.4 7.2-.3 10.6-1.2 38-10.5 63.5-34.7 72.9-72.8 10.7-43.6-20.4-72.7-58.9-68.8zm34.2 73.5c-8-12.2-20.5-20.1-34.7-20.1s-26.7 7.9-34.7 20.1c-.4.6-1.1.7-1.7.3-.4-.3-.6-.8-.5-1.3 3.1-24.1 18.4-42.4 36.9-42.4s33.8 18.3 36.9 42.4c.1.7-.3 1.3-1 1.4-.4.2-.9 0-1.2-.4z" fill="currentColor"/><path d="m420.3 252.2c-5.2-36.2-29.9-63.3-64.1-70.2-44.4-9-77.5 23.4-67 67.4 8.9 37.3 33.9 61.4 70.4 72.4 15.1 4.6 30.4 2.2 42.9-8.4 14.1-12 19.1-28.1 19.4-46.2-.6-4.9-.9-10-1.6-15zm-37.7 2.2c-8-12.2-20.5-20.1-34.7-20.1s-26.7 7.9-34.7 20.1c-.4.6-1.1.7-1.7.3-.4-.3-.6-.8-.5-1.2 3.1-24.1 18.4-42.4 36.9-42.4s33.8 18.3 36.9 42.4c.1.7-.3 1.3-.9 1.5-.5 0-1-.2-1.3-.6z" fill="currentColor"/><path d="m196.4 347.7c-.1-4.1 4.4-6.7 8.2-5.2 14.8 5.8 31.9 10.9 50.3 10.9s35.6-5 50.3-10.9c3.8-1.5 8.2 1.1 8.2 5.2 0 .3 0 .6-.1.9-4.4 28.3-28.9 44.6-58.4 44.6s-54.1-16.3-58.4-44.6c0-.3-.1-.6-.1-.9z" fill="currentColor"/><path d="m290.9 293.6c0 17.6-20.1 35.9-36 35.9s-36-18.3-36-35.9 16.1-20.4 36-20.4 36 2.8 36 20.4z"/></g></g></svg>
						<span class="footer__nav-btn-text">{{ $t('footerBtnText.panda')}}</span>
					</button>
				</div>
				<div class="profile__icon-wrapper">
					<button class="footer__nav-btn"
					        :class="{ 'active-effect': activeIcon === 3 , 'active-color' : activeColor === 3 }"
					        @click="handleClick(3)">
						<svg id="Capa_1" enable-background="new 0 0 555.82 555.82" height="25" viewBox="0 0 555.82 555.82" width="25" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g><g><g id="_x30_7_test_3_"><g><path d="m441.387 49.043h-70.404c-11.008-28.663-38.799-49.043-71.276-49.043h-43.594c-32.477 0-60.268 20.38-71.276 49.043h-70.404c-17.982 0-32.695 14.713-32.695 32.695v441.387c0 17.982 14.713 32.695 32.695 32.695h326.953c17.982 0 32.695-14.713 32.695-32.695v-441.387c.001-17.982-14.712-32.695-32.694-32.695zm-238.229 14.822c5.558-24.193 27.235-42.068 52.955-42.068h43.594c25.72 0 47.408 17.982 53.075 42.068.865 3.164 1.526 6.975 1.526 12.317v16.348h-152.687v-16.241c0-5.449.959-10.15 1.537-12.424zm249.127 459.26c0 5.994-4.904 10.898-10.898 10.898h-326.953c-5.994 0-10.898-4.904-10.898-10.898v-441.387c0-5.994 4.904-10.898 10.898-10.898h65.5v5.449 27.246c0 5.994 4.904 10.898 10.898 10.898h174.375c5.994 0 10.898-4.904 10.898-10.898v-32.695h65.282c5.994 0 10.898 4.904 10.898 10.898z"/><path d="m251.972 171.323c-4.686-3.814-11.552-3.052-15.367 1.744l-35.965 45.011-24.086-24.086c-4.25-4.25-11.116-4.25-15.367 0-4.25 4.25-4.25 11.116 0 15.367l32.695 32.695c2.071 2.071 4.795 3.161 7.738 3.161h.654c3.052-.218 5.994-1.635 7.956-4.032l43.594-54.492c3.706-4.796 2.943-11.662-1.852-15.368z"/><path d="m386.895 201.621h-87.188c-5.994 0-10.898 4.904-10.898 10.898s4.904 10.898 10.898 10.898h87.188c5.994 0 10.898-4.904 10.898-10.898s-4.904-10.898-10.898-10.898z"/><path d="m251.972 269.409c-4.686-3.814-11.552-3.052-15.367 1.744l-35.965 45.011-24.086-24.086c-4.25-4.25-11.116-4.25-15.367 0-4.25 4.25-4.25 11.116 0 15.367l32.695 32.695c2.071 2.071 4.795 3.161 7.738 3.161h.654c3.052-.218 5.994-1.635 7.956-4.032l43.594-54.492c3.706-4.796 2.943-11.662-1.852-15.368z"/><path d="m386.895 299.707h-87.188c-5.994 0-10.898 4.904-10.898 10.898s4.904 10.898 10.898 10.898h87.188c5.994 0 10.898-4.904 10.898-10.898s-4.904-10.898-10.898-10.898z"/><path d="m251.972 367.495c-4.686-3.814-11.552-3.052-15.367 1.744l-35.965 45.011-24.086-24.086c-4.25-4.25-11.116-4.25-15.367 0-4.25 4.25-4.25 11.116 0 15.367l32.695 32.695c2.071 2.071 4.795 3.161 7.738 3.161h.654c3.052-.218 5.994-1.635 7.956-4.032l43.594-54.492c3.706-4.796 2.943-11.662-1.852-15.368z"/><path d="m386.895 397.793h-87.188c-5.994 0-10.898 4.904-10.898 10.898s4.904 10.898 10.898 10.898h87.188c5.994 0 10.898-4.904 10.898-10.898s-4.904-10.898-10.898-10.898z"/></g></g></g></g></svg>
						<span class="footer__nav-btn-text">{{ $t('footerBtnText.tasks')}}</span>
					</button>
				</div>
			</div>
		</div>
	</footer>
</template>
<script setup>
	import {useHabitStore} from "../../stores/habitStore";
	import {defineEmits, onMounted} from 'vue';
	import {useRouter} from 'vue-router'

	const emit = defineEmits(['toggleHabit']);
	const router = useRouter()
	const activeIcon = ref(null);
	const activeColor = ref(null)
	const habitStore = useHabitStore();
	const isButtonActive = ref(false);

	const handleClick = (index) => {
		activeIcon.value = index;
		activeColor.value = index;
		setTimeout(() => {
			if (index === 0) {
				router.push("/menu");
			} else if (index === 1) {
				router.push("/journey");
			} else if (index === 2) {
				router.push("/panda");
			} else {
				router.push("/welcomePage");
			}
			activeIcon.value = null;
		}, 200);
	};

	onMounted(() => {
		const routePath = router.currentRoute.value.path;
		if (routePath === '/menu') {
			activeColor.value = 0;
		} else if (routePath === '/journey') {
			activeColor.value = 1;
		} else if (routePath === '/panda') {
			activeColor.value = 2;
		} else {
			activeColor.value = 3;
		}
	});

	const toggleHabitGoalHandler = () => {
		router.push({path: '/welcomePage', query: {open: 'true'}});
		isButtonActive.value = true;
		emit('toggleHabit');
	};

</script>

<style>
	.footer__nav-btn__plus {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		background: #6378e1;
		border: none;
		width: 55px;
		height: 55px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.plus__icon-border {
		border: 3px solid var(--background-color);
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		background: var(--background-color);
		border-radius: 50%;
		width: 62px;
		height: 62px;
	}

	.goal__btn-icon-plus{
		width: 22px;
	}

	.footer__nav-btn {
		background: none;
		border: none;
		color: #bfbfbf;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
	}


	.profile__icon-wrapper {
		position: relative;
		border-radius: 50%;
		color: #bfbfbf;
		transition: .3s;
		width: 73px;
		display: flex;
		justify-content: center;
	}

	.footer__nav-btn-text {
		margin-top: 5px;
		font-size: 10px;
		font-family: "Nunito", sans-serif;
	}

	.footer__nav-btn.active-color {
		color: white;
		transform: scale(1.1);
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
		/*padding-bottom: env(safe-area-inset-bottom);*/
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer__inner {
		position: relative;
	}

	.decor {
		color: var(--footer-bg);
		position: absolute;
		left: -5px;
		bottom: 60px;
	}

	svg {
		color: currentColor;
	}
</style>
