<script setup>
	import HeaderWithback from '../src/components/headerWithBack.vue'
	import { ref, onMounted, watch } from 'vue'
	import { useI18n } from 'vue-i18n'
	import { useHabitStore } from '../stores/habitStore.js'
	import { useAuthStore } from '../stores/authStore.js'
	import Backicon from '../assets/images/undo.svg'


	const habitStore = useHabitStore()
	const authStore = useAuthStore()
	const { locale } = useI18n()
	const userLang = ref('en')
	const messages = ref([])
	const userInput = ref('')
	const isLoading = ref(false)
	const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

	const greetings = {
		en: [
			"Hi! How are you feeling today?",
			"Hello there! Ready to rock this day?",
			"Hey! Hope your day starts great 🐼",
			"Good to see you! How’s everything?",
			"Welcome back! Let’s do something awesome!",
		],
		ru: [
			"Привет! Как ты себя чувствуешь сегодня?",
			"Салют! Готов(а) покорять день?",
			"Хей!Рад тебя видеть!",
			"С возвращением! Как дела?",
			"Добро пожаловать! Сделаем этот день крутым!",
		],
		de: [
			"Hallo! Wie fühlst du dich heute?",
			"Hey! Bereit für einen produktiven Tag?",
			"Guten Tag! Schön dich zu sehen",
			"Willkommen zurück! Wie geht’s dir?",
			"Los geht’s! Machen wir was Gutes heute!",
		],
		fr: [
			"Salut ! Comment tu te sens aujourd’hui ?",
			"Coucou ! Prêt(e) pour une super journée ?",
			"Bonjour ! Content de te revoir",
			"Rebienvenue ! Comment ça va ?",
			"Faisons de cette journée un succès !",
		],
		es: [
			"¡Hola! ¿Cómo te sientes hoy?",
			"¡Bienvenido! ¿Listo para empezar?",
			"¡Hey! Espero que tengas un gran día",
			"¡Qué alegría verte de nuevo!",
			"¡Vamos a lograr mucho hoy!",
		],
		be: [
			"Прывітанне! Як ты сябе адчуваеш сёння?",
			"Хэй! Гатовы пачаць дзень?",
			"Вітаю зноў! Як справы?",
			"Добра бачыць цябе тут!",
			"Зрабім гэты дзень лепшым!",
		],
		uk: [
			"Привіт! Як ти себе почуваєш сьогодні?",
			"Хей! Готовий почати день?",
			"Радий тебе бачити знову!",
			"Як настрій? Починаємо!",
			"День обіцяє бути чудовим!",
		],
		zh: [
			"你好！你今天感觉怎么样？",
			"嗨！准备好迎接新的一天了吗？",
			"欢迎回来！今天想做点什么？",
			"很高兴见到你！",
			"让我们开始今天的挑战吧！",
		],
		ar: [
			"مرحبًا! كيف تشعر اليوم؟",
			"أهلاً بك! هل أنت مستعد لليوم؟ 🐼",
			"يسعدني رؤيتك مجددًا!",
			"لنبدأ هذا اليوم بابتسامة!",
			"هل أنت مستعد للإنجازات اليوم؟",
		]
	}


	const errorMessages = {
		en: 'Hmm... something went wrong. Try again later!',
		ru: 'Хм... что-то пошло не так. Попробуй позже!',
		de: 'Hm... Etwas ist schiefgelaufen. Versuch es später noch einmal!',
		fr: 'Hmm... quelque chose s\'est mal passé. Réessaie plus tard !',
		es: 'Hmm... algo salió mal. ¡Inténtalo más tarde!',
		be: 'Хм... нешта пайшло не так. Паспрабуй пазней!',
		uk: 'Хм... щось пішло не так. Спробуй пізніше!',
		zh: '嗯... 出了点问题，请稍后再试！',
		ar: ' هممم... حدث خطأ ما. حاول مرة أخرى لاحقًا!'
	}

	onMounted(async () => {
		await authStore.loadBotStateFromLocal();
	});

	onMounted(() => {
		userLang.value = locale.value.split('-')[0] || 'en'
		messages.value = [
			{
				role: 'assistant',
				text: greetings[userLang.value] || greetings['en']
			}
		]
	})

	onMounted(() => {
		const lang = locale.value.split('-')[0] || 'en'
		const langGreetings = greetings[lang] || greetings['en']
		const randomGreeting = langGreetings[Math.floor(Math.random() * langGreetings.length)]
		messages.value = [{ role: 'assistant', text: randomGreeting }]
	})

	watch(locale, (newLocale) => {
		userLang.value = newLocale.split('-')[0]
		messages.value = [
			{
				role: 'assistant',
				text: greetings[userLang.value] || greetings['en']
			}
		]
	})

	const getTodayInfo = () => {
		const today = new Date()
		today.setHours(0, 0, 0, 0)

		const doneToday = habitStore.tasks.filter(task =>
			task.checkedDates?.some(dateStr => {
				const d = new Date(dateStr)
				d.setHours(0, 0, 0, 0)
				return d.getTime() === today.getTime()
			})
		).map(t => t.goal)

		const missedToday = habitStore.tasks.filter(task => {
			const start = new Date(task.dateRange.start)
			const end = new Date(task.dateRange.end)
			start.setHours(0, 0, 0, 0)
			end.setHours(0, 0, 0, 0)

			const isInRange = today >= start && today <= end
			const isMissed = !task.checkedDates?.some(dateStr => {
				const d = new Date(dateStr)
				d.setHours(0, 0, 0, 0)
				return d.getTime() === today.getTime()
			})

			return isInRange && isMissed
		}).map(t => t.goal)

		return { doneToday, missedToday }
	}

	const sendMessage = async () => {
		if (!authStore.isBotEnabled) return;
		if (!userInput.value.trim() || isLoading.value) return
		const userText = userInput.value.trim()
		messages.value.push({ role: 'user', text: userText })
		userInput.value = ''
		isLoading.value = true

		const thinkingIndex = messages.value.push({ role: 'assistant', text: '...' }) - 1

		const today = new Date().toISOString().split('T')[0]

		const completedToday = habitStore.tasks
		.filter(task => task.checkedDates?.includes(today))
		.map(task => task.goal)

		const missedToday = habitStore.tasks
		.filter(task => task.missedDates?.includes(today))
		.map(task => task.goal)

		const progressMissTasks = habitStore.tasks
		.filter(task => task.progressMiss > 0)
		.map(task => `${task.goal} (${task.progressMiss}%)`)

		const systemPrompt = `
You are a mindful panda mentor 🐼 in a self-discipline app.
Today is ${today}.
User completed today: ${completedToday.length > 0 ? completedToday.join(', ') : 'nothing'}.
User missed today: ${missedToday.length > 0 ? missedToday.join(', ') : 'nothing'}.
Miss progress: ${progressMissTasks.length > 0 ? progressMissTasks.join(', ') : 'none'}.
Panda level: ${habitStore.pandaLevel}, overall progress: ${habitStore.pandaProgressGlobal}%.
Always reply **only** in ${userLang.value}.
DO NOT mix any words from other languages in your responses.
Be consistent with the language, and do not use foreign words or slang.
Use simple and natural language. Keep replies short, friendly, and supportive.
Use emojis sometimes.
`

		try {
			const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${GROQ_API_KEY}`
				},
				body: JSON.stringify({
					model: 'llama3-8b-8192',
					messages: [
						{ role: 'system', content: systemPrompt },
						...messages.value
						.filter((m, i) => i !== thinkingIndex)
						.map(m => ({ role: m.role, content: m.text })),
						{ role: 'user', content: userText }
					]
				})
			})

			const data = await res.json()
			messages.value.splice(thinkingIndex, 1)

			if (data.choices?.[0]?.message?.content) {
				messages.value.push({
					role: 'assistant',
					text: data.choices[0].message.content
				})
			} else {
				messages.value.push({
					role: 'assistant',
					text: errorMessages[userLang.value] || errorMessages['en']
				})
			}
		} catch (e) {
			console.error(e)
			messages.value.splice(thinkingIndex, 1)
			messages.value.push({
				role: 'assistant',
				text: errorMessages[userLang.value] || errorMessages['en']
			})
		} finally {
			isLoading.value = false
		}
	}
</script>

<template>
	<div class="chat-container">
		<HeaderWithback :icon="Backicon" :title="$t('chat.title')"/>
		<div class="messages">
			<div
				v-for="(msg, index) in messages"
				:key="index"
				:class="['message', msg.role]"
			>
				<span v-if="msg.role === 'assistant'"></span>
				<span>{{ msg.text }}</span>
			</div>
		</div>

		<div class="input-area">
			<input
				v-model="userInput"
				@keydown.enter="sendMessage"
				type="text"
				:placeholder="$t('chat.placeholder')"
			/>
			<button @click="sendMessage">{{ $t('chat.btn')}}</button>
		</div>
	</div>
</template>

<style scoped>
	.chat-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(to bottom right, #f0f4f8, #dbe8f3);
		font-family: 'Segoe UI', sans-serif;
		padding: 20px;
		box-sizing: border-box;
	}

	.messages {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 10px;
		scroll-behavior: smooth;
	}

	.message {
		max-width: 75%;
		padding: 12px 16px;
		font-size: 16px;
		line-height: 1.5;
		border-radius: 14px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
		word-break: break-word;
		white-space: pre-wrap;
		animation: fadeIn 0.3s ease-in-out;
	}

	.message.assistant {
		align-self: flex-start;
		background-color: #e6f4ea;
		border-left: 4px solid #4caf50;
		color: #333;
	}

	.message.user {
		align-self: flex-end;
		background-color: #e3f2fd;
		border-right: 4px solid #7e61c7;
		color: #333;
	}

	.input-area {
		display: flex;
		gap: 10px;
		padding-top: 12px;
	}

	input {
		flex: 1;
		padding: 12px 14px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 10px;
		background: #fff;
		transition: box-shadow 0.2s;
	}

	input:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
	}

	button {
		padding: 12px 18px;
		font-size: 16px;
		background-color: #7e61c7;
		color: white;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #43a047;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

</style>
