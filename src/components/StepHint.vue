<template>
    <div v-if="show" class="step-hint-overlay">
        <div :style="highlightPosition" class="highlight-box"></div>

        <div class="step-hint" :style="hintPosition">
            <div class="step-hint__text">
                <span class="step-hint__counter">Шаг {{ currentStep + 1 }} из {{ props.steps.length }}</span>
                <p>{{ props.steps[currentStep].text }}</p>
            </div>
            <div class="step-hint__buttons">
                <button @click="close" class="btn-skip">Пропустить</button>
                <button v-if="currentStep > 0" @click="prevStep">Назад</button>
                <button @click="nextStep">Далее</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
    steps: Array,
    show: Boolean
})

const emit = defineEmits(['close'])
const currentStep = ref(0)

const getElementRect = (selector) => {
    const el = document.querySelector(selector)
    return el?.getBoundingClientRect()
}

const hintPosition = computed(() => {
    const rect = getElementRect(props.steps[currentStep.value]?.selector)
    if (!rect) return {}
    return {
        position: 'absolute',
        top: `${rect.bottom + 12 + window.scrollY}px`,
        left: `${rect.left}px`,
    }
})

const highlightPosition = computed(() => {
    const rect = getElementRect(props.steps[currentStep.value]?.selector)
    if (!rect) return {}
    return {
        top: `${rect.top + window.scrollY - 6}px`,
        left: `${rect.left - 6}px`,
        width: `${rect.width + 12}px`,
        height: `${rect.height + 12}px`
    }
})

const nextStep = () => {
    if (currentStep.value < props.steps.length - 1) {
        currentStep.value++
    } else {
        close()
    }
}

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--
    }
}

const close = () => {
    emit('close')
}
</script>

<style scoped>
.step-hint-overlay {
    position: fixed;
    z-index: 9999;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    animation: fade-in 0.3s ease;
}

.highlight-box {
    position: absolute;
    border: 2px solid #4FC55C;
    border-radius: 8px;
    box-shadow: 0 0 15px #4FC55C;
    pointer-events: none;
    transition: all 0.3s ease;
}

.step-hint {
    position: absolute;
    background: white;
    color: #333;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    width: 260px;
    z-index: 99999;
    animation: slide-up 0.3s ease;
}

.step-hint__text {
    margin-bottom: 10px;
}

.step-hint__counter {
    display: block;
    font-size: 13px;
    color: #999;
    margin-bottom: 4px;
}

.step-hint__buttons {
    display: flex;
    justify-content: space-between;
    gap: 8px;
}

.step-hint__buttons button {
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
}

.step-hint__buttons button:hover {
    opacity: 0.9;
}

.btn-skip {
    background: transparent;
    color: #888;
}

.step-hint__buttons button:last-child {
    background: #4FC55C;
    color: white;
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slide-up {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>
