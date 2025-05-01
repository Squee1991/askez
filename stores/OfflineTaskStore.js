import {defineStore} from 'pinia';
import {ref} from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const archivedTasks = ref([]);
let dbPromise;

export const useTaskStore = defineStore('tasks', () => {
	const tasks = ref([]);
	const isOnline = ref(typeof window !== 'undefined' ? navigator.onLine : true);

	let hasLoaded = false;

	const loadTasksFromLocal = async () => {
		if (!dbPromise || hasLoaded) return;
		const db = await dbPromise;
		const allTasks = await db.getAll('tasks');
		tasks.value = allTasks;
		hasLoaded = true;
	};

	const saveTaskOffline = async (task) => {
		if (!dbPromise) return;
		const db = await dbPromise;
		const all = await db.getAll('tasks');
		const alreadyExists = all.some(t =>
			t.goal === task.goal &&
			JSON.stringify(t.dateRange) === JSON.stringify(task.dateRange)
		);

		if (alreadyExists) return;

		const cleanTask = JSON.parse(JSON.stringify({
			...task,
			synced: false,
			dateRange: {
				start: task.dateRange?.start?.toDate?.() || task.dateRange?.start,
				end: task.dateRange?.end?.toDate?.() || task.dateRange?.end
			}
		}));

		const id = await db.add('tasks', cleanTask);
		tasks.value.push({ ...cleanTask, id });
	};


	const syncTasks = async () => {
		if (!dbPromise || !navigator.onLine) return;

		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		const db = await dbPromise;
		const unsyncedTasks = await db.getAll('tasks');
		if (!unsyncedTasks.length) return;

		const firestore = getFirestore();
		const tasksCollection = collection(firestore, 'tasks');

		for (const task of unsyncedTasks) {
			try {
				if (!task.synced) {
					const docRef = await addDoc(tasksCollection, {
						...task,
						userId: user.uid
					});
					task.synced = true;
					task.id = docRef.id;
					await db.put('tasks', task);
				}
			} catch (error) {
			}
		}

		tasks.value = await db.getAll('tasks');
	};

	const result = (taskId) => {
		const task = tasks.value.find(t => t.id === taskId);
		if (!task || !task.history) return { progress: 0, progressMiss: 0 };

		const total = task.history.reduce((sum, h) => sum + h.percent, 0);
		const checked = task.history
		.filter(h => h.color === '#4FC55C')
		.reduce((sum, h) => sum + h.percent, 0);

		return {
			progress: Math.round(checked),
			progressMiss: Math.round(total - checked),
		};
	};

	const archiveTask = async (taskId) => {
		if (!dbPromise) return;
		const db = await dbPromise;
		const task = await db.get('tasks', taskId);
		if (!task) return;
		archivedTasks.value.push(task);
		await db.delete('tasks', taskId);
		tasks.value = tasks.value.filter((t) => t.id !== taskId);
	};

	const clearLocalTasks = async () => {
		if (!dbPromise) return;
		const db = await dbPromise;
		const tx = db.transaction('tasks', 'readwrite');
		tx.objectStore('tasks').clear();
		await tx.done;
		tasks.value = [];
	};

	if (typeof window !== 'undefined') {
		window.addEventListener('online', () => {
			isOnline.value = true;
			syncTasks();
		});

		window.addEventListener('offline', () => {
			isOnline.value = false;
		});
	}

	if (typeof window !== 'undefined') {
		loadTasksFromLocal();
	}

	const removeTask = async (taskId) => {
		if (!dbPromise) return;
		const db = await dbPromise;
		await db.delete('tasks', taskId);
		tasks.value = tasks.value.filter(task => String(task.id) !== String(taskId));
	};

	return {
		tasks,
		addTask: saveTaskOffline,
		syncTasks,
		loadTasksFromLocal,
		clearLocalTasks,
		removeTask,
		archiveTask,
		result,
		isOnline,
		archivedTasks
	};
});
