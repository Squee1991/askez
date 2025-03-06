import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useHabitStore = defineStore("askezaStore", () => {
    const tasks = ref([]);
    const selectedTask = ref(null);
    const activeColor = ref(null)
    const achieveCount = ref(0)
    const achievementThresholds = ref([1, 10, 25, 50, 50, 200]);
    const archiveTasks = ref([])

    const setUserData = (userData) => {
        username.value = userData.name;
        email.value = userData.email;
        password.value = userData.password;
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    const amountOfTask = computed(() => tasks.value.length)
    const doneTask = computed(() =>
        tasks.value.filter(task => task.progress === 100 && task.progressMiss === 0)
    );

    const doneTaskNames = computed(() => tasks.value.filter(task => task.progress === 100).map(task => task.goal));
    const notdone = computed(() => tasks.value.filter(task => (task.progress + task.progressMiss) < 100))
    const result = computed(() => {
        return (taskId) => {
            const task = tasks.value.find(task => task.id === taskId);
            if (!task) return {
                progress: "0%",
                progressMiss: "0%"
            };

            const progress = Math.round(Number(task.progress) || 0);
            const progressMiss = Math.round(Number(task.progressMiss) || 0);

            return {
                progress: `${progress}%`,
                progressMiss: `${progressMiss}%`
            };
        };
    });

    const activeAchievements = computed(() => {
        return achievementThresholds.value.map(threshold => achieveCount.value >= threshold);
    });

    const completionRate = computed(() => {
        if (tasks.value.length === 0) return 0;
        return Math.round((doneTask.value.length / tasks.value.length) * 100);
    });

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks.value));
    };

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
        loadArchiveTasks();
        loadAchieveCount();
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
            saveAchieveCount();
        }

        const taskIndex = tasks.value.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            tasks.value.splice(taskIndex, 1, task);
        }
        saveTasks();
    };

    const loadAchieveCount = () => {
        const savedCount = localStorage.getItem('achieveCount');
        if (savedCount) {
            achieveCount.value = parseInt(savedCount);
        }
    };

    const updateAllProgress = () => {
        tasks.value.forEach((task) => updateProgress(task));
    };

    const saveArchiveTasks = () => {
        localStorage.setItem('archiveTasks', JSON.stringify(archiveTasks.value))
    }

    const saveAchieveCount = () => {
        localStorage.setItem('achieveCount', achieveCount.value);
    };

    const loadArchiveTasks = () => {
        const savedArchive = localStorage.getItem("archiveTasks");
        if (savedArchive) {
            archiveTasks.value = JSON.parse(savedArchive);
        } else {
            archiveTasks.value = [];
        }
    };

    const recalculateAchievements = () => {
        achieveCount.value = Math.max(achieveCount.value, doneTask.value.length);
        saveAchieveCount();
    };


    const clearAlldates = () => {
        tasks.value = [];
        achieveCount.value = 0
        archiveTasks.value = []
        localStorage.removeItem('userData')
        localStorage.removeItem('tasks')
        localStorage.removeItem('archiveTasks')
        localStorage.removeItem('achieveCount')
    }

    const clearTasks = () => {
        username.value = null;
        tasks.value = [];
    };

    const removeTask = (taskId) => {
        const taskToRemove = tasks.value.find(task => task.id === taskId);
        if (taskToRemove) {
            archiveTasks.value.push(taskToRemove);
            saveArchiveTasks();
        }
        tasks.value = tasks.value.filter(task => task.id !== taskId);
        saveTasks();
    };


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
        saveTasks,
        setUserData,
        addTask,
        loadTasks,
        updateProgress,
        updateAllProgress,
        clearTasks,
        removeTask,
        loadArchiveTasks,
        recalculateAchievements,
        saveAchieveCount,
    };
});