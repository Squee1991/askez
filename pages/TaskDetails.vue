<template>
    <div class="update__date-wrapper">
        <div ref="animationBlock" class="animation__block"></div>

        <!-- Уведомления и сообщения -->
        <div v-if="notification.show" :class="['notification', notification.type]" @click="closeNotification">
            <div class="notification__icon">
                <span v-if="notification.type === 'success'">✓</span>
                <span v-else-if="notification.type === 'error'">!</span>
                <span v-else-if="notification.type === 'info'">i</span>
            </div>
            <div class="notification__message">{{ notification.message }}</div>
            <button class="notification__close" @click.stop="closeNotification">×</button>
        </div>

        <div :class="{'show__confirm': isOpen}" class="confirm__window">
            <div class="confirm__content-wrapper">
                <div class="confirm__title">{{ t('delConfirm.title') }}</div>
                <div class="confirm__description">{{ t('delConfirm.description') }}</div>
                <div class="confirm__btns">
                    <NuxtLink @click="clearTask(selectedTask.id)" class="confirm__btn" to="/welcomePage">
                        <button class="confirm__btn">{{ t('delConfirm.accept') }}</button>
                    </NuxtLink>
                    <button @click="cancelDelete" class="btn-green confirm__btn">{{ t('delConfirm.reject') }}</button>
                </div>
            </div>
        </div>

        <div v-if="selectedTask">
            <div class="task__name">
                <NuxtLink class="task__icon-back" to="/welcomePage" aria-label="Вернуться на главный экран">
                    <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                         width="35px" height="35px" viewBox="0 0 193.266 193.266"
                         xml:space="preserve">
