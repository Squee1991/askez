import { defineStore } from "pinia";

export const useHabitStore = defineStore("askezaStore", {
	state: () => ({
		username: null,
		email: null,
		password: null,
		tasks: [],
		radius: 42,
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
			localStorage.setItem("userData", JSON.stringify(userData));
		},
		loadUserData() {
			const savedData = localStorage.getItem("userData");
			if (savedData) {
				const parsedData = JSON.parse(savedData);
				this.username = parsedData.name;
				this.email = parsedData.email;
				this.password = parsedData.password;
			}
		},
		updateUserData(newData) {
			if (newData.name) this.username = newData.name;
			if (newData.email) this.email = newData.email;
			if (newData.password) this.password = newData.password;
			localStorage.setItem(
				"userData",
				JSON.stringify({
					name: this.username,
					email: this.email,
					password: this.password,
				})
			);
		},
		addTask(task) {
			const isDuplicate = this.tasks.some(
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
					missedCount: 0
				};
				this.tasks.push(newTask);
				this.updateProgress(newTask);
				this.saveTasks();
			}
		},
		loadTasks() {
			const savedTasks = localStorage.getItem("tasks");
			if (savedTasks) {
				try {
					this.tasks = JSON.parse(savedTasks) || [];
					this.tasks.forEach((task) => {
						if (task.progressMiss === undefined) {
							task.progressMiss = 0;
						}
						if (!task.history) {
							task.history = [];
						}
					});

					this.updateAllProgress();
				} catch (error) {

					this.tasks = [];
				}
			} else {
				this.tasks = [];
			}
		},

		updateProgress(task) {
			const totalDays = Math.max(1, (new Date(task.dateRange.end) - new Date(task.dateRange.start)) / (1000 * 60 * 60 * 24) + 1);
			const completedDays = task.checkedDates ? task.checkedDates.length : 0;
			const missedDays = task.missedDates ? task.missedDates.length : 0;
			const progress = (completedDays / totalDays) * 100;
			const progressMiss = (missedDays / totalDays) * 100;
			task.progress = Math.round(progress, 100);
			task.progressMiss = Math.round(progressMiss, 100);
			const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
			if (taskIndex !== -1) {
				this.tasks.splice(taskIndex, 1, task);
			}
			this.saveTasks();
		},

		updateAllProgress() {
			this.tasks.forEach((task) => this.updateProgress(task));
		},

		clearTasks() {
			this.username = null;
			this.tasks = [];
		},

		removeTask(taskId) {
			this.tasks = this.tasks.filter((task) => task.id !== taskId);
			this.saveTasks();
		},
	},
});