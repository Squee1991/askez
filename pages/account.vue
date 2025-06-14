<template>
	<div class="account__wrapper">
		<div v-if="!authStore.isPremium && isPremiumOverlayVisible" class="premium__window">
			<PremiumWindow
				:text="$t('premiumWindow.taskText')"
				:subtext="$t('premiumWindow.subtext')"
				@close="isPremiumOverlayVisible = false"
			/>
		</div>
		<div v-if="logOutAccept" class="overlay"></div>
		<div v-if="logOutAccept" class="account__changed">
			<div class="account__changed--title">{{ $t('account.changedName')}}</div>
			<img class="change__data-icon" src="../assets/images/change.svg" alt="">
			<button class="account__change-btn" @click="closeOverlay">{{ $t('success.button')}}</button>
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
			<button
				:disabled="!isButtonActive"
				@click="changeData"
				class="account__btn">{{ $t('account.accountBtn')}}
			</button>
		</div>
	</div>
</template>
<script setup>
	import {useTaskStore} from '../stores/OfflineTaskStore.js'
	import PremiumWindow from '../src/components/premiumWindow.vue'
	import Arrowicon from '../assets/images/back.svg'
	import HeaderWithback from '../src/components/headerWithBack.vue'
	import EditIcon from '../assets/images/editIcon.svg'
	import EditDeleteMenu from '../src/components/EditDeleteMenu.vue'
	import {ref, computed, onMounted} from 'vue';
	import VFields from '/src/components/v-fields.vue';
	import {useHabitStore} from '../stores/habitStore.js';
	import {useAuthStore} from '../stores/authStore.js';
	import {useRouter} from 'vue-router'
	let isPremiumOverlayVisible = ref(false)
	const logOutAccept = ref(false)
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
				maxlength: 15,
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

	const closeOverlay = () => {
		logOutAccept.value = false
	}

	const isButtonActive = computed(() => {
		const nameField = data.value.fields.find(field => field.name === "name");
		return nameField && nameField.value !== authStore.name;
	});

	const changeData = async () => {
		const nameField = data.value.fields.find(field => field.name === "name");
		if (nameField && nameField.value !== authStore.name) {
			await authStore.UpdateNameDisplayName(nameField.value);
			logOutAccept.value = true;
		}
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

	.pacer__disabled {
		color: var(--text-color);
	}

	.change__data-icon {
		width: 70px;
		margin-top: 10px;
	}

	.premium__window {
		position: absolute;
		width: 100%;
		height: 100vh;
	}

	.account__btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.account__changed {
		width: 80%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #34364a;
		padding: 25px;
		border-radius: 25px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 40%;
		z-index: 100;
	}

	.overlay {
		position: absolute;
		width: 100%;
		height: 100vh;
		background: black;
		opacity: 50%;
		z-index: 1;
	}

	.account__changed--title {
		color: white;
		font-size: 26px;
		padding: 15px;
	}

	.account__change-btn {
		margin-top: 40px;
		border: none;
		border-radius: 25px;
		width: 100%;
		background: #7c00ff;
		font-size: 20px;
		color: white;
		text-align: center;
		font-weight: 600;
		padding: 10px;
		font-family: "Nunito", sans-serif;
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
		cursor: pointer;
		margin-top: 20px;
		width: 100%;
		border: none;
		padding: 15px;
		border-radius: 25px;
		font-size: 20px;
		background-color: var(--button-bg);
		color: var(--button-text-color);
		font-family: "Acme", serif;
		font-weight: 600;
	}

	.field__label {
		color: var(--text-color);
		font-family: "Acme", serif;
	}
</style>