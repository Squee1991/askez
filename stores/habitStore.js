import { defineStore } from 'pinia';

export const useHabitStore = defineStore('askezaStore', {
	state: () => ({
		username: null,
		tasks: []
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
				};
				this.tasks.push(newTask);
				console.log("Добавил", newTask);
			}
		},

		updateTask(taskId, checked) {
			const task = this.tasks.find((task) => task.id === taskId);
			if (task) {
				task.checked = checked;
				console.log("Обновил", task);
			}
		},
		clearTasks() {
			this.username = null;
			this.tasks = [];
		},
	},
});
