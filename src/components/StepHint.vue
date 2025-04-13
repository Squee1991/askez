<template>
    <div v-if="show" class="step-hint-container">
        <div v-for="(step, index) in steps" :key="index"
             class="step-hint"
             :class="{ 'show': currentStep === index }"
             :style="{ top: getElementPosition(step.selector) }">
            <div class="step-hint-content">
                <div class="step-hint-header">
                    <div class="step-hint-counter">{{ currentStep + 1 }}/{{ steps.length }}</div>
                    <button @click="close" class="step-hint-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="step-hint-text">{{ step.text }}</div>
                <div class="step-hint-controls">
                    <button v-if="currentStep > 0" @click="prevStep" class="step-hint-btn prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Назад
                    </button>
                    <button v-if="currentStep < steps.length - 1" @click="nextStep" class="step-hint-btn next">
                        Далее
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    <button v-else @click="close" class="step-hint-btn finish">
                        Завершить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    steps: {
        type: Array,
        required: true
    },
    show: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])
const currentStep = ref(0)

const nextStep = () => {
    if (currentStep.value < props.steps.length - 1) {
        currentStep.value++
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

const getElementPosition = (selector) => {
    const element = document.querySelector(selector)
    if (element) {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const hintHeight = 150 // Примерная высота подсказки

        // Проверяем, поместится ли подсказка под элементом
        if (rect.bottom + hintHeight > windowHeight) {
            // Если не помещается, показываем над элементом
            return `${rect.top - hintHeight + window.scrollY}px`
        } else {
            // Если помещается, показываем под элементом
            return `${rect.bottom + window.scrollY}px`
        }
    }
    return '0px'
}

const updatePositions = () => {
    // Обновляем позиции подсказок при изменении размера окна
    if (props.show) {
        currentStep.value = currentStep.value
    }
}

onMounted(() => {
    window.addEventListener('resize', updatePositions)
    window.addEventListener('scroll', updatePositions)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePositions)
    window.removeEventListener('scroll', updatePositions)
})
</script>

<style scoped>
.step-hint-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    pointer-events: none;
}

.step-hint {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
    max-width: 90%;
    width: 350px;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.step-hint.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.step-hint-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.step-hint-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
}

.step-hint-counter {
    font-size: 14px;
    color: var(--text-color);
    opacity: 0.7;
}

.step-hint-close {
    background: none;
    border: none;
    color: var(--text-color);
    opacity: 0.7;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, opacity 0.2s ease;
}

.step-hint-close:hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 1;
}

.step-hint-text {
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
    color: var(--text-color);
    line-height: 1.5;
}

.step-hint-controls {
    display: flex;
    gap: 10px;
    width: 100%;
}

.step-hint-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    background-color: var(--primary-color);
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
    font-size: 14px;
    font-weight: 500;
    flex: 1;
}

.step-hint-btn:hover {
    background-color: var(--primary-color-dark);
    transform: translateY(-2px);
}

.step-hint-btn:active {
    transform: translateY(0);
}

.step-hint-btn.prev {
    background-color: var(--secondary-color);
}

.step-hint-btn.finish {
    background-color: var(--success-color);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .step-hint {
        width: 90%;
        max-width: 350px;
        padding: 15px;
    }

    .step-hint-text {
        font-size: 14px;
    }

    .step-hint-btn {
        padding: 8px 12px;
        font-size: 13px;
    }
}

/* Анимация появления подсказки */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.step-hint.show {
    animation: fadeIn 0.3s ease forwards;
}
</style>
