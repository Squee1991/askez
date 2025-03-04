import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useHabitStore = defineStore("askezaStore", () => {
	const username = ref(null);
	const email = ref(null);
	const password = ref(null);
	const tasks = ref([]);
	const selectedTask = ref(null);
	const activeColor = ref(null);

	const amountOfTask = computed(() => tasks.value.length);
	const doneTask = computed(() => tasks.value.filter(task => (task.progress + task.progressMiss) === 100));
	const doneTaskNames = computed(() => tasks.value.filter(task => task.progress === 100).map(task => task.goal));
	const notdone = computed(() => tasks.value.filter(task => (task.progress + task.progressMiss) < 100));

	const result = computed(() => {
		return (taskId) => {
			const task = tasks.value.find(task => task.id === taskId);
			if (!task) return { progress: "0%", progressMiss: "0%" };
			return {
				progress: `${Math.round(task.progress)}%`,
				progressMiss: `${Math.round(task.progressMiss)}%`
			};
		};
	});

	const user = ref(null); // state for user data

	const completionRate = computed(() => {
		if (amountOfTask.value === 0) return 0;
		return Math.round((doneTask.value.length / amountOfTask.value) * 100);
	});

	const saveTasks = () => {
		localStorage.setItem("tasks", JSON.stringify(tasks.value));
	};

	const setUserData = (userData) => {
		username.value = userData.name;
		email.value = userData.email;
		password.value = userData.password;
		localStorage.setItem("userData", JSON.stringify(userData));
	};

	const loadUserData = () => {
		const savedData = localStorage.getItem("userData");
		if (savedData) {
			const parsedData = JSON.parse(savedData);
			username.value = parsedData.name;
			email.value = parsedData.email;
			password.value = parsedData.password;
		}
	};

	const updateUserData = (newData) => {
		if (newData.name) username.value = newData.name;
		if (newData.email) email.value = newData.email;
		if (newData.password) password.value = newData.password;
		localStorage.setItem("userData", JSON.stringify({
			name: username.value,
			email: email.value,
			password: password.value,
		}));
	};

	const addTask = (task) => {
		const isDuplicate = tasks.value.some(
			(item) =>
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
			};
			tasks.value.push(newTask);
			updateProgress(newTask);
			saveTasks();
		}
	};

	const loadTasks = () => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			try {
				tasks.value = JSON.parse(savedTasks) || [];
				tasks.value.forEach((task) => {
					if (task.progressMiss === undefined) task.progressMiss = 0;
					if (!task.history) task.history = [];
				});
				updateAllProgress();
			} catch (error) {
				tasks.value = [];
			}
		} else {
			tasks.value = [];
		}
	};

	const updateProgress = (task) => {
		const totalDays = Math.max(1, (new Date(task.dateRange.end) - new Date(task.dateRange.start)) / (1000 * 60 * 60 * 24) + 1);
		const completedDays = task.checkedDates ? task.checkedDates.length : 0;
		const missedDays = task.missedDates ? task.missedDates.length : 0;
		let progress = (completedDays / totalDays) * 100;
		let progressMiss = (missedDays / totalDays) * 100;
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
		const taskIndex = tasks.value.findIndex((t) => t.id === task.id);
		if (taskIndex !== -1) {
			tasks.value.splice(taskIndex, 1, task);
		}

		saveTasks();
	};

	const updateAllProgress = () => {
		tasks.value.forEach((task) => updateProgress(task));
	};

	const clearTasks = () => {
		username.value = null;
		tasks.value = [];
	};

	const clearAlldates = () => {
		tasks.value = [];
		username.value = null;
		email.value = null;
		password.value = null;
		localStorage.removeItem("userData");
		localStorage.removeItem("tasks");
	};

	const removeTask = (taskId) => {
		tasks.value = tasks.value.filter((task) => task.id !== taskId);
		saveTasks();
	};

	const loginUser = async (userData) => {
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Ошибка при авторизации');
			}

			const data = await response.json();
			user.value = data.user;
			return data;
		} catch (error) {
			console.error('Ошибка loginUser:', error);
			throw error;
		}
	};

	return {
		username,
		email,
		password,
		tasks,
		selectedTask,
		amountOfTask,
		doneTask,
		notdone,
		doneTaskNames,
		completionRate,
		activeColor,
		result,
		clearAlldates,
		saveTasks,
		setUserData,
		loadUserData,
		updateUserData,
		addTask,
		loadTasks,
		updateProgress,
		updateAllProgress,
		clearTasks,
		removeTask,
		loginUser,
	};
});
