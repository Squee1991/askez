import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import {
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';

export const useHabitStore = defineStore("askezaStore", () => {
    const tasks = ref([]);
    const selectedTask = ref(null);
    const activeColor = ref(null);
    const achieveCount = ref(0);
    const achievementThresholds = ref([1, 10, 25, 50, 50, 200]);
    const archiveTasks = ref([]);
    const auth = getAuth();
    const userId = ref(null);

    const saveTasks = () => {
        if (!userId.value) return;
        localStorage.setItem(`tasks_${userId.value}`, JSON.stringify({
            tasks: tasks.value,
            achieveCount: achieveCount.value,
            archiveTasks: archiveTasks.value,
        }));
    };

    const loadTasks = () => {
        if (!userId.value) return;
        const savedData = localStorage.getItem(`tasks_${userId.value}`);
        if (savedData) {
            try {
                const userData = JSON.parse(savedData);
                tasks.value = userData.tasks || [];
                achieveCount.value = userData.achieveCount || 0;
                archiveTasks.value = userData.archiveTasks || [];
            } catch (error) {
                console.error(error);
            }
        }
    };



    const amountOfTask = computed(() => tasks.value.length);
    const doneTask = computed(() =>
        tasks.value.filter(task => task.progress === 100 && task.progressMiss === 0)
    );

    const doneTaskNames = computed(() => tasks.value.filter(task => task.progress === 100).map(task => task.goal));
    const notdone = computed(() => tasks.value.filter(task => (task.progress + task.progressMiss) < 100));

    const result = computed(() => {
        return (taskId) => {
            const task = tasks.value.find(task => task.id === taskId);
            if (!task) return { progress: "0%", progressMiss: "0%" };

            const progress = Math.round(Number(task.progress) || 0);
            const progressMiss = Math.round(Number(task.progressMiss) || 0);

            return { progress: `${progress}%`, progressMiss: `${progressMiss}%` };
        };
    });

    const activeAchievements = computed(() => {
        return achievementThresholds.value.map(threshold => achieveCount.value >= threshold);
    });

    const completionRate = computed(() => {
        if (tasks.value.length === 0) return 0;
        return Math.round((doneTask.value.length / tasks.value.length) * 100);
    });

    const addTask = (task) => {
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
            };
            tasks.value.push(newTask);
            updateProgress(newTask);
            saveTasks();
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

        if (progress === 100 && !task.isAchieved) {
            task.isAchieved = true;
            achieveCount.value++;
            saveTasks();
        }

        const taskIndex = tasks.value.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            tasks.value.splice(taskIndex, 1, task);
        }
        saveTasks();
    };


    const loadArchiveTasks = () => {
        if (!userId.value) return;
        const savedArchive = localStorage.getItem(`tasks_${userId.value}`);
        if (savedArchive) {
            try {
                const userData = JSON.parse(savedArchive);
                archiveTasks.value = userData.archiveTasks || [];
            } catch (error) {
                console.error(error);
            }
        }
    };

    const removeTask = (taskId) => {
        const taskToRemove = tasks.value.find(task => task.id === taskId);
        if (taskToRemove) {
            archiveTasks.value.push(taskToRemove);
        }
        tasks.value = tasks.value.filter(task => task.id !== taskId);
        saveTasks();
    };

    const clearAlldates = () => {
        tasks.value = [];
        achieveCount.value = 0;
        archiveTasks.value = [];
        localStorage.removeItem(`tasks_${userId.value}`);
    };

    const updateAllProgress = () => {
        tasks.value.forEach((task) => updateProgress(task));
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userId.value = user.uid;
            loadTasks();
        } else {
            userId.value = null;
            tasks.value = [];
            archiveTasks.value = [];
            achieveCount.value = 0;
        }
    });

    watch(tasks, saveTasks, { deep: true });

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

        clearAlldates,
        addTask,
        updateProgress,
        updateAllProgress,
        removeTask,
        loadTasks,
        saveTasks,
        loadArchiveTasks
    };
});
