<template>
    <div class="tracker">
        <div v-if="isDelete" class="error__window">
            <div class="delete__content">
                <div class="tacker__delete-text">{{ $t('journeyDelete.title') }}</div>
                <div class="tacker__delete-subtext">{{ $t('journeyDelete.text') }}</div>
                <div class="delete__btns">
                    <span @click="clearJourney" class="delete__btn btn-confirm">{{ $t('delAllDatas.acceptBtn') }}</span>
                    <span @click="notDeleteJourney" class="delete__btn btn-cancel">{{
                        $t('delAllDatas.rejectBtn')
                        }}</span>
                </div>
            </div>
        </div>
        <div class="tracker-wrapper">
            <div class="tracker__header">
                <HeaderWithBack :icon="ArrowBack" :title="$t('DescriptionBtn.way')"/>
            </div>
            <div class="goal-tabs">
                <button
                        class="goal-tab"
                        :class="{ active: !isViewingActiveGoals }"
                        @click="isViewingActiveGoals = false">{{ $t('DescriptionBtn.list') }}
                </button>
                <button
                        class="goal-tab"
                        :class="{ active: isViewingActiveGoals }"
                        @click="isViewingActiveGoals = true">{{ $t('DescriptionBtn.active') }}
                </button>
            </div>
            <div v-if="goals.length === 0"
                 :class="['empty__state', { 'is-show': isViewingActiveGoals && goals.length === 0 }]">
                <img class="no__task-icon" src="../assets/images/Memepanda.png" alt="">
                <p class="no__task-text">{{ $t('homePage.no_choiced_goals') }}</p>
            </div>
            <Transition name="fade-slide" mode="out-in">
                <div v-if="!isViewingActiveGoals" key="create" class="tab-section">
                    <JourneyModal
                            v-if="!selectedPreviewGoal"
                            :ready-goals="computedReadyGoals"
                            @preview="openGoalPreview"
                            @close="showCreateModal = false"
                    />
                </div>
                <div v-else key="active" class="tab-section goal-list">
                    <div class="goal-switcher-bar">
                        <div class="goal-switcher-wrapper">
                            <div class="goal-switcher-scroll" ref="scrollContainer">
                                <div
                                        class="goal-slide"
                                        v-for="goal in goals"
                                        :key="goal.id"
                                        @click="selectedGoalId = goal.id"
                                        :class="{ active: selectedGoalId === goal.id }"
                                        :style="{ backgroundImage: `url(${getGoalImage(goal.image)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                            }">
                                    <div class="goal__header">
                                        <span>{{ $t(`Task.${goal.i18nKey}`) }}</span>
                                        <img @click="openModal(goal.id)" class="clear-button"
                                             src="../assets/images/broom.svg" alt="">
                                    </div>

                                    <div v-if="goal.id === selectedGoalId" class="goal-progress-container">
                                        <div class="goal-progress-text">
                                            {{ goal.progress }} {{ goal.unit }} / {{ goal.target }} {{ goal.unit }}
                                        </div>

                                        <div class="progress-bar-bg">
                                            <div class="progress-bar-fill"
                                                 :style="{ width: Math.min((goal.progress / goal.target) * 100, 100) + '%' }"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <AccumulationGoalCard
                            v-if="currentGoal"
                            :goal="currentGoal"
                            @update="updateGoal"
                    />
                </div>
            </Transition>
        </div>
        <GoalPreview
                v-if="selectedPreviewGoal"
                :goal="selectedPreviewGoal"
                @start="handleGoalCreate"
                @close="selectedPreviewGoal = null"
        />
    </div>
</template>

<script setup>
import {ref, computed, onMounted, onBeforeUnmount, nextTick} from 'vue'
import AccumulationGoalCard from '../src/components/AccumulationGoalCard.vue'
import JourneyModal from '../src/components/JouneyModal.vue'
import HeaderWithBack from '../src/components/headerWithBack.vue'
import GoalPreview from '../src/components/goalPReview.vue'
import ArrowBack from '../assets/images/back.svg'
import {useJourneyStore} from '../stores/useJourneyStore.js'
import books from '../assets/images/books.png'
import sleep from '../assets/images/sleep.png'

const goalToDeleteId = ref(null)
const isShow = ref(false)
const journeyStore = useJourneyStore()
const selectedGoalId = ref(null)
const showCreateModal = ref(false)
const isDelete = ref(false)
const showPreview = ref(false)
const selectedGoal = ref(null)
const currentGoal = computed(() =>
    goals.value.find(goal => goal.id === selectedGoalId.value)
)
const goalImages = {
    books,
    sleep,
    default: books
}
const scrollContainer = ref(null)
const notDeleteJourney = () => {
    isDelete.value = false
}
const openModal = (goalId) => {
    goalToDeleteId.value = goalId
    isDelete.value = true
}
const clearJourney = () => {
    journeyStore.deleteGoal(goalToDeleteId.value)
    isDelete.value = false
    goalToDeleteId.value = null
}