<g>
	<path d="M183.011,111.191c-13.503-36.417-51.753-46.329-86.965-37.976c1.185-8.843,0.875-17.887,0.649-26.781
		C96.494,38.482,97,29.389,95.584,21.28c-0.005-0.037-0.013-0.071-0.018-0.107c-0.258-1.465-0.56-2.907-0.963-4.292
		c-0.79-2.72-4.822-2.799-5.572,0c-0.139,0.515-0.218,1.048-0.325,1.573c-14.494,2.817-27.809,13.573-38.962,22.392
		c-6.306,4.986-12.443,10.196-18.487,15.511c-0.609-0.107-1.174,0.392-1.099,0.969C20.107,66.224,10.404,75.518,1.236,85.305
		c-1.426,1.523-1.855,4.518,0,5.972c30.215,23.666,57.453,52.513,89.75,73.318c0.635,0.409,1.248,0.315,1.7-0.025
		c1.129,0.224,2.323-0.152,3.133-1.298c3.548-5.033,1.35-16.004,1.158-21.858c-0.319-9.69-0.359-19.447-1.299-29.103
		c-0.306-3.148-4.586-3.148-4.892,0c-0.208,2.139-0.363,4.281-0.492,6.427c-20.425-16.76-42.62-32.602-64.911-46.671
		c3.142-3.206,6.384-6.417,9.706-9.579c17.919,17.464,39.387,32.001,59.841,46.1c0.571,0.394,1.116,0.463,1.593,0.346
		c-1.207,1.029-1.539,2.12,0.312,3.051c3.231,1.624,7.92-0.111,11.33-0.231c10.472-0.368,21.174,1.799,31.254,4.421
		c27.209,7.077,36.858,32.485,35.867,58.302c-0.162,4.208,4.941,5.065,7.204,2.634C204.136,172.434,187.177,122.427,183.011,111.191
		z M88.837,157.484c-23.365-25.615-51.154-48.365-78.416-69.66c2.155-2.315,4.39-4.705,6.668-7.12
		c19.029,25.518,47.702,41.455,72.384,60.894C89.285,145.7,88.26,152.22,88.837,157.484z M90.037,123.879
		c-0.162,4.025-0.254,8.054-0.372,12.08c-23.843-18.807-50.812-33.954-71.053-56.869c1.762-1.859,3.572-3.737,5.402-5.62
		C46.408,89.391,66.472,109.772,90.037,123.879z M175.227,113.337c0.388,0.962,0.846,2.13,1.327,3.38
		c-4.065-4.199-8.558-8.104-12.592-12.078c-8.462-8.339-17.324-16.26-26.242-24.102c-0.074-0.065-0.153-0.094-0.229-0.134
		C153.939,84.858,167.891,95.087,175.227,113.337z M88.021,27.104C88.114,31.48,88.651,35.917,89,40.16
		c-1.274-0.877-2.578-1.695-3.752-2.525c-2.876-2.031-5.853-3.905-8.873-5.709C80.205,30.026,84.085,28.381,88.021,27.104z
		 M73.448,33.453c3.091,1.995,6.117,4.073,9.061,6.282c2.224,1.668,4.412,3.892,6.821,5.546c0.125,2.239,0.251,4.477,0.361,6.72
		c-3.283-2.633-7.01-4.847-10.415-7.213c-4.007-2.784-8.194-5.403-12.651-7.413C68.875,35.97,71.156,34.682,73.448,33.453z
		 M63.941,39.094c4.186,2.222,8.243,4.523,12.17,7.215c4.617,3.165,8.874,7.295,13.794,9.992c0.095,1.959,0.187,3.918,0.291,5.876
		c-4.137-2.947-9.297-5.183-13.327-7.531c-6.35-3.699-12.537-7.595-18.672-11.602C60.093,41.671,62.012,40.362,63.941,39.094z
		 M104.335,105.296c-0.323,0.056-4.208,1.296-6.711,2.84c0.688-0.955,0.764-2.481-0.44-3.406
		C77.457,89.566,56.738,75.862,37.016,60.667c2.521-2.36,5.105-4.66,7.718-6.924c23.335,16.969,47.495,32.496,69.889,50.762
		C111.075,104.513,107.601,104.741,104.335,105.296z M119.264,104.628c0.382-0.715,0.353-1.603-0.473-2.339
		C96.915,82.781,71.129,68.128,46.737,52.032c3.079-2.607,6.219-5.115,9.409-7.5c5.407,4.148,11.154,7.877,16.839,11.605
		c5.502,3.607,11.394,8.754,17.526,11.596c0.153,2.407,0.316,4.812,0.521,7.21c-1.264,1.352-0.779,3.649,0.804,4.59
		c0.73,0.819,2.023,1.022,2.76,0.261c3.474-0.692,6.979-1.195,10.482-1.563c9.283,11.346,21.512,20.502,33.053,29.368
		C132.202,106.083,125.709,104.986,119.264,104.628z M141.533,108.496c-0.284-0.084-0.597-0.152-0.886-0.233
		c0.97-0.591,1.539-2.063,0.486-2.884c-11.471-8.927-23.009-17.109-33.122-27.423c4.293-0.334,8.564-0.37,12.778-0.152
		c-0.297,0.334-0.387,0.847,0.021,1.274c12.762,13.315,26.317,25.026,38.656,37.992
		C154.367,113.438,148.411,110.526,141.533,108.496z M122.35,77.89c5.049,0.35,9.978,1.152,14.714,2.403
		c-0.772,0.003-1.441,0.948-0.725,1.624c7.854,7.391,15.739,14.75,23.424,22.317c7.246,7.133,13.191,15.561,20.399,22.626
		c1.472,4.519,2.908,9.507,3.945,14.523C171.702,114.656,143.388,97.193,122.35,77.89z M183.474,166.147
		c-0.486-10.317-2.692-19.978-6.774-28.444c1.848,2.6,3.645,5.262,5.347,8.041c0.654,1.068,2.102,1.034,2.928,0.384
		C186.124,153.768,186.063,161.04,183.474,166.147z"/>
