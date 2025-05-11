<template>
    <div class="accumulation-goal">
        <div class="accumulation-goal-header">
<!--            <h3 class="goal-title">{{ goal.title }}</h3>-->
        </div>
<!--        <div class="goal-progress-text">-->
<!--            {{ goal.progress }} {{ goal.unit }} / {{ goal.target }} {{ goal.unit }}-->
<!--        </div>-->

<!--        <div class="progress-bar-bg">-->
<!--            <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"/>-->
<!--        </div>-->
        <JourneyGrid :entries="goal.entries" @select="handleSelect" />

    </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import JourneyGrid from '../components/journeyGrid.vue'

const props = defineProps({
    goal: Object
})

const emit = defineEmits(['update'])
const inputValue = ref('')
const selectedDay = ref(null)
const showModal = ref(false)

const progressPercent = computed(() =>
    Math.min((props.goal.progress / props.goal.target) * 100, 100)
)
const handleSelect = ({ day, checked }) => {
    const entries = props.goal.entries || []

    if (checked) {
        if (!entries.find(e => e.day === day)) {
            entries.push({
                day,
                value: 1,
                note: '',
                date: new Date().toLocaleDateString()
            })
        }
    } else {
        const index = entries.findIndex(e => e.day === day)
        if (index !== -1) {
            entries.splice(index, 1)
        }
    }

    const updatedGoal = {
        ...props.goal,
        entries: [...entries],
        progress: entries.reduce((sum, e) => sum + (e.value || 0), 0)
    }

    emit('update', updatedGoal)
}

</script>

<style scoped>
.accumulation-goal {
    margin-bottom: 12px;
    overflow: hidden;
    border-radius: 1.5rem;
    box-shadow: 0 4px 10px rgba(120, 66, 255, 0.05);
    transition: .6s;
}

.accumulation-goal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.goal-title {
    font-size: 18px;
    font-weight: 700;
    color: #4c1d95;
    font-family: "Nunito", sans-serif;
}

.goal-progress-text {
    font-size: 20px;
    color: #6b21a8;
    margin: 10px 0;
    text-align: center;
    font-weight: 600;
}

.progress-bar-bg {
    width: 100%;
    height: 35px;
    background-color: #e9d5ff;
    border-radius: 10px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background-color: #a78bfa;
    transition: width 0.4s ease;
}

.goal-history {
    margin-top: 20px;
    border-top: 1px solid #e9d5ff;
    padding-top: 16px;
    font-size: 1rem;
    color: #6b21a8;
}

.history-title {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 26px;
    font-family: "Nunito", sans-serif;
}

.history-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 6px;
}

.history-item {
    background: #f4f0ff;
    border: 1px solid #e9d5ff;
    border-radius: 16px;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Nunito", sans-serif;
    box-shadow: 0 2px 6px rgba(120, 66, 255, 0.06);
    transition: 0.2s ease;
}

.history-item:hover {
    background: #ece6ff;
}

.history-item span:first-child {
    font-weight: 600;
    font-size: 0.95rem;
}

.history-item span:last-child {
    font-weight: 700;
    font-size: 1rem;
    color: #7e22ce;
}

.goal-completed {
    margin-top: 10px;
    font-size: 1.2rem;
    color: #7c3aed;
    text-align: center;
    font-weight: 700;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
}
</style>
