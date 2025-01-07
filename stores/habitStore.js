import { defineStore } from 'pinia';

export const useHabitStore = defineStore('askezaStore', {
	state: () => ({
		tasks: [],
	}),

	actions: {
		addTask(task) {
			const isDuplicate = this.tasks.some((item) =>
				item.goal === task.goal &&
				item.habbit === task.habbit &&
				item.dateRange.start === task.dateRange.start &&
				item.dateRange.end === task.dateRange.end
			);
			if (!isDuplicate) {
				this.tasks.push(task);
				console.log(task);
			} else  {
				console.log('уже есть')
			}

		},

		clearTasks() {
			this.tasks = [];
		},
	},
});