</g>
</svg>

                </NuxtLink>
                <span class="task__goal-name">{{ selectedTask.goal }}</span>
                <div class="edit__menu-wrapper">
                    <EditDeleteMenu :icon="editIcon" @click="editMenu" aria-label="Меню редактирования"/>
                </div>
            </div>
            <div class="range__date-wrapper">
                <div class="range__date">
                    <div class="range__date-text">{{ t('taskDetails.startDate') }}</div>
                    <div class="range__date__data start">{{ formatDate(selectedTask.dateRange.start) }}</div>
                </div>
                <div class="range__date">
                    <div class="range__date-text">{{ t('taskDetails.endDate') }}</div>
                    <div class="range__date__data end">{{ formatDate(selectedTask.dateRange.end) }}</div>
                </div>
            </div>

            <div class="date__picker">
                <v-calendar
                        is-expanded
                        v-if="allowedDateRange.start && allowedDateRange.end"
                        :locale="locale"
                        :min-date="allowedDateRange.start"
                        :max-date="allowedDateRange.end"
                        :disabled-dates="disabledDates"
                        v-model="selectedDate"
                        @dayclick="onDateSelect"
                        :attributes="[...checkedDatesAttributes, ...activeDateAttributes]"
                />
            </div>

            <div class="task__details-btns">
                <div v-for="(btn, index) in ['done', 'missed']" :key="index" class="task__details-btn"
                     :class="[btn === 'done' ? 'check' : '', isDateMarked ? 'disabled' : '']">
                    <button
                            :disabled="isDateMarked"
                            @click="misscCheckClick(btn)"
                            class="update__task-btn"
                            :class="btn === 'done' ? 'check' : ''"
                            :aria-label="t(`checkedBtns.${btn}`)"
                    >
                        {{ t(`checkedBtns.${btn}`) }}
                    </button>
                    <div v-if="isDateMarked && selectedDate" class="btn__hint">
                        {{ t('taskDetails.dateAlreadyMarked') }}
                    </div>
                </div>
            </div>

            <!-- Кнопка для добавления заметок к выбранной дате -->
            <div v-if="selectedDate && (isDateMarked || hasDateNotes)" class="notes__btn-container">
                <button class="notes__btn" @click="openNotesModal">
                    <span class="notes__btn-icon">📝</span>
                    {{ hasDateNotes ? t('taskDetails.editNotes') : t('taskDetails.addNotes') }}
                </button>
            </div>

            <div class="progress__container-details">
                <ProgressBar
                        :progress="selectedTask.progress"
                        :progressMiss="selectedTask.progressMiss"
                        :history="selectedTask.history"
                        :size="190"
                        :padding="25"
                />
                <div class="progress__info">
                    <div class="progress__text">{{ t('taskDetails.progress') }}: {{ selectedTask.progress }}%</div>
                    <div class="progress__text">{{ t('taskDetails.missed') }}: {{ selectedTask.progressMiss }}%</div>
                </div>
            </div>

            <div class="checked-progress">
                <div class="checked__progress-wrapper">
                    <div class="checked__wrapper">
                        <img src="../assets/images/checkIcon.svg" alt="" class="checked__icon"/>
                        <span class="checked__text checked__green">{{ checkedCount }} {{
                            t('CheckedProgress.checked')
                            }}</span>
                    </div>
                    <div class="checked__wrapper">
                        <img src="../assets/images/noyChecked.svg" alt="" class="checked__icon"/>
                        <span class="checked__text">{{ missedCount }} {{ t('CheckedProgress.notChecked') }}</span>
                    </div>
                </div>
            </div>
            <!-- Заметки к задаче -->
            <div v-if="selectedTask.notes" class="task__notes">
                <div class="task__notes-title">{{ t('taskDetails.taskNotes') }}</div>
                <div class="task__notes-content">{{ selectedTask.notes }}</div>
            </div>
        </div>
    </div>
    <StepHint
            :steps="hintSteps"
            :show="showHints"
            @close="showHints = false"
    />
</template>

