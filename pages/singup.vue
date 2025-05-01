<template>
	<Transition name="network-fade" mode="out-in">
		<div v-if="!isOnline" key="offline" class="error__network">
			{{ $t('noConnetction.off') }}
		</div>
		<div v-else-if="isBackOnline" key="online" class="online__network">
			{{ $t('noConnetction.on') }}
		</div>
	</Transition>
	<Transition name="fade-slide">
		<div v-if="isReady" class="form">
			<div class="log__out-overlay" :class="{'overlay': confirmOverlay}"></div>
			<div v-if="confirmOverlay" class="logout__confirm">
				<div class="log__out-text">{{ $t('singInUP.confirm')}}</div>
				<div class="logout__btns">
					<button class="logout__btn yes-btn" @click="handleConfirm">OK</button>
				</div>
			</div>
			<div class="form__logo">
				<img class="form__logo-icon" src="../assets/images/logo.png" alt="Logo"/>
			</div>
			<transition name="fade-slide" mode="out-in">
				<div v-if="isAuthenticated" class="welcome-screen">
					<div class="form__title">
						{{ $t('accState.greetings') }}
						<span class="form__title-name">{{ authStore.name }}</span>
					</div>
					<button @click="goToMainPage" class="form__btn">{{ $t('accState.stateBtn') }}</button>
				</div>
				<div v-else class="form__field-inner" :key="isSignUp">
					<div v-for="field in filteredFields" :key="field.id" class="form__field">
						<v-fields
							:field="field"
							v-model="field.value"
							:placeholder="field.placeholder"
						/>
						<p v-if="field.error" class="form__error">{{ field.error }}</p>
					</div>
					<button
						@click.prevent="submitForm"
						class="form__btn"
						:disabled="isSubmitting || !isFormValid"
					>
					<span>
						{{ forgotPassword
							? $t('singInUP.reset')
							: isSignUp
								? $t('singInUP.singUpBtn')
								: $t('singInUP.singInBtn') }}
					</span>
					</button>
					<p class="toggle-text" @click="toggleAuthMode">
						{{ forgotPassword
						? $t('singInUP.backToSing')
						: isSignUp
						? $t('singInUP.singIn')
						: $t('singInUP.singUp') }}
					</p>
					<p
						v-if="!isSignUp && !forgotPassword"
						class="toggle-text"
						@click="enterForgotPasswordMode"
					>
						{{ $t('singInUP.forgotPassword') }}
					</p>
				</div>
			</transition>
		</div>
	</Transition>
</template>


