<script setup>
import {useHabitStore} from '../../stores/habitStore.js'
import {computed} from "vue";
import CheckedIcon from '../../assets/images/checkIcon.svg'
import CheckedNotFull from '../../assets/images/checkNotFull.svg'
import InProgressIcon from '../../assets/images/in-progress.svg'

const counter = useHabitStore()
const tasks = computed(() => counter.tasks);

const currenticon = (task) => {
    if (task.progress === 100) {
        return CheckedIcon
    } else if (task.progress + task.progressMiss === 100) {
        return CheckedNotFull
    } else {
        return InProgressIcon
    }
}

const completionColor = computed(() => {
    const progress = counter.completionRate;
    if (progress === 100) return "#388E3C";
    if (progress >= 80) return "#38b840";
    if (progress >= 60) return "#FFA500";
    if (progress >= 40) return "#D38B5D";
    if (progress >= 20) return "#B24C39";
    if (progress < 20 && progress >= 0) return "#a10505";
    if (progress === 0) return "#3c3f47"
});

</script>

<template>
    <div class="stats__content">
        <div class="stats__banner-content">
            <div class="stats__left">
                <div class="stats__text">{{ $t('navTop.stats') }}</div>
                <div class="total__task">{{ $t('statslable.total') }}:
                    <span class="askez__counter">{{ counter.amountOfTask }}</span>
                </div>
                <div class="total__task">{{ $t('statslable.doneTotal') }}:
                    <span class="askez__counter">{{ counter.doneTask.length }}</span>
                </div>
                <div class="total__task">{{ $t('statslable.InProgressTotal') }}:
                    <span class="askez__counter"> {{ counter.notdone.length }}</span>
                </div>
            </div>
            <div class="stats__right" :style="{ color: completionColor }">{{ counter.completionRate }}
                <span class="procent">%</span>
            </div>
        </div>
        <div v-if="tasks.length" class="stat__task-wrapper">
            <div v-for="task in tasks" class="stat">
                <div class="title__status">
                    <div class="task__done__name">{{ $t('infoLabels.name') }}</div>
                    <div class="task__done__name">{{ $t('infoLabels.status') }}</div>
                </div>
                <div class="task__status">
                    <div class="tasks__name">{{ task.goal }}</div>
                    <img class="done__img" :src="currenticon(task)" alt="">
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

.stat__task-wrapper {
    overflow-y: auto;
    margin-bottom: 50px;
    max-height: calc(100vh - 120px);
}

.done__img {
    width: 30px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.stats__content {
    width: 100%;
    padding: 5px 20px;
}

.stats__text {
    letter-spacing: 1px;
    font-size: 28px;
    color: var(--text-color);
    font-weight: bold;
    font-family: "Acme", serif;
}

.stats__banner-content {
    padding: 5px 15px 5px 20px;
    background: #4CAF50;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stats__right {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 30px;
    font-weight: bold;
    font-family: "Acme", serif;
    background: #94ea97;
    width: 87px;
    height: 87px;
    padding: 15px;
}

.procent {
    font-size: 28px;
}

.tasks__name {
    display: flex;
    align-items: center;
    letter-spacing: 1px;
    font-size: 13px;
    font-weight: 400;
    font-family: "Acme", serif;
    color: var(--text-color);
}

.total__task {
    color: var(--text-color);
    display: flex;
    align-items: center;
    font-family: "Acme", serif;
    letter-spacing: 1px;
}

.askez__counter {
    font-size: 18px;
    font-weight: bold;
    margin-left: 5px;
}

.title__status {
    margin-top: 10px;
    padding: 8px 10px;
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    align-items: center;
}

.task__done__name {
    letter-spacing: 1px;
    font-size: 20px;
    font-weight: bold;
    color: var(--text-color);
    font-family: "Acme", serif;
}

.stat {
    background: var(--menu--btn-bg);
    border-radius: 10px;
    padding: 0 15px 0 10px;
}

.task__status {
    padding: 0 10px 8px 10px;
    display: flex;
    justify-content: space-between;
}
</style>