<script setup>
import {ref, computed, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import {useHabitStore} from "../stores/habitStore.js";
import ProgressBar from "../src/components/progressBar.vue";
import EditDeleteMenu from "../src/components/EditDeleteMenu.vue";
import EditIcon from '../assets/images/rubbish-bin.svg';
import {useI18n} from 'vue-i18n';
import Lottie from 'lottie-web';
import CongratsAmination from '../assets/animations/GratsAnimation.json'
import {useTaskStore} from '../stores/OfflineTaskStore.js'
import StepHint from '../src/components/StepHint.vue'

const {locale, t, te} = useI18n();

const showHints = ref(true);

// const hintSteps = [
//     {selector: '.task__icon-back', text: 'Нажмите, чтобы вернуться на главный экран'},
//     {selector: '.task__goal-name', text: 'Это название вашей цели'},
//     {selector: '.range__date-wrapper', text: 'Здесь отображаются даты начала и конца'},
//     {selector: '.vc-container', text: 'Выберите дату в этом календаре'},
//     {selector: '.task__details-btns', text: 'Отметьте выполнение задачи за выбранную дату'},
//     {selector: '.progress__container-details', text: 'Прогресс задачи отображается здесь'},
// ];

const animationBlock = ref(null);
const editIcon = ref(EditIcon);
const editState = ref(false);
const isOpen = ref(false);
const taskToDelete = ref(null);
const router = useRoute();
const isDateSelected = ref(false);
const checkedDates = ref([]);
const missedDates = ref([]);
const checkedCount = ref(0);
const missedCount = ref(0);
const habitStore = useHabitStore();
const selectedDate = ref(null);
const taskStore = useTaskStore();

const activeDateAttributes = computed(() => {
    if (!selectedDate.value) return [];
    return [{
        key: 'active-date',
        dates: [new Date(selectedDate.value + 'T00:00:00')],
        customData: {active: true}
    }];
});

const applausAudio = () => {
    const audio = new Audio('/sounds/cry.wav')
    audio.play()
}

const selectedTask = computed(() => {
    const id = router.query.id;
    const allTasks = [...habitStore.tasks, ...taskStore.tasks];
    return allTasks.find(task => task.id == id) || null;
});

const convertToDate = (date) => {
    return date && typeof date.toDate === "function" ? date.toDate() : new Date(date);
};

const getLocalDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatDateLocal = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getCurrentDate = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toLocaleDateString('en-CA');
};

// Добавляем состояние для уведомлений
const notification = ref({
    show: false,
    message: '',
    type: 'info' // 'info', 'success', 'error'
});

// Функция для отображения уведомлений
const showNotification = (message, type = 'info') => {
    notification.value = {
        show: true,
        message,
        type
    };

    // Автоматически скрываем уведомление через 3 секунды
    setTimeout(() => {
        closeNotification();
    }, 3000);
};

// Функция для закрытия уведомления
const closeNotification = () => {
    notification.value.show = false;
};

const misscCheckClick = (btn) => {
    if (!selectedTask.value) return;
    if (!selectedDate.value) {
        showNotification(t('taskDetails.selectDateFirst'), 'error');
        return;
    }

    const selDateStr = selectedDate.value;
    const taskStartStr = convertToDate(selectedTask.value.dateRange.start)
        .toLocaleDateString('en-CA');
    const taskEndStr = convertToDate(selectedTask.value.dateRange.end)
        .toLocaleDateString('en-CA');

    if (selDateStr < taskStartStr || selDateStr > taskEndStr) {
        showNotification(t('taskDetails.dateOutOfRange'), 'error');
        return;
    }

    if (checkedDates.value.includes(selDateStr) || missedDates.value.includes(selDateStr)) {
        showNotification(t('taskDetails.dateAlreadyMarked'), 'info');
        return;
    }

    // Добавляем дату в соответствующий массив и обновляем реактивные значения
    if (btn === "done") {
        if (!selectedTask.value.checkedDates) {
            selectedTask.value.checkedDates = [];
        }
        selectedTask.value.checkedDates.push(selDateStr);
        checkedDates.value = [...selectedTask.value.checkedDates];
        showNotification(t('taskDetails.taskMarkedAsDone'), 'success');
    } else if (btn === "missed") {
        if (!selectedTask.value.missedDates) {
            selectedTask.value.missedDates = [];
        }
        selectedTask.value.missedDates.push(selDateStr);
        missedDates.value = [...selectedTask.value.missedDates];
        showNotification(t('taskDetails.taskMarkedAsMissed'), 'info');
    }

    // Расчет прогресса
    const totalDays = Math.max(
        1,
        (new Date(taskEndStr) - new Date(taskStartStr)) / (1000 * 60 * 60 * 24) + 1
    );
    const step = (100 / totalDays).toFixed(2);

    if (!selectedTask.value.history) {
        selectedTask.value.history = [];
    }
    const currentProgress = selectedTask.value.progress || 0;
    const currentProgressMiss = selectedTask.value.progressMiss || 0;
    const remainingProgress = 100 - currentProgress - currentProgressMiss;
    if (remainingProgress <= 0) return;

    if (btn === "done") {
        selectedTask.value.history.push({
            color: "#4FC55C",
            percent: Math.min(parseFloat(step), remainingProgress),
        });
    } else if (btn === "missed") {
        selectedTask.value.history.push({
            color: "#FF5C00",
            percent: Math.min(parseFloat(step), remainingProgress),
        });
    }

    habitStore.updateTask(selectedTask.value);
    habitStore.updateProgress(selectedTask.value);
    habitStore.saveTasks();

    if (selectedTask.value.progress === 100) {
        setTimeout(() => {
            if (animationBlock.value) {
                const animSpeed = Lottie.loadAnimation({
                    container: animationBlock.value,
                    loop: true,
                    animationData: CongratsAmination,
                });
                animSpeed.setSpeed(0.4);
                applausAudio();
                showNotification(t('taskDetails.congratulations'), 'success');
            }
        }, 400);
    }
};