<script setup>
	import {getAuth, onAuthStateChanged} from 'firebase/auth';
	import VFields from '../src/components/v-fields.vue';
	import {ref, computed, watch} from 'vue';
	import {useRouter} from 'vue-router';
	import {useValidationStore} from '../stores/validationStore.js';
	import {useAuthStore} from '../stores/authStore.js';
	import {onMounted} from "../.nuxt/imports";
	const isBackOnline = ref(false)
	const authStore = useAuthStore();
	const validationStore = useValidationStore();
	const router = useRouter();
	const isSignUp = ref(true);
	const isSubmitting = ref(false);
	const isAuthenticated = ref(false);
	const confirmOverlay = ref(false)
	const forgotPassword = ref(false);
	const isReady = ref(false)
	const data = ref({
		fields: [
			{
				id: 1,
				name: "name",
				type: "text",
				label: "Full Name",
				placeholder: "Enter your full name",
				value: "",
				error: false,
				required: true,
				maxlength: 15,
			},
			{
				id: 2,
				name: "email",
				type: "email",
				label: "Email Address",
				placeholder: "Enter your email",
				value: "",
				error: false,
				required: true
			},
			{
				id: 3,
				name: "password",
				type: "password",
				label: "Password",
				placeholder: "Enter your password",
				value: "",
				error: false,
				required: true
			},
			{
				id: 4,
				name: "confirm",
				type: "password",
				label: "Confirm Password",
				placeholder: "Confirm your password",
				value: "",
				error: false,
				required: true
			},
		]
	});

	const filteredFields = computed(() => {
		if (forgotPassword.value) {
			return data.value.fields.filter(f => f.name === 'email');
		}
		if (isSignUp.value) {
			return data.value.fields;
		}
		return data.value.fields.filter(f => f.name !== 'name' && f.name !== 'confirm');
	});

	const isFormValid = computed(() => filteredFields.value.every(f => !f.error && f.value.trim() !== ''));

	const isOnline = ref(true)

	const checkRealInternet = async () => {
		const wasOffline = !isOnline.value;

		if (!navigator.onLine) {
			isOnline.value = false;
			return;
		}

		try {
			await fetch('https://www.gstatic.com/generate_204', {
				method: 'GET',
				cache: 'no-cache',
				mode: 'no-cors',
			});

			if (wasOffline) {
				handleOnline();
			}

			isOnline.value = true;
		} catch (e) {
			isOnline.value = false;
		}
	};

	const handleOnline = () => {
		isOnline.value = true;

		setTimeout(() => {
			isBackOnline.value = true;

			setTimeout(() => {
				isBackOnline.value = false;
			}, 2500);
		}, 300);
	};

	window.addEventListener('online', handleOnline);

	window.addEventListener('offline', () => {
		isOnline.value = false;
	});

	const goToMainPage = () => {
		router.push('/welcomePage');
	};

	const handleConfirm = () => {
		confirmOverlay.value = false;
		isSignUp.value = false;
		forgotPassword.value = false;
		data.value.fields.forEach(field => {
			field.value = '';
			field.error = false;
		});
	};

	const enterForgotPasswordMode = () => {
		forgotPassword.value = true;
		isSignUp.value = false;
		data.value.fields.forEach(field => {
			field.value = '';
			field.error = false;
		});
	};

	const toggleAuthMode = () => {
		forgotPassword.value = false;
		isSignUp.value = !isSignUp.value;
		data.value.fields.forEach(field => {
			field.value = '';
			field.error = false;
		});
	};

	const submitForm = async () => {
		data.value.fields.forEach(field => {
			field.error = false;
		});

		if (forgotPassword.value) {
			const emailField = data.value.fields.find(f => f.name === 'email');
			if (!emailField?.value.trim()) return;

			try {
				isSubmitting.value = true;
				await authStore.resetPassword(emailField.value.trim());
				confirmOverlay.value = true;

			} catch (error) {
				const errorMessage = validationStore.getFirebaseError(error);
				emailField.error = errorMessage;
			} finally {
				isSubmitting.value = false;
			}
			return;
		}
		// const currentFields = isSignUp.value
		// 	? data.value.fields
		// 	: data.value.fields.filter(f => f.name !== 'name' && f.name !== 'confirm');
		//
		// const errors = validationStore.validateUsers(currentFields, isSignUp.value ? 'signUp' : 'signIn');
		// if (Object.keys(errors).length > 0) {
		// 	currentFields.forEach(field => {
		// 		if (errors[field.name]) {
		// 			field.error = errors[field.name];
		// 		}
		// 	});
		// 	return;
		// }
		const formData = {
			email: data.value.fields.find(f => f.name === 'email')?.value.trim() || '',
			password: data.value.fields.find(f => f.name === 'password')?.value.trim() || '',
			name: data.value.fields.find(f => f.name === 'name')?.value.trim() || '',
		};

		if (!formData.email || !formData.password) return;

		try {
			isSubmitting.value = true;
			if (isSignUp.value) {
				await authStore.registerUser(formData);
			} else {
				await authStore.loginUser(formData);
			}

			const auth = getAuth();
			const user = auth.currentUser;

			if (user) {
				authStore.name = user.displayName;
				isAuthenticated.value = true;
			} else {
				isAuthenticated.value = false;
			}
		} catch (error) {
			console.error(error);
			const errorMessage = validationStore.getFirebaseError(error);
			const emailField = data.value.fields.find(f => f.name === 'email');
			const passwordField = data.value.fields.find(f => f.name === 'password');
			if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/email-already-in-use') {
				emailField.error = errorMessage;
			} else if (error.code === 'auth/wrong-password') {
				passwordField.error = errorMessage;
			} else {
				passwordField.error = errorMessage;
			}

			isAuthenticated.value = false;
		} finally {
			isSubmitting.value = false;
		}
	};

	onMounted(() => {
		setTimeout(() => {
			isReady.value = true
		}, 200)
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				isAuthenticated.value = true;
				authStore.name = user.displayName;
			} else {
				isAuthenticated.value = false;
			}
		});
	});


	onMounted(() => {
		checkRealInternet()
		setInterval(checkRealInternet, 5000)
	})

	watch(() => data.value.fields.map(f => f.value), () => {
		data.value.fields.forEach(field => {
			field.error = false;
		});
	});


