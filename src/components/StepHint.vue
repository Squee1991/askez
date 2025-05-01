<template>
    <div v-if="show && currentStep" class="step-hint-overlay">
        <div class="step-hint-backdrop" @click="skipHint"></div>
        <div
            v-if="highlightStyle"
            class="step-hint-highlight"
            :style="highlightStyle"
        />
        <div
            v-if="tooltipStyle"
            class="step-hint-tooltip"
            :style="tooltipStyle"
        >
            <div class="step-hint-text">{{ $t(currentStep.text) }}</div>
            <div class="step-hint-actions">
                <button @click="skipHint" class="hint-btn skip">{{ $t('stepHint.skip')}}</button>
                <button @click="nextStep" class="hint-btn next">
                    {{ isLastStep ? $t('stepHint.done') : $t('stepHint.further') }} →
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
    steps: Array,
    show: Boolean
});
const emit = defineEmits(['close']);

const stepIndex = ref(0);
const currentStep = computed(() => props.steps[stepIndex.value] || null);
const isLastStep = computed(() => stepIndex.value === props.steps.length - 1);

const tooltipStyle = ref(null);
const highlightStyle = ref(null);

const updatePosition = () => {
    const selector = currentStep.value?.selector;
    const target = document.querySelector(selector);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const tooltipHeight = 80;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const showAbove = rect.bottom + tooltipHeight + 10 > viewportHeight;
    tooltipStyle.value = {
        top: `${showAbove ? rect.top - tooltipHeight - 10 : rect.bottom + 10}px`,
        left: `${Math.max(rect.left, 10)}px`,
        maxWidth: '260px',
        position: 'absolute'
    };

    highlightStyle.value = {
        top: `${rect.top - 6}px`,
        left: `${rect.left - 6}px`,
        width: `${rect.width + 12}px`,
        height: `${rect.height + 12}px`
    };
};

const nextStep = () => {
    if (isLastStep.value) {
        emit('close');
    } else {
        stepIndex.value++;
        nextTick(updatePosition);
    }
};

const skipHint = () => {
    emit('close');
};

watch(() => props.show, (val) => {
    if (val) {
        stepIndex.value = 0;
        nextTick(updatePosition);
    }
});

onMounted(() => {
    if (props.show) nextTick(updatePosition);
});
</script>
<style scoped>
.step-hint-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    pointer-events: none;
}

.step-hint-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
}

.step-hint-tooltip {
    background: white;
    color: #333;
    padding: 14px 16px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    font-family: "Nunito", sans-serif;
    pointer-events: auto;
}

.step-hint-text {
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 10px;
}

.step-hint-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.hint-btn {
    padding: 6px 12px;
    font-size: 13px;
    font-family: "Nunito", sans-serif;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.hint-btn.skip {
    background: transparent;
    color: #999;
}

.hint-btn.next {
    background: #4FC55C;
    color: white;
}

.step-hint-highlight {
    position: absolute;
    border: 3px solid #4FC55C;
    border-radius: 10px;
    box-sizing: border-box;
    pointer-events: none;
    transition: all 0.3s ease;
    z-index: 10000;
}
</style>
