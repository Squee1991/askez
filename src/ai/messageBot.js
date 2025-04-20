export const getTimeOfDay = () => {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) return 'morning';
	if (hour >= 12 && hour < 18) return 'day';
	if (hour >= 18 && hour < 22) return 'evening';
	return 'night';
};

export const timeBasedGreetings = {
	en: {
		morning: [
			"Good morning! Ready to win the day?",
			"Rise and shine, it's a beautiful start!",
			"Top of the morning to you!",
			"Time to wake up and be awesome!",
			"Let’s greet the day with a smile ☀️"
		],
		day: [
			"Hello there! Ready to rock this day?",
			"Let's get something awesome done!",
			"Keep moving forward — you're doing great!",
			"This day is yours — make it count!",
			"Smash your goals today — I believe in you 💪"
		],
		evening: [
			"Good evening! Hope your day was amazing.",
			"Relax time! You did great today.",
			"Evenings are for peace — enjoy it.",
			"Slow down and enjoy the moment.",
			"You’ve earned this quiet — take it easy 🌆"
		],
		night: [
			"Sweet dreams! Rest well 💤",
			"Good night! See you tomorrow 🌙",
			"Let go of today — tomorrow is fresh.",
			"Sleep tight, champion!",
			"May your dreams be full of joy ✨"
		]
	},
	ru: {
		morning: [
			"Доброе утро! Готов(а) к победам?",
			"Утро — время начать с чистого листа!",
			"Пусть этот день начнётся с улыбки",
			"Проснись — время вдохновляться!",
			"Самое время воплощать мечты в реальность!"
		],
		day: [
			"Привет! Готов(а) покорять день?",
			"Салют! Вперёд к целям!",
			"День в самом разгаре — держим темп!",
			"Ты можешь всё — вперёд за результатами!",
			"Пусть сегодня будет продуктивным и ярким!"
		],
		evening: [
			"Добрый вечер! Надеюсь, день был удачным.",
			"Время расслабиться — ты молодец!",
			"Вечер — время подвести итоги и отдохнуть.",
			"Сегодня ты сделал(а) больше, чем думаешь!",
			"Спокойный вечер — награда за старания."
		],
		night: [
			"Спокойной ночи! Пусть приснится панда",
			"До завтра! Удачи в новом дне!",
			"Сладких снов и приятных мыслей ",
			"Пусть ночь принесёт восстановление и покой.",
			"Всё будет хорошо — отдыхай спокойно"
		]
	},
	uk: {
		morning: [
			"Доброго ранку! Готовий до звершень?",
			"Новий день — нові можливості!",
			"Прокидайся — світ чекає на твої дії!",
			"Ранок — найкращий час для старту!",
			"Свіже повітря, нові цілі — вперед!"
		],
		day: [
			"Привіт! Почнемо щось круте?",
			"Гайда до перемог!",
			"Нехай день буде плідним і яскравим!",
			"Час діяти — зроби цей день своїм!",
			"Сьогодні ідеальний день для рішучих кроків!"
		],
		evening: [
			"Добрий вечір! Сподіваюся, день був класним.",
			"Вечір — час для відпочинку.",
			"Ти молодець! Можеш відчути гордість за себе.",
			"Згадай хороше, що сталося сьогодні.",
			"Вечір — момент для себе. Розслабся"
		],
		night: [
			"На добраніч! Гарних снів",
			"Спи міцно! Побачимось завтра!",
			"Нехай тобі насниться щось приємне ",
			"Час відновити сили — відпочинь гарненько.",
			"Закрий очі й відпусти день з вдячністю."
		]
	},
	pl: {
		morning: [
			"Dzień dobry! Gotowy na sukces?",
			"Zacznijmy ten dzień z energią!",
			"Nowy dzień, nowe możliwości!",
			"Wstań i błyszcz — to będzie dobry dzień!",
			"Poranek to idealny moment na nowe cele!"
		],
		day: [
			"Cześć! Gotowy podbić dzień?",
			"Zróbmy coś wyjątkowego!",
			"Nie trać czasu — działaj teraz!",
			"Masz w sobie siłę, by osiągnąć wszystko!",
			"Ten dzień należy do Ciebie — korzystaj z niego!"
		],
		evening: [
			"Dobry wieczór! Jak minął dzień?",
			"Odpocznij, zasłużyłeś!",
			"To był intensywny dzień — gratulacje!",
			"Wieczór to czas refleksji i spokoju.",
			"Zrelaksuj się — jutro nowy początek."
		],
		night: [
			"Dobrej nocy! Do zobaczenia jutro!",
			"Miłych snów",
			"Zamknij oczy i odpocznij — zasłużyłeś.",
			"Niech noc przyniesie Ci ukojenie.",
			"Śpij spokojnie, nowy dzień już blisko."
		]
	},
	fr: {
		morning: [
			"Bonjour ! Prêt pour une nouvelle journée ?",
			"Bon matin ! Faisons-en une belle journée.",
			"Le soleil se lève, tout est possible aujourd’hui.",
			"Commence ta journée avec énergie et sourire !",
			"Nouveau jour, nouvelles opportunités !"
		],
		day: [
			"Salut ! Prêt(e) pour accomplir tes objectifs ?",
			"Allons-y pour une belle réussite !",
			"C’est le moment de briller !",
			"Chaque action compte, vas-y à fond !",
			"Tu peux accomplir de grandes choses aujourd’hui."
		],
		evening: [
			"Bonsoir ! J’espère que ta journée s’est bien passée.",
			"Tu peux être fier(e) de toi aujourd’hui.",
			"Le moment est venu de ralentir et de te détendre.",
			"Bravo pour tout ce que tu as fait aujourd’hui.",
			"Fais le point sur ta journée avec fierté."
		],
		night: [
			"Bonne nuit ! Fais de beaux rêves",
			"Repos bien mérité !",
			"Dors paisiblement, tu l’as bien mérité.",
			"Que la nuit te recharge en énergie.",
			"À demain pour une nouvelle aventure !"
		]
	},
	de: {
		morning: [
			"Guten Morgen! Bereit für einen tollen Tag?",
			"Zeit zum Aufstehen und loslegen!",
			"Ein neuer Tag, neue Chancen!",
			"Lass uns den Tag mit einem Lächeln beginnen.",
			"Heute ist dein Tag – mach das Beste draus!"
		],
		day: [
			"Hallo! Lass uns was Großes starten!",
			"Los geht's, wir schaffen das!",
			"Zeig der Welt, was du kannst!",
			"Du bist stark – pack es an!",
			"Mach diesen Tag zu etwas Besonderem!"
		],
		evening: [
			"Guten Abend! Zeit zum Entspannen.",
			"Tag gut gemacht!",
			"Lehn dich zurück und genieße den Abend.",
			"Du hast heute viel erreicht – bravo!",
			"Jetzt ist die Zeit zum Auftanken."
		],
		night: [
			"Gute Nacht! Träum süß",
			"Erhol dich gut, bis morgen!",
			"Schlaf schön und tanke neue Energie.",
			"Die Nacht gehört dir – ruh dich aus.",
			"Bis morgen – neue Ziele warten!"
		]
	},
	es: {
		morning: [
			"¡Buenos días! ¡Vamos a por todas!",
			"¡Hoy será un gran día!",
			"¡Levántate con energía y una sonrisa!",
			"¡El sol brilla para ti hoy!",
			"¡Despierta tus sueños, empieza ahora!"
		],
		day: [
			"¡Hola! ¿Listo para lograr cosas geniales?",
			"¡Vamos a por nuestros objetivos!",
			"¡Tú puedes con todo!",
			"¡Haz que este día cuente!",
			"¡Convierte tu esfuerzo en logros!"
		],
		evening: [
			"¡Buenas tardes! ¿Cómo te fue hoy?",
			"Hora de descansar, lo hiciste bien.",
			"¡Relájate, te lo mereces!",
			"¡Mira lo lejos que has llegado!",
			"El día termina, pero tu progreso sigue."
		],
		night: [
			"¡Buenas noches! Dulces sueños",
			"Hasta mañana, héroe del día.",
			"Descansa bien, mañana es otra oportunidad.",
			"¡Gracias por dar lo mejor de ti hoy!",
			"¡Cierra los ojos y sueña en grande!"
		]
	},
	be: {
		morning: [
			"Добрай раніцы! Новы дзень — новыя мэты!",
			"Усміхайся і наперад!",
			"Час пачаць з чыстага аркуша!",
			"Сёння табе ўсё пад сілу!",
			"Прачынайся з надзеяй і энергіяй!"
		],
		day: [
			"Прывітанне! Гатовы пачаць?",
			"Сёння будзе добры дзень!",
			"Наперад да дасягненняў!",
			"Ты здольны(ая) на вялікае!",
			"Няхай дзень будзе плённым!"
		],
		evening: [
			"Добры вечар! Адпачывай.",
			"Ты зрабіў(ла) шмат сёння!",
			"Падвядзі вынікі і ганарыся сабой.",
			"Час запаволіцца і расслабіцца.",
			"Дзякуй сабе за гэты дзень."
		],
		night: [
			"Салодкіх сноў!",
			"Добра нач! Пабачымся заўтра.",
			"Прымі спакой і адпачынак.",
			"Хай сны будуць цудоўнымі!",
			"Спакойнай ночы і добрых думак!"
		]
	},
	ar: {
		morning: [
			"صباح الخير! يوم جديد يبدأ.",
			"ابدأ يومك بابتسامة!",
			"اليوم فرصة جديدة للنجاح.",
			"تنفّس بعمق وابدأ بقوة!",
			"استعد ليوم مليء بالإنجازات!"
		],
		day: [
			"مرحبًا! هل أنت مستعد للإنجاز؟",
			"لنحقق أهدافنا اليوم!",
			"اليوم ملكك، استغله جيدًا.",
			"استمر، فأنت تُحرز تقدماً!",
			"كل لحظة فرصة جديدة للتقدم."
		],
		evening: [
			"مساء الخير! كيف كان يومك؟",
			"حان وقت الاسترخاء!",
			"استمتع بأمسية هادئة.",
			"أنت تستحق بعض الراحة.",
			"اشعر بالفخر لما أنجزته اليوم."
		],
		night: [
			"تصبح على خير!",
			"أحلام سعيدة، نراك غدًا!",
			"دع يومك يختتم بالهدوء.",
			"نم مطمئنًا، فقد بذلت جهدًا.",
			"ليلة هادئة ومليئة بالراحة!"
		]
	},
	zh: {
		morning: [
			"早上好！准备迎接新的一天了吗？",
			"新的一天，新的开始！",
			"希望你今天充满能量！",
			"祝你有一个愉快的早晨！",
			"起床啦！精彩的一天等着你！"
		],
		day: [
			"你好！今天我们一起加油！",
			"让我们完成一些了不起的事！",
			"保持专注，你会成功的！",
			"今天是努力奋斗的一天！",
			"继续坚持，你做得很好！"
		],
		evening: [
			"晚上好！今天过得怎么样？",
			"现在是放松的时间了。",
			"放下压力，好好享受夜晚。",
			"一天的辛劳值得好好犒劳自己。",
			"让我们为明天积蓄能量。"
		],
		night: [
			"晚安！做个好梦",
			"辛苦啦，明天见！",
			"闭上眼睛，好好休息。",
			"今晚的星星也为你闪烁。",
			"睡个好觉，准备迎接新的一天。"
		]
	}
};