const allowedDateRange = computed(() => {
    if (selectedTask.value) {
        const start = convertToDate(selectedTask.value.dateRange.start);
        const end = convertToDate(selectedTask.value.dateRange.end);
        return {
            start: start.toLocaleDateString('en-CA'),
            end: end.toLocaleDateString('en-CA')
        };
    }
    return {start: null, end: null};
});

const onDateSelect = (day) => {
    if (!day || !day.id || !selectedTask.value) return;
    const selDate = new Date(day.id);
    selDate.setHours(0, 0, 0, 0);
    const taskStart = new Date(convertToDate(selectedTask.value.dateRange.start));
    taskStart.setHours(0, 0, 0, 0);
    const taskEnd = new Date(convertToDate(selectedTask.value.dateRange.end));
    taskEnd.setHours(0, 0, 0, 0);

    if (selDate < taskStart || selDate > taskEnd) {
        console.log("Дата вне диапазона", formatDateLocal(selDate));
        return;
    }
    isDateSelected.value = true;
    selectedDate.value = formatDateLocal(selDate);
    console.log("Выбрана", selectedDate.value);
};

const disabledDates = computed(() => {
    return selectedTask.value?.blockedDates || [];
});

const loadTask = () => {
    habitStore.loadTasks();
    if (selectedTask.value) {
        const savedCheckedDates = localStorage.getItem(`task_${selectedTask.value.id}_checkedDates`);
        if (savedCheckedDates) {
            checkedDates.value = JSON.parse(savedCheckedDates);
            selectedTask.value.checkedDates = [...checkedDates.value];
        }
        const savedMissedDates = localStorage.getItem(`task_${selectedTask.value.id}_missedDates`);
        if (savedMissedDates) {
            missedDates.value = JSON.parse(savedMissedDates);
            selectedTask.value.missedDates = [...missedDates.value];
        }
    }
};

onMounted(() => {
    loadTask();
    if (selectedTask.value) {
        checkedCount.value = selectedTask.value.checkedDates?.length || 0;
        missedCount.value = selectedTask.value.missedDates?.length || 0;
    }
    // if (allowedDateRange.value.start && allowedDateRange.value.end) {
    //     const today = getLocalDate();
    //     if (new Date(today) >= new Date(allowedDateRange.value.start) && new Date(today) <= new Date(allowedDateRange.value.end)) {
    //         selectedDate.value = today;
    //     } else {
    //         selectedDate.value = allowedDateRange.value.start;
    //     }
    // }
});

const checkedDatesAttributes = computed(() => {
    return [
        ...checkedDates.value.map(date => ({
            key: `checked-${date}`,
            dates: [new Date(date + 'T00:00:00')],
            highlight: {contentClass: "vc-highlight-green"},
        })),
        ...missedDates.value.map(date => ({
            key: `missed-${date}`,
            dates: [new Date(date + 'T00:00:00')],
            highlight: {contentClass: "vc-highlight-red"},
        })),
    ];
});

const isDateMarked = computed(() => {
    const date = selectedDate.value;
    if (!date) return true; // Если дата не выбрана – кнопки блокируются
    const today = getLocalDate(); // Получаем сегодняшнюю дату в формате 'YYYY-MM-DD'
    if (date !== today) return true; // Если выбрана не сегодняшняя дата – кнопки блокируются
    // Если выбранная дата сегодня, то проверяем, отмечена ли она уже
    return checkedDates.value.includes(date) || missedDates.value.includes(date);
});

const clearTask = async (taskId) => {
    if (!taskId) return;

    if (habitStore.tasks.find(t => t.id === taskId)) {
        habitStore.removeTask(taskId);
    } else {
        await taskStore.archiveTask(taskId);
    }

    const allTasks = [...habitStore.tasks, ...taskStore.tasks];
    checkedCount.value = allTasks.reduce((sum, task) => sum + (task.checkedDates?.length || 0), 0);
    missedCount.value = allTasks.reduce((sum, task) => sum + (task.missedDates?.length || 0), 0);
};

