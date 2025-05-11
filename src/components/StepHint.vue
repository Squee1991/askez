<template>
    <div v-if="show && currentStepData" class="step-hint-overlay">
        <div class="step-hint-box" :style="hintBoxStyle">
            <p class="step-hint-text">{{ $t(currentStepData.text) }}</p>
            <p v-if="currentStepData.description" class="step-hint-description">
                {{ $t(currentStepData.description) }}
            </p>
            <div class="step-hint-controls">
                <button @click="prevStep" :disabled="currentStep === 0">← {{ $t('common.prev') }}</button>
                <button class="skip-btn" @click="finish">{{ $t('stepHint.skip') }}</button>
                <button @click="nextStep">
                    {{ isLastStep ? $t('stepHint.done') : $t('stepHint.further') }} →
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick, watchEffect, onBeforeUnmount } from 'vue'

const props = defineProps({
    steps: Array,
    show: Boolean
})
const emit = defineEmits(['finish'])

const currentStep = ref(0)
const hintBoxStyle = ref({})
const currentStepData = computed(() => props.steps?.[currentStep.value] || null)
const isLastStep = computed(() => currentStep.value === props.steps.length - 1)

let highlightedElement = null

function nextStep() {
    if (isLastStep.value) finish()
    else currentStep.value++
}

function prevStep() {
    if (currentStep.value > 0) currentStep.value--
}

function finish() {
    removeHighlight()
    emit('finish')
}

function removeHighlight() {
    if (highlightedElement) {
        highlightedElement.classList.remove('step-hint-highlight')
        highlightedElement = null
    }
}

function highlightAndPosition() {
    try {
        const selector = currentStepData.value?.selector
        if (!selector) return

        const el = document.querySelector(selector)
        if (!el) {
            console.warn(`[StepHint] ❌ Element not found for selector: ${selector}`)
            return
        }

        console.log(`[StepHint] ✅ Element found: ${selector}`, el)

        removeHighlight()
        el.classList.add('step-hint-highlight')

        const computed = getComputedStyle(el)
        if (!['relative', 'absolute', 'fixed'].includes(computed.position)) {
            el.style.position = 'relative'
        }

        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        highlightedElement = el

        updateHintBoxPosition(el)
    } catch (err) {
        console.error('[StepHint] 🚨 highlightAndPosition error:', err)
    }
}

function updateHintBoxPosition(el) {
    try {
        if (!el) return

        nextTick(() => {
            const rect = el.getBoundingClientRect?.()
            if (!rect) return

            const boxWidth = 320
            const screenWidth = window.innerWidth
            const screenHeight = window.innerHeight

            let top = rect.bottom + 10
            let left = rect.left

            if (left + boxWidth > screenWidth) left = screenWidth - boxWidth - 16
            if (top + 200 > screenHeight) top = rect.top - 210

            hintBoxStyle.value = {
                top: `${Math.max(top, 16)}px`,
                left: `${Math.max(left, 16)}px`
            }
        })
    } catch (err) {
        console.error('[StepHint] 🚨 updateHintBoxPosition error:', err)
    }
}

watchEffect(() => {
    if (props.show && currentStepData.value?.selector) {
        nextTick(() => highlightAndPosition())
    }
})

defineExpose({ retryHighlight: highlightAndPosition })
onBeforeUnmount(removeHighlight)
</script>

<style>
.step-hint-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
}

.step-hint-box {
    position: absolute;
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    max-width: 320px;
    width: max-content;
    z-index: 10000;
}

.step-hint-text {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 8px;
}

.step-hint-description {
    font-size: 14px;
    margin-bottom: 12px;
    color: #555;
}

.step-hint-controls {
    display: flex;
    justify-content: space-between;
    gap: 8px;
}

.step-hint-controls button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}

.step-hint-controls button:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
}

.skip-btn {
    background-color: transparent;
    color: #888;
    border: 1px solid #ccc;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}

.skip-btn:hover {
    background: #eee;
}

.step-hint-highlight {
    position: relative !important;
    z-index: 10001 !important;
    animation: hintShake 0.4s ease-in-out;
}

.step-hint-highlight::after {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 3px solid #22c55e;
    border-radius: 12px;
    pointer-events: none;
    box-shadow: 0 0 15px 4px rgba(34, 197, 94, 0.5);
    animation: hintPulse 1.5s ease-in-out infinite;
    z-index: 9999;
    box-sizing: content-box;
}

@keyframes hintPulse {
    0% {
        opacity: 0.5;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.04);
    }
    100% {
        opacity: 0.5;
        transform: scale(1);
    }
}
</style>