</script>
<style scoped>
	.network-fade-enter-active,
	.network-fade-leave-active {
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	.network-fade-enter-from,
	.network-fade-leave-to {
		opacity: 0;
		transform: translateY(-10px);
	}

	.error__network {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 15px;
		color: red;
		z-index: 100;
		font-size: 16px;
		text-align: center;
		font-weight: bold;
		margin-bottom: 10px;
		font-family: "Nunito", sans-serif;
	}

	.online__network {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		margin-top: 15px;
		color: #7bd44a;
		font-size: 16px;
		text-align: center;
		font-weight: bold;
		margin-bottom: 10px;
		font-family: "Nunito", sans-serif;
	}

	.logout__btns {
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}

	.logout__btn {
		background: none;
		border: none;
		color: #24ba1d;
		padding: 10px 20px;
		font-weight: bold;
		font-size: 19px;
		font-family: "Acme", serif;
	}

	.overlay {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		height: 100vh;
		background: black;
		opacity: 50%;
		z-index: 1;
	}

	.log__out-text {
		padding: 5px 0;
		color: #efe8e8;
		text-align: center;
	}

	.logout__confirm {
		width: 80%;
		background: #34364a;
		padding: 20px;
		border-radius: 15px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 40%;
		z-index: 100;
	}

	.loader {
		width: 100%;
		height: 22px;
		border-radius: 40px;
		color: #514b82;
		border: 2px solid;
		position: relative;
	}

	.loader {
		width: 0;
		height: 4.8px;
		display: inline-block;
		position: relative;
		background: #FFF;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
		box-sizing: border-box;
		animation: animFw 8s linear infinite;
	}

	.loader::after,
	.loader::before {
		content: '';
		width: 10px;
		height: 1px;
		background: #FFF;
		position: absolute;
		top: 9px;
		right: -2px;
		opacity: 0;
		transform: rotate(-45deg) translateX(0px);
		box-sizing: border-box;
		animation: coli1 0.3s linear infinite;
	}

	.loader::before {
		top: -4px;
		transform: rotate(45deg);
		animation: coli2 0.3s linear infinite;
	}

	@keyframes animFw {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes coli1 {
		0% {
			transform: rotate(-45deg) translateX(0px);
			opacity: 0.7;
		}
		100% {
			transform: rotate(-45deg) translateX(-45px);
			opacity: 0;
		}
	}

	@keyframes coli2 {
		0% {
			transform: rotate(45deg) translateX(0px);
			opacity: 1;
		}
		100% {
			transform: rotate(45deg) translateX(-45px);
			opacity: 0.7;
		}
	}

	.loading {
		font-size: 24px;
		text-align: center;
		font-weight: bold;
		color: var(--text-color);
		font-family: "Acme", serif;
		margin-bottom: 10px;
	}

	.form__title {
		padding: 10px 0;
		color: var(--text-color);
		font-size: 24px;
		font-family: Nunito, serif;
		text-align: center;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.form__title-name {
		color: #FF5722;
		font-size: 2.0rem;
		font-weight: bold;
		font-family: "Acme", serif;
	}

	.loading-screen {
		position: absolute;
		bottom: 10%;
		width: 100%;
		left: 0;
		padding: 0 20px;
	}

	.toggle-text {
		text-align: center;
		cursor: pointer;
		color: #7eb1ea;
		margin: 10px 0;
	}

	.fade-slide-enter-active, .fade-slide-leave-active {
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.fade-slide-enter-from, .fade-slide-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}

	input {
		width: 100%;
		padding: 12px 16px;
		border: 1px solid #ccc;
		border-radius: 8px;
		font-size: 16px;
		outline: none;
	}

	input:focus {
		border: 1px solid #4A90E2;
		box-shadow: 0 0 5px rgba(74, 144, 226, 0.4);
	}

	.form {
		width: 100%;
		padding: 30px;
		background: var(--background-color);
		height: 100vh;
		position: relative;
	}

	.form__logo {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-bottom: 15px;
		color: var(--text-color);
	}

	.form__logo-icon {
		margin-top: 20px;
		padding: 5px;
		width: 110px;
	}

	.form__field {
		height: 70px;
		margin-top: 4px;
	}

	.form__field-inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20px;
		margin-bottom: 20px;
	}

	.form__btn {
		width: 100%;
		background: var(--indicator-bg);
		color: white;
		font-size: 16px;
		padding: 14px;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		font-family: "Nunito", sans-serif;
		transition: box-shadow 0.2s ease, transform 0.1s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
	}

	.form__btn:active {
		transform: scale(0.98);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.form__btn:hover {
		opacity: 1;
		cursor: pointer;
	}

	.form__error {
		height: 27px;
		color: red;
		font-size: 14px;
		margin-top: 5px;
		opacity: 0;
		animation: fadeIn 0.3s ease forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