const cancelDelete = () => {
    taskToDelete.value = null;
    isOpen.value = false;
    editState.value = false;
};

const editMenu = () => {
    isOpen.value = true;
};

const openConfirmWindow = (taskId) => {
    taskToDelete.value = taskId;
    isOpen.value = false;
    editState.value = true;
};
onMounted(() => {
    if (localStorage.getItem('hints_shown') !== 'true') {
        showHints.value = true
        localStorage.setItem('hints_shown', 'true')
    }
})
const formatDate = (date) => {
    const d = convertToDate(date);
    return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

watch(selectedTask, (newTask) => {
    if (!newTask) return;
    checkedDates.value = newTask.checkedDates || [];
    missedDates.value = newTask.missedDates || [];
    // if (allowedDateRange.value.start && allowedDateRange.value.end) {
    //     const today = getLocalDate();
    //     if (
    //         new Date(today) >= new Date(allowedDateRange.value.start) &&
    //         new Date(today) <= new Date(allowedDateRange.value.end)
    //     ) {
    //         selectedDate.value = today;
    //     } else {
    //         selectedDate.value = allowedDateRange.value.start;
    //     }
    // }
}, {immediate: true});

// Функция для открытия модального окна заметок
const openNotesModal = () => {
    if (!selectedDate.value) return;

    // Загружаем существующие заметки для выбранной даты
    const notes = getDateNotes(selectedDate.value);
    dateNotes.value = notes || '';

    showNotesModal.value = true;
};

// Функция для закрытия модального окна заметок
const closeNotesModal = () => {
    showNotesModal.value = false;
    dateNotes.value = '';
};

// Функция для сохранения заметок к дате
const saveDateNotes = () => {
    if (!selectedDate.value) return;

    // Сохраняем заметки в localStorage
    const notesKey = `task_${selectedTask.value.id}_notes_${selectedDate.value}`;
    localStorage.setItem(notesKey, dateNotes.value);

    showNotification(t('taskDetails.notesSaved'), 'success');
    closeNotesModal();
};

// Функция для получения заметок к дате
const getDateNotes = (date) => {
    if (!selectedTask.value || !date) return '';

    const notesKey = `task_${selectedTask.value.id}_notes_${date}`;
    return localStorage.getItem(notesKey) || '';
};

// Проверка наличия заметок для выбранной даты
const hasDateNotes = computed(() => {
    if (!selectedDate.value) return false;
    return !!getDateNotes(selectedDate.value);
});

// Функция для форматирования даты для отображения
const formatDateForDisplay = (date) => {
    if (!date) return '';

    const d = new Date(date);
    return d.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};


const isDateMissed = (date) => {
    if (!selectedTask.value || !selectedTask.value.missedDates) return false;
    return selectedTask.value.missedDates.includes(date);
};

const isDateActive = (date) => {
    if (!selectedTask.value) return false;

    const taskDate = new Date(date);
    const startDate = new Date(selectedTask.value.dateRange.start);
    const endDate = new Date(selectedTask.value.dateRange.end);

    return taskDate >= startDate && taskDate <= endDate;
};

const isDateInactive = (date) => {
    return !isDateActive(date);
};

const getDateStatus = (date) => {
    if (isDateChecked(date)) return 'completed'
    if (isDateMissed(date)) return 'missed'
    if (isDateActive(date)) return 'active'
    return 'inactive'
}

const getStatusText = (status) => {
    const key = `taskDetails.${status}`
    return safeTranslate(key)
}
</script>
<style>
.animation__block {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 10;
    transform: translateY(-50%);
}

.vc-highlight-red {
    background-color: #FF3030 !important;
    color: white !important;
}

.vc-highlight-green {
    background-color: #00D100 !important;
    color: white !important;
}

.vc-highlight-light-bg {
    background: white;
}

.vc-highlight-bg-solid {
    background-color: #4FC55C;
}

.vc-highlight-bg-light {
    background-color: var(--vc-highlight-bg);
}

.vc-blue {
    border: none;
}

.vc-header .vc-arrow {
    color: var(--vc-arrow-cal);
}

.vc-container {
    width: 100%;
    border: none;
    background: var(--background-color);
    padding: 10px;
}

.vc-header .vc-title {
    color: var(--text-color);
    background: none;
    font-size: 20px;
}

.vc-header {
    margin-top: 0;
}

.vc-highlight-content-light {
    color: var(--text-color);
}

.vc-day, .vc-weekday {
    color: var(--text-color);
}

.task__details__arrow-icon {
    width: 40px;
}

.checked__wrapper {
    display: flex;
    align-items: center;
}

.checked__text {
    text-align: start;
    font-size: 16px;
    font-family: "Nunito", serif;
    line-height: 21.82px;
    padding: 3px;
    color: var(--text-color);
}

.checked__progress-wrapper {
    margin-top: 10px;
}

.checked-progress {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
}

.progress__container-details {
    margin-top: 14px;
}

.task__details-btns {
    display: flex;
    justify-content: space-between;
}

.range__date-text {
    font-size: 13px;
    color: var(--text-color);
    font-family: "Nunito", serif;
}

.range__date__data {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
    font-family: "Nunito", serif;
}

.edit__menu-item {
    font-size: 12px;
    margin: 2px;
    padding: 2px;
    color: var(--text-color);
    border-radius: 5px;
    font-weight: 400;
}

.edit__menu-list {
    width: 78px;
    background: #4FC55C;
    padding: 4px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    right: 0;
}

.task__goal-name {
    font-size: 18px;
    color: var(--text-color);
}

.edit__menu-wrapper {
    position: relative;
}

.task__details-btn {
    margin-top: 5px;
    width: 47%;
    padding: 5px;
}

.update__date-wrapper {
    width: 100%;
    height: 100vh;
    padding: 16px 20px 2px 20px;
    overflow: auto;
    position: relative;
    background-color: var(--background-color);
}

.range__date-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 2px 10px;
}

