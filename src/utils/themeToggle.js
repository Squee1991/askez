import {useColorMode} from '#imports'
import {ref} from 'vue'

const activeAnim = ref(false)
const isToggle = ref(false)

export function toggleTheme() {
	const colorMode = useColorMode()

	activeAnim.value = true
	setTimeout(() => {
		activeAnim.value = false
	}, 200)

	colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
	isToggle.value = colorMode.preference === 'dark'
}

export function toggleThemeByCommand(text, lang = 'en') {
	const colorMode = useColorMode()
	const lower = text.toLowerCase()

	const triggers = {
		dark: {
			en: [
				'dark theme', 'enable dark theme', 'dark mode', 'night mode', 'dark', 'switch to dark'
			],
			ru: [
				'тёмную тему', 'включи тёмную тему', 'темную', 'ночная тема', 'ночной режим',
				'тёмная', 'темная', 'тёмный', 'темный', 'включи ночную', 'переключи на тёмную'
			],
			fr: [
				'mode sombre', 'thème sombre', 'activer le mode sombre', 'mode nuit', 'sombre'
			],
			de: [
				'dunkles thema', 'dunkler modus', 'nachtmodus', 'aktivieren sie den dunklen modus', 'dunkel'
			],
			es: [
				'tema oscuro', 'modo oscuro', 'activar tema oscuro', 'oscuro', 'modo noche'
			],
			zh: [
				'深色模式', '黑暗模式', '夜间模式'
			],
			ar: [
				'الوضع الداكن', 'الوضع الليلي', 'ثيم غامق', 'الوضع المظلم'
			],
			be: [
				'цёмную тэму', 'начную тэму', 'цёмны рэжым', 'цёмная', 'цёмны'
			],
			uk: [
				'темну тему', 'нічна тема', 'темна тема', 'темна', 'нічний режим'
			],
			pl: [
				'ciemny motyw', 'tryb ciemny', 'nocny motyw', 'ciemny', 'nocny'
			]
		},
		light: {
			en: [
				'light theme', 'enable light theme', 'light mode', 'switch to light', 'light'
			],
			ru: [
				'светлую тему', 'включи светлую тему', 'светлая', 'светлую', 'яркая', 'переключи на светлую'
			],
			fr: [
				'mode clair', 'thème clair', 'activer le mode clair', 'clair'
			],
			de: [
				'helles thema', 'heller modus', 'lichtmodus', 'hell', 'tagmodus'
			],
			es: [
				'tema claro', 'modo claro', 'activar tema claro', 'claro', 'modo día'
			],
			zh: [
				'浅色模式', '明亮模式', '日间模式'
			],
			ar: [
				'الوضع الفاتح', 'الوضع النهاري', 'ثيم فاتح', 'الوضع المضيء'
			],
			be: [
				'сьветлую тэму', 'сьветлая', 'яркая', 'дзённая тэма'
			],
			uk: [
				'світлу тему', 'світла тема', 'світла', 'денна тема', 'яскрава'
			],
			pl: [
				'jasny motyw', 'tryb jasny', 'jasny', 'dzienny motyw', 'tryb dzienny'
			]
		}
	}


	const responses = {
		dark: {
			en: '🌙 Dark theme enabled',
			ru: '🌙 Тёмная тема включена',
			fr: '🌙 Thème sombre activé',
			de: '🌙 Dunkles Thema aktiviert',
			es: '🌙 Tema oscuro activado',
			zh: '🌙 深色模式已启用',
			ar: '🌙 تم تفعيل الوضع الداكن',
			be: '🌙 Цёмная тэма ўключана',
			uk: '🌙 Темна тема увімкнена',
			pl: '🌙 Ciemny motyw włączony'
		},
		light: {
			en: '☀️ Light theme enabled',
			ru: '☀️ Светлая тема включена',
			fr: '☀️ Thème clair activé',
			de: '☀️ Helles Thema aktiviert',
			es: '☀️ Tema claro activado',
			zh: '☀️ 浅色模式已启用',
			ar: '☀️ تم تفعيل الوضع الفاتح',
			be: '☀️ Светлая тэма ўключана',
			uk: '☀️ Світла тема увімкнена',
			pl: '☀️ Jasny motyw włączony'
		}
	}
	const match = (list) => list?.some(trigger => lower.includes(trigger))
	if (match(triggers.dark[lang])) {
		colorMode.preference = 'dark'
		isToggle.value = true
		return responses.dark[lang] || responses.dark.en
	}

	if (match(triggers.light[lang])) {
		colorMode.preference = 'light'
		isToggle.value = false
		return responses.light[lang] || responses.light.en
	}

	return null
}

export {activeAnim, isToggle}