function updateActiveGoalOnScroll() {
    const container = scrollContainer.value
    if (!container) return

    const slides = container.querySelectorAll('.goal-slide')
    const containerRect = container.getBoundingClientRect()

    let closest = null
    let closestDist = Infinity

    slides.forEach(slide => {
        const slideRect = slide.getBoundingClientRect()
        const slideCenter = slideRect.left + slideRect.width / 2
        const containerCenter = containerRect.left + containerRect.width / 2
        const distance = Math.abs(containerCenter - slideCenter)

        if (distance < closestDist) {
            closestDist = distance
            closest = slide
        }
    })

    if (closest) {
        closest.click()
    }
}

onMounted(() => {
    nextTick(() => {
        if (scrollContainer.value) {
            scrollContainer.value.addEventListener('scroll', updateActiveGoalOnScroll)
            updateActiveGoalOnScroll()
        }
    })
})

onBeforeUnmount(() => {
    scrollContainer.value?.removeEventListener('scroll', updateActiveGoalOnScroll)
})

function getGoalImage(imageKey) {
    return goalImages[imageKey] || goalImages.default
}

const {
    goals,
    isViewingActiveGoals,
    selectedPreviewGoal,
    computedReadyGoals
} = storeToRefs(journeyStore)

const {
    deleteGoal,
    openGoalPreview,
    handleGoalCreate,
    updateGoal
} = journeyStore

watch(isDelete, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});


</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.no__task-text {
    text-align: center;
    margin-top: 15px;
    font-size: 16px;
    color: var(--text-color);
    font-family: "Nunito", sans-serif;
}

.goal__header {
    display: flex;
    justify-content: space-between;
}

.error__window {
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.49);
    z-index: 11;
    overflow: hidden;
}

.tacker__delete-subtext {
    font-size: 14px;
    padding: 15px;
    color: #f1eaea;
}

.state {
    opacity: 1;
    transition: .5s;
}

.empty__state {
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.empty__state.is-show {
    opacity: 1;
    transition: 1s;
}

.no__task-icon {
    width: 90px;
}

.delete__btn {
    color: white;
    width: 46%;
    text-align: center;
    background: #00b7ff;
    padding: 8px;
    border-radius: 20px;
    font-family: "Nunito", sans-serif;

}

.tacker__delete-text {
    text-align: center;
    font-size: 20px;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    color: white;
    margin-bottom: 10px;
}

.delete__btns {
    padding: 20px 0 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
}

.btn-cancel {
    background-color: #e5e7eb; /* светло-серый */
    color: #374151; /* тёмный серый */
}

.btn-confirm {
    background-color: #f472b6; /* тёплый розовый */
    color: white;
}

.delete__content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    background: linear-gradient(135deg, #a78bfa, #7c3aed);
    top: 40%;
    left: 50%;
    z-index: 100;
    transform: translateX(-50%);
    border-radius: 25px;
    padding: 25px;
}


.goal-progress-text {
    font-size: 20px;
    color: #6b21a8;
    margin: 10px 0;
    font-weight: 600;
}

.progress-bar-bg {
    width: 50%;
    height: 35px;
    background-color: #e9d5ff;
    border-radius: 25px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background-color: #8c6de8;
    transition: width 0.4s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.goal__switcher--wrapper {
    width: 100%;
    height: 100px;
    background: red;
    overflow: hidden;
    border-radius: 20px;
}

.tracker__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.tab-section {
    min-height: 200px;
}

.tracker {
    height: 100vh;
}

.tracker-wrapper {
    max-width: 700px;
    margin: 0 auto;
    padding: 15px 20px;
}

.goal-tabs {
    display: flex;
    justify-content: space-between;
    margin: 4px 0;
    border-radius: 25px;
    overflow: hidden;
    background: #ede9fe;
}

.goal-tab {
    flex: 1;
    padding: 16px;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    text-transform: uppercase;
    background: transparent;
    border: none;
    font-family: "Nunito", sans-serif;
    cursor: pointer;
    color: #6b21a8;
    transition: 0.5s ease;
}

.goal-tab.active {
    background: #c084fc;
    color: white;
}

.goal-list {
    overflow-y: auto;
}

.goal-switcher {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    overflow-x: auto;
    margin-bottom: 10px;
    flex: 1;

}

.goal-switcher button {
    padding: 6px 14px;
    border: none;
    border-radius: 20px;
    background: #ddd;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
}

.goal-switcher button.active {
    background: #8b5cf6;
    color: white;
}

.goal-switcher-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.clear-button {
    cursor: pointer;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f472b6;
    padding: 5px;
    border-radius: 50%;
}

.goal-switcher-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    display: flex;
    scrollbar-width: none;
    width: 100%;
}

.goal-switcher-scroll {
    display: flex;
    width: 100%;
    /*height: 150px;*/
}

.goal-slide {
    min-width: 100%;
    scroll-snap-align: start;
    padding: 26px 16px;
    border: none;
    border-radius: 20px;
    background: #ddd;
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 23px;
    margin: 10px 10px;
    height: 164px;
    font-family: "Nunito", sans-serif;
    transition: 0.2s ease;
}

.goal-slide.active {
    background: #8b5cf6;
    color: white;
}
</style>