.task__name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    padding: 0 10px 10px 10px;
    font-family: "Nunito", serif;
    font-weight: 600;
}

.task__icon-back {
    width: 35px;
    height: 35px;
    color: var(--text-color);
    padding: 4px;
    border-radius: 50%;
}

.update__task-btn {
    width: 100%;
    padding: 12px 20px;
    border: none;
    font-size: 18px;
    border-radius: 10px;
    background: #FF5C00;
    color: var(--text-color);
    font-family: "Nunito", serif;
}

.update__task-btn.check {
    background: #4FC55C;
}

.confirm__window.show__confirm {
    height: 125px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
}

.confirm__window {
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
}

.confirm__content-wrapper {
    background: var(--footer-bg);
    width: 100%;
    height: 100%;
}

.confirm__title {
    padding: 15px;
    color: var(--text-color);
    text-align: center;
    font-size: 24px;
    font-family: "Nunito", serif;
    font-weight: 600;
}

.confirm__btns {
    display: flex;
    justify-content: center;
}

.confirm__btn.btn-green {
    background: #4FC55C;
}

.confirm__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    margin: 0 5px;
    font-size: 18px;
    padding: 5px;
    border-radius: 10px;
    border: none;
    background: #FF5C00;
    color: var(--text-color);
    font-family: "Nunito", serif;
}

/* Стили для уведомлений */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-width: 350px;
    animation: slideIn 0.3s ease-out;
}

.notification.success {
    background-color: rgba(79, 197, 92, 0.9);
    color: white;
}

.notification.error {
    background-color: rgba(255, 92, 0, 0.9);
    color: white;
}

.notification.info {
    background-color: rgba(0, 188, 212, 0.9);
    color: white;
}

.notification__icon {
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
}

.notification__message {
    flex-grow: 1;
    font-size: 14px;
}

.notification__close {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Стили для подсказок кнопок */
.btn__hint {
    font-size: 12px;
    color: var(--text-color);
    opacity: 0.7;
    margin-top: 5px;
    text-align: center;
}

/* Стили для информации о прогрессе */
.progress__info {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.progress__text {
    font-size: 14px;
    color: var(--text-color);
}

/* Стили для статистики */
.task__stats {
    margin: 20px 0;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task__stats-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    font-family: "Nunito", sans-serif;
}

.task__stats-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 20px;
}

.task__stats-item {
    text-align: center;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    transition: transform 0.2s ease, background-color 0.2s ease;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.task__stats-item:hover {
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.12);
}

.task__stats-label {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.9;
    margin-bottom: 8px;
    font-weight: 500;
    font-family: "Nunito", sans-serif;
    line-height: 1.2;
}

.task__stats-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    font-family: "Nunito", sans-serif;
}

