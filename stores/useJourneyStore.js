import {defineStore} from 'pinia'
import {ref, computed, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {getFirestore, doc, setDoc, getDoc, updateDoc, deleteField} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import read_books from '../assets/images/read_books.svg'
import drink_water from '../assets/images/drink_water.svg'
import sleep_time from '../assets/images/sleep_time.svg'
import meditation from '../assets/images/meditation.svg'
import wake_up from '../assets/images/wake_up.svg'
import run from '../assets/images/run.svg'
import no_sugar from '../assets/images/no_sugar.svg'
import no_alcohol from '../assets/images/no_alcohol.svg'
import social_media from '../assets/images/social_media.svg'
export const useJourneyStore = defineStore('journeyStore', () => {
    const db = getFirestore()
    const auth = getAuth()
    const {t, locale} = useI18n()

    const imageMap = {
        books: read_books,
        water: drink_water,
        sleep: sleep_time,
        meditate: meditation,
        wake_7am: wake_up,
        evening_run: run,
        no_sugar: no_sugar,
        alcohol: no_alcohol,
        media: social_media
    }

    const goals = ref([])
    const readyGoals = ref([
        {i18nKey: 'books', icon: 'read_books', image: 'books', target: 21},
        {i18nKey: 'water', icon: 'drink_water', image: 'water', target: 21},
        {i18nKey: 'meditate', icon: 'meditation', image: 'meditate', target: 21},
        {i18nKey: 'wake_7am', icon: 'wake_up',  image: 'wake_7am', target: 21},
        {i18nKey: 'evening_run', icon: 'run', image: 'evening_run', target: 21},
        {i18nKey: 'no_sugar', icon: 'no_sugar', image: 'no_sugar', target: 21},
        {i18nKey: 'sleep', icon: 'sleep_time', image: 'sleep', target: 21},
        {i18nKey: 'alcohol', icon: 'no_alcohol', image: 'alcohol', target: 21},
        {i18nKey: 'media', icon: 'social_media', image: 'media', target: 21}
    ])

    const selectedPreviewGoal = ref(null)
    const isViewingActiveGoals = ref(false)
    const userId = ref(null)

    const computedReadyGoals = computed(() => {
        const activeKeys = goals.value.map(g => g.i18nKey)
        return readyGoals.value
            .filter(goal => !activeKeys.includes(goal.i18nKey))
            .map(goal => ({
                i18nKey: goal.i18nKey,
                icon: goal.icon || '',
                image: goal.image || '',
                imageSrc: imageMap[goal.i18nKey] || '',
                target: goal.target,
                title: t(`Task.${goal.i18nKey}`)
            }))
    })
    const openGoalPreview = (goal) => {
        selectedPreviewGoal.value = {...goal}
    }
    const handleGoalCreate = async (goalData) => {
        const now = new Date().toISOString().slice(0, 10)
        goals.value.push({
            id: Date.now(),
            i18nKey: goalData.i18nKey,
            title: goalData.title,
            target: goalData.target,
            unit: goalData.unit || '',
            icon: goalData.icon || '',
            image: goalData.image || '',
            progress: 0,
            entries: [],
            startDate: now
        })
        selectedPreviewGoal.value = null
        isViewingActiveGoals.value = true
        await saveGoals()
    }

    const deleteGoal = async (goalId) => {
        goals.value = goals.value.filter(goal => goal.id !== goalId)


        if (selectedPreviewGoal.value?.id === goalId) {
            selectedPreviewGoal.value = null
        }

        await saveGoals()
    }

    const updateGoal = async (updatedGoal) => {
        const index = goals.value.findIndex(g => g.id === updatedGoal.id)
        if (index !== -1) {
            goals.value[index] = {...updatedGoal}
            await saveGoals()
        }
    }
    const saveGoals = async () => {
        if (!userId.value) return
        const userRef = doc(db, 'users', userId.value)
        await setDoc(userRef, {journeyGoals: goals.value}, {merge: true})
    }
    const loadGoals = async () => {
        if (!userId.value || !navigator.onLine) return
        const userRef = doc(db, 'users', userId.value)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            goals.value = data.journeyGoals || []

        }
    }

    const clearAllGoals = async () => {
        goals.value = []
        if (!userId.value) return
        const userRef = doc(db, 'users', userId.value)
        await updateDoc(userRef, {
            journeyGoals: deleteField()
        })
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userId.value = user.uid
            await loadGoals()
        } else {
            userId.value = null
            goals.value = []
        }
    })

    watch(goals, async () => {
        await saveGoals()
    }, {deep: true})

    return {
        goals,
        readyGoals,
        computedReadyGoals,
        selectedPreviewGoal,
        isViewingActiveGoals,
        deleteGoal,
        clearAllGoals,
        openGoalPreview,
        handleGoalCreate,
        updateGoal,
        saveGoals,
        loadGoals
    }
})
