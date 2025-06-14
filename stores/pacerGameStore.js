import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import { useAuthStore } from './authStore.js';
export const makeActivityStore = defineStore('pacer', () => {
	const activities = ref([])
	const authStore = useAuthStore();
	const addActivity = async (title, amount, difficulty) => {
		if (authStore.confidence < difficulty) return
		await authStore.spendConfidence(Number(difficulty));
		activities.value.push({
			id: new Date(),
			title,
			amount,
			difficulty,
		})
		localStorage.setItem('pacer-activities', JSON.stringify(activities.value));
	}

	const removeActivity = (id) => {
		activities.value = activities.value.filter(a => a.id !== id)
		localStorage.setItem('pacer-activities', JSON.stringify(activities.value));

	}

	const loadActivities = () => {
		const localData = localStorage.getItem('pacer-activities')
		if (localData) {
			activities.value = JSON.parse(localData)
		}
	}

	loadActivities()

	return {
		activities,
		addActivity,
		loadActivities,
		removeActivity
	}


})