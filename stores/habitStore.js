import {defineStore} from "pinia";
import {useAuthStore} from './authStore.js';
import {computed, ref, watch} from "vue";
import { useI18n } from 'vue-i18n';
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {getFirestore, doc, setDoc, getDoc, deleteDoc} from "firebase/firestore";
import { eventMessages } from '../src/ai/messageBot.js';
export const useHabitStore = defineStore("askezaStore", () => {
	const tasks = ref([]);
	const selectedTask = ref(null);
	const activeColor = ref(null);
	const achieveCount = ref(0);
	const pandaProgressGlobal = ref(0);
	const pandaLevel = ref(1);
	const taskCompletedCount = ref(0);
	const isAudioEnabled = ref(false)
	const isLoaded = ref(false);
	const previousAchieveCount = ref(0);
	const isAnimationEnabled = ref(false)

	const notifiedEvents = ref({
		levelUp: false,
		goalCompleted: false,
		achievementUnlocked: false
	});
	const achievementThresholds = ref([1, 5, 15, 30, 50, 70, 100, 120, 150]);
	const archiveTasks = ref([]);1
	const skipUpdateAll = ref(false);
	const auth = getAuth();
	const db = getFirestore();
	const userId = ref(null);
	const authStore = useAuthStore();

	const setAnimation = (value) => {

		isAnimationEnabled.value = value;
		localStorage.setItem('animationEnabled', JSON.stringify(value));
	};

	const setAudio = (value) => {
		isAudioEnabled.value = value;

		localStorage.setItem('audioEnabled', JSON.stringify(value));

	};

	const toggleAudio = () => {
		isAudioEnabled.value = !isAudioEnabled.value;
		localStorage.setItem('audioEnabled', JSON.stringify(isAudioEnabled.value));
	};

	const toggleAnimation = () => {
		isAnimationEnabled.value = !isAnimationEnabled.value;
		localStorage.setItem('animationEnabled', JSON.stringify(isAnimationEnabled.value));
	};

	const updateTask = (updatedTask) => {
		const index = tasks.value.findIndex(t => t.id === updatedTask.id);
		if (index !== -1) {
			tasks.value[index] = { ...updatedTask };
		}
	};

	const eventToShow = computed(() => {
		if (!notifiedEvents.value.goalCompleted && tasks.value.some(t => t.isAchieved && t.progress === 100)) {
			const message = eventMessages.goalCompleted[locale.value] || eventMessages.goalCompleted.en;
			return { type: 'goalCompleted', message: message };
		}

		if (!notifiedEvents.value.levelUp && pandaProgressGlobal.value === 0) {
			const message = eventMessages.levelUp[locale.value] || eventMessages.levelUp.en;
			return { type: 'levelUp', value: pandaLevel.value, message: message.replace('{{level}}', pandaLevel.value) };
		}

		if (!notifiedEvents.value.achievementUnlocked && achieveCount.value > previousAchieveCount.value) {
			const message = eventMessages.achievementUnlocked[locale.value] || eventMessages.achievementUnlocked.en;
			return { type: 'achievementUnlocked', message: message };
		}

		return null;
	});

	const saveTasks = async () => {
		if (!userId.value) return;
		const userDocRef = doc(db, "users", userId.value);
		try {
			await setDoc(
				userDocRef,
				{
					tasks: tasks.value,
					achieveCount: achieveCount.value,
					archiveTasks: archiveTasks.value,
					pandaProgressGlobal: pandaProgressGlobal.value,
					pandaLevel: pandaLevel.value,
					taskCompletedCount: taskCompletedCount.value
				},
				{merge: true}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const loadTasks = async () => {
		if (!userId.value || !navigator.onLine) return;
		const userDocRef = doc(db, "users", userId.value);
		try {
			const docSnap = await getDoc(userDocRef);
			if (!docSnap.exists()) return;

			const data = docSnap.data();
			tasks.value = data.tasks || [];
			achieveCount.value = data.achieveCount || 0;
			archiveTasks.value = data.archiveTasks || [];
			pandaProgressGlobal.value = data.pandaProgressGlobal || 0;
			pandaLevel.value = data.pandaLevel || 1;
			taskCompletedCount.value = data.taskCompletedCount || 0;

			isLoaded.value = true;
			await updateAllProgress();
		} catch (error) {
			console.error(error);
		}
	};

	const amountOfTask = computed(() => tasks.value.length);
	const doneTask = computed(() => tasks.value.filter(task => task.progress === 100 && task.progressMiss === 0));
	const doneTaskNames = computed(() => tasks.value.filter(task => task.progress === 100).map(task => task.goal));
	const notdone = computed(() => tasks.value.filter(task => (task.progress + task.progressMiss) < 100));

	const result = computed(() => {
		return (taskId) => {
			const task = tasks.value.find(task => task.id === taskId);
			if (!task) return {progress: "0%", progressMiss: "0%"};
			const progress = Math.round(Number(task.progress) || 0);
			const progressMiss = Math.round(Number(task.progressMiss) || 0);
			return {progress: `${progress}%`, progressMiss: `${progressMiss}%`};
		};
	});

	const activeAchievements = computed(() => {
		return achievementThresholds.value.map(
			threshold => achieveCount.value >= threshold
		);
	});

	const completionRate = computed(() => {
		if (tasks.value.length === 0) return 0;
		return Math.round((doneTask.value.length / tasks.value.length) * 100);
	});

	const pandaProgress = computed(() => {
		if (tasks.value.length === 0) return 0;

		let doneTotal = 0;
		let missedTotal = 0;

		for (const task of tasks.value) {
			doneTotal += task.checkedDates?.length || 0;
			missedTotal += task.missedDates?.length || 0;
		}

		const total = doneTotal + missedTotal;
		if (total === 0) return 0;

		let rawProgress = (doneTotal / total) * 100;
		return Math.max(0, Math.min(100, Math.round(rawProgress)));
	});

	const addTask = async (task) => {
		const isDuplicate = tasks.value.some((item) =>
			item.goal === task.goal &&
			item.dateRange.start === task.dateRange.start &&
			item.dateRange.end === task.dateRange.end
		);

		if (!isDuplicate) {
			const newTask = {
				...task,
				id: Date.now(),
				progress: 0,
				progressMiss: 0,
				history: [],
				checkedDates: [],
				missedDates: [],
				checkedCount: 0,
				missedCount: 0,
				isAchieved: false,
				isCounted: false
			};
			tasks.value.push(newTask);
			await updateProgress(newTask);
			await saveTasks();
		}
	};

	const cleanTaskDataAfterDateRangeChange = (task) => {
		const start = new Date(task.dateRange.start);
		const end = new Date(task.dateRange.end);

		if (isNaN(start) || isNaN(end)) return;

		const isInRange = (dateStr) => {
			const date = new Date(dateStr);
			return !isNaN(date) && date >= start && date <= end;
		};

		task.checkedDates = (task.checkedDates || []).filter(isInRange);
		task.missedDates = (task.missedDates || []).filter(isInRange);

		const totalDays = Math.max(1, (end - start) / (1000 * 60 * 60 * 24) + 1);
		const step = +(100 / totalDays).toFixed(2);
		if (isNaN(step)) return;

		const newHistory = [
			...task.checkedDates.map(() => ({ color: '#4FC55C', percent: step })),
			...task.missedDates.map(() => ({ color: '#FF5C00', percent: step })),
		];

		task.history = newHistory;
		task.progress = +(task.checkedDates.length * step).toFixed(2);
		task.progressMiss = +(task.missedDates.length * step).toFixed(2);
	};


	const updateTaskAfterEdit = (task, newGoal, newColor, newRange) => {
		const start = new Date(newRange.start);
		const end = new Date(newRange.end);

		if (isNaN(start) || isNaN(end)) return;

		const totalDays = Math.max(1, (end - start) / (1000 * 60 * 60 * 24) + 1);
		const step = +(100 / totalDays).toFixed(2);

		if (isNaN(step)) return;

		const isInRange = (dateStr) => {
			const date = new Date(dateStr);
			return !isNaN(date) && date >= start && date <= end;
		};

		task.goal = newGoal;
		task.color = newColor;
		task.dateRange = newRange;
		task.checkedDates = (task.checkedDates || []).filter(isInRange);
		task.missedDates = (task.missedDates || []).filter(isInRange);

		task.history = [
			...task.checkedDates.map(() => ({ percent: step, color: '#4FC55C' })),
			...task.missedDates.map(() => ({ percent: step, color: '#FF5C00' })),
		];

		task.progress = +(step * task.checkedDates.length).toFixed(2);
		task.progressMiss = +(step * task.missedDates.length).toFixed(2);

		updateTask(task);
	};



	const updateProgress = async (task) => {
		const startDate = task.dateRange.start && task.dateRange.start.toDate ? task.dateRange.start.toDate() : new Date(task.dateRange.start);
		const endDate = task.dateRange.end && task.dateRange.end.toDate ? task.dateRange.end.toDate() : new Date(task.dateRange.end);

		const totalDays = Math.max(1, ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1);

		const previousChecked = task.checkedCount || 0;
		const previousMissed = task.missedCount || 0;

		const currentChecked = task.checkedDates?.length || 0;
		const currentMissed = task.missedDates?.length || 0;

		const addedChecked = currentChecked - previousChecked;
		const addedMissed = currentMissed - previousMissed;

		task.checkedCount = currentChecked;
		task.missedCount = currentMissed;

		if (authStore.isPremium) {
			pandaProgressGlobal.value += addedChecked;
			pandaProgressGlobal.value -= addedMissed;
			if (pandaProgressGlobal.value < 0) pandaProgressGlobal.value = 0;
			if (pandaProgressGlobal.value > 100) pandaProgressGlobal.value = 100;
		}

		let progress = (currentChecked / totalDays) * 100;
		let progressMiss = (currentMissed / totalDays) * 100;
		progress = Math.round(progress);
		progressMiss = Math.round(progressMiss);

		const totalProgress = progress + progressMiss;
		if (totalProgress > 100) {
			const factor = 100 / totalProgress;
			progress = Math.round(progress * factor);
			progressMiss = Math.round(progressMiss * factor);
		}
		task.progress = progress;
		task.progressMiss = progressMiss;

		if (progress === 100 && !task.isAchieved) {
			if (authStore.isPremium || achieveCount.value < 1) {
				task.isAchieved = true;
				achieveCount.value++;
				notifiedEvents.value.achievementUnlocked = false;
			}
		}

		const taskIndex = tasks.value.findIndex((t) => t.id === task.id);
		if (taskIndex !== -1) {
			tasks.value.splice(taskIndex, 1, task);
		}
	};

	const loadArchiveTasks = async () => {
		if (!userId.value) return;
		await loadTasks();
	};

	const removeTask = async (taskId) => {
		const taskToRemove = tasks.value.find(task => task.id === taskId);
		if (taskToRemove) {
			archiveTasks.value.push(taskToRemove);
		}
		tasks.value = tasks.value.filter(task => task.id !== taskId);
		skipUpdateAll.value = true;
		await saveTasks();
	};

	const clearAlldates = async () => {
		if (!userId.value) return;
		const auth = getAuth();
		const userDocRef = doc(db, "users", userId.value);
		try {
			await deleteDoc(userDocRef);
			await signOut(auth);
			tasks.value = [];
			achieveCount.value = 0;
			archiveTasks.value = [];
			userId.value = null;
		} catch (error) {
			console.error(error);
		}
	};

	const updateAllProgress = async () => {
		for (const task of tasks.value) {
			await updateProgress(task);
		}
	};

	onAuthStateChanged(auth, async (user) => {
		if (user) {
			userId.value = user.uid;
			if (navigator.onLine) {
				await loadTasks();
			}
		} else {
			userId.value = null;
			tasks.value = [];
			archiveTasks.value = [];
			achieveCount.value = 0;
			pandaProgressGlobal.value = 0;
			pandaLevel.value = 1;
			isLoaded.value = false;
		}
	});

	watch(tasks, async () => {
		await updateAllProgress();
		await saveTasks();
	}, {deep: true});

	watch(pandaProgressGlobal, async (newValue) => {
		if (newValue >= 100) {
			pandaLevel.value++;
			pandaProgressGlobal.value = 0;
			await saveTasks();
		}
	});

	return {
		tasks,
		selectedTask,
		amountOfTask,
		doneTask,
		notdone,
		doneTaskNames,
		completionRate,
		activeColor,
		result,
		achievementThresholds,
		activeAchievements,
		archiveTasks,
		achieveCount,
		pandaProgress,
		pandaProgressGlobal,
		pandaLevel,
		isLoaded,
		skipUpdateAll,
		eventToShow,
		notifiedEvents,
		taskCompletedCount,
		isAudioEnabled,
		isAnimationEnabled,

		clearAlldates,
		addTask,
		updateProgress,
		updateAllProgress,
		removeTask,
		loadTasks,
		saveTasks,
		loadArchiveTasks,
		onAuthStateChanged,
		updateTask,
		setAudio,
		setAnimation,
		toggleAudio,
		toggleAnimation,
		updateTaskAfterEdit,
		cleanTaskDataAfterDateRangeChange
	};
});
