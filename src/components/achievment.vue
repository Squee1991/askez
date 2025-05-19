<template>
    <div class="achieve__inner">
        <div class="achieve__text">
            <div class="achieve__title-block">
                <div class="achieve__title">{{ $t('achieveTitle.title') }}</div>
                <div class="achieve__subtitle">{{ $t('achieveTitle.subtitle') }}</div>
            </div>
            <div class="ring-wrapper" :style="{ '--progress': progressValue }">
                <div class="ring-progress"></div>
                <div class="ring-text">{{ activeAchievementCount }} / {{ totalAchievements }}</div>
            </div>
        </div>


        <div class="achieve__list-wrapper">
            <div class="achieve__list">
                <div
                        v-for="item in achievementData"
                        :key="item.id"
                        class="badge__wrapper animate-in"
                >
                    <img
                            :class="{ isActive: item.isActive }"
                            class="badge"
                            :src="item.src"
                            :alt="item.alt"
                            loading="eager"
                            decoding="async"
                    />
                    <span class="achieve__under-text">{{ $t(item.i18nKey) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from 'vue'
import {useHabitStore} from '../../stores/habitStore.js'

import Panda1 from '../../assets/images/p1.webp'
import Panda2 from '../../assets/images/p2.webp'
import Panda3 from '../../assets/images/p3.webp'
import Panda4 from '../../assets/images/p4.webp'
import Panda5 from '../../assets/images/p5.webp'
import Panda6 from '../../assets/images/p6.webp'
import Panda7 from '../../assets/images/p7.webp'
import Panda8 from '../../assets/images/p8.webp'
import Panda9 from '../../assets/images/p9.webp'

const pandaImages = [Panda1, Panda2, Panda3, Panda4, Panda5, Panda6, Panda7, Panda8, Panda9]

const habitStore = useHabitStore()

const totalAchievements = computed(() => habitStore.achievementThresholds.length)

const activeAchievementCount = computed(() =>
    habitStore.activeAchievements.filter(Boolean).length
)

const progressValue = computed(() =>
    `${(activeAchievementCount.value / totalAchievements.value) * 360}deg`
)

const achievementData = computed(() =>
    habitStore.achievementThresholds.map((_, index) => ({
        id: index + 1,
        src: pandaImages[index] || '',
        alt: `Panda ${index + 1}`,
        isActive: habitStore.activeAchievements?.[index] || false,
        i18nKey: `achieve.${index + 1}`
    }))
)
</script>

<style scoped>
.achieve__inner {
    height: 100%;
    overflow-y: auto;
}

.achieve__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--menu--btn-bg);
    border-radius: 20px;
    font-family: 'Nunito', serif;
    margin-bottom: 10px;
    padding: 10px;
}

.achieve__title-block {
    text-align: start;
}

.achieve__title {
    color: var(--text-color);
    font-size: 24px;
}

.achieve__subtitle {
    margin-top: 10px;
    font-weight: 100;
    font-size: 16px;
}

.ring-wrapper {
    position: relative;
    width: 70px;
    height: 70px;
}

.ring-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(#0028f3 var(--progress), #dddde4 var(--progress));
    mask: radial-gradient(farthest-side, transparent 70%, black 71%);
    -webkit-mask: radial-gradient(farthest-side, transparent 70%, black 71%);
}

.ring-text {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Acme', serif;
    font-size: 16px;
    color: var(--text-color);
    font-weight: bold;
}

.achieve__list-wrapper {
    background: var(--menu--btn-bg);
    border-radius: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.achieve__list-title {
    padding: 20px;
    font-size: 24px;
    color: var(--text-color);
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
}

.achieve__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.badge__wrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeInUp 0.6s ease both;
}

.badge {
    width: 76px;
    height: 76px;
    object-fit: contain;
    filter: grayscale(1);
}

.isActive {
    filter: grayscale(0) brightness(1.1);
    transform: scale(1.05);
}

.achieve__under-text {
    color: var(--text-color);
    width: 90px;
    text-align: center;
    font-family: 'Nunito', serif;
    font-size: 12px;
    font-weight: 400;
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
