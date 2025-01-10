export const useHabitStore = defineStore('askezaStore', {
	state: () => ({
		username: null,
		tasks: [],
	}),
	actions: {
		setUsername(name) {
			this.username = name;
		},
		addTask(task) {
			const isDuplicate = this.tasks.some((item) =>
				item.goal === task.goal &&
				item.habbit === task.habbit &&
				item.dateRange.start === task.dateRange.start &&
				item.dateRange.end === task.dateRange.end
			);
			if (!isDuplicate) {
				const newTask = {
					...task,
					id: Date.now(),
					checked: false,
					progress: 0,
				};
				this.tasks.push(newTask);
				this.saveToLocalStorage();
			}
		},
		updateTask(taskId, checked) {
			const task = this.tasks.find((task) => task.id === taskId);
			if (task) {
				task.checked = checked;
				this.saveToLocalStorage();
			}
		},
		clearTasks() {
			this.username = null;
			this.tasks = [];
			this.saveToLocalStorage();
		},

		saveToLocalStorage() {
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
		},
	},
});
