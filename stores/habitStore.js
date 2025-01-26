import { defineStore } from 'pinia'
export const useHabitStore = defineStore('askezaStore', {
	state: () => ({
		username: null,
		email: null,
		password: null,
		tasks: [],
		radius: 45,
		selectedTask: null,
	}),
	actions: {
		saveTasks() {
			localStorage.setItem("tasks", JSON.stringify(this.tasks));
		},
		setUserData(userData) {
			this.username = userData.name;
			this.email = userData.email;
			this.password = userData.password;
			localStorage.setItem('userData', JSON.stringify(userData));
		},
		loadUserData() {
			const savedData = localStorage.getItem('userData');
			if (savedData) {
				const parsedData = JSON.parse(savedData);
				this.username = parsedData.name;
				this.email = parsedData.email;
				this.password = parsedData.password;
			}
		},
		updateUserData(newData) {
			if (newData.name) this.username = newData.name
			if (newData.email) this.email = newData.email
			if (newData.password) this.password = newData.password
			localStorage.setItem('userData', JSON.stringify({
				name: this.username,
				email: this.email,
				password: this.password
			}))
		},
		addTask(task) {
			const isDuplicate = this.tasks.some((item) =>
				item.goal === task.goal &&
				item.dateRange.start === task.dateRange.start &&
				item.dateRange.end === task.dateRange.end
			);
			if (!isDuplicate) {
				const newTask = {
					...task,
					id: Date.now(),
					progress: 0,
				};
				this.tasks.push(newTask);
				this.updateProgress(newTask);
				localStorage.setItem('tasks', JSON.stringify(this.tasks));
			}
		},
		loadTasks() {
			const savedTasks = localStorage.getItem('tasks');
			if (savedTasks) {
				this.tasks = JSON.parse(savedTasks);
				this.updateAllProgress();
			}
		},

		updateProgress(task) {
			const circumference = 2 * Math.PI * this.radius;
			const startDate = new Date(task.dateRange.start);
			const endDate = new Date(task.dateRange.end);
			const totalDays = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
			const daysPassed = Math.max(0, Math.ceil((new Date() - startDate) / (1000 * 60 * 60 * 24)));
			const progress = Math.min(100, Math.floor((daysPassed / totalDays) * 100));
			task.progress = progress;
			task.offset = circumference - (progress / 100) * circumference;
		},

		updateAllProgress() {
			this.tasks.forEach((task) => this.updateProgress(task));
		},

		clearTasks() {
			this.username = null;
			this.tasks = [];
		},
		removeTask(taskId) {
			this.tasks = this.tasks.filter(task => task.id !== taskId);
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
		},
	},
});
