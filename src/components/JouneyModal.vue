    `
    <template>
        <div class="goal-create">
            <div class="goal-create__wrapper">
                <div class="goal-form">
                    <div class="goal-form__ready">
                        <div class="goal-form__title-wrapper">
                            <p class="goal-form__ready-title">{{ $t('DescriptionBtn.banner')}}</p>
                        </div>
                        <ul class="goal-form__ready-list">
                            <li
                                v-for="(item, i) in computedReadyGoals"
                                :key="i"
                                class="goal-form__ready-item"
                                @click="selectReadyGoal(item)"
                            >
                                <span class="goal-item-content">
                                    <img
                                        v-if="item.imageSrc"
                                        :src="item.imageSrc"
                                        class="goal-form__icon-inline"
                                        alt="icon"
                                    />
                                    <span>{{ item.title }}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <script setup>
    import {ref} from 'vue'
    import pic from "/assets/images/jorney_goal.png"
    import { useJourneyStore} from '../../stores/useJourneyStore.js'
    const journeyStore = useJourneyStore()
    const { computedReadyGoals } = storeToRefs(journeyStore)

    const selectedPreviewGoal = ref(null)
    const emit = defineEmits(['close', 'create', 'preview'])
    const props = defineProps({
        readyGoals: Array
    })
    const selectReadyGoal = (item) => {
        selectedPreviewGoal.value = item
        emit('preview', item)
    }

    onMounted(() => {
        console.log('computedReadyGoals:', computedReadyGoals.value)
    })

    </script>

    <style scoped>

    .goal-form__icon-inline {
        width: 53px;
        height: 53px;
        margin-right: 10px;
    }

    .goal-form__icon {
        width: 40px;
        height: auto;
        display: block;
        margin: 10px auto 0 auto;
    }

    .goal-item-content {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .goal-create {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 10px 0;
        box-sizing: border-box;
        overflow-y: auto;
    }

    .goal-create__wrapper {
        width: 100%;
    }

    .goal-form__input {
        width: 100%;
        padding: 12px 14px;
        font-size: 16px;
        border-radius: 16px;
        border: 1px solid #c8b6ff;
        margin-bottom: 14px;
    }

    .goal-form__submit {
        width: 100%;
        background: #a78bfa;
        color: white;
        font-size: 18px;
        padding: 14px;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        font-family: "Nunito", sans-serif;
    }

    .goal-form__row {
        display: flex;
        gap: 10px;
    }

    .goal-form__select-wrapper {
        width: 100%;
        max-width: 100px;
        position: relative;
    }

    .goal-form__select-display {
        background: #f3efff;
        border: 1px solid #d5c8ff;
        padding: 10px;
        border-radius: 16px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .goal-form__arrow {
        transition: 0.2s;
    }

    .goal-form__arrow--open {
        transform: rotate(180deg);
    }

    .goal-form__options {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border-radius: 12px;
        border: 1px solid #d5c8ff;
        width: 100%;
        z-index: 100;
        margin-top: 4px;
    }

    .goal-form__options li {
        padding: 8px 12px;
        cursor: pointer;
    }

    .goal-form__custom-unit {
        margin-top: 10px;
    }

    /*.goal-form__ready {*/
    /*    padding-top: 12px;*/
    /*}*/

    .goal-form__ready-title {
        font-weight: 600;
        font-size: 21px;
        color: white;
        font-family: "Nunito", sans-serif;
        max-width: 170px;
    }

    .goal-form__title-wrapper {
        background-image: url("assets/images/jorney_goal.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        border-radius: 20px;
        padding: 38px 15px;
        margin-bottom: 10px;
    }


    .goal-form__ready-list {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
    }

    .goal-form__ready-item {
        position: relative;
        background: #f4f0ff;
        padding: 12px 14px;
        border-radius: 16px;
        border: 1px solid #e0ccff;
        cursor: pointer;
        transition: 0.2s ease;
        font-weight: 600;
        color: #4c1d95;
        font-family: "Nunito", sans-serif;
        font-size: 18px;
        z-index: 1;
        overflow: hidden;
    }

    .goal-form__ready-item::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        height: 100%;
        background: linear-gradient(135deg, #ece3fd 0%, #e4d2fc 100%);
        clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
        z-index: -1;
    }

    .goal-form__ready-item::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 83%;
        height: 100%;
        background: linear-gradient(135deg, #e3d7f5 0%, #ddc8f0 100%);
        clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
        z-index: -1;
    }

    </style>
