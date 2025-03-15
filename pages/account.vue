<template>
	<div class="account__wrapper">
		<div class="log__out-overlay" :class="{'overlay': logOutAccept}"></div>
		<div v-if="logOutAccept" class="logout__confirm">
			<div class="logout"> {{ $t('logOut.out')}}</div>
			<div class="log__out-text">{{ $t('logOut.reject')}}</div>
			<div class="logout__btns">
				<button @click="confirmLogout" class="logout__btn yes-btn">{{ $t('delAllDatas.acceptBtn')}}</button>
				<button @click="NotConfirmLogout" class="logout__btn no-btn">{{ $t('delAllDatas.rejectBtn')}}</button>
			</div>
		</div>
		<div class="edit__component">
			<EditDeleteMenu
				@click="singOut"
				:icon="EditIcon"
			/>
			<div @click="singOutBtn" v-if="logOutMenu" class="log__out-menu">
				<span class="log__out-logout">logout</span>
			</div>
		</div>
		<div class="account__content">
			<HeaderWithback :icon="Arrowicon" :title="$t('account.accoutTitle')"/>
			<div class="logout__icon">
			</div>
			<div class="account__fields">
				<div v-for="field in data.fields" :key="field.id" class="account__field">
					<span class="field__label"> {{ field.label}}</span>
					<VFields
						:field="field"
						v-model="field.value"
					/>
				</div>
			</div>
			<button @click="changeData" class="account__btn">{{ $t('account.accountBtn')}}</button>
		</div>
	</div>
</template>
<script setup>
	import Arrowicon from '../assets/images/arrowSvg.svg'
	import HeaderWithback from '../src/components/headerWithBack.vue'
	import SingOutIcon from '../assets/images/SingOutSvg.svg'
	import EditIcon from '../assets/images/editIcon.svg'
	import EditDeleteMenu from '../src/components/EditDeleteMenu.vue'
	import {ref, onMounted, onUnmounted} from 'vue';
	import VFields from '/src/components/v-fields.vue';
	import {useHabitStore} from '../stores/habitStore.js';
	import {useAuthStore} from '../stores/authStore.js';
	import {useRouter} from 'vue-router'
	import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth';

	const logOutAccept = ref(false)
	const logOutMenu = ref(false)
	const habitStore = useHabitStore();
	const authStore = useAuthStore();
	const router = useRouter()
	const data = ref({
		fields: [
			{
				id: 1,
				name: "name",
				type: "text",
				label: "Name",
				placeholder: "",
				value: "",
				error: false,
			},
			{
				id: 2,
				name: "email",
				type: "email",
				label: "Email",
				placeholder: "",
				value: "",
				error: false,
				readonly: true
			},
		],

	});

	const singOut = () => {
		logOutMenu.value = true
	}

	const singOutBtn = () => {
		logOutAccept.value = true
		logOutMenu.value = false
	}

	const confirmLogout = async () => {
		const auth = getAuth()
		await signOut(auth)
		logOutAccept.value = false
	}

	const NotConfirmLogout = () => {
		logOutAccept.value = false
	}

	const handleClickOutside = (event) => {
		const menu = document.querySelector(".log__out-menu");
		const button = document.querySelector(".edit__component");
		if (menu && !menu.contains(event.target) && button && !button.contains(event.target)) {
			logOutMenu.value = false;
		}
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener("click", handleClickOutside);
	});

	const changeData = async () => {
		const nameField = data.value.fields.find(field => field.name === "name");
		if (nameField && nameField.value !== authStore.name) {
			await authStore.UpdateNameDisplayName(nameField.value);
		}
		router.push("/welcomePage");
	};

	onMounted(() => {
		authStore.fetchingUser()
	});

	watch(() => [authStore.name, authStore.email], ([newName, newEmail]) => {
		data.value.fields.forEach((field) => {
			if (field.name === "name") field.value = newName || '';
			if (field.name === "email") field.value = newEmail || '';
		});
	}, {immediate: true});

	definePageMeta({
		middleware: ['auth'],
	})


</script>

<style scoped>

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

	.log__out-menu {
		position: absolute;
		right: 10px;
		top: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		background: #4FC55C;
		padding: 10px;
		border-radius: 5px;
		font-size: 18px;
		color: white;
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
		height: 100vh;
		background: black;
		opacity: 50%;
		z-index: 1;
	}

	.log__out-text {
		padding: 5px 0;
		color: grey;
		text-align: center;
	}

	.logout {
		margin-bottom: 10px;
		text-align: center;
		color: white;
		font-family: "Acme", serif;
		font-size: 22px;
	}

	.account__content {
		padding: 15px 30px;
		display: flex;
		flex-direction: column;
	}

	.account__wrapper {
		position: relative;
		background-color: var(--background-color);
		height: 100vh;
	}

	.edit__component {
		position: absolute;
		left: 87%;
		top: 44px;
	}

	.account__btn {
		margin-top: 20px;
		width: 100%;
		border: none;
		padding: 15px;
		border-radius: 10px;
		font-size: 20px;
		background-color: var(--button-bg);
		color: var(--button-text-color);
		font-family: "Acme", serif;
	}

	.field__label {
		color: var(--text-color);
		font-family: "Acme", serif;
	}
</style>