export const errorMessages = {
	en: 'Hmm... something went wrong. Try again later!',
	ru: 'Хм... что-то пошло не так. Попробуй позже!',
	de: 'Hm... Etwas ist schiefgelaufen. Versuch es später noch einmal!',
	fr: 'Hmm... quelque chose s\'est mal passé. Réessaie plus tard !',
	es: 'Hmm... algo salió mal. ¡Inténtalo más tarde!',
	be: 'Хм... нешта пайшло не так. Паспрабуй пазней!',
	uk: 'Хм... щось пішло не так. Спробуй пізніше!',
	zh: '嗯... 出了点问题，请稍后再试！',
	ar: ' هممم... حدث خطأ ما. حاول مرة أخرى لاحقًا!',
	pl: 'Hmm... coś poszło nie tak. Spróbuj ponownie później!'
}

export const eventMessages = {
	levelUp: {
		en: '🆙 Event: levelUp to {{level}}',
		ru: '🆙 Событие: повышение уровня до {{level}}',
		de: '🆙 Ereignis: Levelaufstieg auf {{level}}',
		fr: '🆙 Événement : niveau supérieur atteint {{level}}',
		es: '🆙 Evento: nivel subido a {{level}}',
		be: '🆙 Падзея: павышэнне ўзроўню да {{level}}',
		uk: '🆙 Подія: підвищено рівень до {{level}}',
		zh: '🆙 事件：等级提升至 {{level}}',
		ar: '🆙 حدث: تم رفع المستوى إلى {{level}}',
		pl: '🆙 Wydarzenie: awans na poziom {{level}}'
	},
	goalCompleted: {
		en: '🎯 Event: goalCompleted',
		ru: '🎯 Событие: Аскеза выполнена',
		de: '🎯 Ereignis: Ziel erreicht',
		fr: '🎯 Événement : objectif atteint',
		es: '🎯 Evento: objetivo completado',
		be: '🎯 Падзея: мэта выканана',
		uk: '🎯 Подія: ціль виконано',
		zh: '🎯 事件：目标已完成',
		ar: '🎯 حدث: تم إنجاز الهدف',
		pl: '🎯 Wydarzenie: cel zrealizowany'
	},
	achievementUnlocked: {
		en: '🎉 Event: achievementUnlocked',
		ru: '🎉 Событие: достижение получено',
		de: '🎉 Ereignis: Erfolg erhalten',
		fr: '🎉 Événement : succès obtenu',
		es: '🎉 Evento: logro conseguido',
		be: '🎉 Падзея: дасягненне атрымана',
		uk: '🎉 Подія: досягнення отримано',
		zh: '🎉 事件：成就已获得',
		ar: '🎉 حدث: تم الحصول على الإنجاز',
		pl: '🎉 Wydarzenie: osiągnięcie zdobyte'
	}
}