/* Стили для отключенных кнопок */
.task__details-btn.disabled .update__task-btn {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Стили для описания в окне подтверждения */
.confirm__description {
    padding: 0 15px 15px;
    color: var(--text-color);
    text-align: center;
    font-size: 14px;
    opacity: 0.8;
}

/* Стили для модального окна редактирования */
.edit__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.edit__modal-content {
    background-color: var(--background-color);
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.edit__modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.edit__modal-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
}

.edit__modal-close {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 24px;
    cursor: pointer;
}

.edit__modal-body {
    padding: 20px;
}

.edit__form-group {
    margin-bottom: 20px;
}

.edit__label {
    display: block;
    font-size: 14px;
    color: var(--text-color);
    margin-bottom: 8px;
}

.edit__input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-color);
    font-size: 14px;
}

.edit__textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-color);
    font-size: 14px;
    min-height: 100px;
    resize: vertical;
}

.edit__date-range {
    display: flex;
    gap: 10px;
}

.edit__date-input {
    flex: 1;
}

.edit__date-label {
    display: block;
    font-size: 12px;
    color: var(--text-color);
    margin-bottom: 5px;
}

.edit__modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.edit__btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

.edit__btn-cancel {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
}

.edit__btn-save {
    background-color: #4FC55C;
    color: white;
}

/* Стили для модального окна заметок */
.notes__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.notes__modal-content {
    background-color: var(--background-color);
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.notes__modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.notes__modal-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
}

.notes__modal-close {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 24px;
    cursor: pointer;
}

.notes__modal-body {
    padding: 20px;
}

.notes__textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-color);
    font-size: 14px;
    min-height: 150px;
    resize: vertical;
}

.notes__modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.notes__btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

.notes__btn-cancel {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
}

.notes__btn-save {
    background-color: #4FC55C;
    color: white;
}

/* Стили для кнопки заметок */
.notes__btn-container {
    display: flex;
    justify-content: center;
    margin: 15px 0;
}

.notes__btn {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    background-color: rgba(0, 188, 212, 0.2);
    color: var(--text-color);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.notes__btn:hover {
    background-color: rgba(0, 188, 212, 0.3);
    transform: translateY(-2px);
}

.notes__btn-icon {
    margin-right: 8px;
    font-size: 16px;
}

/* Стили для расширенной статистики */
.task__stats-details {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.task__stats-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 15px;
}

.task__stats-detail {
    text-align: center;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    transition: transform 0.2s ease, background-color 0.2s ease;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.task__stats-detail:hover {
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.12);
}

.task__stats-detail-label {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.9;
    margin-bottom: 8px;
    font-weight: 500;
    font-family: "Nunito", sans-serif;
    line-height: 1.2;
}

.task__stats-detail-value {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-color);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    font-family: "Nunito", sans-serif;
}

/* Стили для графика активности */
.task__activity-chart {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.task__activity-title {
    font-size: 18px;
    color: var(--text-color);
    margin-bottom: 20px;
    text-align: center;
    font-weight: 600;
}

.task__activity-bars {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 50px;
    gap: 8px;
    padding: 0 10px;
}

.task__activity-bar {
    flex: 1;
    min-height: 15px;
    border-radius: 6px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
}

.task__activity-bar:hover {
    transform: scaleY(1.2);
}

.task__activity-bar.completed {
    background-color: #4FC55C;
    box-shadow: 0 0 10px rgba(79, 197, 92, 0.3);
}

.task__activity-bar.missed {
    background-color: #FF5C00;
    box-shadow: 0 0 10px rgba(255, 92, 0, 0.3);
}

.task__activity-bar.active {
    background-color: rgba(255, 255, 255, 0.2);
}

.task__activity-bar.inactive {
    background-color: rgba(255, 255, 255, 0.05);
}

/* Стили для заметок к задаче */
.task__notes {
    margin-top: 20px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task__notes-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 15px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.task__notes-content {
    font-size: 14px;
    color: var(--text-color);
    line-height: 1.6;
    white-space: pre-wrap;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}
</style>