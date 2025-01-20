export const useHabitStore = defineStore('askezaStore', {
	state: () => ({
		username: null,
		email: null,
		password: null,
		tasks: [],
	}),
	actions: {
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
				localStorage.setItem('tasks', JSON.stringify(this.tasks));
			}
		},

		loadTasks() {
			const savedTasks = localStorage.getItem('tasks');
			if (savedTasks) {
				this.tasks = JSON.parse(savedTasks);
			}
		},

		updateTask(taskId, checked) {
			const task = this.tasks.find((task) => task.id === taskId);
			if (task) {
				task.checked = checked;
			}
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
